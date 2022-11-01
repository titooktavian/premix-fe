import propTypes from "prop-types";

import ProductItem from "./ProductItem";

const ListProducts = ({ products }) => {
    return (
        <div className="mt-6 border-t border-neutral-200">
            {products.length <= 0 && (
                <div className="text-sm text-red-700 border border-red-100 mt-4 text-center bg-red-50 p-2 rounded font-medium">Tidak ada produk</div>
            )}
            {products.map((product, index) => <ProductItem key={product.id + index} product={product} />)}
        </div>
    )
};

ListProducts.propTypes = {
    products: propTypes.arrayOf(propTypes.shape({
        id: propTypes.string,
    })),
};

ListProducts.defaultProps = {
    products: [],
};

export default ListProducts;
