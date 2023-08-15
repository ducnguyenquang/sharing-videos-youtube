import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/utils/storage';
import { checkSession } from '@/utils/token';
import { message } from 'antd';

const handleSuccess = (response: any) => {
  return response;
};

const handleError = (error) => {
  const errorMessage = error?.response?.data.message;

  if (error && error.response) {
    checkSession(error.response.status);
  }
  
  if (errorMessage) {
    message.error(error.response?.data.message);
  }

  return Promise.reject(errorMessage);
};

const service = axios.create();
service.interceptors.response.use(handleSuccess, handleError);

const getRequestHeaders = async () => {
  const headers: any = {};
  headers['Access-Control-Allow-Origin'] = '*';
  headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
  headers['Access-Control-Max-Age'] = 86400;
  headers['Content-type'] = 'application/json; charset=UTF-8';
  headers['Cache-control'] =
    'no-cache,no-store,must-revalidate,max-age=-1,private';
  headers['x-access-token'] = `${getAccessToken()}`;
  return headers;
};

const handleResponseData = (data: AxiosResponse<any, any>) => {
  if ((data && data.status === 200) || data.status === 201) {
    return Promise.resolve(data);
  }
  return Promise.reject(data);
};

export const GET = async (path: string, options: {} | undefined) => {
  const requestHeaders = await getRequestHeaders();
  return service
    .get(path, {
      headers: requestHeaders,
    })
    .then(
      data => {
        return handleResponseData(data);
      },
      err => {
        return handleError(err);
      },
    );
};
export const POST = async (path: string, payload: any, options?: {responseType: any} | undefined) => {
  const requestHeaders = await getRequestHeaders();
  return service
    .request({
      method: 'POST',
      url: path,
      data: payload,
      responseType: options?.responseType || 'json',
      headers: requestHeaders,
    })
    .then(
      data => {
        return handleResponseData(data);
      },
      err => {
        return handleError(err);
      },
    );
};

export const PUT = async (path: string, payload: any, options: {} | undefined) => {
  const requestHeaders = await getRequestHeaders();
  return service
    .request({
      method: 'PUT',
      url: path,
      responseType: 'json',
      data: payload,
      headers: requestHeaders,
    })
    .then(
      data => {
        return handleResponseData(data);
      },
      err => {
        return handleError(err);
      },
    );
};

export const DELETE = async (path: string, payload: any, options: {} | undefined) => {
  const requestHeaders = await getRequestHeaders();
  return service
    .request({
      method: 'DELETE',
      url: path,
      responseType: 'json',
      data: payload,
      headers: requestHeaders,
    })
    .then(
      data => {
        return handleResponseData(data);
      },
      err => {
        return handleError(err);
      },
    );
};
