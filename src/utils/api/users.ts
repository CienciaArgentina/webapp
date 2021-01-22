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
  const path = '/login';
  const httpRequest = httpClient(cienciaArgentinaHost);
  const { data } = await httpRequest.post<LoginResponse>(path, userRequest);
  return data;
};

export const register = async (
  userRequest: UserRequest
): Promise<RegisterResponse> => {
  const path = '/users';
  const httpRequest = httpClient(cienciaArgentinaHost);
  const { data } = await httpRequest.post<RegisterResponse>(path, userRequest);
  return data;
};

export const sendConfirmationEmail = async (
  userId: number
): Promise<RegisterResponse> => {
  const path = `/send_confirmation_email/${userId}`;
  const httpRequest = httpClient(cienciaArgentinaHost);
  const { data } = await httpRequest.get<RegisterResponse>(path);
  return data;
};
