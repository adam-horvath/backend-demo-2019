import axios from 'axios';
import { API_BASE_URL, API_TOKEN } from '../constants/Contants';
import { Methods } from './http';

export const requestCreator = axios.create({});

export default async ({ resource = '/', method = Methods.GET, data, headers = {} } = {}) => {
  const url = `${API_BASE_URL}${resource}`;

  const token = localStorage.getItem(API_TOKEN);

  if (token) {
    headers['Authorization'] = 'JWT ' + localStorage.getItem(API_TOKEN);
  }

  try {
    const { data: response } = await requestCreator.request({
      method,
      url,
      data,
      headers,
    });

    return response;
  } catch (err) {
    throw err;
  }
};

