import Link from "next/link";
import propTypes from "prop-types";
import * as yup from "yup";

import { Formik, Form } from "formik";
import { isInputNumber, isInputPhone, isValidEmail } from "helpers/utils";
import { Button, FormikInput } from "components";
import { REGISTER_STEPS } from "views/Auth/utils";
import { AlertService } from "services";
import { useStateContext } from "context/StateContext";
import { catchError } from "helpers/formatter";
import { verifyUser } from "helpers/api";

const IdentitySection = ({ registerData, onNextStep, onRegisterData }) => {
    const { setLoading, outletCode } = useStateContext();

    const handleNextStep = async (values, { setErrors }) => {
        const identity = String(values.identity);
        const name = String(values.name);
        const email = String(values.email);
    
        if (identity === "") return AlertService.error("Nomor Ponsel harus diisi");
        if (identity.length < 8) return AlertService.error("Nomor Ponsel harus diisi minimal 8 digit");
        if (identity.length > 15) return AlertService.error("Nomor Ponsel harus diisi maksimal 15 digit");

        if (name === "") return AlertService.error("Nama lengkap harus diisi");
        if (name.length < 2) return AlertService.error("Nama lengkap harus diisi minimal 2 karakter");
        if (name.length > 50) return AlertService.error("Nama lengkap harus diisi maksimal 50 karakter");

        if (email !== "" && !isValidEmail(email)) return AlertService.error("Format email salah");

        setLoading(true);

        const payload = {
            identity: `62${identity}`,
            outlet_code: outletCode,
        };
        
        try {
            const res = await verifyUser(payload);
            if (res.status === false && res.err_code === "ERR-UNREG") {
                const registerData = { identity, name, email };
                onNextStep(REGISTER_STEPS.PASSWORD);
                onRegisterData(registerData);
            } else if (res.status) {
                const errorMessage = "Nomor ponsel sudah terdaftar!";
                setErrors({ identity: errorMessage });
                AlertService.error(errorMessage);
            } else {
                throw res;
            }
        } catch (error) {
            AlertService.error(catchError(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Formik
                initialValues={{
                    identity: registerData.identity,
                    name: registerData.name,
                    email: registerData.email,
                }}
                validationSchema={yup.object().shape({
                    identity: yup.string().required("Nomor Ponsel wajib diisi"),
                    name: yup.string().required("Nama wajib diisi"),
                })}
                onSubmit={handleNextStep}
            >
                {({ handleChange, values }) => (
                    <Form>
                        <FormikInput
                            required
                            useAsterisk
                            name="identity"
                            id="identity"
                            label="Nomor Ponsel"
                            prefix="62"
                            type="text"
                            helperText="Contoh: 81000000000"
                            placeholder="Masukkan nomor ponsel aktif"
                            value={values.identity}
                            onChange={(event) => {
                                const { value } = event.target;
                                if (!isInputNumber(value)) return;
                                handleChange({ ...event, target: { name: "identity", value: isInputPhone(value) } });
                            }}
                        />
                        <FormikInput
                            required
                            useAsterisk
                            name="name"
                            id="name"
                            label="Nama"
                            type="text"
                            placeholder="Masukkan nama lengkap"
                            onChange={(event) => handleChange(event)}
                        />
                        <FormikInput
                            name="email"
                            id="email"
                            label="Email"
                            type="text"
                            helperText="Contoh: nama@mail.com"
                            placeholder="Masukkan alamat email aktif"
                            onChange={(event) => handleChange(event)}
                        />
                        <Button
                            full
                            label="Selanjutnya"
                            type="submit"
                            size="lg"
                            className="mt-5"
                            disabled={!values.identity || !values.name}
                        />
                    </Form>
                )}
            </Formik>
            <p className="text-center mt-5 font-semibold text-dark-300 text-sm">
                Sudah punya akun Web Store?
                {" "}
                <Link href="/masuk">
                    <a className="text-turq-300">Masuk</a>
                </Link>
            </p>
        </>
    );
};

IdentitySection.propTypes = {
    onNextStep: propTypes.func,
    onRegisterData: propTypes.func,
    registerData: propTypes.shape({
        identity: propTypes.string.isRequired,
        name: propTypes.string.isRequired,
        email: propTypes.string.isRequired,
    }),
};

IdentitySection.defaultProps = {
    onNextStep: () => {},
    onRegisterData: () => {},
    registerData: {},
};

export default IdentitySection;
