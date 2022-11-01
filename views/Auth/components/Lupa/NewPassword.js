import { useRouter } from "next/router";
import { Form, Formik } from "formik";

import { Button, FormikInput } from "components";
import { AlertService } from "services";
import { useStateContext } from "context/StateContext";
import { catchError } from "helpers/formatter";
import { VALID_OTP_DATA } from "constants/enum";
import { forgotPassword } from "helpers/api";

const NewPassword = ({ customerNo }) => {
    const router = useRouter();
    const { setLoading } = useStateContext();

    const handleChangePassword = async (values) => {
        const { password, retype_password: confirmPassword } = values;

        if (password === "") return AlertService.error("Kata Sandi harus diisi");
        if (password.length < 8) return AlertService.error("Kata Sandi minimum 8 karakter");
        if (confirmPassword === "") return AlertService.error("Ulangi Kata Sandi harus diisi");
        if (confirmPassword.length < 8) return AlertService.error("Ulangi Kata Sandi tidak sesuai");

        setLoading(true);

        const payload = {
            password,
            retype_password: confirmPassword,
        };
        
        try {
            const res = await forgotPassword(customerNo, payload);
            if (res.message !== "Berhasil ubah password") throw new Error(res.message);
            sessionStorage.removeItem(VALID_OTP_DATA);
            router.push("/forgot/sukses");
        } catch (error) {
            AlertService.error(catchError(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-5">
            <Formik
                initialValues={{ password: "", retype_password: "" }}
                onSubmit={handleChangePassword}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <FormikInput
                            name="password"
                            id="password"
                            label="Kata Sandi"
                            type="password"
                            helperText="Kata sandi minimum 8 karakter"
                            value={values.password}
                            onChange={handleChange}
                        />
                        <FormikInput
                            name="retype_password"
                            id="retype_password"
                            label="Ulangi Kata Sandi"
                            type="password"
                            helperText="Konfirmasi kata sandi baru kamu"
                            value={values.retype_password}
                            onChange={handleChange}
                        />
                        <Button
                            full
                            label="Simpan Kata Sandi"
                            type="submit"
                            size="lg"
                            className="mt-5"
                            disabled={!values.password || !values.retype_password}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewPassword;
