import express from "express";
import prisma from "../../db/prisma/client.prisma.js";
import { Prisma } from "@prisma/client";

const studyGetRouter = express.Router();

studyGetRouter.get("/", async (req, res, next) => {
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
    // 혹시라도 잘못 들어오는 경우 기본값 createAt으로 변경
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

    // 이모지가 없는경우 빈 배열이 아닌 null을 반환해서 기본적인 포멧팅 진행
    const formatted = study.map((item) => ({
      ...item,
      emojis: item.emojis ?? [],
    }));

    res.status(200).json({ study: formatted });
  } catch (e) {
    next(e);
  }
});

studyGetRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    console.log(id);

    const studyDetail = await prisma.study.findUnique({ where: { id } });
    if (!studyDetail) return res.status(404).send("Study가 존재하지 않습니다.");

    res.status(200).json(studyDetail);
  } catch (e) {
    next(e);
  }
});

export default studyGetRouter;
