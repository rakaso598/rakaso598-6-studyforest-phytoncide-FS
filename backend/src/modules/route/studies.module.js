import express from "express";
import prisma from "../../db/prisma/client.prisma.js";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

const studyRouter = express.Router();

// 스터디 리스트 조회
studyRouter.get("/", async (req, res, next) => {
  try {
    const {
      offset = 0,
      limit = 6,
      sort = "desc",
      search = "",
      orderBy = "createAt",
    } = req.query;

    const cleanedSearch = String(search).replace(/\s/g, "");

    const allowedOrderBy = ["createAt", "point"];
    const safeOrderBy = allowedOrderBy.includes(orderBy) ? orderBy : "createAt";
    const safeSort = sort === "asc" ? "ASC" : "DESC";

    const study = await prisma.$queryRaw`
      SELECT
        s.id,
        s."nickName",
        s.title,
        s.description,
        s.background,
        s.point,
        s."createAt",
        s."updatedAt",
      json_agg(e.*) FILTER (WHERE e.id IS NOT NULL) AS emojis
      FROM "Study" s
      LEFT JOIN "Emojis" e ON e."studyId" = s.id
      WHERE
        REPLACE(s.title, ' ', '') ILIKE ${`%${cleanedSearch}%`} OR
        REPLACE(s.description, ' ', '') ILIKE ${`%${cleanedSearch}%`} OR
        REPLACE(s."nickName", ' ', '') ILIKE ${`%${cleanedSearch}%`}
      GROUP BY s.id
      ORDER BY ${Prisma.raw(`"${safeOrderBy}"`)} ${Prisma.raw(safeSort)}
      OFFSET ${Number(offset)}
      LIMIT ${Number(limit)}
    `;

    const formatted = study.map((item) => ({
      ...item,
      emojis: item.emojis ?? [],
    }));

    res.status(200).json({ study: formatted });
  } catch (error) {
    next(error);
  }
});

// 최근 스터디 조회
studyRouter.get("/recently", async (req, res, next) => {
  try {
    const { studyIds } = req.query;

    if (!studyIds) {
      return res
        .status(400)
        .json({ message: "studyIds 파라미터가 필요합니다." });
    }

    const studyIdsArray = studyIds
      .split(",")
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id));

    if (studyIdsArray.length === 0) {
      return res.status(400).json({ message: "유효한 studyIds가 없습니다." });
    }

    const study = await prisma.study.findMany({
      where: { id: { in: studyIdsArray } },
      include: {
        emojis: true,
      },
      omit: { encryptedPassword: true },
    });

    const studyWithEmojis = study.map((item) => ({
      ...item,
      emojis: item.emojis ?? [],
    }));

    const orderedResult = [];

    for (const id of studyIdsArray) {
      const found = studyWithEmojis.find((item) => item.id === id);
      if (found) {
        orderedResult.push(found);
      }
    }

    res.status(200).json(orderedResult);
  } catch (error) {
    next(error);
  }
});

// 스터디 상세조회
studyRouter.get("/:studyId", async (req, res, next) => {
  try {
    const studyId = Number(req.params.studyId);

    const studyDetail = await prisma.study.findUnique({
      where: { id: studyId },
    });
    if (!studyDetail) return res.status(404).send("Study가 존재하지 않습니다.");

    res.status(200).json(studyDetail);
  } catch (error) {
    next(error);
  }
});

// 스터디 생성
studyRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.title || !data.encryptedPassword) {
      throw new Error("제목 또는 비밀번호가 필요합니다");
    }

    if (data.nickName.length > 10 || data.title.length > 10) {
      throw new Error("10글자 이하로 적어주세요.");
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPw = await bcrypt.hash(data.encryptedPassword, salt);

    const study = await prisma.study.create({
      data: {
        nickName: data.nickName,
        title: data.title,
        description: data.description,
        background: data.background,
        encryptedPassword: hashedPw,
        point: 0,
      },
      omit: {
        encryptedPassword: true,
      },
    });

    res.status(201).json(study);
  } catch (error) {
    next(error);
  }
});

// 스터디 수정
studyRouter.patch("/:studyId/update", async (req, res, next) => {
  const SALT_ROUNDS = 10;
  const { studyId } = req.params;
  const { nickName, title, description, encryptedPassword, background } =
    req.body;

  if (
    typeof nickName !== "string" ||
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof encryptedPassword !== "string" ||
    typeof background !== "string"
  ) {
    return res
      .status(400)
      .json({ message: "요청 데이터 형식이 올바르지 않습니다." });
  }

  try {
    const hashedPassword = await bcrypt.hash(encryptedPassword, SALT_ROUNDS);

    await prisma.study.update({
      where: { id: parseInt(studyId) },
      data: {
        nickName,
        title,
        description,
        encryptedPassword: hashedPassword,
        background,
      },
    });

    res.status(200).json({
      success: true,
      message: "스터디 정보가 성공적으로 업데이트되었습니다.",
    });
  } catch (error) {
    next(error);
  }
});

// 스터디 삭제
studyRouter.delete("/:studyId", async (req, res, next) => {
  try {
    const { studyId } = req.params;
    const { password } = req.body;
    const study = await prisma.study.findUnique({
      where: {
        id: parseInt(studyId),
      },
    });

    if (!study) {
      return res.status(404).json({ message: "스터디를 찾을 수 없습니다." });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      study.encryptedPassword
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    await prisma.study.delete({
      where: {
        id: parseInt(studyId),
      },
    });

    res.status(200).json({
      success: true,
      message: "스터디가 성공적으로 삭제되었습니다",
    });
  } catch (error) {
    next(error);
  }
});

// 이모지 생성
studyRouter.post("/:id/emojis", async (req, res, next) => {
  const { id } = req.params;
  const { emojis } = req.body;

  try {
    const studyExists = await prisma.study.findUnique({
      where: { id: parseInt(id) },
    });
    if (!studyExists) {
      return res
        .status(404)
        .json({ message: "해당 스터디를 찾을 수 없습니다." });
    }

    await prisma.emojis.deleteMany({ where: { studyId: parseInt(id) } });

    const createEmojiPromises = emojis.map(([emojiContent, count]) =>
      prisma.emojis.create({
        data: {
          studyId: parseInt(id),
          emojiContent,
          count,
        },
      })
    );

    await Promise.all(createEmojiPromises);

    res.status(200).json({ message: "이모지 데이터가 저장되었습니다." });
  } catch (error) {
    next(error);
  }
});

// 이모지 불러오기 API
studyRouter.get("/:id/emojis", async (req, res, next) => {
  const { id } = req.params;

  try {
    const studyExists = await prisma.study.findUnique({
      where: { id: parseInt(id) },
    });
    if (!studyExists) {
      return res
        .status(404)
        .json({ message: "해당 스터디를 찾을 수 없습니다." });
    }

    const emojis = await prisma.emojis.findMany({
      where: { studyId: parseInt(id) },
      select: { emojiContent: true, count: true },
    });

    res.status(200).json(emojis);
  } catch (error) {
    next(error);
  }
});

export default studyRouter;
