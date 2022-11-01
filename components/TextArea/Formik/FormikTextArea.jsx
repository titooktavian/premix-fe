// @ts-nocheck
/* eslint-disable */
import React, { useState } from "react";
import classnames from "classnames";
import propTypes from "prop-types";
import { Field } from "formik";

const Index = ({
    maxLength,
    label,
    id,
    required,
    startIcon,
    readOnly,
    topSpace,
    field,
    form,
    disabled,
    helperText,
    useAsterisk,
    ...rest
}) => {
    const [focus, setFocus] = useState(false);

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
                    relative: startIcon
                })}
            >
                {startIcon && (
                    <div
                        className={classnames("absolute", {
                            "cursor-not-allowed opacity-50": disabled
                        })}
                    >
                        {startIcon}
                    </div>
                )}
                <textarea
                    {...rest}
                    {...field}
                    {...(maxLength ? { maxLength } : {})}
                    disabled={disabled}
                    onFocus={handleFocus}
                    readOnly={readOnly}
                    onBlur={handleBlur}
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
                            "border-neutral-300": !isFieldError,
                            "pl-9": startIcon,
                            "border-l-1px focus:border-turq-300 focus:bg-white focus:outline-none":
                                focus && !isFieldError && !readOnly,
                            "border-red-300 caret-red-300 focus:outline-none bg-red-100":
                                isFieldError
                        }
                    )}
                />
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
                <div className="mt-[8px] flex">
                    <p className="text-xs font-medium text-red-300">
                        {form.errors[id]}
                    </p>
                </div>
            )}
        </div>
    );
};

const TextAreaField = ({ ...rest }) => <Field {...rest} component={Index} />;

Index.propTypes = {
    maxLength: propTypes.number,
    label: propTypes.string,
    id: propTypes.string.isRequired,
    required: propTypes.bool,
    disabled: propTypes.bool,
    readOnly: propTypes.bool,
    startIcon: propTypes.element,
    topSpace: propTypes.bool,
    helperText: propTypes.string,
    useAsterisk: propTypes.bool,
    errors: propTypes.shape({
        isError: propTypes.bool,
        text: propTypes.string
    })
};

Index.defaultProps = {
    helperText: "",
    maxLength: 0,
    disabled: false,
    readOnly: false,
    label: "",
    required: false,
    startIcon: null,
    topSpace: true,
    useAsterisk: false,
    errors: { isError: false, text: "" }
};

export default TextAreaField;
