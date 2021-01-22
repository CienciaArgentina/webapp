import { cienciaArgentinaRequest } from 'utils/httpClient';

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
  const { data } = await cienciaArgentinaRequest.post<LoginResponse>(
    path,
    userRequest
  );
  return data;
};

export const register = async (
  userRequest: UserRequest
): Promise<RegisterResponse> => {
  const path = '/users';

  const { data } = await cienciaArgentinaRequest.post<RegisterResponse>(
    path,
    userRequest
  );
  return data;
};

export const confirmAccount = async (
  email: string,
  token: string
): Promise<void> => {
  const path = `/users/confirm_email`;
  const config = {
    params: { email, token },
  };

  await cienciaArgentinaRequest.get<void>(path, config);
};

export const sendConfirmationEmail = async (userId: number): Promise<void> => {
  const path = `/users/send_confirmation_email/${userId}`;
  await cienciaArgentinaRequest.get<void>(path);
};

export const sendForgotUsername = async (email: string): Promise<void> => {
  const path = `/users/forgot_username`;
  const config = {
    params: { email },
  };

  await cienciaArgentinaRequest.get<void>(path, config);
};

export const sendForgotPassword = async (email: string): Promise<void> => {
  const path = `/users/send_password_reset`;
  const config = {
    params: { email },
  };

  await cienciaArgentinaRequest.get<void>(path, config);
};

//Faltan los que tienen //TODO: Ver con mati (https://github.com/CienciaArgentina/webapp/blob/develop/src/api/user.api.js)
