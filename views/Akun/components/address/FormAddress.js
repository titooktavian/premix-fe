import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Formik, Form } from "formik";
import * as yup from "yup";

import ButtonGroup from "./ButtonGroup";
import { FormikInput, FormikSelect, FormikTextArea, PinPointLocation, Switch } from "components";
import { isInputNumber, isInputPhone } from "helpers/utils";
import { getCityList, getDistrictList, getPostalCodeList } from 'helpers/api';
import { useFetchAddress } from 'views/Akun/hooks/useFetchAddress';

const FormAddress = ({ addressData, provinceList, mainAddress, onDeleteClicked, onSubmit }) => {
    const [cityList, setCityList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [postalCode, setPostalCode] = useState([]);

    const { handleFetchRegional } = useFetchAddress();

    useEffect(() => {
        if (addressData.id) handleFetchAllRegional();
    }, []);

    const handleFetchAllRegional = async () => {
        const { province, city, district } = addressData;

        const resultCity = await handleFetchRegional({ province_id: province, }, getCityList, "city_id", "city_name");
        setCityList(resultCity);

        const resultDistrict = await handleFetchRegional({ city_id: city }, getDistrictList, "district_id", "district_name");
        setDistrictList(resultDistrict);

        const resultPos = await handleFetchRegional({ district_id: district }, getPostalCodeList, "postal_code", "postal_code");
        setPostalCode(resultPos);
    }

    const handleFetchCityList = async (provinceId, setFieldValue) => {
        const payload = { province_id: provinceId };
        const resultData = await handleFetchRegional(payload, getCityList, "city_id", "city_name");
        setFieldValue("province", provinceId);
        if (resultData) {
            setFieldValue("city", "");
            setFieldValue("district", "");
            setFieldValue("postalCode", "");
            setCityList(resultData);
            setDistrictList([]);
            setPostalCode([]);
        }
    }

    const handleFetchDistrictList = async (cityId, setFieldValue) => {
        const payload = { city_id: cityId };
        const resultData = await handleFetchRegional(payload, getDistrictList, "district_id", "district_name");
        setFieldValue("city", cityId);
        if (resultData) {
            setFieldValue("district", "");
            setFieldValue("postalCode", "");
            setDistrictList(resultData);
            setPostalCode([]);
        }
    }

    const handleFetchPostalCodeList = async (districtId, setFieldValue) => {
        const payload = { district_id: districtId };
        const resultData = await handleFetchRegional(payload, getPostalCodeList, "postal_code", "postal_code");
        setFieldValue("district", districtId);
        if (resultData) {
            setPostalCode(resultData);
            setFieldValue("postalCode", "");
        }
    }

    return (
        <Formik
            initialValues={{
                label: addressData.address_label || "",
                name: addressData.recipient_name || "",
                phone: addressData.phone_no || "",
                latitude: addressData.latitude || "",
                longitude: addressData.longitude || "",
                address: addressData.detail || "",
                notes: addressData.note || "",
                province: addressData.province || "",
                city: addressData.city || "",
                district: addressData.district || "",
                postalCode: addressData.postal_code || "",
                mainAddress: addressData.is_main_address === 1 ? true : mainAddress,
            }}
            validationSchema={yup.object().shape({
                label: yup.string().required("Wajib diisi misal : Rumah, Kos, Kantor, dll"),
                name: yup.string()
                    .required("Wajib diisi sebagai informasi nama penerima")
                    .min(3, "Tidak boleh kurang dari 3 karakter dan lebih dari 50 karakter"),
                phone: yup.string()
                    .required("Wajib diisi sebagai informasi nomor telp penerima")
                    .min(8, "Tidak boleh kurang dari 8 karakter dan lebih dari 15 karakter"),
                address: yup.string()
                    .required("Wajib diisi")
                    .min(20, "Tidak boleh kurang dari 20 karakter dan lebih dari 200 karakter"),
            })}
            onSubmit={onSubmit}
        >
            {({ values, handleChange, setFieldValue, errors }) => (
                <Form>
                    <FormikInput
                        required
                        useAsterisk
                        maxLength={20}
                        name="label"
                        id="label"
                        label="Label Alamat"
                        placeholder="Misal: Rumah, Kos, Kantor dll"
                        type="text"
                        value={values.label}
                        onChange={(event) => handleChange(event)}
                    />
                    <FormikInput
                        required
                        useAsterisk
                        maxLength={50}
                        name="name"
                        id="name"
                        label="Nama"
                        placeholder="Masukkan nama kamu"
                        type="text"
                        value={values.name}
                        onChange={(event) => handleChange(event)}
                    />
                    <FormikInput
                        required
                        useAsterisk
                        maxLength={15}
                        prefix="62"
                        name="phone"
                        id="phone"
                        label="Nomor Telepon"
                        placeholder="Masukkan nomor telepon kamu"
                        type="text"
                        value={values.phone}
                        onChange={(event) => {
                            const { value } = event.target;
                            if (!isInputNumber(value)) return;
                            handleChange({ ...event, target: { name: "phone", value: isInputPhone(value) } });
                        }}
                    />
                    <div className="h-2 w-full bg-neutral-100 mt-5 mb-4" />
                    <p className="text-sm font-bold text-dark-300">Pin Lokasi</p>
                    <p className="text-xs font-medium text-dark-100 my-2">Diperlukan jika menggunakan kurir instant seperti (GoSend, GrabExpress & Lainnya) yang membutuhkan titik lokasi map.</p>
                    <PinPointLocation
                        defaultSearchValue={values.address}
                        defaultLatLng={
                            addressData.latitude && {
                                lat: Number(values.latitude),
                                lng: Number(values.longitude),
                            }
                        }
                        onResult={(data) => {
                            setFieldValue("latitude", data?.latitude);
                            setFieldValue("longitude", data?.longitude);
                            setFieldValue("address", data?.address);
                        }}
                    />
                    <FormikTextArea
                        required
                        useAsterisk
                        rows={3}
                        maxLength={200}
                        name="address"
                        id="address"
                        label="Alamat"
                        placeholder="Tulis alamat lengkap anda"
                        value={values.address}
                    />
                    <FormikTextArea
                        maxLength={100}
                        rows={3}
                        name="notes"
                        id="notes"
                        label="Catatan/Patokan Rumah (Opsional)"
                        placeholder="Masukkan patokan alamat anda"
                        value={values.notes}
                    />
                    <FormikSelect
                        required
                        id="province"
                        label="Provinsi"
                        placeholder="Pilih Provinsi"
                        value={Number(values.province)}
                        data={provinceList}
                        onChange={({ value }) => handleFetchCityList(value, setFieldValue)}
                    />
                    <FormikSelect
                        required
                        id="city"
                        label="Kota / Kabupaten"
                        placeholder="Pilih Kota / Kabupaten"
                        value={Number(values.city)}
                        data={cityList}
                        onChange={({ value }) => handleFetchDistrictList(value, setFieldValue)}
                    />
                    <FormikSelect
                        required
                        id="district"
                        label="Kecamatan"
                        placeholder="Pilih Kecamatan"
                        value={Number(values.district)}
                        data={districtList}
                        onChange={({ value }) => handleFetchPostalCodeList(value, setFieldValue)}
                    />
                    <FormikSelect
                        required
                        id="postalCode"
                        label="Kode Pos"
                        placeholder="Pilih Kode Pos"
                        value={values.postalCode}
                        data={postalCode}
                        onChange={(option) => setFieldValue("postalCode", option.value)}
                    />
                    <div className="mt-6 pb-5 border-b-2 border-neutral-100">
                        <Switch
                            label="Atur Sebagai Alamat Utama"
                            checked={values.mainAddress}
                            disabled={addressData.is_main_address === 1}
                            onChange={(value) => setFieldValue("mainAddress", value)}
                        />
                        {
                            addressData.id && (
                                <button
                                    type="button"
                                    onClick={onDeleteClicked}
                                    className="border-none bg-none outline-none text-red-300 font-medium text-sm mt-8 transition hover:text-red-400"
                                >
                                    Hapus Alamat
                                </button>
                            )
                        }
                    </div>
                    <ButtonGroup values={values} formErrors={errors} />
                </Form>
            )}
        </Formik>
    )
};

FormAddress.propTypes = {
    mainAddress: propTypes.bool,
    onSubmit: propTypes.func,
    onDeleteClicked: propTypes.func,
    addressData: propTypes.shape({}),
    provinceList: propTypes.arrayOf(propTypes.shape({})),
};

FormAddress.defaultProps = {
    mainAddress: false,
    onSubmit: () => {},
    onDeleteClicked: () => {},
    addressData: {},
    provinceList: [],
};

export default FormAddress;
