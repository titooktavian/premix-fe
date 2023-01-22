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
    complaintData: () => 'complaints',
    complaintDetail: (idComplaint) => `complaintDetails/${idComplaint}`,
    updateComplaint: (idComplaint) => `complaint/${idComplaint}`,
    updateUser: (idUser) => `user/${idUser}`,
    product: () => 'product',
    confirmPayment: () => 'paymentconfirm',
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
export const getComplaint = (payload) =>
    fetchApi(endpoints.complaintData(), payload, "get", { serviceDomainType: API_TARGET.PREMIX }, true);
export const createComplaint = (payload) =>
    fetchApi(endpoints.complaintData(), payload, "post", { serviceDomainType: API_TARGET.PREMIX }, true);
export const getDetailComplaint = (idComplaint, payload) =>
    fetchApi(endpoints.complaintDetail(idComplaint), payload, "get", { serviceDomainType: API_TARGET.PREMIX }, true);
export const updateComplaint = (idComplaint, payload) =>
    fetchApi(endpoints.updateComplaint(idComplaint), payload, "put", { serviceDomainType: API_TARGET.PREMIX }, true);
export const updateUser = (idUser, payload) =>
    fetchApi(endpoints.updateUser(idUser), payload, "put", { serviceDomainType: API_TARGET.PREMIX }, true);
export const createProduct = (payload) =>
    fetchApi(endpoints.product(), payload, "post", { serviceDomainType: API_TARGET.PREMIX }, true);
export const updateProduct = (payload) =>
    fetchApi(endpoints.product(), payload, "put", { serviceDomainType: API_TARGET.PREMIX }, true);
export const confirmPayment = (payload) =>
    fetchApi(endpoints.confirmPayment(), payload, "post", { serviceDomainType: API_TARGET.PREMIX }, true);
export const getConfirmPayment = (payload) =>
    fetchApi(endpoints.confirmPayment(), payload, "get", { serviceDomainType: API_TARGET.PREMIX }, true);