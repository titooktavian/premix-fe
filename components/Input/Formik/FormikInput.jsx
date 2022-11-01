// @ts-nocheck
/* eslint-disable */
import React, { useState } from "react";
import classnames from "classnames";
import propTypes from "prop-types";
import { Field } from "formik";

const Index = ({
    prefix,
    maxLength,
    label,
    id,
    required,
    startIcon,
    readOnly,
    suffix,
    type,
    topSpace,
    field,
    form,
    disabled,
    helperText,
    useAsterisk,
    onChange,
    ...rest
}) => {
    const [focus, setFocus] = useState(false);
    const [onHover, setOnHover] = useState(false);
    const [inputType, setInputType] = useState("password");
    const isPassword = Boolean(type === "password");

    const isFieldError =
        required && Boolean(form?.touched[id]) && Boolean(form?.errors[id]);

    const handleFocus = () => {
        if (readOnly) return;

        setFocus(true);
    };

    const handleBlur = (e) => {
        if (readOnly) return;

        setFocus(false);

        field?.onBlur(e);
    };

    const handleMouseEnter = () => {
        setOnHover(true);
    };

    const handleMouseLeave = () => {
        setOnHover(false);
    };

    return (
        <div className={classnames("flex flex-col", { "mt-3": topSpace })}>
            <div
                className={classnames("mb-[6px] flex w-full", {
                    "justify-end": !label,
                    "items-center justify-between": label && maxLength
                })}
            >
                {!!label && (
                    <div>
                        <label
                            htmlFor={id}
                            className="text-sm font-medium text-dark-300"
                        >
                            {label} {useAsterisk && <span className="text-red-300">*</span>}
                        </label>
                    </div>
                )}
                {!!maxLength && (
                    <div>
                        <p className="text-xs font-medium text-neutral-400">
                            {field.value.length}/{maxLength}
                        </p>
                    </div>
                )}
            </div>
            <div
                className={classnames("flex w-full items-center", {
                    relative: isPassword || startIcon
                })}
            >
                {startIcon && (
                    <div
                        className={classnames("absolute", {
                            // need to fix when prefix and startIcon is active
                            "left-[65px]": prefix,
                            "left-[16px]": !prefix,
                            "cursor-not-allowed opacity-50": disabled
                        })}
                    >
                        {startIcon}
                    </div>
                )}
                {prefix && (
                    <div
                        className={classnames(
                            "flex min-h-[48px] min-w-[48px] items-center justify-center rounded-md rounded-tr-[0] rounded-br-[0] border border-r-0 bg-white py-2 px-3 transition duration-150 ease-in",
                            {
                                "border-neutral-300": !focus && !isFieldError,
                                "border-turq-300":
                                    focus && !isFieldError && !readOnly,
                                "border-red-300": !onHover && isFieldError,
                                "cursor-not-allowed border-neutral-200 bg-neutral-100":
                                    disabled,
                                "border-neutral-400":
                                    (onHover && !focus) ||
                                    (onHover && focus && isFieldError)
                            }
                        )}
                    >
                        <p className="text-sm text-neutral-400">{prefix}</p>
                    </div>
                )}
                <input
                    {...rest}
                    {...field}
                    {...(maxLength ? { maxLength } : {})}
                    disabled={disabled}
                    type={type === "password" ? inputType : type}
                    onFocus={handleFocus}
                    readOnly={readOnly}
                    onChange={onChange}
                    onBlur={handleBlur}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={classnames(
                        [
                            `
              min-h-[48px]
                w-full rounded-[4px] border
                px-3 py-2 text-sm font-medium text-dark-300 placeholder-slate-400 caret-turq-300 shadow-none transition duration-150
                ease-in hover:border-neutral-400 focus:outline-none
                disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-100 disabled:text-neutral-400
              `
                        ],
                        {
                            "border-neutral-300 bg-white": !isFieldError,
                            "pr-10": isPassword,
                            "pl-9": startIcon,
                            "border-l-1px focus:border-turq-300 focus:bg-white focus:outline-none":
                                focus && !isFieldError && !readOnly,
                            "border-red-300 caret-red-300 focus:outline-none bg-red-100":
                                isFieldError,
                            "rounded-tl-[0] rounded-bl-[0]": prefix,
                            "rounded-tr-[0] rounded-br-[0]": suffix
                        }
                    )}
                />
                {suffix && (
                    <div
                        className={classnames(
                            "flex min-h-[48px] items-center justify-center rounded-md rounded-tl-[0] rounded-bl-[0] border border-l-0 py-2 px-3 transition duration-150 ease-in",
                            {
                                "border-neutral-300": !focus && !isFieldError,
                                "border-turq-300":
                                    focus && !isFieldError && !readOnly,
                                "border-red-300 bg-red-100": !onHover && isFieldError,
                                "cursor-not-allowed border-neutral-200 bg-neutral-100":
                                    disabled,
                                "border-neutral-400":
                                    (onHover && !focus) ||
                                    (onHover && focus && isFieldError)
                            }
                        )}
                    >
                        <p className="text-sm text-neutral-400">{suffix}</p>
                    </div>
                )}
                {isPassword && (
                    <div
                        onClick={() => {
                            if (disabled) return;

                            setInputType(
                                inputType === "password" ? "text" : "password"
                            );
                        }}
                        className={classnames("absolute cursor-pointer", {
                            "right-4": isPassword,
                            // need to fix when suffix and isPassword is active
                            "right-[7%]": isPassword && suffix,
                            "cursor-not-allowed opacity-50": disabled
                        })}
                    >
                        <img src="/icons/eye-slash-ic.svg" alt="eye-slash" />
                    </div>
                )}
            </div>
            {/* butuh konfirmasi jika pesan error muncul, apakah helper text tetap muncul atau bagaimana */}
            {!!helperText && (
                <div className="mt-[8px] flex">
                    <p className="text-xs font-medium text-dark-100">
                        {helperText}
                    </p>
                </div>
            )}
            {isFieldError && (
                <div className="mt-2 flex">
                    <p className="text-xs font-medium text-red-300">
                        {form.errors[id]}
                    </p>
                </div>
            )}
        </div>
    );
};

const InputField = ({ ...rest }) => <Field {...rest} component={Index} />;

Index.propTypes = {
    prefix: propTypes.string,
    maxLength: propTypes.number,
    label: propTypes.string,
    id: propTypes.string.isRequired,
    required: propTypes.bool,
    disabled: propTypes.bool,
    readOnly: propTypes.bool,
    startIcon: propTypes.element,
    suffix: propTypes.string,
    type: propTypes.oneOf(["text", "number", "password"]),
    topSpace: propTypes.bool,
    helperText: propTypes.string,
    field: propTypes.object.isRequired,
    form: propTypes.object.isRequired,
    useAsterisk: propTypes.bool,
    onChange: propTypes.func,
};

Index.defaultProps = {
    prefix: "",
    helperText: "",
    maxLength: 0,
    disabled: false,
    readOnly: false,
    label: "",
    required: false,
    type: "text",
    startIcon: null,
    suffix: "",
    topSpace: true,
    useAsterisk: false,
    onChange: () => {},
};

export default InputField;
