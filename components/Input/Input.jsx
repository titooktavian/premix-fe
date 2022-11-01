// @ts-nocheck
/* eslint-disable */
import React, { useState } from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const Index = ({
    prefix,
    maxLength,
    label,
    id,
    required,
    startIcon,
    suffix,
    type,
    topSpace,
    field,
    readOnly,
    form,
    disabled,
    helperText,
    errors = { isError: false, text: "" },
    placeholder,
    ...rest
}) => {
    const [focus, setFocus] = useState(false);
    const [onHover, setOnHover] = useState(false);
    const [inputType, setInputType] = useState("password");

    const isPassword = Boolean(type === "password");

    const handleMouseEnter = () => {
        setOnHover(true);
    };

    const handleMouseLeave = () => {
        setOnHover(false);
    };

    const handleFocus = (e) => {
        if (readOnly) return;

        setFocus(true);

        // rest?.onFocus(e);
    };

    const handleBlur = (e) => {
        if (readOnly) return;

        setFocus(false);

        // rest?.onBlur(e);
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
                            {label}
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
                                "border-neutral-300": !focus && !errors.isError,
                                "border-turq-300": focus && !errors.isError,
                                "border-red-300": !onHover && errors.isError,
                                "cursor-not-allowed border-neutral-200 bg-neutral-100":
                                    disabled,
                                "border-neutral-400":
                                    (onHover && !focus) ||
                                    (onHover && focus && errors.isError)
                            }
                        )}
                    >
                        <p className="text-sm text-neutral-400">{prefix}</p>
                    </div>
                )}
                <input
                    {...rest}
                    {...(maxLength ? { maxLength } : {})}
                    disabled={disabled}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    type={type === "password" ? inputType : type}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={classnames(
                        [
                            `
                w-full rounded-[4px] border
                bg-white px-3 py-2 text-sm font-medium text-dark-300 placeholder-slate-400 caret-turq-300 shadow-none transition duration-150
                ease-in hover:border-neutral-400 focus:outline-none
                disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-100 disabled:text-neutral-400
              `
                        ],
                        {
                            "border-neutral-300": !errors.isError,
                            "pr-10": isPassword,
                            "pl-9": startIcon,
                            "border-l-1px focus:border-turq-300 focus:bg-white focus:outline-none":
                                focus && !errors.isError && !readOnly,
                            "border-red-300 caret-red-300 focus:outline-none":
                                errors.isError,
                            "rounded-tl-[0] rounded-bl-[0] bg-white": prefix,
                            "rounded-tr-[0] rounded-br-[0] bg-white": suffix
                        }
                    )}
                />
                {suffix && (
                    <div
                        className={classnames(
                            "flex min-h-[48px] items-center justify-center rounded-md rounded-tl-[0] rounded-bl-[0] border border-l-0 py-2 px-3 transition duration-150 ease-in",
                            {
                                "border-neutral-300": !focus && !errors.isError,
                                "border-turq-300":
                                    focus && !errors.isError && !readOnly,
                                "border-red-300": !onHover && errors.isError,
                                "cursor-not-allowed border-neutral-200 bg-neutral-100":
                                    disabled,
                                "border-neutral-400":
                                    (onHover && !focus) ||
                                    (onHover && focus && errors.isError)
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
            {errors.isError && (
                <div className="mt-[8px] flex">
                    <p className="text-xs font-medium text-red-300">
                        {errors.text}
                    </p>
                </div>
            )}
        </div>
    );
};

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
    placeholder: propTypes.string,
    errors: propTypes.shape({
        isError: propTypes.bool,
        text: propTypes.string
    })
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
    placeholder: '',
    errors: { isError: false, text: "" }
};

export default Index;
