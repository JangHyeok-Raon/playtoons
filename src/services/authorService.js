/**
 * Account 관련 API
 */

import { getErrorMessageFromResultCode } from "@/common/common";
import { apiServer } from "./api";

export const getAuthorList = async () => {
  try {
    return await apiServer("get", "/author");
  } catch (e) {
    return { status: e.response.status };
  }
};

export const getAuthor = async (id) => {
  try {
    return await apiServer("get", `/author/${id}`);
  } catch (e) {
    return { status: e.response.status };
  }
};

export const setViewAuthor = async (id) => {
  try {
    return await apiServer("post", `/author/${id}/view`);
  } catch (e) {
    return { status: e.response.status };
  }
};

export const getAuthorPlans = async (params) => {
  try {
    return await apiServer("get", `/subscribeTier/${params.authorId}`);
  } catch (e) {
    return { status: e.response.status };
  }
};

export const getAuthorRecent = async () => {
  try {
    return await apiServer("get", "/author/recent");
  } catch (e) {
    return { status: e.response.status };
  }
};

export const registerAuthor = async () => {
  try {
    return await apiServer("post", "/author");
  } catch (e) {
    return { status: e.response.status };
  }
};

/**
 * 해당 작가 팔로우
 * @param {string} method post / delete
 * @param {number} id 작가 ID
 * @returns
 */
export const setAuthorFollow = async (method, id) => {
  try {
    return await apiServer(method, `/author/${id}/follow`);
  } catch (e) {
    return { status: e.response.status };
  }
};

/**
 * 해당 작가 좋아요
 * @param {number} id 작가 ID
 * @returns
 */
export const insertAuthorLike = async (id) => {
  try {
    return await apiServer("post", `/author/${id}/like`);
  } catch (e) {
    return { status: e.response.status };
  }
};

/**
 * 해당 작가 좋아요 취소
 * @param {number} id 작가 ID
 * @returns
 */
export const deleteAuthorLike = async (id) => {
  try {
    return await apiServer("delete", `/author/${id}/like`);
  } catch (e) {
    return { status: e.response.status };
  }
};

/**
 * 해당 작가 좋아요
 * @param {number} id 작가 ID
 * @returns
 */
export const insertAuthorDisLike = async (id) => {
  try {
    return await apiServer("post", `/author/${id}/dislike`);
  } catch (e) {
    return { status: e.response.status };
  }
};

/**
 * 해당 작가 좋아요 취소
 * @param {number} id 작가 ID
 * @returns
 */
export const deleteAuthorDisLike = async (id) => {
  try {
    return await apiServer("delete", `/author/${id}/dislike`);
  } catch (e) {
    return { status: e.response.status };
  }
};

export const getCurationList = async () => {
  try {
    return await apiServer("get", `/curation/6/list?order=DESC&limit=6`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};

/**
 * 해당 작가 Store
 * @param {number} authorId 작가 ID
 * @returns
 */
export const getProduct = async (authorId) => {
  try {
    return await apiServer("get", `/shop/product?authorId=${authorId}`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};
/**
  작가 등록
* @version 1.0.0
* @author 2hyunkook
*/
export const setAuthorToServer = async (params) => {
  try {
    return await apiServer("post", `/author`, params);
  } catch (e) {
    return {
      status: e.response.status,
      data: getErrorMessageFromResultCode(e.response.data),
    };
  }
};
