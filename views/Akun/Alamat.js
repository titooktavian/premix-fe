import { useEffect, useState } from "react";
import propTypes from "prop-types";

import Layout from "./components/layout/Layout";
import NoAddressData from "./components/address/NoAddressData";
import AddressList from "./components/address/AddressList";
import AlamatSkeleton from "./skeleton/Alamat";
import { ACCOUNT_MENU } from "constants/enum";
import { useStateContext } from "context/StateContext";
import { getAddressList } from "helpers/api";
import { AlertService } from "services";
import { catchError } from "helpers/formatter";
import { Search } from "components";

const Alamat = ({ user }) => {
    const [addressList, setAddressList] = useState([]);
    const [isAddressExist, setIsAddressExist] = useState(false);
    const [isLoadedData, setIsLoadedData] = useState(false);
    const [searchKey, setSearchKey] = useState("");

    const { onSetBgColor, setLoading } = useStateContext();

    useEffect(() => {
        onSetBgColor("md:bg-neutral-100");
        return () => onSetBgColor();
    }, []);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            handleFetchAddressList(searchKey);
        }, 500);
        return () => clearTimeout(delaySearch);
    }, [searchKey]);

    const handleFetchAddressList = async (searchKey = null) => {
        if (isLoadedData) setLoading(true);
        try {
            let payload = { customer_no: user.customer_no, sort: "desc" };
            if (searchKey) payload = { ...payload, search: searchKey };
            const res = await getAddressList(payload);
            if (res.status_code < 200 || res.status_code > 299) throw new Error(res.message);
            setAddressList(res.data);
            if (!isLoadedData) setIsAddressExist(res.data.length > 0);
        } catch (error) {
            AlertService.error(catchError(error));
        } finally {
            setIsLoadedData(true);
            setLoading(false);
        }
    }

    return (
        <Layout title="Daftar Alamat" menu={ACCOUNT_MENU.ALAMAT}>
            {
                isLoadedData ? (
                    isAddressExist ? (
                        <>
                            <Search
                                value={searchKey}
                                placeholder="Cari Alamat..."
                                onChange={(e) => setSearchKey(e.target.value)}
                            />
                            <AddressList addressList={addressList} />
                        </>
                    ) : <NoAddressData />
                ) : <AlamatSkeleton />
            }
        </Layout>
    )
};

Alamat.propTypes = {
    user: propTypes.shape({
        customer_no: propTypes.string,
    }),
};

Alamat.defaultProps = {
    user: {
        customer_no: "",
    },
};

export default Alamat;
