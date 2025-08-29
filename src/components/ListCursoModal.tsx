import { useState } from 'react';
import Link from 'next/link';
import { Curso } from '../types/curso';

interface CursosSectionProps {
  cursos: Curso[];
}

export default function CursosSection({ cursos }: CursosSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const cursosFiltrados = cursos.filter(curso =>
    curso.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-3xl font-bold text-blue-900 text-center mb-6">Todos os Cursos</h1>
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 flex border-2 border-yellow-600">
          <input
            type="text"
            placeholder="Digite o curso que você procura"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input bg-white flex-grow border-none outline-none px-2"
          />
          <div className="inline-block bg-blue-800 text-white px-6 py-3 rounded-md shadow-md font-bold ml-2 cursor-pointer">
            Buscar
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursosFiltrados.length > 0 ? (
          cursosFiltrados.map(curso => (
            <div key={curso.id} className="bg-white rounded-lg shadow-md p-6 border-2 border-yellow-600 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-4 min-h-[3em]">{curso.nome}</h3>
                <div className="mb-4">
                  <p className="text-lg text-gray-500">Modalidade: <span className="font-bold">Presencial</span></p>
                  <p className="text-lg font-bold text-blue-900">Duração: <span className="font-bold">1 Ano</span></p>
                </div>
              </div>
              <Link href={`/cursos/${curso.id}`}>
                <div className="inline-block bg-blue-800 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-900 transition font-bold w-full text-center cursor-pointer">
                  Ver detalhes
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">Nenhum curso encontrado.</p>
        )}
      </div>
    </div>
  );
}