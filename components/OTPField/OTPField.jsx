import React, { useState } from "react";
import propTypes from "prop-types";

const OTPField = ({ length, disabled, failedInput, onOTPValue }) => {
    const [stepValue, setStepValue] = useState([]);

    const handleChange = (event, index) => {
        const { value } = event.target;
        if (Number.isNaN(Number(value))) return;
        if (index >= length) return;
        let newValue = [...stepValue];
        newValue[index] = value;
        setStepValue(newValue);
        onOTPValue(newValue.join(""));
    }

    const inputFocus = (e) => {
        if (e.key === "Delete" || e.key === "Backspace") {
            const next = e.target.dataset.step - 2;
            if (next > -1) e.target.form.elements[next].focus();
        } else {
            const { value } = e.target;
            if (value.trim() === "") return;
            const next = e.target.dataset.step;
            if (next < length) e.target.form.elements[next].focus();
        }
    }

    let customClasses = "";
    if (failedInput) {
        customClasses += " border-red-300 bg-red-100";
    }

    const inputElement = [];
    for (let i = 0; i < length; i++) {
        inputElement.push(
            <input
                key={i}
                type="text"
                className={`w-12 h-12 border border-neutral-300 text-center text-xl text-dark-300 font-semibold rounded-[4px] transition duration-200 focus:outline-none disabled:bg-neutral-100 disabled:border-neutral-300 ${customClasses}`}
                maxLength="1"
                data-step={i+1}
                value={stepValue[i] || ""}
                disabled={disabled}
                onChange={(event) => handleChange(event, i)}
                onKeyUp={inputFocus}
            />
        );
    }

    return (
        <form className="flex justify-center gap-x-4">
            {inputElement}
        </form>
    );
}

OTPField.propTypes = {
    length: propTypes.number,
    disabled: propTypes.bool,
    failedInput: propTypes.bool,
    onOTPValue: propTypes.func,
};

OTPField.defaultProps = {
    length: 4,
    disabled: false,
    failedInput: false,
    onOTPValue: () => {},
};

export default OTPField;
