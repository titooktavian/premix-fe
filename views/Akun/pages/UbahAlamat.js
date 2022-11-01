import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import propTypes from "prop-types";

import Layout from "../components/layout/Layout";
import FormAddress from "../components/address/FormAddress";
import FormAlamatSkeleton from "../skeleton/FormAlamat";
import ModalDeleteAddress from "../components/modal/DeleteAddress";
import ModalSetMainAddress from "../components/modal/SetMainAddress";
import { ACCOUNT_MENU } from "constants/enum";
import { useStateContext } from "context/StateContext";
import { useFetchAddress } from "../hooks/useFetchAddress";
import { AlertService } from "services";
import { catchError } from "helpers/formatter";
import { deleteAddress, updateAddress } from "helpers/api";

const UbahAlamat = ({ user }) => {
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    const [modalDeleteAddress, setModalDeleteAddress] = useState(false);
    const [stepDeleteAddress, setStepDeleteAddress] = useState(1);
    const [confirmMainAddress, setConfirmMainAddress] = useState(false);
    const [addressData, setAddressData] = useState({});

    const router = useRouter();
    const { id: addressId } = router.query;

    const {
        mainAddress,
        provinceList,
        detailAddress,
        handleFetchAddressList,
        handleFetchProvinceList,
        handleFetchDetailAddress,
    } = useFetchAddress(user, addressId);
    const { setLoading, onSetBgColor } = useStateContext();

    useEffect(() => {
        onSetBgColor("md:bg-neutral-100");
        return () => onSetBgColor();
    }, []);

    useEffect(async () => {
        setLoading(true);
        await handleFetchProvinceList();
        await handleFetchAddressList(true);
        await handleFetchDetailAddress();
        setDataIsLoaded(true);
    }, []);

    const handleDeleteAddress = async () => {
        if (detailAddress.is_main_address === 1) return setStepDeleteAddress(2);
        setLoading(true);
        try {
            const res = await deleteAddress(user.customer_no, addressId);
            if (res.status_code < 200 || res.status_code > 299) throw new Error(res.message);
            AlertService.success("Alamat berhasil dihapus");
            setTimeout(() => {
                router.push("/akun/alamat");
            }, 1000);
        } catch (error) {
            setLoading(false);
            AlertService.error(catchError(error));
        }
    };

    const handleModalDeleteAddress = () => {
        setStepDeleteAddress(1);
        setModalDeleteAddress(prevState => !prevState);
    };

    const handleCheckUpdate = (values) => {
        const { latitude, longitude, mainAddress } = values;
        setAddressData(values);

        const currMainAddress = detailAddress.is_main_address === 1;

        if (!latitude || !longitude) return AlertService.error("Atur titik alamat kamu pada peta (maps) sebelum menyimpan alamat ini");
        else if (mainAddress !== currMainAddress) return setConfirmMainAddress(true);

        handleUpdateAddress(values, true);
    }

    const handleUpdateAddress = async (values = null, isDirect = false) => {
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
            const res = await updateAddress(user.customer_no, addressId, payload);
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
        <Layout title="Ubah Alamat" menu={ACCOUNT_MENU.ALAMAT}>
            {
                dataIsLoaded ? (
                    <FormAddress
                        addressData={detailAddress}
                        mainAddress={mainAddress}
                        dataIsLoaded={dataIsLoaded}
                        provinceList={provinceList}
                        onSubmit={handleCheckUpdate}
                        onDeleteClicked={handleModalDeleteAddress}
                    />
                ) : <FormAlamatSkeleton />
            }
            <ModalDeleteAddress
                step={stepDeleteAddress}
                show={modalDeleteAddress}
                onClose={handleModalDeleteAddress}
                onConfirm={handleDeleteAddress}
            />
            <ModalSetMainAddress
                show={confirmMainAddress}
                onClose={() => setConfirmMainAddress(false)}
                onConfirm={handleUpdateAddress}
            />
        </Layout>
    )
};

UbahAlamat.propTypes = {
    user: propTypes.shape({
        customer_no: propTypes.string,
    }),
};

UbahAlamat.defaultProps = {
    user: {
        customer_no: "",
    },
};

export default UbahAlamat;
