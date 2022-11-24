import propTypes from "prop-types";
import Image from "next/image";
import { toRupiah } from "helpers/formatter";

const PromoCard = ({ name, category, price, discount, imageUrl }) => {
    return (
        <div className="flex flex-col rounded-3xl shadow-[0px_4px_24px_rgba(39,38,65,0.06)]">
            <div className="flex gap-2 rounded-3xl bg-[#E2E2E7] bg-[url('/promo-background.png')] p-6 bg-contain bg-no-repeat bg-bottom">
                <div className="relative w-16 h-16 bg-white rounded-xl">
                    <Image src={imageUrl} className="rounded-2xl shadow-[0px_4px_8px_rgba(0,0,0,0.08)]" layout='fill' objectFit='contain'/>
                </div>
                
                <div className="flex flex-col pl-3">
                    <div className="text-base font-bold text-[#272541] cursor-pointer">{name}</div>
                    <div className="text-sm font-normal text-[#272541]">{category}</div>
                </div>
            </div>
            <div className="flex gap-2 p-6">
                <div className="w-1/2">
                    <span className="py-1 px-2 bg-[#FF5C6F] rounded-2xl text-xs text-[#FFFFFF] font-bold">
                        {discount}
                    </span>
                </div>
                <div className="w-1/2 text-right text-sm text-[#272541] font-bold">{toRupiah(price)}</div>
            </div>
        </div>
    );
};

PromoCard.propTypes = {
    name: propTypes.string,
    category: propTypes.string,
    price: propTypes.string,
    discount: propTypes.string,
};

PromoCard.defaultProps = {
    name: "",
    category: "",
    price: "",
    discount: "",
};

export default PromoCard;
