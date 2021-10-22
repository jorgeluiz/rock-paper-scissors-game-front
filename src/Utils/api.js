import axios from "axios";
import { getToken } from "Utils/authentication";
const baseUrl = "https://localhost:5001/api";

export const init = (baseRouteUrl) => {
  let apiUrl = baseUrl;

  if (!(typeof (baseRouteUrl) === null)) {
    apiUrl = baseUrl + '/' + baseRouteUrl;
  }

  const api = axios.create({
    baseURL: apiUrl
  });

  api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export const get = async (route, action = "", queryParams = {}) => {
  const api = init(route);
  let output = { error: false, message: '' };

  try {
    const response = await api.get(action, {params: queryParams});
    output = response.data;
  } catch (e) {
    output.error = true;
    output.message = e.message;
  }

  return output;

};

export const post = async (route, action = "", data = [], headers = { 'content-type': 'application/json' }) => {
  const api = init(route);
  let output = { error: false, message: '' };
  try {
    const response = await api.post(action, data, {
      headers: headers
    });

    output = response.data;
  } catch (e) {
    output.error = true;
    output.message = e.message;
  }


  return output;
};

export const put = async (route, action = "", id, data = [], headers = { 'content-type': 'application/json' }) => {
  const api = init(route);
  let output = { error: false, message: '' };

  try {
    const response = await api.put(action + "/" + id, data, {
      headers: headers
    });
    output = response.data;
  } catch (e) {
    output.error = true;
    output.message = e.message;
  }

  return output;
};

export const destroy = async (route, action = "", id) => {
  const api = init(route);
  let output = { error: false, message: '' };

  try {
    const response = await api.delete(action + "/" + id);
    output = response.data;
  } catch (e) {
    output.error = true;
    output.message = e.message;
  }

  return output;
};


const api = {
  init,
  get,
  post,
  put,
  destroy
}

export default api;