import propTypes from 'prop-types';
import * as yup from "yup";

import { Formik, Form } from "formik";
import { Button, FormikInput } from "components";
import { Modal } from "components";
import { AlertService } from 'services';
import { useStateContext } from 'context/StateContext';
import { catchError } from 'helpers/formatter';
import { changePassword } from 'helpers/api';

const ModalChangePassword = ({ customerNo, show, onClose }) => {
    const { setLoading } = useStateContext();

    const handleChangePassword = async (values, { setErrors }) => {
        const { currentPassword, newPassword, confirmPassword } = values;

        if (currentPassword.length < 8) {
            const errorMsg = "Kata Sandi Lama minimum 8 karakter";
            AlertService.error(errorMsg);
            setErrors({ currentPassword: errorMsg });
            return;
        }

        if (newPassword.length < 8) {
            const errorMsg = "Kata Sandi Baru minimum 8 karakter";
            AlertService.error(errorMsg);
            setErrors({ newPassword: errorMsg });
            return;
        }

        if (confirmPassword !== newPassword) {
            const errorMsg = "Ulangi Kata Sandi tidak sesuai";
            AlertService.error(errorMsg);
            setErrors({ confirmPassword: errorMsg });
            return;
        }

        setLoading(true);

        const payload = {
            old_password: currentPassword,
            new_password: newPassword,
            retype_new_password: confirmPassword,
        };

        try {
            const res = await changePassword(customerNo, payload);
            if (res.status_code < 200 || res.status_code > 299) throw new Error(res.message);
            AlertService.success(res.message);
            onClose();
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
            title="Ubah Kata Sandi"
            type="fullscreen"
            onRequestClose={onClose}
        >
            <Formik
                initialValues={{ currentPassword: "", newPassword: "", confirmPassword: "" }}
                validationSchema={yup.object().shape({
                    currentPassword: yup.string().required("Kata sandi saat ini wajib diisi"),
                    newPassword: yup.string().required("Kata sandi baru wajib diisi"),
                    confirmPassword: yup.string().required("Ulangi kata sandi wajib diisi"),
                })}
                onSubmit={handleChangePassword}
            >
                {({ handleChange, values, errors, touched }) => (
                    <Form>
                        <FormikInput
                            required
                            name="currentPassword"
                            id="currentPassword"
                            label="Kata Sandi Saat Ini"
                            type="password"
                            value={values.currentPassword}
                            onChange={(event) => handleChange(event)}
                        />
                        <FormikInput
                            required
                            name="newPassword"
                            id="newPassword"
                            label="Kata Sandi Baru"
                            type="password"
                            helperText={!touched.newPassword || !errors.newPassword ? "Kata sandi minimum 8 karakter" : ""}
                            value={values.newPassword}
                            onChange={(event) => handleChange(event)}
                        />
                        <FormikInput
                            required
                            name="confirmPassword"
                            id="confirmPassword"
                            label="Ulangi Kata Sandi"
                            type="password"
                            helperText={!touched.confirmPassword || !errors.confirmPassword ? "Konfirmasi kata sandi baru kamu" : ""}
                            value={values.confirmPassword}
                            onChange={(event) => handleChange(event)}
                        />
                        <div className="flex justify-center my-3">
                            <Button
                                label="Simpan Kata Sandi"
                                type="submit"
                                size="lg"
                                className="w-full md:w-10/12 mt-5"
                                disabled={!values.currentPassword || !values.newPassword || !values.confirmPassword}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
};

ModalChangePassword.propTypes = {
    customerNo: propTypes.string,
    show: propTypes.bool,
    onClose: propTypes.func,
};

ModalChangePassword.defaultProps = {
    customerNo: "",
    show: true,
    onClose: () => {},
};

export default ModalChangePassword;
