import { apiServer } from "./api";

/**
 * Get tag list
 * @version 1.0.0
 * @author 조장혁
 */
export const getTags = async (params) => {
  try {
    return await apiServer("get", `/tag`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};
