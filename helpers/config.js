import { API_TARGET, API_TARGET_VALUE } from "constants/enum";

const contentType = (method) => {
    switch(method) {
    case 'delete': 
        return "application/x-www-form-urlencoded";
    case 'get':
        return "application/x-www-form-urlencoded";
    case 'post':
        return "application/json";
    default :
        return "application/json";
    }
}

const fetchApi = async (
    endPoint,
    payload = {},
    method = "get",
    options = {
        serviceDomainType: undefined
    }
) => {
    const headers = {
        "Content-Type": contentType(String(method).toLowerCase()),
    };
    let qs = "";
    let body;

    if (["get", "head"].includes(method.toLowerCase())) {
        if (payload && Object.keys(payload).length > 0)
            qs = `?${getQueryString(payload)}`;
    } else if (["delete"].includes(method.toLowerCase())) {
        Object.keys(payload).forEach((key) => {
            if (body === undefined) {
                body = `${key}=${encodeURIComponent(payload[key])}`;
            } else {
                body = `${body}&&${key}=${encodeURIComponent(payload[key])}`;
            }
        });
    } else if (["patch"].includes(method.toLowerCase())) {
        body = payload;
    } else {
        body = JSON.stringify(payload);
    }

    const requestOptions = {
        method: method.toUpperCase(),
        headers,
        body
    };
    let server = process.env.NEXT_PUBLIC_BASE_URL;
    // if (endPoint.includes("https") || typeof(window) !== "undefined") server = "";
    // else server = process.env.NEXT_PUBLIC_BASE_URL;

    let target = "";
    
    switch (options.serviceDomainType) {
    case API_TARGET.E_MENU:
        target = API_TARGET_VALUE.E_MENU;
        break;
    case API_TARGET.PREMIX:
            target = API_TARGET_VALUE.PREMIX;
            break;
    default:
        target = '';
        break;
    }

    const url = server + target + endPoint + qs;
    console.log(url)

    const response = await fetch(url, requestOptions);
    let data;
    try {
        data = await response.json();
        data.status_code = response.status;
    } catch (e) {
        data = null;
    }

    return data;
};

const getQueryString = (params) => {
    const esc = encodeURIComponent;
    Object.keys(params).forEach((key) => {
        if (params[key] === undefined || params[key] === null) {
            delete params[key];
        }
    });
    return Object.keys(params)
        .filter((v) => params[v] !== "undefined" || params[v] !== "null")
        .map((k) => {
            let param = `${esc(k)}=${esc(params[k])}`;
            if (Array.isArray(params[k])){
                param = params[k].map((value,index )=> {
                    return `${esc(k)}[${index}]=${esc(value)}`;
                }).join("&");
            }
            return param;
        })
        .join("&");
};

export default fetchApi;
