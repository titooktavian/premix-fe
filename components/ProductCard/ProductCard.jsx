import propTypes from "prop-types";
import Image from "next/image";
import { toRupiah } from "helpers/formatter";
import { useRouter } from "next/router";

const ProductCard = ({ name, category, price, imageUrl, productId }) => {
    const router = useRouter();

    const goDetail = (productId) => {
        router.push({
            pathname: '/produk-detail/[id_produk]',
            query: { id_produk: productId },
        })
        
    }

    return (
        <div className="flex flex-col rounded-3xl shadow-[0px_4px_24px_rgba(39,38,65,0.06)] p-4" onClick={() => { goDetail(productId) }}>
            <div className="flex flex-col gap-2 rounded-3xl">
                <div className="relative aspect-video cursor-pointer">
                    <Image src={imageUrl} className="rounded-2xl" layout='fill' objectFit='contain'/>
                </div>
                <span className="py-1 px-2 bg-[#272541] rounded-2xl text-xs text-[#FFFFFF] font-bold w-fit mt-1">
                    {category}
                </span>
                <div className="text-base font-bold text-[#272541] cursor-pointer">{name}</div>
                <div className="text-sm font-normal text-[#8E8E9A]">{toRupiah(price)}</div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    name: propTypes.string,
    category: propTypes.string,
    price: propTypes.string,
};

ProductCard.defaultProps = {
    name: "",
    category: "",
    price: "",
};

export default ProductCard;
