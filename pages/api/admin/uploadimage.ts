import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import jwt from 'jsonwebtoken';
// APENAS A LÓGICA, NÃO FOI IMPLEMENTADO NO SISTEMA, ATUALMENTE SÓ TEM PARA COLOCAR O LINK DIRETAMENTE
export const config = {
  api: {
    bodyParser: false,
  },
};

function authenticate(req: NextApiRequest): { userId: string } | null {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const decodedToken = authenticate(req);
  if (!decodedToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const form = new IncomingForm();
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  const imageUrls: string[] = [];

  try {
    await fs.mkdir(uploadDir, { recursive: true });

    form.on('file', (field, file) => {
      const fileName = `${Date.now()}-${file.originalFilename}`;
      const newPath = path.join(uploadDir, fileName);
      imageUrls.push(`/uploads/${fileName}`);
      
      fs.rename(file.filepath, newPath);
    });

    await new Promise<void>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });

    return res.status(200).json({ imageUrls });
  } catch (error) {
    console.error('Erro no upload da imagem:', error);
    return res.status(500).json({ message: 'Error uploading image' });
  }
}