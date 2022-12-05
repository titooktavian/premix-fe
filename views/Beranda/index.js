import PropTypes from "prop-types";

import { Carousel, CarouselItem, CategoryCard, ProductSection, PromoCard, SectionTitle } from "components";
import { getAllCategories, getBanner, getListProduct } from "helpers/api";
import { AlertService } from "services";
import { useEffect, useState } from "react";
import { catchError } from "helpers/formatter";
import Image from "next/image";

const Index = ({
    pageTitle,
}) => {
    const [categoryList, setCategoryList] = useState([]);
    const [bannerList, setBannerList] = useState([]);
    const [productPromo, setProductPromo] = useState([]);

    const fetchCategory = async () => {
        try {
            const res = await getAllCategories();
            if (!res.status) throw Error(res.msg);
            setCategoryList(res.data);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    };

    const fetchBanner = async () => {
        try {
            const res = await getBanner();
            if (!res.status) throw Error(res.msg);

            setBannerList(res.data);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    };

    const fetchProductPromo = async () => {
        try {
            const res = await getListProduct({
                sort_by: 2,
                limit: 3,
                page: 1,
            });

            if (!res.status) throw Error(res.msg);

            const {
                data,
            } = res;

            setProductPromo(data);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    };

    useEffect(() => {
        fetchCategory();
        fetchBanner();
        fetchProductPromo();
    }, []);

    return (
        <div 
            className="mb-6 md:mt-3 mt-0"
        >
            {bannerList.length > 0 && (
                <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                    <div className="md:mx-auto md:max-w-[1110px] px-4">
                        <Carousel
                            options={{
                                accessibility: true,
                                adaptiveHeight: false,
                                autoPlay: true,
                                cellAlign: 0,
                                contain: false,
                                draggable: true,
                                lazyLoad: true,
                                pageDots: false,
                                prevNextButtons: true,
                                groupCells: 1,
                                wrapAround: true,
                            }}
                        >
                            {bannerList.map((banner) => (
                                <CarouselItem key={`banner-${banner.id}`} name={banner.title} description={banner.description} link={banner.redirect_url} imageUrl={banner.img_url} />
                            ))}
                        </Carousel>
                    </div>
                </section>
            )}

            {productPromo.length > 0 && (
                <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                    <div className="md:mx-auto md:max-w-[1110px] px-4">
                        <SectionTitle title="Promo Hari Ini" subtitle="Ayo buruan beli akun sekarang, sebelum kehabisan" />
                        <div className="grid gap-4 grid-cols-3 my-4">
                            {productPromo.map((promo) => (
                                <PromoCard key={`promo-${promo.id_product}`} idProduct={promo.id_product} name={promo.product_name} category={promo.category_name} price={promo.product_durations[0].price} discount={promo.promo_percentage} imageUrl={promo.img_url[0]} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                <div className="md:mx-auto md:max-w-[1110px] px-4">
                    <SectionTitle title="Kategori Produk" subtitle="Kami memiliki beberapa produk spesial buat kamu" />
                    <div className="grid gap-4 grid-cols-4 my-4">
                        {categoryList.map((category) => (
                            <CategoryCard
                                key={`category-${category.id_product_category}`}
                                name={category.category_name}
                                icon={
                                    <Image src={category.icon_url} layout='fill' objectFit='contain'/>
                                }
                                idCategory={category.id_product_category}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <ProductSection title="Produk Terlaris" subtitle="Ayo jangan sampai kelewatan produk terlaris kami" perPage={4} category="1" withPagination={false} />

            <ProductSection title="Produk Terbaru" subtitle="Produk yang baru kami rilis di minggu ini" perPage={4} category="2" withPagination={false} sort="1" />
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
