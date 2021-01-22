import { httpClient, cienciaArgentinaHost } from 'utils/httpClient';

interface LoginResponse {
  jwt: string;
}

interface RegisterResponse {
  user_id: number;
}

interface UserRequest {
  username: string;
  password?: string;
  email?: string;
}

export const login = async (
  userRequest: UserRequest
): Promise<LoginResponse> => {
  const httpRequest = httpClient(cienciaArgentinaHost);
  const path = 'login';
  const { data } = await httpRequest.post<LoginResponse>(path, userRequest);
  return data;
};

export const register = async (
  userRequest: UserRequest
): Promise<RegisterResponse> => {
  const httpRequest = httpClient(cienciaArgentinaHost);
  const path = 'users';
  const { data } = await httpRequest.post<RegisterResponse>(path, userRequest);
  return data;
};
