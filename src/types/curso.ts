  export interface Curso {
    id: string
    nome: string
    descricao: string
    preco: number
    imagens: string[]
    conteudo: string
    popular: boolean
    categoriaId: string
    categoria: {
      id: string
      nome: string
    }
    createdAt: Date
    updatedAt: Date
  }

  export interface CreateCursoData {
    nome: string
    descricao: string
    preco: number
    imagens: string[]
    conteudo: string
    popular: boolean
    categoriaId: string
  }

  export interface UpdateCursoData extends Partial<CreateCursoData> {}