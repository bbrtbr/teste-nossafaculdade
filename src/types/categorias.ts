export interface Categoria {
  id: string;
  nome: string;
}

export interface CreateCategoriaData {
  nome: string;
}

export interface UpdateCategoriaData extends Partial<CreateCategoriaData> {}