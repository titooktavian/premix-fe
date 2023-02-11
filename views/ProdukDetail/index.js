import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { AddCart, ImageSlider, Pagination, ProductSection, SectionTitle, Variant } from "components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getDetailProduct, getListReview } from "helpers/api";
import { AlertService } from "services";
import { catchError, toRupiah } from "helpers/formatter";
import ProdukDetailSkeleton from "./ProdukDetailSkeleton";
import { useStateContext } from "context/StateContext";
import moment from "moment";

const Index = ({
    pageTitle,
}) => {
    const router = useRouter();
    const { id_produk } = router.query;
    const [productDetail, setProductDetail] = useState([]);
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [loadingState, setLoadingState] = useState(true);
    const [cartValue, setCartValue] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [sortFilter, setSortFilter] = useState('1');
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [reviewList, setReviewList] = useState([]);
    const { setLoading, onAddToCart } = useStateContext();

    const fetchData = async () => {
        setLoadingState(true);
        try {
            const res = await getDetailProduct(id_produk);

            if (!res.status) throw Error(res.msg);

            setProductDetail(res.data);
            setStock(res.data.product_durations[0].stock);
            setPrice(res.data.product_durations[0].price);
            setSelectedVariant(res.data.product_durations[0].id_product_duration);
            setLoadingState(false);
            fetchReview(0);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    };

    const changeVariantHandler = (variantId, stock, price) => {
        setSelectedVariant(variantId);
        setStock(stock);
        setPrice(price);
    }

    const updateCart = async () => {
        setLoading(true);
        const productCart = {
            idProduct: productDetail.id_product,
            quantity: cartValue,
            variant: selectedVariant,
            name: productDetail.product_name,
        };

        await onAddToCart(productCart);
        setLoading(false);
    };

    const fetchReview = async (page) => {
        setLoading(true);
        try {
            const res = await getListReview({
                limit: limit,
                page: page + 1,
            }, id_produk);

            if (!res.status) throw Error(res.msg);

            const {
                data,
                meta: {
                    last_page,
                    per_page,
                    current_page,
                },
            } = res;

            setReviewList(data);
            setCurrentPage(current_page);
            setLimit(per_page);
            setTotalPage(last_page);
            setLoading(false);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    };

    const changePageHandler = (event) => {
        fetchReview(event.selected);
    }

    const renderStar = (number) => {
        let elements = [];
        for(let i = 0; i < number; i++){
            elements.push(<AiFillStar className="text-2xl text-[#F8CA56]" />);
        }
        return elements;
    }

    useEffect(() => {
        fetchData();
    }, [id_produk]);

    return (
        <>
            {!loadingState ? (
                <div 
                    className="mb-6 md:mt-3 mt-0"
                >
                    <section className="-mx-4 mb-4 p-4 md:mx-0 border-b-[1px] md:border-0">
                        <div className="md:mx-auto md:max-w-[1110px] px-4 flex flex-col md:flex-row gap-8">
                            <div className="w-full md:w-1/2">
                                <ImageSlider imageList={productDetail.img_url} />
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="font-bold text-3xl">{productDetail.product_name}</div>
                                <div className="flex gap-2">
                                    <div className="font-bold text-xl mt-2">{toRupiah(price)}</div>
                                    <span className="py-1 px-2 bg-[#FF5C6F] rounded-2xl text-xs text-[#FFFFFF] font-bold h-fit mt-2">
                                        {`Disc ${productDetail.promo_percentage}%`}
                                    </span>
                                </div>
                                
                                <div className="text-base font-normal text-[#6E6C85] mt-2" dangerouslySetInnerHTML={{__html: productDetail.description}} />
        
                                <Variant label="Durasi" list={productDetail.product_durations} clickHandler={changeVariantHandler} selectedVariant={selectedVariant} />
        
                                <AddCart cartValue={cartValue} setCartValue={setCartValue} stock={stock} />
        
                                <div className="flex flex-col mt-6">
                                    <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full w-fit flex items-center text-white text-base font-bold cursor-pointer" onClick={() => {updateCart();}}>
                                        Beli Sekarang
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
        
                    <section className="-mx-4 mb-4 p-4 md:mx-0 border-b-[1px] md:border-0">
                        <div className="md:mx-auto md:max-w-[1110px] px-4 flex flex-col gap-8">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full md:w-3/4">
                                    <SectionTitle title="Ulasan Pilihan" subtitle="Lihat ulasan yang diberikan oleh pelanggan kami" rightButton={false} />
                                </div>
                                <div className="w-full md:w-1/4">
                                    <div>
                                        <label htmlFor="pemilik-rekening" className="block mb-1 text-sm font-medium text-gray-900">Urutkan</label>
                                        <select
                                            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-slate-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:ring-sky-500 focus:ring-1 focus:outline-none"
                                            aria-label="Default select example"
                                            onChange={(e) => {setSortFilter(e.target.value)}}
                                            value={sortFilter}
                                        >
                                            <option value="1">Terbaru</option>
                                            <option value="2">Rating Tertinggi</option>
                                            <option value="3">Rating Terendah</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                {reviewList.map((review) => (
                                    <div className="flex flex-col pb-6 border-b-[1px]" key={`review-list-${review.id_review}`}>
                                        <div className="text-base font-bold text-[#272541]">{review.reviewer_name}</div>
                                        <div className="flex gap-1 mt-1">
                                            {renderStar(review.reviewer_star)}
                                        </div>
                                        <div className="text-sm font-normal text-[#6E6C85] mt-1">{moment(review.created_at).format('DD MMM YYYY')}</div>
                                        <div className="text-base font-normal text-[#272541] mt-3">{review.reviewer_value}</div>
                                    </div>
                                ))}
                                
                                {reviewList.length <= 0 && (
                                    <div className="text-base">Belum ada ulasan</div>
                                )}
                            </div>
                            
                            <div className="w-full px-4 flex justify-center mt-5">
                                <Pagination handlePageClick={changePageHandler} pageCount={totalPage} perPage={limit} currentPage={currentPage} />
                            </div>
                        </div>
                    </section>
        
                    <ProductSection title="Produk Terkait" subtitle="" perPage={4} category={productDetail.id_product_category} withPagination={false} />
                </div>
            ) : (
                <ProdukDetailSkeleton />
            )}
        </>
        
    );
};

Index.propTypes = {
    products: PropTypes.array,
    categories: PropTypes.array,
    home: PropTypes.object
};

Index.defaultProps = {
    products: [],
    categories: [],
    home: {}
};

export default Index;
