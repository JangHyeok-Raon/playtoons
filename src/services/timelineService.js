import { apiServer } from "./api";

/**
 * @version 1.0.0
 * @author 조장혁
 */
export const getTimeline = async () => {
  try {
    return await apiServer("get", "/timeline");
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};
