import { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Pagination, ProductCard, SectionTitle } from "components";
import { getListProduct } from "helpers/api";
import { AlertService } from "services";
import { catchError } from "helpers/formatter";
import ProductSectionSkeleton from "./ProductSectionSkeleton";
import { useStateContext } from "context/StateContext";

const ProductSection = ({ title, subtitle, perPage, category, withPagination, sort }) => {
    const [productList, setProductList] = useState([]);
    const [limit, setLimit] = useState(perPage);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [loadingState, setLoadingState] = useState(true);
    const { searchValue } = useStateContext();

    const changePageHandler = (event) => {
        fetchData(event.selected);
    }

    const fetchData = async (page) => {
        setLoadingState(true);
        try {
            const res = await getListProduct({
                ...category !== 'all' && { category: category },
                limit: limit,
                page: withPagination ? page + 1 : 1,
                ...sort && { sort_by: sort },
                name: searchValue,
            });

            if (!res.status) throw Error(res.msg);

            const {
                data,
                meta: {
                    last_page,
                    per_page,
                    current_page,
                },
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
    
    useEffect(() => {
        fetchData(0)
    }, [category]);

    useEffect(() => {
        fetchData(0)
    }, [searchValue]);

    return (
        <>
            {!loadingState ? (
                <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                    <div className="md:mx-auto md:max-w-[1110px] px-4">
                        <SectionTitle title={title} subtitle={subtitle} />

                        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 my-4">
                        {productList.length > 0 ? (
                            <>
                                {productList.map((list) => {
                                    const imgUrl = list.img_url[0];
                                    return (
                                        <ProductCard key={`product-${list.id_product}`} productId={list.id_product} name={list.product_name} category={list.category_name} price={list.product_durations[0].price} discount="Disc 40$" imageUrl={imgUrl} />
                                    )}
                                )}
                            </>
                        ) : (
                            <div>tidak ada produk</div>
                        )}
                        </div>
                    </div>
                    {withPagination && (
                        <div className="md:mx-auto md:max-w-[1110px] px-4 flex justify-center mt-10">
                            <Pagination handlePageClick={changePageHandler} pageCount={totalPage} perPage={limit} currentPage={currentPage} />
                        </div>
                    )}
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
    sort: propTypes.string,
};

ProductSection.defaultProps = {
    title: "",
    category: "",
    subtitle: "",
    perPage: 4,
    withPagination: false,
    sort: undefined,
};

export default ProductSection;
