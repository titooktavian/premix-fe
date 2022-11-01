import { AlertService } from "services/alert.service";

import { useRouter } from "next/router";
import fetchApi from "helpers/config";
import Link from "next/link";
import { useStateContext } from "context/StateContext";
import { useEffect } from "react";
import { Formik, Form } from "formik";
import { isInputNumber, isInputPhone } from "helpers/utils";
import { Button, FormikInput } from "components";
import * as yup from "yup";
import { catchError } from "helpers/formatter";

const Masuk = () => {
    const router = useRouter();
    const { onSetBgColor, setLoading } = useStateContext();
    const handleSubmit = async (values) => {
        const body = {
            phone_no: "62" + values.identity,
            password: values.password,
        };
        setLoading(true);
        fetchApi("/api/login", body, "post", {
            serviceDomainType: "local"
        }).then(async (res) => {
            if (res?.data) {
                let url = "/akun";
                if (router.query?.source) url = `/${router.query?.source}`;
                await router.push(url);
                return;
            }
            throw Error(res.message);
        }).catch((error) => {
            setLoading(false);
            AlertService.error(catchError(error));
        });
    };

    useEffect(() => {
        onSetBgColor("md:bg-neutral-100");
        return () => onSetBgColor();
    }, []);

    return (
        <div className="flex-1 bg-white rounded-lg mt-5 md:mt-3 md:mx-auto md:w-[960px] md:p-8">
            <h2 className="text-xl font-bold text-dark-300 mb-2">Masuk ke Akun Web Store</h2>
            <div className="md:w-[376px] sm:w-full mx-auto mt-7">
                <Formik
                    initialValues={{ identity: "", password: "" }}
                    validationSchema={yup.object().shape({
                        identity: yup
                            .string()
                            .required("Nomor Ponsel wajib diisi"),
                        password: yup.string().required("Kata sandi wajib diisi")
                    })}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, values, dirty }) => (
                        <Form>
                            <FormikInput
                                required
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
                            <FormikInput
                                required
                                type="password"
                                label="Kata sandi"
                                name="password"
                                id="password"
                                placeholder="Masukkan kata sandi"
                                value={values.password}
                                onChange={(event) => {
                                    const { value } = event.target;
                                    handleChange({ ...event, target: { name: "password", value } });
                                }}
                            />
                            <Button
                                full
                                label="Selanjutnya"
                                type="submit"
                                size="lg"
                                className="mt-5"
                                disabled={!dirty}
                            />
                        </Form>
                    )}
                </Formik>
                <div className="text-center font-semibold text-base">
                    <div className="mt-4">
                        Belum punya akun Web Store?&nbsp;
                        <Link href="/daftar">
                            <a className="mb-5 text-turq-300 font-medium">Daftar</a>
                        </Link>
                    </div>
                    <div className="mt-4">
                        Lupa kata sandi?&nbsp;
                        <Link href="/forgot">
                            <a className="mb-5 text-turq-300 font-medium">Atur Ulang</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Masuk;
