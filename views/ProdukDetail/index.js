import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { AddCart, ImageSlider, ProductSection, SectionTitle, Variant } from "components";
import { AiOutlineStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getDetailProduct } from "helpers/api";
import { AlertService } from "services";
import { catchError, toRupiah } from "helpers/formatter";
import ProdukDetailSkeleton from "./ProdukDetailSkeleton";
import { useStateContext } from "context/StateContext";

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

    useEffect(() => {
        fetchData();
    }, [id_produk]);

    return (
        <>
            {!loadingState ? (
                <div 
                    className="mb-6 md:mt-3 mt-0"
                >
                    <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                        <div className="md:mx-auto md:max-w-[1110px] px-4 flex gap-8">
                            <div className="w-1/2">
                                <ImageSlider imageList={productDetail.img_url} />
                            </div>
                            <div className="w-1/2">
                                <div className="font-bold text-3xl">{productDetail.product_name}</div>
                                <div className="font-bold text-xl mt-2">{toRupiah(price)}</div>
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
        
                    <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                        <div className="md:mx-auto md:max-w-[1110px] px-4 flex flex-col gap-8">
                            <SectionTitle title="Review" subtitle="Isi review kamu sekarang juga... dan jangan lupa review produk “Icon Scout Premium” dibawah." rightButton={false} />
                            <div className="flex flex-col mt-6">
                                <label className="text-sm font-bold">Beri Rating</label>
                                <div className="flex gap-1 mt-1">
                                    <AiOutlineStar className="text-2xl text-[#F8CA56] cursor-pointer" />
                                    <AiOutlineStar className="text-2xl text-[#F8CA56] cursor-pointer" />
                                    <AiOutlineStar className="text-2xl text-[#F8CA56] cursor-pointer" />
                                    <AiOutlineStar className="text-2xl text-[#F8CA56] cursor-pointer" />
                                    <AiOutlineStar className="text-2xl text-[#F8CA56] cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex w-full gap-5">
                                <div className="w-1/2">
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Nama
                                    </label>
                                    <input type="text" id="first_name" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Email
                                    </label>
                                    <input type="text" id="first_name" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Review
                                </label>
                                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                            </div>
                            <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full w-fit flex items-center text-white text-base font-bold cursor-pointer">
                                Tulis Review
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
