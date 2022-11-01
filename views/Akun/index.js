import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import propTypes from "prop-types";
import * as yup from "yup";
import { Formik, Form } from "formik";

import Layout from "./components/layout/Layout";
import UserDataItem from "./components/UserDataItem";
import ModalPhoneNumber from "./components/modal/ModalPhoneNumber";
import ModalChangePassword from "./components/modal/ChangePassword";
import AkunSkeleton from "./skeleton/Akun";
import { useStateContext } from "context/StateContext";
import { ACCOUNT_MENU } from "constants/enum";
import { Button, FormikInput } from "components";
import { AlertService } from "services";
import { catchError } from "helpers/formatter";
import { updateUserDetail, userDetail } from "helpers/api";
import { isValidEmail } from "helpers/utils";

const Index = ({ user, showMenuMobile }) => {
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    const [modalPhoneNumber, setModalPhoneNumber] = useState(false);
    const [modalChangePassword, setModalChangePassword] = useState(false);
    const [userData, setUserData] = useState({
        customerNo: "",
        fullName: "",
        email: "",
        phone: "",
    });

    const { onSetBgColor, setLoading } = useStateContext();
    const router = useRouter();

    useEffect(() => {
        onSetBgColor("md:bg-neutral-100");
        return () => onSetBgColor();
    }, []);

    useEffect(() => {
        handleFetchUser();
    }, []);

    const handleFetchUser = async () => {
        setLoading(true);
        try {
            const res = await userDetail(user?.customer_no);
            if (!res.status) throw new Error(res.msg);
            handleUserState(res);
        } catch (error) {
            AlertService.error(catchError(error));
        } finally {
            setLoading(false);
            setDataIsLoaded(true);
        }
    };

    const handleSaveIdentity = async (values, { setErrors }) => {
        const { name, email } = values;

        let nameError = null;
        let emailError = null;

        if (name === "") nameError = "Nama Lengkap tidak boleh kosong";
        else if (name.length > 50) nameError = "Nama lengkap harus diisi maksimal 50 karakter";
        if (email !== "" && !isValidEmail(email)) emailError = "Format email salah"

        if (nameError || emailError) {
            return setErrors({ name: nameError, email: emailError });
        }

        setLoading(true);

        const payload = { full_name: name, email };

        try {
            const res = await updateUserDetail(user.customer_no, payload);
            if (!res.status) throw new Error(res.msg);
            handleUserState(res);
            AlertService.success(res.msg);
        } catch (error) {
            AlertService.error(catchError(error));
        } finally {
            setLoading(false);
        }
    };

    const handleUserState = (response) => {
        const { data: { customer_no: customerNo, fullname: fullName, email, phone_no: phone } } = response;
        setUserData({ customerNo, fullName, email, phone });
    };

    const handleShowModalPhone = () => setModalPhoneNumber(prevState => !prevState);
    
    const handleShowChangePassword = () => setModalChangePassword(prevState => !prevState);

    return (
        <Layout title="Data Diri" menu={ACCOUNT_MENU.DATA_DIRI} mobileShowMenu={showMenuMobile}>
            {dataIsLoaded ? (
                <Formik
                    initialValues={{
                        name: userData.fullName,
                        email: userData.email,
                    }}
                    validationSchema={yup.object().shape({
                        name: yup.string().required("Nama wajib diisi"),
                    })}
                    onSubmit={handleSaveIdentity}
                >
                    {({ values, handleChange }) => (
                        <Form>
                            <FormikInput
                                required
                                useAsterisk
                                name="name"
                                id="name"
                                label="Nama Lengkap"
                                placeholder="Nama Lengkap"
                                type="text"
                                value={values.name}
                                onChange={(event) => handleChange(event)}
                            />
                            <FormikInput
                                required
                                name="email"
                                id="email"
                                label="Email"
                                type="text"
                                placeholder="Email"
                                value={values.email}
                                onChange={(event) => handleChange(event)}
                            />
                            <div className="mt-8">
                                <UserDataItem
                                    title="Ubah Nomor Ponsel"
                                    subtitle={userData.phone}
                                    onClick={handleShowModalPhone}
                                />
                                <UserDataItem
                                    title="Ubah Kata Sandi"
                                    onClick={handleShowChangePassword}
                                />
                            </div>
                            <div className="flex gap-3 md:gap-5 items-center mt-8">
                                <Button
                                    full
                                    label="Kembali"
                                    size="lg"
                                    variant="secondary"
                                    onClick={() => router.back()}
                                />
                                <Button
                                    full
                                    label="Simpan"
                                    size="lg"
                                    type="submit"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : <AkunSkeleton />}
            <ModalPhoneNumber
                show={modalPhoneNumber}
                onClose={handleShowModalPhone}
            />
            <ModalChangePassword
                customerNo={user.customer_no}
                show={modalChangePassword}
                onClose={handleShowChangePassword}
            />
        </Layout>
    );
};

Index.propTypes = {
    showMenuMobile: propTypes.bool,
    user: propTypes.shape({
        customer_no: propTypes.string,
    }),
};

Index.defaultProps = {
    showMenuMobile: false,
    user: {
        customer_no: "",
    },
};

export default Index;
