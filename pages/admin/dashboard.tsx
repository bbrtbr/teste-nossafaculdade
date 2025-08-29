import { useState } from 'react';
import { useRouter } from 'next/router';
import { Curso } from '../../src/types/curso';
import { GetServerSideProps } from 'next';
import { parseCookies, destroyCookie } from 'nookies';
import { Categoria } from '../../src/types/categorias';
import EditCursoModal from '../../src/components/EditCursoModal';
import CreateCursoModal from '../../src/components/CreateCursoModal';

interface DashboardProps {
  initialCursos: Curso[];
  categorias: Categoria[];
}

export default function Dashboard({ initialCursos, categorias }: DashboardProps) {
  const [cursos, setCursos] = useState<Curso[]>(Array.isArray(initialCursos) ? initialCursos : []);
  const [loading, setLoading] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [cursoToEdit, setCursoToEdit] = useState<Curso | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    destroyCookie(null, 'auth-token');
    router.push('/admin');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      setLoading(id);
      try {
        const cookies = parseCookies();
        const token = cookies['auth-token'];

        const res = await fetch(`/api/admin/cursos`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }), 
        });

        if (res.ok) {
          setCursos(cursos.filter(curso => curso.id !== id));
          alert('Curso excluído com sucesso!');
        } else if (res.status === 401) {
          destroyCookie(null, 'auth-token');
          router.push('/admin/login');
        } else {
          const errorData = await res.json();
          alert(errorData.message || 'Erro ao excluir o curso.');
        }
      } catch (error) {
        console.error('Erro ao excluir curso:', error);
        alert('Erro de conexão ao tentar excluir o curso.');
      } finally {
        setLoading(null);
      }
    }
  };

  const handleEdit = (curso: Curso) => {
    setCursoToEdit(curso);
    setIsEditModalOpen(true);
  };

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleUpdate = (updatedCurso: Curso) => {
    setCursos(cursos.map(curso => (curso.id === updatedCurso.id ? updatedCurso : curso)));
    setIsEditModalOpen(false);
    setCursoToEdit(null);
  };

  const handleAdd = (newCurso: Curso) => {
    setCursos([newCurso, ...cursos]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">Painel de Cursos</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleCreate}
              className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold shadow-md hover:bg-green-700 transition-colors"
            >
              Adicionar Novo Curso
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-6 rounded-lg font-semibold shadow-md hover:bg-red-600 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>

        {cursos.length === 0 ? (
          <div className="text-center py-20 bg-gray-100 rounded-xl shadow-inner">
            <p className="text-gray-500 text-xl font-medium mb-4">Nenhum curso encontrado.</p>
            <button
              onClick={handleCreate}
              className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Criar Primeiro Curso
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-gray-600 text-lg">
                Total de cursos: <span className="font-bold">{cursos.length}</span>
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cursos.map(curso => (
                <li key={curso.id} className="p-6 bg-white shadow-xl rounded-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
                  <div className="h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {curso.imagens && curso.imagens.length > 0 ? (
                      <img
                        src={curso.imagens[0]}
                        alt={curso.nome}
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">Sem imagem</span>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">{curso.nome}</h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{curso.descricao}</p>

                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-green-600 font-bold text-lg">
                      R$ {Number(curso.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    {curso.categoria && (
                      <span className="text-blue-600 text-xs bg-blue-100 px-2 py-1 rounded-full font-semibold">
                        {curso.categoria.nome}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => handleEdit(curso)}
                      disabled={loading === curso.id}
                      className="bg-blue-600 text-white py-2 px-5 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(curso.id)}
                      disabled={loading === curso.id}
                      className="bg-red-600 text-white py-2 px-5 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      {loading === curso.id ? 'Excluindo...' : 'Excluir'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {isEditModalOpen && cursoToEdit && (
          <EditCursoModal
            curso={cursoToEdit}
            categorias={categorias}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={handleUpdate}
          />
        )}

        {isCreateModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-10 bg-gray-600 bg-opacity-30 overflow-y-auto">
            <CreateCursoModal
              categorias={categorias}
              onClose={() => setIsCreateModalOpen(false)}
              onAdd={handleAdd}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const authToken = cookies['auth-token'];

  if (!authToken) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  try {
    const protocol = context.req.headers['x-forwarded-proto'] || 'http';
    const host = context.req.headers.host;

    const [cursosRes, categoriasRes] = await Promise.all([
      fetch(`${protocol}://${host}/api/admin/cursos`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Cookie': `auth-token=${authToken}`,
        },
      }),
      fetch(`${protocol}://${host}/api/admin/categorias`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Cookie': `auth-token=${authToken}`,
        },
      }),
    ]);

    if (cursosRes.status === 401 || categoriasRes.status === 401) {
      destroyCookie(context, 'auth-token');
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }

    if (!cursosRes.ok || !categoriasRes.ok) {
      throw new Error('Erro ao buscar dados.');
    }

    const initialCursos = await cursosRes.json();
    const categorias = await categoriasRes.json();

    return {
      props: {
        initialCursos: Array.isArray(initialCursos) ? initialCursos : [],
        categorias: Array.isArray(categorias) ? categorias : [],
      },
    };
  } catch (error) {
    console.error('Erro no getServerSideProps:', error);
    return {
      props: {
        initialCursos: [],
        categorias: [],
      },
    };
  }
};