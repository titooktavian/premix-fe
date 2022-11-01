import Image from "next/image";
import propTypes from "prop-types";

import { toRupiah, variantToText } from "helpers/formatter";

const ProductItem = ({ product }) => {
    return (
        <div className="mt-4 pb-4 flex justify-between border-b border-neutral-200">
            <div className="w-10">
                <Image
                    src={product.image || "/images/item-default-new.png"}
                    alt="produk"
                    width={40}
                    height={40}
                    className="object-cover overflow-hidden rounded-md"
                />
            </div>
            <div className="w-[calc(100%-56px)] ml-4">
                <h3 className="text-dark-300 font-bold text-xs truncate">{product.name}</h3>
                <div className="flex items-start justify-between my-2">
                    <div className="flex items-center">
                        <div className="flex flex-col">
                            {product.variant.length > 0 && <p className="text-xs text-dark-100 font-medium mb-2">{variantToText(product.variant)}</p>}
                            <p className="text-dark-300 font-bold text-sm">{toRupiah(product.price_total_after_promo)}</p>
                        </div>
                        {product.price_total > product.price_total_after_promo && <p className="text-red-300 font-medium ml-3 line-through text-sm">{toRupiah(product.price_total)}</p>}
                    </div>
                    <p className="text-dark-300 font-bold text-sm">{`x ${product.qty}`}</p>
                </div>
                {product.add_on.map((addOn) => (
                    addOn.details && addOn.details.length > 0 && (
                        <div key={addOn.id} className="flex items-start mt-1">
                            <p className="text-dark-300 font-bold text-xs">{addOn.name} :&nbsp;</p>
                            <div className="flex flex-col">
                                {addOn.details.map((detail, index) => (
                                    <span key={index} className="text-dark-300 font-medium text-xs">{detail.name}</span>
                                ))}
                            </div>
                        </div>
                    )
                ))}
                {product.notes && <p className="mt-4 text-xs text-dark-100 font-medium">{product.notes}</p>}
            </div>
        </div>
    )
};

ProductItem.propTypes = {
    product: propTypes.shape({
        image: propTypes.string,
        name: propTypes.string,
        price_total: propTypes.number,
        price_total_after_promo: propTypes.number,
        qty: propTypes.number,
        notes: propTypes.string,
        variant: propTypes.arrayOf(propTypes.shape({})),
        add_on: propTypes.arrayOf(propTypes.shape({})),
    }),
};

ProductItem.defaultProps = {
    product: {
        image: "",
        name: "",
        price_total: 0,
        price_total_after_promo: 0,
        qty: 0,
        notes: "",
        variant: [],
        add_on: [],
    },
};

export default ProductItem;
