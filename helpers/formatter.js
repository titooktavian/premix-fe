import moment from "moment-timezone";

export const toRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    }).format(number);

export const catchError = (e) => {
    let message = "Unknown error";
    if (typeof e === "string") message = e;
    if (
        Object.prototype.hasOwnProperty.call(e, "message") &&
        typeof e.message === "string"
    )
        ({ message } = e);
    if (
        Object.prototype.hasOwnProperty.call(e, "error") &&
        typeof e.error === "string"
    )
        ({ error: message } = e);
    if (
        Object.prototype.hasOwnProperty.call(e, "msg") &&
        typeof e.msg === "string"
    )
        ({ msg: message } = e);
    return message;
};

export const reformatNumber = (number) => {
    if (!number) return "";
    return number.replace(/^(0)/, "62");
};

export const convertDateToTimezone = (givenDate, withTime = true, timeOnly = false) => {
    moment.locale("id");
    let resultDate = moment(new Date(givenDate.replace(/\s/, "T"))).format("DD MMMM YYYY HH:mm");
    const splitDate = givenDate.split(" ");
    if (splitDate.length === 3) {
        const localZone = moment.tz.guess(true);
        const dateWithTimezone = `${splitDate[0]}T${splitDate[1]}${splitDate[2]}`;

        resultDate = moment.tz(dateWithTimezone, localZone).format("DD MMMM YYYY HH:mm");
        if (!withTime) {
            resultDate = moment.tz(dateWithTimezone, localZone).format("DD MMMM YYYY");
        }

        if(timeOnly) {
            resultDate = moment.tz(dateWithTimezone, localZone).format("HH:mm");
        }
    }
    return resultDate;
};

export const variantToText = (variants) => {
    if (Array.isArray(variants)) {
        return variants.map((item) => item.value).join(", ");
    } else {
        return "";
    }
};
