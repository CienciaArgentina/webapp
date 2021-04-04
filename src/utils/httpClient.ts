import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import http from 'http';
import https from 'https';

export const cienciaArgentinaHost = process.env
.CIENCIA_ARGENTINA_HOST as string;

const handleResponse = <T>(response: AxiosResponse):AxiosResponse<T> => {
  return response;
};

interface ApiError {
  code: string,
  detail: string
}

export interface ClientError {
  "id": string,
  "status": number,
  "message": string,
  "errors": ApiError[]
  "netowrk_error":AxiosError<any>
}

const handleError = (error: AxiosError): Promise<ClientError> => {
  if( !!error.response?.data ) {
    return Promise.reject({...error.response?.data, network_error: error})
  } else {
    return Promise.reject({
      id: "",
      status: 400,
      message: "Ocurrió un error desconocido",
      errors: [],
      netowrk_error: error
    })
  }
};

const initializeResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(handleResponse, handleError);
};

export const httpClient = (url: string, interceptor = true): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
    timeout: 1000000,
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
    maxRedirects: 10,
    maxContentLength: 50 * 1000 * 1000, //50MBs
  });

  if (interceptor) initializeResponseInterceptor(instance);
  return instance;
};
export const cienciaArgentinaRequest = httpClient(cienciaArgentinaHost);
