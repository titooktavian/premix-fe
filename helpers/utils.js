import moment from "moment";

const isIOS = () => {
    if (window) {
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    } else return false;
};

const isInputNumber = (value) => {
    if (value.match(/[^0-9]/g)) return;
    return true;
};

const isInputPhone = (value) => {
    const reg = /^0+/gi;
    if (value.match(reg)) return value.replace(reg, '');
    return value;
};

const isValidEmail = (email) => {
    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmail = regEmail.test(email);
    return isEmail;
};

const getVerifySession = (key) => {
    const verifyData = sessionStorage.getItem(key);
    const verifyDataJSON = verifyData ? JSON.parse(verifyData) : null;
    return verifyDataJSON;
};

const convertSelectData = (data, value, label = "label") => {
    return data.map(item => ({
        value: item[value],
        label: item[label],
    }));
};

const sortingData = (data, by, asc = true) => {
    return data.sort((a, b) => {
        return asc ? a[by] - b[by] : b[by] - a[by]
    });
};

const setZeroDate = (num) => {
    if (parseInt(num, 10) < 10) return `0${parseInt(num, 10)}`;
    return num;
};

const formatDate = (date, format, longMonth = true) => {
    const splitted = date.indexOf('/') > -1 ? date.split('/') : date.split('-');
    const arrMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const arrMon = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];

    const month = longMonth ? arrMonth : arrMon;

    switch (format) {
    case 'yyyy-mm-dd':
        return `${splitted[2]}-${setZeroDate(splitted[1])}-${setZeroDate(splitted[0])}`;
    case 'dd/mm/yyyy':
        return `${setZeroDate(splitted[0])}/${setZeroDate(splitted[1])}/${splitted[2]}`;
    case 'dd MMM yyyy':
        return moment(`${setZeroDate(splitted[0])}/${setZeroDate(splitted[1])}/${setZeroDate(splitted[2])}`, 'DD/MM/YYYY').locale('id').format('DD MMMM YYYY');
    case 'dd mmm yyyy':
        return `${setZeroDate(splitted[0])} ${month[parseInt(splitted[1], 10) - 1]} ${splitted[2]}`;
    case 'MMM yyyy':
        return moment(`${setZeroDate(splitted[0])}/${setZeroDate(splitted[1])}/${setZeroDate(splitted[2])}`, 'DD/MM/YYYY').locale('id').format('MMMM YYYY');
    case 'mmm yyyy':
        return `${month[parseInt(splitted[1], 10) - 1]} ${splitted[2]}`;
    case 'dd mmm':
        return `${setZeroDate(splitted[0])} ${month[parseInt(splitted[1], 10) - 1]}`;
    case 'yyyy':
        return splitted[2];
    default:
        return `${setZeroDate(splitted[1])}-${setZeroDate(splitted[0])}-${splitted[2]}`;
    }
};

const generateRandomId = (length = 20) =>{
    let result = 'local';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const generaterandomCode = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let randomString = '';
    for (var i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return randomString;
}

const setDay = (day) => {
    let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayName.indexOf(day);
}

export {
    isIOS,
    isInputNumber,
    isInputPhone,
    isValidEmail,
    getVerifySession,
    convertSelectData,
    sortingData,
    formatDate,
    generateRandomId,
    generaterandomCode,
    setDay,
};
