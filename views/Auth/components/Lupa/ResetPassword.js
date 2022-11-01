import React from "react";
import Link from "next/link";
import propTypes from "prop-types";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";

import { useStateContext } from "context/StateContext";
import { Button, FormikInput } from "components";
import { catchError } from "helpers/formatter";
import { AlertService } from "services";
import { isInputNumber, isInputPhone } from "helpers/utils";
import { USER_INFO } from "constants/enum";
import { verifyUser } from "helpers/api";

const ResetPassword = ({ onChangeIdentity }) => {
    const router = useRouter();
    const { setLoading, outletCode } = useStateContext();

    const handleCheckIdentity = async (values) => {
        const identity = String(values.identity);
    
        if (identity === "") return AlertService.error("Nomor Ponsel harus diisi");
        if (identity.length < 8) return AlertService.error("Nomor Ponsel harus diisi minimal 8 digit");
        if (identity.length > 15) return AlertService.error("Nomor Ponsel harus diisi maksimal 15 digit");
    
        setLoading(true);

        const payload = {
            identity: `62${identity}`,
            outlet_code: outletCode,
        };
        
        try {
            const res = await verifyUser(payload);
            if (res.status && res.data) {
                onChangeIdentity(res.data);
                sessionStorage.setItem(USER_INFO, JSON.stringify(res.data));
                router.push("/forgot/verifikasi?page=1");
                return;
            }
            throw new Error("Akun tidak terdaftar/ditemukan, pastikan nomor ponsel benar");
        } catch (error) {
            setLoading(false);
            AlertService.error(catchError(error));
        }
    };

    return (
        <>
            <Formik
                initialValues={{ identity: "" }}
                onSubmit={handleCheckIdentity}
            >
                {({ handleChange, values, dirty }) => (
                    <Form>
                        <FormikInput
                            name="identity"
                            id="identity"
                            label="Nomor Ponsel"
                            prefix="62"
                            type="text"
                            helperText="Contoh: 81000000000"
                            value={values.identity}
                            onChange={(event) => {
                                const { value } = event.target;
                                if (!isInputNumber(value)) return;
                                handleChange({ ...event, target: { name: "identity", value: isInputPhone(value) } });
                            }}
                        />
                        <Button
                            full
                            label="Selanjutnya"
                            size="lg"
                            className="mt-5"
                            type="submit"
                            disabled={!dirty}
                        />
                    </Form>
                )}
            </Formik>
            <p className="text-center mt-5 font-semibold text-dark-300 text-sm">
                Belum punya akun Web Store?
                {" "}
                <Link href="/daftar">
                    <a className="text-turq-300">Daftar</a>
                </Link>
            </p>
        </>
    );
};

ResetPassword.propTypes = {
    onChangeIdentity: propTypes.func,
};

ResetPassword.defaultProps = {
    onChangeIdentity: () => {},
};

export default ResetPassword;
