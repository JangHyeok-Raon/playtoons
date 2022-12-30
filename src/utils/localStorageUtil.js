import { isJSONStr } from "@COMMON/common";

/**
 * Get Access Token
 * @returns
 */
export const getToken = () => {
  if (!localStorage) {
    return;
  }
  const rootData = localStorage.getItem("persist:root");
  const rootJSON = isJSONStr(rootData) ? JSON.parse(rootData) : rootData;
  const loginData = rootJSON?.login;
  const loginJSON = isJSONStr(loginData) ? JSON.parse(loginData) : loginData;
  return loginJSON?.accessToken;
};

/**
 * 로그아웃 시 스토리지 지우기
 * @returns
 */
export function clearUserData() {
  if (!localStorage) {
    return;
  }
  localStorage.removeItem("persist:root");
}
