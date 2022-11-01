import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import propTypes from "prop-types";

import Layout from "../components/layout/Layout";
import FormAddress from "../components/address/FormAddress";
import ModalSetMainAddress from "../components/modal/SetMainAddress";
import FormAlamatSkeleton from "../skeleton/FormAlamat";
import { ACCOUNT_MENU } from "constants/enum";
import { useStateContext } from "context/StateContext";
import { AlertService } from "services";
import { catchError } from "helpers/formatter";
import { createAddress } from "helpers/api";
import { useFetchAddress } from "../hooks/useFetchAddress";

const TambahAlamat = ({ user }) => {
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    const [confirmMainAddress, setConfirmMainAddress] = useState(false);
    const [addressData, setAddressData] = useState({});

    const { setLoading, onSetBgColor } = useStateContext();
    const {
        mainAddress,
        addressCount,
        provinceList,
        handleFetchAddressList,
        handleFetchProvinceList,
    } = useFetchAddress(user);

    const router = useRouter();

    useEffect(() => {
        onSetBgColor("md:bg-neutral-100");
        return () => onSetBgColor();
    }, []);

    useEffect(async () => {
        setLoading(true);
        await handleFetchProvinceList();
        await handleFetchAddressList();
        setLoading(false);
        setDataIsLoaded(true);
    }, []);

    const handleSubmitAddress = (values) => {
        const { latitude, longitude, mainAddress } = values;
        setAddressData(values);

        if (!latitude || !longitude) return AlertService.error("Atur titik alamat kamu pada peta (maps) sebelum menyimpan alamat ini");
        if (addressCount >= 10) return AlertService.error("Data alamat sudah mencapai batas maksimal");
        else if (mainAddress) return setConfirmMainAddress(true);

        handleCreateAddress(values, true);
    }

    const handleCreateAddress = async (values = null, isDirect = false) => {
        setLoading(true);

        const {
            label, name, phone, latitude, longitude, address, notes, province, city, district, postalCode, mainAddress,
        } = isDirect ? values : addressData;

        const payload = {
            is_main_address: mainAddress,
            address_label: label,
            recipient_name: name,
            phone_no: phone,
            longitude: longitude,
            latitude: latitude,
            detail: address,
            note: notes,
            postal_code: postalCode,
            province,
            city,
            district,
        };

        try {
            const res = await createAddress(user.customer_no, payload);
            if (res.status_code < 200 || res.status_code > 299) throw new Error(res.message);
            AlertService.success(res.message);
            setTimeout(() => {
                router.push("/akun/alamat");
            }, 1000);
        } catch (error) {
            setLoading(false);
            AlertService.error(catchError(error));
        }
    }

    return (
        <Layout title="Tambah Alamat" menu={ACCOUNT_MENU.ALAMAT}>
            {
                dataIsLoaded ? (
                    <FormAddress
                        mainAddress={mainAddress}
                        dataIsLoaded={dataIsLoaded}
                        provinceList={provinceList}
                        onSubmit={handleSubmitAddress}
                    />
                ) : <FormAlamatSkeleton />
            }
            <ModalSetMainAddress
                show={confirmMainAddress}
                onClose={() => setConfirmMainAddress(false)}
                onConfirm={handleCreateAddress}
            />
        </Layout>
    )
};

TambahAlamat.propTypes = {
    user: propTypes.shape({
        customer_no: propTypes.string,
    }),
};

TambahAlamat.defaultProps = {
    user: {
        customer_no: "",
    },
};

export default TambahAlamat;
