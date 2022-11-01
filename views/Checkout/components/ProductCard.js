import { toRupiah } from "helpers/formatter";
import Image from "next/image";
import propTypes from "prop-types";

const ProductCard = ({ product }) => {
    const { id, image, name, total_price, add_on, note, quantity, total_price_after_promo  } = product;
    const fixed_price = total_price_after_promo < total_price ? total_price_after_promo : total_price;
    return (
        <div className="my-1 flex items-center space-x-2">
            <div className="h-[60px] w-[60px]">
                <Image
                    src={image || "/images/item-default-new.png"}
                    width={30}
                    height={30}
                    layout="responsive"
                    className="rounded-lg object-cover"
                />
            </div>
            <div className="w-full ml-2">
                <p className="text-xs font-bold text-dark-300">
                    {name}
                </p>
                <p className="my-2 text-sm font-bold text-dark-300">
                    {toRupiah(fixed_price)}
                    {fixed_price!= total_price && (
                        <span className="ml-2 text-sm text-red-300 line-through">{toRupiah(total_price)}</span>
                    )}
                </p>
                {add_on.map((ekstra) => (
                    ekstra.details.map((ekstraDetail) => (
                        <div key={`${id}ekstra${ekstraDetail.id}`} className="text-xs my-2">
                            <span className="font-bold">{ekstra.name} : </span><span>{ekstraDetail.name}</span>
                        </div>
                    ))
                ))}
                {note && note.length > 0 && (
                    <div className="mt-4">
                        <p className="text-xs font-bold text-dark-100">
                            {note}
                        </p>
                    </div>
                )}
            </div>
            <div>
                <span className="font-bold text-dark-300">x{quantity}</span>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    product: propTypes.shape({
        image: propTypes.string,
        name: propTypes.string,
        id: propTypes.oneOfType([
            propTypes.string,
            propTypes.number,
        ]),
        total_price: propTypes.number,
        total_price_after_promo: propTypes.number,
        add_on: propTypes.array,
        note: propTypes.string,
        quantity: propTypes.number,
    }),
};

ProductCard.defaultProps = {
    product: {
        image: '',
        name: '',
        id: '',
        total_price: 0,
        total_price_after_promo: 0,
        add_on: [],
        note: '',
        quantity: '',
    },
};


export default ProductCard;
