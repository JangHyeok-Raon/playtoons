import { apiServer } from "./api";

/**
 * Landing page 상단 중요공지
 */
export const getEmergencyNotice = (params) => {
  try {
    return apiServer("get", "/notice/emergency");
  } catch (e) {
    return { status: e.response.status };
  }
};
