import PropTypes from "prop-types";
import { AiOutlinePicture, AiOutlineHdd, AiOutlineDownload } from "react-icons/ai";
import { BsShieldCheck } from "react-icons/bs";

import { Carousel, CarouselItem, CategoryCard, ProductCard, ProductSection, PromoCard, SectionTitle } from "components";
// import {
//     BannerHeader,
//     PromoCard,
//     Tag,
//     ProductCard,
//     Carousel,
//     ListOutlet
// } from "components";
// import { useRouter } from "next/router";
// import { SORT_PRODUCT } from "constants";

const Index = ({
    pageTitle,
}) => {
    return (
        <div 
            className="mb-6 md:mt-3 mt-0"
        >
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
                        <CarouselItem name="Promo Akun Spotify" description="Dapatkan promo termurah di bulan ini, kali ini akun spotify harganya lebih terjangkau. Nikmati diskon 50% sampai 31 Oktober 2023" link="/" imageUrl="/images/carousel/2.jpeg" />

                        <CarouselItem name="Promo Akun Spotify" description="Dapatkan promo termurah di bulan ini, kali ini akun spotify harganya lebih terjangkau. Nikmati diskon 50% sampai 31 Oktober 2023" link="/" imageUrl="/images/carousel/2.jpeg" />

                        <CarouselItem name="Promo Akun Spotify" description="Dapatkan promo termurah di bulan ini, kali ini akun spotify harganya lebih terjangkau. Nikmati diskon 50% sampai 31 Oktober 2023" link="/" imageUrl="/images/carousel/3.jpeg" />
                    </Carousel>
                </div>
            </section>

            <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                <div className="md:mx-auto md:max-w-[1110px] px-4">
                    <SectionTitle title="Promo Hari Ini" subtitle="Ayo buruan beli akun sekarang, sebelum kehabisan" />
                    <div className="grid gap-4 grid-cols-3 my-4">
                        <PromoCard name="Envato Elements" category="Akun Design" price="35000" discount="Disc 40$" imageUrl={"/images/carousel/square.jpeg"} />
                        
                        <PromoCard name="Zoom Meeting" category="Akun Subscription" price="35000" discount="Disc 40$" imageUrl={"/images/carousel/square.jpeg"} />

                        <PromoCard name="Cyber Ghost" category="Akun VPN" price="35000" discount="Disc 40$" imageUrl={"/images/carousel/square.jpeg"} />
                    </div>
                </div>
            </section>

            <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                <div className="md:mx-auto md:max-w-[1110px] px-4">
                    <SectionTitle title="Kategori Produk" subtitle="Kami memiliki beberapa produk spesial buat kamu" />
                    <div className="grid gap-4 grid-cols-4 my-4">
                        <CategoryCard
                            name="Akun Design"
                            icon={
                                <AiOutlinePicture className="text-5xl" />
                            }
                            color="#FF5C6F"
                        />

                        <CategoryCard
                            name="Akun Hosting"
                            icon={
                                <AiOutlineHdd className="text-5xl" />
                            }
                            color="#F7E0BE"
                        />

                        <CategoryCard
                            name="Akun Torrent"
                            icon={
                                <AiOutlineDownload className="text-5xl" />
                            }
                            color="#A3CEE7"
                        />

                        <CategoryCard
                            name="Akun VPN"
                            icon={
                                <BsShieldCheck className="text-5xl" />
                            }
                            color="#B591D2"
                        />
                    </div>
                </div>
            </section>

            <ProductSection title="Produk Terlaris" subtitle="Ayo jangan sampai kelewatan produk terlaris kami" perPage={4} category="1" withPagination />

            <ProductSection title="Produk Terbaru" subtitle="Produk yang baru kami rilis di minggu ini" perPage={4} category="2" withPagination />
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
