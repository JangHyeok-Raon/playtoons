import { apiServer } from "./api";
import { getParamsToQuery } from "@/common/common";

/**
 * 해당 작가 Store
 * @param {number} authorId 작가 ID
 * @param {string} keyword 검색키워드
 * @returns
 */
export const getProduct = async (params) => {
  try {
    return await apiServer("get", `/shop/product${getParamsToQuery(params)}`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};

export const insertProduct = async (params) => {
  try {
    return await apiServer("post", "/shop/product", params);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};

export const updateProduct = async (params) => {
  try {
    return await apiServer("patch", "/shop/product", params);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};

/**
 * Get Product detail
 * @version 1.0.0
 * @author 조장혁
 * @param {number} 조회할 product id
 */
export const getProductDetailMine = async (id) => {
  try {
    return await apiServer("get", `/shop/product/${id}/mine`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};

/**
 * Product Type
 */
export const getProductType = async () => {
  try {
    return await apiServer("get", "/shop/product/type");
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};

/**
 * Product Type Category
 * @param {number} typeId type ID
 */
export const getProductCategory = async (typeId) => {
  try {
    return await apiServer("get", `/shop/product/category/${typeId}`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};

/**
 * 내 문의 목록
 */
export const getInquiryMine = async (params) => {
  try {
    return await apiServer(
      "get",
      `/shop/inquiry/mine${getParamsToQuery(params)}`
    );
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};

/**
 * 내 리뷰 목록
 */
export const getReviewMine = async (params) => {
  try {
    return await apiServer(
      "get",
      `/shop/review/mine${getParamsToQuery(params)}`
    );
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};

/**
 * Get Product detail
 * @version 1.0.0
 * @author 조장혁
 * @param {number} 조회할 product id
 */
export const getProductDetail = async (id) => {
  try {
    return await apiServer("get", `/shop/product/${id}`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};
