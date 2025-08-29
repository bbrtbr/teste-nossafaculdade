import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const prisma = new PrismaClient();

function authenticate(req: NextApiRequest): string | null {
  const tokenFromHeader = req.headers.authorization?.split(' ')[1];
  const cookies = parse(req.headers.cookie || '');
  const tokenFromCookie = cookies['auth-token'];

  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = authenticate(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: {
        nome: 'asc',
      },
    });
    return res.status(200).json(categorias);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}