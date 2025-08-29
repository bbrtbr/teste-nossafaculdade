import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const cursos = await prisma.curso.findMany({
      select: {
        id: true,
        nome: true,
        descricao: true,
        preco: true,
        popular: true,
        imagens: true,
        categoria: {
          select: {
            nome: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return res.status(200).json(cursos);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching courses' });
  }
}