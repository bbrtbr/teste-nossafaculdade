import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

interface JwtPayload {
  userId: string;
  email: string;
}

const prisma = new PrismaClient();

export async function middleware(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET não está definido');
      }

      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { isAdmin: true }
      });

      if (!user?.isAdmin) {
        console.warn('Acesso de não-administrador à rota admin:', decoded.userId);
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      
      return NextResponse.next();

    } catch (error) {
      console.error('Erro na verificação do token:', error);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};