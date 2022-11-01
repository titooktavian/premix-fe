import { useState } from "react";
import { useRouter } from "next/router";
import * as yup from "yup";
import propTypes from "prop-types";

import ModalTermsConditions from "components/Modal/TermsCondition";
import { Formik, Form } from "formik";
import { Button, FormikInput } from "components";
import { REGISTER_STEPS } from "views/Auth/utils";
import { useStateContext } from "context/StateContext";
import { AlertService } from "services";
import { catchError } from "helpers/formatter";
import { USER_INFO } from "constants/enum";
import { register } from "helpers/api";

const PasswordSection = ({ registerData, onChangeStep }) => {
    const router = useRouter();
    const [showTerms, setShowTerms] = useState(false);
    const { setLoading, outletCode } = useStateContext();

    const handleRegister = async (values, { setErrors }) => {
        const password = String(values.password);
        const confirmPassword = String(values.confirmPassword);

        if (password === "") return setErrors({ password: "Kata Sandi harus diisi" });
        if (password.length < 8) return setErrors({ password: "Kata Sandi minimum 8 karakter" });

        if (confirmPassword === "") return setErrors({ confirmPassword: "Ulangi Kata Sandi harus diisi" });
        if (confirmPassword !== password) return setErrors({ confirmPassword: "Ulangi Kata Sandi tidak sesuai" });

        setLoading(true);
        const payload = {
            phone_no: `62${registerData.identity}`,
            full_name: registerData.name,
            email: registerData.email,
            password: password,
            retype_password: confirmPassword,
            outlet_code: outletCode,
        }
        try {
            const res = await register(payload);
            if (res.status_code < 200 || res.status_code > 299) throw new Error(res.message);
            sessionStorage.setItem(USER_INFO, JSON.stringify(res.data));
            router.push("/daftar/verifikasi?page=1");
        } catch (error) {
            setLoading(false);
            AlertService.error(catchError(error));
        }
    };
    
    const handleToggleModalTerms = () => setShowTerms(prevState => !prevState);

    const handlePrevStep = () => onChangeStep(REGISTER_STEPS.IDENTITY);

    return (
        <>
            <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                validationSchema={yup.object().shape({
                    password: yup.string().required("Kata sandi wajib diisi"),
                    confirmPassword: yup.string().required("Ulangi kata sandi wajib diisi"),
                })}
                onSubmit={handleRegister}
            >
                {({ handleChange, values, errors }) => (
                    <Form>
                        <FormikInput
                            required
                            name="password"
                            id="password"
                            label="Kata Sandi"
                            type="password"
                            helperText={!errors.password ? "Kata sandi minimum 8 karakter" : ""}
                            value={values.password}
                            onChange={(event) => handleChange(event)}
                        />
                        <FormikInput
                            required
                            name="confirmPassword"
                            id="confirmPassword"
                            label="Ulangi Kata Sandi"
                            type="password"
                            helperText="Konfirmasi kata sandi baru kamu"
                            value={values.confirmPassword}
                            onChange={(event) => handleChange(event)}
                        />
                        <Button
                            full
                            label="Daftar"
                            type="submit"
                            size="lg"
                            className="mt-5"
                            disabled={!values.password || !values.confirmPassword}
                        />
                    </Form>
                )}
            </Formik>
            <Button
                full
                label="Kembali"
                variant="secondary"
                size="lg"
                className="mt-4"
                onClick={handlePrevStep}
            />
            <p className="text-center mt-5 font-medium text-dark-300 text-sm">
                Dengan mendaftar, saya menyetujui
                {" "}
                <a
                    onClick={handleToggleModalTerms}
                    className="text-turq-300 cursor-pointer"
                >
                    Syarat dan Ketentuan
                </a>
            </p>
            <ModalTermsConditions show={showTerms} onClose={handleToggleModalTerms} />
        </>
    )
};

PasswordSection.propTypes = {
    onChangeStep: propTypes.func,
    registerData: propTypes.shape({
        identity: propTypes.string.isRequired,
        name: propTypes.string.isRequired,
        email: propTypes.string.isRequired,
    }),
};

PasswordSection.defaultProps = {
    onChangeStep: () => {},
    registerData: {},
};

export default PasswordSection;
