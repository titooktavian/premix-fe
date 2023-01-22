import moment from "moment";
import "moment/locale/id";

export const PROMO_VIEW = { 
    PROMO: 'promo',
    KUPON: 'kupon',
};

export const promoTime = (start, end) => {
    return `${moment(new Date(start)).format('ll')} - ${moment(new Date(end)).format('ll')}`
};