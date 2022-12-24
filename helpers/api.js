import { API_TARGET } from "constants/enum";
import fetchApi from "./config";

const endpoints = {
    getListProduct: () => `products`,
    getDetailProduct: (idProduct) => `product/${idProduct}`,
    getAllCategories: () => `categories`,
    getBanner: () => `banner-content`,
    authenticate: () => 'authenticate',
    register: () => 'register',
    transaction: () => 'transaction',
    getTransaction: () => 'transactions',
    getAccountDashboard: () => 'transaction-details',
    getSummary: () => 'summary',
    cart: () => 'carts',
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
export const createTransaction = (payload) =>
    fetchApi(endpoints.transaction(), payload, "post", { serviceDomainType: API_TARGET.PREMIX }, true);
export const getCartUser = () =>
    fetchApi(endpoints.cart(), {}, "get", { serviceDomainType: API_TARGET.PREMIX }, true);
export const updateUserCart = (payload) =>
    fetchApi(endpoints.cart(), payload, "put", { serviceDomainType: API_TARGET.PREMIX }, true);
export const getTransactionList = (payload) =>
    fetchApi(endpoints.getTransaction(), payload, "get", { serviceDomainType: API_TARGET.PREMIX }, true);
export const getAccountDashboard = (payload) =>
    fetchApi(endpoints.getAccountDashboard(), payload, "get", { serviceDomainType: API_TARGET.PREMIX }, true);
export const getSummary = (payload) =>
    fetchApi(endpoints.getSummary(), payload, "get", { serviceDomainType: API_TARGET.PREMIX }, true);