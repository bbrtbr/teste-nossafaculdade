export interface Usuario {
  id: string;
  email: string;
}

export interface LoginData {
  email: string;
  senha: string;
}

export interface AuthResponse {
  token: string;
}