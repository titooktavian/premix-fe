import fetchApi from "./config";

const endpoints = {
    cart: "/api/cart",
};

export const getLocalCart = () => fetchApi(endpoints.cart, {}, 'get');
export const updateLocalCart = (payload) => fetchApi(`${endpoints.cart}/update`, payload, 'post');
export const resetLocalCart = () => fetchApi(`${endpoints.cart}/reset`, {}, 'get');