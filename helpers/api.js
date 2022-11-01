import { API_TARGET } from "constants/enum";
import fetchApi from "./config";

const endpoints = {
    login: "2_0_0/auth/verify-user?version=2",
    register: "2_0_0/auth/register?version=2",
    outletInfo: (outletCode) => `merchant/${outletCode}`,
    outletHome: (outletCode) => `website/${outletCode}/home`,
    outletContact: (outletCode) => `website/${outletCode}/contact`,
    outletAbout: (outletCode) => `website/${outletCode}/about`,
    outletProducts: (outletCode) => `product/${outletCode}`,
    outletProductDetail: (outletCode) => `product_detail/${outletCode}`,
    outletProductCategories: (outletCode) => `product/category/${outletCode}`,
    userCart: (outletCode) => `order/${outletCode}/cart`,
    outletPromo: (outletCode) => `merchantpromo/${outletCode}`,
    outletDomain: "outlet/domain/",
    verifyUser: "auth/verify-user?version=2",
    sendVerification: "auth/send_verification?version=2",
    authVerification: "2_0_0/auth/verification",
    forgotPassword: (customerNo) => `account/${customerNo}/forget-password`,
    listOutlet: (outletCode) => `merchant/${outletCode}/list-outlet`,
    userDetail: (customerNo) => `account/${customerNo}`,
    checkNumber: (phoneNumber) => `auth/check-number/${phoneNumber}`,
    changeNumber: "auth/change-number",
    changePassword: (customerNo) => `account/${customerNo}/change-password`,
    provinceList: "regional/province",
    cityList: "regional/city",
    districtList: "regional/district",
    postalCodeList: "regional/postal_code",
    accountAddress: (customerNo) => `account/${customerNo}/address`,
    detailAddress: (customerNo, addressId) => `account/${customerNo}/address/${addressId}`,
    transactionList: (outletCode) => `transaction/list/${outletCode}`,
    transactionDetail: (outletCode, transactionNo) => `transaction/detail/${outletCode}/${transactionNo}`,
    checkOrder: (transactionNo) => `check_order/${transactionNo}`,
    cancelTransaction: (outletCode) => `transaction/cancel-order/${outletCode}`,
    completeTransaction: (outletCode) => `transaction/complete-order/${outletCode}`,
    promoProduct: (outletCode) => `product/${outletCode}/promo`,
    trackingShipment: (outletCode, no) => `transaction/${outletCode}/shipment/${no}/tracking`,
    calculation: (outletCode) => `transaction/${outletCode}/calculation?version=2`,
    promoValidate: (outletCode) => `merchantpromo/${outletCode}/availability-validate`,
    downloadEreceipt: (transactionNo) => `transaction/receipt/${transactionNo}/download`,
    webtree: (outletCode) => `webtree/${outletCode}`,
};

export const login = (payload) => fetchApi(endpoints.login, payload, "post", {serviceDomainType: API_TARGET.E_MENU });
export const register = (payload) => fetchApi(endpoints.register, payload, "post", {serviceDomainType: API_TARGET.E_MENU });
export const getOutletByDomain = (domain) =>
    fetchApi(endpoints.outletDomain + domain, {}, 'get', {serviceDomainType: API_TARGET.E_MENU });
export const getOutletInfo = (outletCode) =>
    fetchApi(endpoints.outletInfo(outletCode), {}, 'get', {serviceDomainType: API_TARGET.E_MENU });
export const getOutletHome = (outletCode) =>
    fetchApi(endpoints.outletHome(outletCode), {}, 'get', {serviceDomainType: API_TARGET.E_MENU });
export const getOutletContact = (outletCode) =>
    fetchApi(endpoints.outletContact(outletCode), {}, 'get', {serviceDomainType: API_TARGET.E_MENU });
export const getOutletAbout = (outletCode) =>
    fetchApi(endpoints.outletAbout(outletCode), {}, 'get', {serviceDomainType: API_TARGET.E_MENU });
export const getOutletProducts = (outletCode, params) =>
    fetchApi(endpoints.outletProducts(outletCode), params, 'get', {serviceDomainType: API_TARGET.E_MENU });
export const getOutletProductDetail = (outletCode, params) =>
    fetchApi(endpoints.outletProductDetail(outletCode), params, 'get', {serviceDomainType: API_TARGET.E_MENU });
export const getOutletProductCategories = (outletCode, params) =>
    fetchApi(endpoints.outletProductCategories(outletCode), params, 'get', {serviceDomainType: API_TARGET.E_MENU });
export const getUserCart = (outletCode, customerNo) =>
    fetchApi(`${endpoints.userCart(outletCode)}/${customerNo}?version=2`, {}, 'get', {serviceDomainType: API_TARGET.E_MENU });
export const updateUserCart = (outletCode, customerNo, params) =>
    fetchApi(`${endpoints.userCart(outletCode)}/${customerNo}?version=2`, params, "post", {serviceDomainType: API_TARGET.E_MENU });
export const getOutletPromos = (outletCode) =>
    fetchApi(endpoints.outletPromo(outletCode), {}, 'get', {serviceDomainType: API_TARGET.E_MENU });
export const getPromoDetail = (outletCode, params) =>
    fetchApi(endpoints.outletPromo(outletCode), params, 'get', {serviceDomainType: API_TARGET.E_MENU });
