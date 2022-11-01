import { FaChevronRight, FaTruck } from "react-icons/fa";
import propTypes from "prop-types";

const DeliveryMethod = () => {
    return (
        <>
            <h2 className="text-base text-dark-300 font-bold md:p-2">
                Metode Pengiriman
            </h2>
            <div className="text-sm md:p-2">
                <div className="flex justify-between items-center cursor-pointer">
                    <div className="flex gap-2 font-bold items-center">
                        <FaTruck className=" text-xl text-dark-200" />
                        Pilihan Pengiriman
                    </div>
                    <FaChevronRight className=" text-xs text-dark-200" />
                </div>
            </div>
        </>
    )
};

DeliveryMethod.propTypes = {
    setCourier: propTypes.func.required,
};

DeliveryMethod.defaultProps = {
}
export default DeliveryMethod;