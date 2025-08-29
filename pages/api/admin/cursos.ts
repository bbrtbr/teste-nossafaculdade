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

  switch (req.method) {
    case 'POST':
      try {
        const { nome, descricao, preco, imagens, conteudo, popular, categoriaId } = req.body;
        const newCurso = await prisma.curso.create({
          data: {
            nome,
            descricao,
            preco,
            imagens,
            conteudo,
            popular,
            categoriaId,
          },
        });
        return res.status(201).json(newCurso);
      } catch (error) {
        return res.status(500).json({ message: 'Error creating course' });
      }

    case 'PUT':
      try {
        const { id, ...updateData } = req.body;
        const updatedCurso = await prisma.curso.update({
          where: { id },
          data: updateData,
          
        });
        return res.status(200).json(updatedCurso);
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error updating course' });
      }

    case 'DELETE':
      try {
        const { id } = req.body;
        if (!id) {
          return res.status(400).json({ message: 'Missing course ID' });
        }
        await prisma.curso.delete({ where: { id } });
        return res.status(204).end();
      } catch (error) {
        return res.status(500).json({ message: 'Error deleting course' });
      }

    case 'GET':
      try {
        const cursos = await prisma.curso.findMany({
          include: {
            categoria: true,
          },
        });
        return res.status(200).json(cursos);
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching courses' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
