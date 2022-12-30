import axios from "axios";
import Config from "@/env/config";
import { getToken } from "@/utils/localStorageUtil";

const SERVER = Config.apiUrl;
const AUTH_SERVER = Config.apiAuthUrl;

/**
 * API 호출 공통 로직
 * @param {string} method
 * @param {string} url
 * @param {json} params
 * @param {json} headers
 */
export const apiServer = (method, url, params, headers, token) => {
  /**
   * 기본 옵션
   */
  const reqOptions = {
    method: method,
    url: `${SERVER}${url}`,
    data: params,
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${getToken() || token}`,
      ...headers,
    },
  };
  return axios(reqOptions);
};

/**
 * Auth API
 * @param {string} method
 * @param {string} url
 * @param {json} params
 * @param {json} headers
 */
export const apiAuthServer = (method, url, params, headers, token) => {
  /**
   * 기본 옵션
   */
  const reqOptions = {
    method: method,
    url: `${AUTH_SERVER}${url}`,
    data: params,
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${getToken() || token}`,
      ...headers,
    },
  };
  return axios(reqOptions);
};
