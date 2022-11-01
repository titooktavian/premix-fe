import propTypes from "prop-types";
import ProductCard from "./ProductCard";

const OrderDetail = ({products, freeProducts}) => {
    return (
        <>
            <h2 className="text-base font-bold text-dark-300 md:p-2">
                Detail Pesanan
            </h2>
            <div className="my-4 md:my-0 md:p-2">
                {products.map((product) => (
                    <ProductCard key={product.cart_id} product={product}/>
                ))}
                {freeProducts.map((product) => (
                    <ProductCard key={product.cart_id} product={product} />
                ))}
            </div>
        </>
    )
};

OrderDetail.propTypes = {
    products: propTypes.array,
    freeProducts: propTypes.array,
};

OrderDetail.defaultProps = {
    products: [],
    freeProducts: [],
}
export default OrderDetail;