import { apiServer } from "./api";
import { getParamsToQuery } from "@/common/common";

/**
 * 파일 경로 불러오기
 * @version 1.0.0
 * @author 조장혁
 * @return 파일경로
 */
export const getFileUrlFromServer = async (hash, query) => {
  let queryStr = "";
  if (query) {
    queryStr = getParamsToQuery(query);
  }
  try {
    return await apiServer("get", `/file/${hash}${queryStr}`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};

/**
 * 파일 정보 수정
 * @version 1.0.0
 * @author 조장혁
 * @param {string} hash
 * @param {json} params
 * @return 파일경로
 */
export const updateFileInfo = async (hash, params) => {
  try {
    return await apiServer("patch", `/file/${hash}`, params);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};
