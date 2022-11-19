import propTypes from "prop-types";
import { useState } from "react";
import { AiFillCheckCircle, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CHANGE_CART_TYPE } from "./constant";

const AddCart = ({ cartValue, setCartValue, stock }) => {
    const [value, setValue] = useState(cartValue);

    const changeCartValue = (type) => {
        if (type === CHANGE_CART_TYPE.INCREASE) {
            setValue(value + 1);
            setCartValue(value + 1);
        }

        if (type === CHANGE_CART_TYPE.DECREASE && value > 0) {
            setValue(value - 1);
            setCartValue(value - 1);
        }
    }

    return (
        <div className="flex flex-col mt-6">
            <label className="text-sm font-bold">Jumlah</label>
            <div className="flex gap-2 mt-1">
                <div className="border border-[#E2E2E7] text-[#6E6C85] text-sm rounded-md flex items-center p-[2px] gap-4">
                    <span className="bg-[#F4F4FD] rounded-md h-[29px] w-[29px] flex items-center justify-center cursor-pointer" onClick={() => { changeCartValue(CHANGE_CART_TYPE.DECREASE) }}>
                        <AiOutlineMinus />
                    </span>
                    <span className="text-base">{value}</span>
                    <span className="bg-[#F4F4FD] rounded-md h-[29px] w-[29px] flex items-center justify-center cursor-pointer" onClick={() => { changeCartValue(CHANGE_CART_TYPE.INCREASE) }}>
                        <AiOutlinePlus />
                    </span>
                </div>
                <div className="text-sm rounded-md cursor-pointer py-2 flex gap-1 text-[#6E6C85]">
                    <AiFillCheckCircle className="text-[#8BDBA1] text-lg" />
                    Stok {stock} akun
                </div>
            </div>
        </div>
    );
};

AddCart.propTypes = {
    cartValue: propTypes.number,
    setCartValue: propTypes.func,
    stock: propTypes.number,
};

AddCart.defaultProps = {
    cartValue: 0,
    setCartValue: () => {},
    stock: 0,
}

export default AddCart;
