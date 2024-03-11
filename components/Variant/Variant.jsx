import propTypes from "prop-types";
import { AiFillCheckCircle } from "react-icons/ai";

const Variant = ({ label, list, clickHandler, selectedVariant, needResponsive }) => {
    const parentClass = needResponsive ? 'flex md:flex-row flex-col gap-2 mt-1' : 'flex gap-2 mt-1';
    return (
        <div className="flex flex-col mt-6">
            <label className="text-sm font-bold">{label}</label>
            <div className={parentClass}>
                {list.map((variantList) => {
                    const paddingClass = needResponsive ? 'px-3' : 'px-6';
                    const isSelected = selectedVariant === variantList.id_product_duration;
                    const selectedClass = isSelected ? `border border-[#272541] text-[#272541] text-sm rounded-md cursor-pointer py-2 flex items-center gap-1 ${paddingClass}` : `border border-[#E2E2E7] text-[#6E6C85] text-sm rounded-md cursor-pointer py-2 ${paddingClass}`;

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
    label: propTypes.string,
    needResponsive: propTypes.bool,
};

Variant.defaultProps = {
    list: [],
    clickHandler: () => {},
    variantSelected: undefined,
    label: '',
    needResponsive: false,
}

export default Variant;
