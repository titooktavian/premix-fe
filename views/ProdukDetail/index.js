import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { AddCart, ImageSlider, ProductCard, SectionTitle, Variant } from "components";
import { AiOutlineStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getDetailProduct } from "helpers/api";
import { AlertService } from "services";
import { catchError, toRupiah } from "helpers/formatter";

const Index = ({
    pageTitle,
}) => {
    const router = useRouter();
    const { id_produk } = router.query;
    const [productDetail, setProductDetail] = useState([]);
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [loadingState, setLoadingState] = useState(true);
    const [cartValue, setCartValue] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(0);

    const fetchData = async () => {
        setLoadingState(true);
        try {
            const res = await getDetailProduct(id_produk);

            setProductDetail(res);
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

    useEffect(() => {
        fetchData();
    }, [id_produk]);

    console.log(productDetail)
    return (
        <div 
            className="mb-6 md:mt-3 mt-0"
        >
            <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                <div className="md:mx-auto md:max-w-[1110px] px-4 flex gap-8">
                    <div className="w-1/2">
                        <ImageSlider />
                    </div>
                    <div className="w-1/2">
                        <div className="font-bold text-3xl">{productDetail.product_name}</div>
                        <div className="font-bold text-xl mt-2">{toRupiah(price)}</div>
                        <div className="text-base font-normal text-[#6E6C85] mt-2">
                            {productDetail.description}
                        </div>

                        <Variant label="Durasi" list={productDetail.product_durations} clickHandler={changeVariantHandler} selectedVariant={selectedVariant} />

                        <AddCart cartValue={cartValue} setCartValue={setCartValue} stock={stock} />

                        <div className="flex flex-col mt-6">
                            <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full w-fit flex items-center text-white text-base font-bold cursor-pointer">
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

            <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                <div className="md:mx-auto md:max-w-[1110px] px-4">
                    <SectionTitle title="Produk Terkait" subtitle="" />

                    <div className="grid gap-4 grid-cols-4 my-4">
                        <ProductCard name="Akun Iconscout" category="Akun Design" price="35000" discount="Disc 40$" imageUrl={"/1.png"} />
                        <ProductCard name="Akun Canva" category="Akun Design" price="35000" discount="Disc 40$" imageUrl={"/2.png"} />
                        <ProductCard name="Akun Powtoon" category="Akun Design" price="35000" discount="Disc 40$" imageUrl={"/3.png"} />
                        <ProductCard name="Akun Vecteezy" category="Akun Design" price="35000" discount="Disc 40$" imageUrl={"/4.png"} />
                    </div>
                </div>
            </section>
        </div>
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
