import propTypes from "prop-types";
import { AiFillCheckCircle } from "react-icons/ai";

const Variant = ({ label, list, clickHandler, selectedVariant }) => {
    return (
        <div className="flex flex-col mt-6">
            <label className="text-sm font-bold">{label}</label>
            <div className="flex gap-2 mt-1">
                {list.map((variantList) => {
                    const isSelected = selectedVariant === variantList.id_product_duration;
                    const selectedClass = isSelected ? 'border border-[#272541] text-[#272541] text-sm rounded-md cursor-pointer px-6 py-2 flex items-center gap-1' : 'border border-[#E2E2E7] text-[#6E6C85] text-sm rounded-md cursor-pointer px-6 py-2';

                    return(
                        <div key={`variant-${variantList.id_product_duration}`} className={selectedClass} onClick={() => {clickHandler(variantList.id_product_duration, variantList.stock, variantList.price)}} >
                            {isSelected && (
                                <AiFillCheckCircle className="text-base" />
                            )}
                            
                            {`${variantList.duration_value} Hari`}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

Variant.propTypes = {
    list: propTypes.array,
    clickHandler: propTypes.func,
    variantSelected: propTypes.number,
    label: propTypes.string
};

Variant.defaultProps = {
    list: [],
    clickHandler: () => {},
    variantSelected: undefined,
    label: '',
}

export default Variant;
