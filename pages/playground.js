// @ts-nocheck
/* eslint-disable */
import React, { useState } from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { FormikInput, Input, TextArea, FormikTextArea } from "components";

const Playground = () => {
    const [val, setVal] = useState("");

    return (
        <section className="flex-1 md:mx-auto md:w-[960px]">
            <Formik
                initialValues={{ username: "", password: "" }}
                // this props can be place separately in validations folder
                validationSchema={yup.object().shape({
                    username: yup
                        .string()
                        .required("Nama pengguna wajib diisi"),
                    password: yup.string().required("Kata sandi wajib diisi")
                })}
                onSubmit={(v) => {
                    alert(JSON.stringify(v, null, 2));
                }}
            >
                {() => (
                    <Form>
                        <FormikInput
                            name="username"
                            id="username"
                            label="Nama pengguna"
                            placeholder="Masukkan nama pengguna"
                            prefix="Suffix"
                            type="password"
                            topSpace={false}
                        />
                        <FormikTextArea
                            name="username"
                            id="username"
                            label="Nama pengguna"
                            placeholder="Masukkan nama pengguna"
                            prefix="Suffix"
                            maxLength={5}
                            type="password"
                        />
                        <FormikInput
                            required
                            type="password"
                            label="Kata sandi"
                            name="password"
                            id="password"
                            placeholder="Masukkan kata sandi"
                        />
                        <button
                            type="submit"
                            className="item mt-4 w-full rounded-md bg-turq-300 px-3 py-2 font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-turq-300 active:bg-opacity-80"
                        >
                            Login
                        </button>
                    </Form>
                )}
            </Formik>
            <Input
                name="username"
                id="username"
                prefix="Suffix"
                required
                errors={{
                    isError: false,
                    text: "Text"
                }}
                readOnly
                value={val}
                onChange={(e) => setVal(e.target.value)}
                label="Test basic input"
                placeholder="Test basic input"
            />
            <TextArea
                name="username"
                id="username"
                prefix="Suffix"
                required
                errors={{
                    isError: false,
                    text: "Text"
                }}
                onChange={(e) => setVal(e.target.value)}
                // readOnly
                value={val}
                label="Test basic input"
                placeholder="Test basic input"
            />
        </section>
    );
};

export default Playground;
