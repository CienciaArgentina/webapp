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

const resource = '/users';
export const login = async (
  userRequest: UserRequest
): Promise<LoginResponse> => {
  const path = `${resource}/login`;
  const { data } = await cienciaArgentinaRequest.post<LoginResponse>(
    path,
    userRequest
  );
  return data;
};

interface RegisterRequest {
  username: string,
  email: string,
  password: string
}

export const register = async ( registerData: RegisterRequest ): Promise<RegisterResponse> => {
  const path = `${resource}`;

  const { data } = await cienciaArgentinaRequest.post<RegisterResponse>( path, registerData );
  return data;
};

export const confirmAccount = async (
  email: string,
  token: string
): Promise<void> => {
  const path = `${resource}/confirm_email`;
  const config = {
    params: { email, token },
  };

  await cienciaArgentinaRequest.get<void>(path, config);
};

// #TODO: que me venga el userid la respuesta de email sin confirmar
export const sendConfirmationEmail = async (user_id: string): Promise<void> => {
  const path = `${resource}/send_confirmation_email/${user_id}`;
  await cienciaArgentinaRequest.get<void>(path);
};

export const sendForgotUsername = async (email: string): Promise<void> => {
  const path = `${resource}/forgot_username`;
  const config = {
    params: { email },
  };

  await cienciaArgentinaRequest.get<void>(path, config);
};

export const sendForgotPassword = async (email: string): Promise<void> => {
  const path = `${resource}/send_password_reset`;
  const config = {
    params: { email },
  };

  await cienciaArgentinaRequest.get<void>(path, config);
};

//Faltan los que tienen //TODO: Ver con mati (https://github.com/CienciaArgentina/webapp/blob/develop/src/api/user.api.js)
