import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;

  try {
    const curso = await prisma.curso.findUnique({
      where: {
        id: id as string,
      },
      include: {
        categoria: true,
      },
    });

    if (!curso) {
      return res.status(404).json({ message: 'Course not found' });
    }

    return res.status(200).json(curso);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching course details' });
  }
}