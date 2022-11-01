import moment from 'moment';

import { formatDate } from 'helpers/utils';

export const getFirstDateOfMonth = moment().startOf('month').format('DD/MM/YYYY');
export const getLastDateOfMonth = moment().endOf('month').format('DD/MM/YYYY');

export const convertToDate = date => moment(date, 'DD/MM/YYYY').toDate();
export const convertDateToText = date => moment(date).format('DD/MM/YYYY');

export const createSavedDate = (startDate, endDate, defaultDate, isRange = false, isSame = false) => {
    if (!isRange) return formatDate(defaultDate, 'dd mmm yyyy');
    if (isSame) return formatDate(startDate, 'dd mmm yyyy');
    return `${formatDate(startDate, 'dd mmm yyyy')} - ${formatDate(endDate, 'dd mmm yyyy')}`;
};
