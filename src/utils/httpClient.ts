import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import http from 'http';
import https from 'https';

export const cienciaArgentinaHost = process.env
  .CIENCIA_ARGENTINA_HOTS as string;

const handleResponse = <T>(response: AxiosResponse): T => {
  return response?.data;
};

const handleError = (error: AxiosError): Promise<void> => {
  return Promise.reject(error);
};

const initializeResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(handleResponse, handleError);
};

export const httpClient = (url: string, interceptor = true): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
    timeout: 1000,
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
    maxRedirects: 10,
    maxContentLength: 50 * 1000 * 1000, //50MBs
  });
  if (interceptor) initializeResponseInterceptor(instance);
  return instance;
};
