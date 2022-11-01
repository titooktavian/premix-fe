// @ts-nocheck
/* eslint-disable */
import React, { useState } from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const Index = ({
    maxLength,
    label,
    id,
    required,
    startIcon,
    topSpace,
    readOnly,
    disabled,
    helperText,
    errors = { isError: false, text: "" },
    ...rest
}) => {
    const [focus, setFocus] = useState(false);

    const handleFocus = () => {
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
                            {rest?.value.length}/{maxLength}
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
                    {...(maxLength ? { maxLength } : {})}
                    disabled={disabled}
                    readOnly={readOnly}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={classnames(
                        [
                            `
              min-h-[48px]
                w-full rounded-[4px] border
                bg-white px-3 py-2 text-sm font-medium text-dark-300 placeholder-slate-400 caret-turq-300 shadow-none transition duration-150
                ease-in hover:border-neutral-400 focus:outline-none
                disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-100 disabled:text-neutral-400
              `
                        ],
                        {
                            "border-neutral-300": !errors.isError,
                            "pl-9": startIcon,
                            "border-l-1px focus:border-turq-300 focus:bg-white focus:outline-none":
                                focus && !errors.isError && !readOnly,
                            "border-red-300 caret-red-300 focus:outline-none":
                                errors.isError
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
    maxLength: propTypes.number,
    label: propTypes.string,
    id: propTypes.string.isRequired,
    required: propTypes.bool,
    disabled: propTypes.bool,
    readOnly: propTypes.bool,
    startIcon: propTypes.element,
    topSpace: propTypes.bool,
    helperText: propTypes.string,
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
    errors: { isError: false, text: "" }
};

export default Index;
