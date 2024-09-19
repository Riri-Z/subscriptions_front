export interface LoginResponse {
  body: { access_token: string };
  statusCode: number;
}

export interface Register {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}
