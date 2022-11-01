import { useState } from "react";
import { useRouter } from "next/router";

import { getAddressList, getDetailAddress, getProvinceList } from "helpers/api";
import { catchError } from "helpers/formatter";
import { AlertService } from "services";
import { convertSelectData, sortingData } from "helpers/utils";
import { useStateContext } from "context/StateContext";

export const useFetchAddress = (user, addressId) => {
    const [mainAddress, setMainAddress] = useState(false);
    const [addressCount, setAddressCount] = useState(0);
    const [provinceList, setProvinceList] = useState([]);
    const [detailAddress, setDetailAddress] = useState({});

    const router = useRouter();

    const { setLoading } = useStateContext();

    const handleFetchAddressList = async (isUpdate = false) => {
        try {
            const payload = { customer_no: user.customer_no };
            const res = await getAddressList(payload);
            if (res.status_code < 200 || res.status_code > 299) throw new Error(res.message);
            const { data } = res;
            const isMainAddress = isUpdate ? data.length <= 1 : data.length === 0;
            if (isMainAddress) setMainAddress(true);
            setAddressCount(res.data.length);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    }

    const handleFetchProvinceList = async () => {
        try {
            const res = await getProvinceList();
            if (!res.data) throw new Error(res.message);
            const convertProvince = convertSelectData(res.data, "province_id", "province_name");
            const sortingProvice = sortingData(convertProvince, "value");
            setProvinceList(sortingProvice);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    }

    const handleFetchDetailAddress = async () => {
        try {
            const res = await getDetailAddress(user.customer_no, addressId);
            if (res.message === "Not Found") {
                AlertService.error("Alamat tidak ditemukan");
                setTimeout(() => {
                    router.push("/akun/alamat");
                }, 1000);
                return;
            }
            if (res.status_code < 200 || res.status_code > 299) throw new Error(res.message);
            setDetailAddress(res.data);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    }

    const handleFetchRegional = async (payload, fetchEndpoint, key_id, key_name) => {
        setLoading(true);
        try {
            const res = await fetchEndpoint(payload);
            if (!res.data) throw new Error(res.message);
            const convert = convertSelectData(res.data, key_id, key_name);
            const sorting = sortingData(convert, "value");
            return sorting;
        } catch (error) {
            AlertService.error(catchError(error));
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        mainAddress,
        addressCount,
        provinceList,
        detailAddress,
        handleFetchAddressList,
        handleFetchProvinceList,
        handleFetchDetailAddress,
        handleFetchRegional,
    }
};