export const verifyUser = (payload) =>
    fetchApi(endpoints.verifyUser, payload, "post", {serviceDomainType: API_TARGET.E_MENU });
export const sendVerification = (payload) =>
    fetchApi(endpoints.sendVerification, payload, "post", {serviceDomainType: API_TARGET.E_MENU });
export const authVerification = (payload) =>
    fetchApi(endpoints.authVerification, payload, 'get', {serviceDomainType: API_TARGET.E_MENU });
export const forgotPassword = (customerNo, payload) =>
    fetchApi(endpoints.forgotPassword(customerNo), payload, "put", { serviceDomainType: API_TARGET.E_MENU });
export const userDetail = (customerNo) =>
    fetchApi(endpoints.userDetail(customerNo), {}, 'get', {serviceDomainType: API_TARGET.E_MENU });
export const updateUserDetail = (customerNo, payload) =>
    fetchApi(endpoints.userDetail(customerNo), payload, "put", {serviceDomainType: API_TARGET.E_MENU });
export const checkNumber = (phoneNumber, payload) =>
    fetchApi(endpoints.checkNumber(phoneNumber), payload, 'get', {serviceDomainType: API_TARGET.E_MENU });
export const getListOutlet = (outletCode) => 
    fetchApi(endpoints.listOutlet(outletCode), {}, 'get', { serviceDomainType: API_TARGET.E_MENU });
export const changeNumber = (payload) =>
    fetchApi(endpoints.changeNumber, payload, "put", { serviceDomainType: API_TARGET.E_MENU });
export const changePassword = (customerNo, payload) =>
    fetchApi(endpoints.changePassword(customerNo), payload, "put", { serviceDomainType: API_TARGET.E_MENU });
export const getProvinceList = () =>
    fetchApi(endpoints.provinceList, {}, "get", { serviceDomainType: API_TARGET.E_MENU });
export const getCityList = (payload) =>
    fetchApi(endpoints.cityList, payload, "get", { serviceDomainType: API_TARGET.E_MENU });
export const getDistrictList = (payload) =>
    fetchApi(endpoints.districtList, payload, "get", { serviceDomainType: API_TARGET.E_MENU });
export const getPostalCodeList = (payload) =>
    fetchApi(endpoints.postalCodeList, payload, "get", { serviceDomainType: API_TARGET.E_MENU });
export const getAddressList = (payload) =>
    fetchApi(endpoints.accountAddress(payload.customer_no), payload, "get", { serviceDomainType: API_TARGET.E_MENU });
export const createAddress = (customerNo, payload) =>
    fetchApi(endpoints.accountAddress(customerNo), payload, "post", { serviceDomainType: API_TARGET.E_MENU });
export const getDetailAddress = (customerNo, addressId) =>
    fetchApi(endpoints.detailAddress(customerNo, addressId), {}, "get", { serviceDomainType: API_TARGET.E_MENU });
export const deleteAddress = (customerNo, addressId) =>
    fetchApi(endpoints.detailAddress(customerNo, addressId), {}, "delete", { serviceDomainType: API_TARGET.E_MENU });
export const updateAddress = (customerNo, addressId, payload) =>
    fetchApi(endpoints.detailAddress(customerNo, addressId), payload, "put", { serviceDomainType: API_TARGET.E_MENU });
export const getTransactionList = (outletCode, payload) =>
    fetchApi(endpoints.transactionList(outletCode), payload, "get", { serviceDomainType: API_TARGET.E_MENU });
export const getTransactionDetail = (outletCode, transactionNo) =>
    fetchApi(endpoints.transactionDetail(outletCode, transactionNo), {} , "get", { serviceDomainType: API_TARGET.E_MENU });
export const checkOrder = (transactionNo) =>
    fetchApi(endpoints.checkOrder(transactionNo), {}, "get", { serviceDomainType: API_TARGET.E_MENU });
export const cancelTransaction = (outletCode, payload) =>
    fetchApi(endpoints.cancelTransaction(outletCode), payload, "post", { serviceDomainType: API_TARGET.E_MENU });
export const completeTransaction = (outletCode, payload) =>
    fetchApi(endpoints.completeTransaction(outletCode), payload, "post", { serviceDomainType: API_TARGET.E_MENU });
export const getPromoProduct = (outletCode, payload) =>
    fetchApi(endpoints.promoProduct(outletCode), payload, "get", { serviceDomainType: API_TARGET.E_MENU });
export const trackingShipment = (outletCode, no) =>
    fetchApi(endpoints.trackingShipment(outletCode, no), {}, "get", { serviceDomainType: API_TARGET.E_MENU });
export const getCalculation = (outletCode, payload) =>
    fetchApi(endpoints.calculation(outletCode), payload, "post", { serviceDomainType: API_TARGET.E_MENU });
export const getPromoValidate = (outletCode, payload) =>
    fetchApi(endpoints.promoValidate(outletCode), payload, "post", { serviceDomainType: API_TARGET.E_MENU });
export const downloadEreceipt = (transactionNo) =>
    fetchApi(endpoints.downloadEreceipt(transactionNo), {}, "get", { serviceDomainType: API_TARGET.E_MENU });
export const getWebtree = (outletCode) =>
    fetchApi(endpoints.webtree(outletCode), {}, "get", { serviceDomainType: API_TARGET.E_MENU });
