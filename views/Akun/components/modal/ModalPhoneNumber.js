import { useRouter } from "next/router";
import propTypes from 'prop-types';
import * as yup from "yup";

import { Formik, Form } from "formik";
import { Button, FormikInput } from "components";
import { Modal } from "components";
import { isInputNumber, isInputPhone } from "helpers/utils";
import { useStateContext } from "context/StateContext";
import { AlertService } from "services";
import { catchError } from "helpers/formatter";
import { checkNumber } from "helpers/api";
import { USER_INFO } from "constants/enum";

const ModalPhoneNumber = ({ show, onClose }) => {
    const { setLoading, outletCode } = useStateContext();
    const router = useRouter();

    const handleChangePhoneNumber = async (values, { setErrors }) => {
        const { phone } = values;

        let phoneError = null;

        if (phone === "") phoneError = "Nomor Ponsel harus diisi";
        else if (phone.length < 8) phoneError = "Nomor Ponsel harus diisi minimal 8 digit";

        if (phoneError) return setErrors({ phone: phoneError });

        setLoading(true);
        const phoneNumber = `62${phone}`;
        const payload = {
            version: 2,
            outlet_code: outletCode,
        };
        try {
            const res = await checkNumber(phoneNumber, payload);
            if (res.status) {
                const infoUser = {
                    phone_no: phoneNumber,
                    email: "",
                };
                sessionStorage.setItem(USER_INFO, JSON.stringify(infoUser));
                router.push("/akun/ubah-nomor/verifikasi");
            } else if (res.msg === "No telepon sudah terpakai") {
                setErrors({ phone: res.msg });
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
        <Modal
            mediumWidth
            staticBackdrop
            isPopup={show}
            isDivider={false}
            title="Ubah Nomor Ponsel"
            type="fullscreen"
            onRequestClose={onClose}
        >
            <Formik
                initialValues={{ phone: "" }}
                validationSchema={yup.object().shape({
                    phone: yup.string().required("Nomor ponsel wajib diisi"),
                })}
                onSubmit={handleChangePhoneNumber}
            >
                {({ values, dirty, handleChange }) => (
                    <Form>
                        <FormikInput
                            required
                            useAsterisk
                            prefix="62"
                            name="phone"
                            id="phone"
                            label="Nomor Ponsel"
                            placeholder="Masukkan nomor ponsel aktif"
                            type="text"
                            value={values.phone}
                            onChange={(event) => {
                                const { value } = event.target;
                                if (!isInputNumber(value)) return;
                                handleChange({ ...event, target: { name: "phone", value: isInputPhone(value) } });
                            }}
                        />
                        <div className="flex justify-center mb-3">
                            <Button
                                label="Verifikasi Nomor"
                                type="submit"
                                size="lg"
                                className="w-full md:w-10/12 mt-5"
                                disabled={!dirty}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
};

ModalPhoneNumber.propTypes = {
    show: propTypes.bool,
    onClose: propTypes.func,
};

ModalPhoneNumber.defaultProps = {
    show: false,
    onClose: () => {},
};

export default ModalPhoneNumber;
