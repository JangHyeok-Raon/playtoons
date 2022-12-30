import { apiServer } from "./api";

import { getParamsToQuery } from "@/common/common";
/**
 * landingPage API
 * @version 1.0.0
 * @author 조장혁
 * @return list
 */
export const getCurationList = async (num, params = {}) => {
  try {
    return await apiServer(
      "get",
      `/curation/${num}/list${getParamsToQuery(params)}`
    );
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};
