import { apiServer } from "./api";

/**
 * Home
 * @version 1.0.0
 * @author 조장혁
 */
export const getHome = async (type) => {
  try {
    return await apiServer("get", `/home/${type}`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};

/**
 * Home Top Banner
 * @version 1.0.0
 * @author 조장혁
 */
export const getHomeTop = async (type) => {
  try {
    return await apiServer("get", `/home/top/${type}`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};
