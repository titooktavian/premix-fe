import moment from "moment";
import "moment/locale/id";

export const startDate = moment(new Date()).subtract(31, 'days').format('YYYY-MM-DD');
export const endDate= moment(new Date()).format('YYYY-MM-DD');
export const dateFormatted = (date) => `${moment(new Date(date)).format('DD MMMM YYYY HH:mm')} WIB`;
export const filterDataInit = {
    startDate: "",
    endDate: "",
    status: "",
};
