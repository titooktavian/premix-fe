import { useState, useEffect } from "react";
import propTypes from "prop-types";
import { ProductCard, SectionTitle } from "components";
import { getListProduct } from "helpers/api";
import { AlertService } from "services";
import { catchError } from "helpers/formatter";
import ProductSectionSkeleton from "./ProductSectionSkeleton";

const ProductSection = ({ title, subtitle, perPage, category, withPagination }) => {
    const [productList, setProductList] = useState([]);
    const [limit, setLimit] = useState(perPage);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [loadingState, setLoadingState] = useState(true);

    const fetchData = async (page) => {
        setLoadingState(true);
        try {
            const res = await getListProduct({
                category: category,
                limit: 4,
                page: withPagination ? page + 1 : 1,
            });

            const {
                data,
                last_page,
                per_page,
                current_page,
            } = res;

            setProductList(data);
            setCurrentPage(current_page);
            setLimit(per_page);
            setTotalPage(last_page);
            setLoadingState(false);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    };

    useEffect(() => {
        fetchData(0)
    }, []);
    
    return (
        <>
            {!loadingState ? (
                <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                    <div className="md:mx-auto md:max-w-[1110px] px-4">
                        <SectionTitle title={title} subtitle={subtitle} />

                        <div className="grid gap-4 grid-cols-4 my-4">
                        {productList.length > 0 ? (
                            <>
                                {productList.map((list) => {
                                    const imgUrl = JSON.parse(list.img_url)[0];
                                    return (
                                        <ProductCard key={`product-${list.id_product}`} productId={list.id_product} name={list.product_name} category={list.category_name} price="35000" discount="Disc 40$" imageUrl={imgUrl} />
                                    )}
                                )}
                            </>
                        ) : (
                            <div>tidak ada produk</div>
                        )}
                        </div>
                    </div>
                </section>
            ) : (
                <ProductSectionSkeleton />
            )}
        </>
    );
};

ProductSection.propTypes = {
    title: propTypes.string,
    subtitle: propTypes.string,
    perPage: propTypes.number,
    category: propTypes.string,
    withPagination: propTypes.bool,
};

ProductSection.defaultProps = {
    title: "",
    category: "",
    subtitle: "",
    perPage: 4,
    withPagination: false,
};

export default ProductSection;