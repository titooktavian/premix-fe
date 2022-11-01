import React from "react";

const Checkbox = ({ id, type, name, handleClick, isChecked }) => {
    return (
        <input
            className="h-5 w-5 appearance-none rounded-[0.15em] border border-gray-500 bg-[url('/icons/check.svg')] marker:h-5 checked:border-2 checked:border-turq-300 checked:bg-turq-300 checked:text-white"
            id={id}
            name={name}
            type={type}
            onChange={handleClick}
            checked={isChecked}
        />
    );
};

export default Checkbox;
