import propTypes from "prop-types";
import Select, { components } from "react-select";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";

import customStyles from "./styles";

const NoOptionsMessage = () => (
    <>
        <RiErrorWarningLine className="text-sm mr-1" />
        Item tidak ditemukan
    </>
)

const DropdownIndicator = (props) => {
    const disabled = props?.selectProps?.isDisabled;
    return (
        <components.DropdownIndicator {...props}>
            <IoMdArrowDropdown className={`text-2xl ${disabled ? "text-[#B0BEC5]" : "text-[#58788A]"}`} />
        </components.DropdownIndicator>
    );
};

const ReactSelect = ({ value, placeholder, disabled, readOnly, onChange, data }) => {
    return (
        <Select
            value={data.find(item => item.value === value) || ""}
            options={data}
            styles={customStyles(readOnly)}
            onChange={onChange}
            isDisabled={disabled || readOnly}
            components={{ DropdownIndicator }}
            placeholder={placeholder}
            noOptionsMessage={NoOptionsMessage}
            className="w-full"
        />
    )
};

ReactSelect.propTypes = {
    placeholder: propTypes.string.isRequired,
    disabled: propTypes.bool.isRequired,
    readOnly: propTypes.bool.isRequired,
    onChange: propTypes.func.isRequired,
    value: propTypes.oneOfType([
        propTypes.number,
        propTypes.string,
    ]).isRequired,
    data: propTypes.arrayOf(propTypes.oneOfType([
        propTypes.string,
        propTypes.number,
        propTypes.array,
        propTypes.object,
    ])).isRequired,
};

export default ReactSelect;
