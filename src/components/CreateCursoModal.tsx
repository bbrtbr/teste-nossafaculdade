import { useState } from 'react';
import { Curso } from '../types/curso';
import { Categoria } from '../types/categorias';
import { parseCookies } from 'nookies';

interface CreateCursoModalProps {
  categorias: Categoria[];
  onClose: () => void;
  onAdd: (newCurso: Curso) => void;
}

const initialFormState = {
  nome: '',
  descricao: '',
  preco: 0,
  imagens: [''], 
  conteudo: '',
  popular: false,
  categoriaId: '',
};

export default function CreateCursoModal({ categorias, onClose, onAdd }: CreateCursoModalProps) {
  const [newCurso, setNewCurso] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setNewCurso(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImagens = [...newCurso.imagens];
    newImagens[index] = value;
    setNewCurso(prev => ({ ...prev, imagens: newImagens }));
  };

  const handleAddImageField = () => {
    setNewCurso(prev => ({
      ...prev,
      imagens: [...prev.imagens, ''],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const cookies = parseCookies();
      const token = cookies['auth-token'];

      const cursoData = {
        ...newCurso,
        imagens: newCurso.imagens.filter(url => url.trim() !== ''),
      };

      const res = await fetch(`/api/admin/cursos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(cursoData),
      });

      if (res.ok) {
        const addedCurso = await res.json();
        onAdd(addedCurso);
      } else {
        const data = await res.json();
        setError(data.message || 'Erro ao criar o curso.');
      }
    } catch (err) {
      setError('Erro de conexão ao tentar criar o curso.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 overflow-y-auto p-4">
      <div className="relative p-8 bg-white w-full max-w-lg mx-auto rounded-xl shadow-2xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Criar Novo Curso</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
        
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              name="nome"
              value={newCurso.nome}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              name="descricao"
              value={newCurso.descricao}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
            <input
              type="number"
              name="preco"
              step="0.01"
              value={newCurso.preco}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
            />
          </div>

        
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Imagens (URLs)</label>
            {newCurso.imagens.map((url, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="https://exemplo.com/imagem.jpg"
                  value={url}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddImageField}
              className="w-full py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-300"
            >
              Adicionar outra imagem
            </button>
          </div>

          <div>
            <label htmlFor="categoriaId" className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              name="categoriaId"
              value={newCurso.categoriaId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              id="popular"
              name="popular"
              type="checkbox"
              checked={newCurso.popular}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="popular" className="text-sm font-medium text-gray-700">Popular</label>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition duration-300"
            >
              {loading ? 'Criando...' : 'Criar Curso'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}