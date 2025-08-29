import { GetStaticProps } from 'next';
import { Curso } from '../src/types/curso';
import CursosListagem from '../src/components/ListCursoModal';
import React from 'react';

interface CursosPageProps {
  cursos: Curso[];
}

export default function CursosPage({ cursos = [] }: CursosPageProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <div className="container mx-auto px-4 py-16">
      <CursosListagem cursos={cursos} />

    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cursos`);
    const cursos = await res.json();
    return {
      props: { cursos },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Erro ao buscar todos os cursos:', error);
    return {
      props: { cursos: [] },
      revalidate: 60,
    };
  }
};