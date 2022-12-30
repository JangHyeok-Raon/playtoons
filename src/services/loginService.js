/**
 * Login 관련 API
 */

import { apiAuthServer } from "./api";

export const loginRequest = (params) => {
  try {
    return apiAuthServer("post", "/auth/login", params);
  } catch (e) {
    return { status: e.response.status };
  }
};

export const getTempTokenRequest = (params) => {
  try {
    return apiAuthServer("get", "/auth/login/temp", params);
  } catch (e) {
    return { status: e.response.status };
  }
};

/**
 * Login Password Check
 * @param {string} password
 * @returns
 */
export const loginPasswordCheck = async (params) => {
  try {
    return await apiAuthServer("post", "/auth/login/check", params);
  } catch (e) {
    return { status: e.response.status };
  }
};

export const getUserInfo = async (accessToken) => {
  try {
    return await apiAuthServer("get", "/account", null, null, accessToken);
  } catch (e) {
    return { status: e.response.status };
  }
};
