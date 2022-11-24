import { API_TARGET } from "constants/enum";
import fetchApi from "./config";

const endpoints = {
    getListProduct: () => `products`,
    getDetailProduct: (idProduct) => `product/${idProduct}`,
    getAllCategories: () => `categories`,
    getBanner: () => `banner-content`,
    authenticate: () => 'authenticate',
    register: () => 'register',
};

export const getListProduct = (payload) =>
    fetchApi(endpoints.getListProduct(), payload, "get", { serviceDomainType: API_TARGET.PREMIX });
export const getDetailProduct = (idProduct) =>
    fetchApi(endpoints.getDetailProduct(idProduct), {}, "get", { serviceDomainType: API_TARGET.PREMIX });
export const getAllCategories = () =>
    fetchApi(endpoints.getAllCategories(), {}, "get", { serviceDomainType: API_TARGET.PREMIX });
export const getBanner = () =>
    fetchApi(endpoints.getBanner(), {}, "get", { serviceDomainType: API_TARGET.PREMIX });
export const authenticate = (payload) =>
    fetchApi(endpoints.authenticate(), payload, "post", { serviceDomainType: API_TARGET.PREMIX });
export const register = (payload) =>
    fetchApi(endpoints.register(), payload, "post", { serviceDomainType: API_TARGET.PREMIX });
