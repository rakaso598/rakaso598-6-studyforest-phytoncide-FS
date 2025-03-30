import express from 'express';
import prisma from '../../db/prisma/client.prisma.js';

const studyGetRouter = express.Router();

studyGetRouter.get('/', async (req, res, next) => {
  try {
    const {
      offset = 0,
      limit = 6,
      sort = 'desc',
      search = '',
      orderBy = 'createAt',
    } = req.query;

    const study = await prisma.study.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            nickName: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        nickName: true,
        title: true,
        description: true,
        background: true,
        point: true,
        createAt: true,
        updatedAt: true,
        emojis: true, // 관계형 배열 필드는 그대로 true 가능
        habits: {
          include: {
            HabitDone: true,
          },
        },
        // encryptedPassword: false ← Prisma에서는 false로 제외하는 방식 없음
        // 그냥 생략하면 포함되지 않음
      },
      orderBy: {
        [orderBy]: sort === 'desc' ? 'desc' : 'asc',
      },
      skip: Number(offset),
      take: Number(limit),
    });

    res.status(200).json({ study });
  } catch (e) {
    next(e);
  }
});

export default studyGetRouter;
