import Link from "next/link";
import PropTypes from "prop-types";
import Image from "next/image";
import { AiOutlinePicture, AiOutlineHdd, AiOutlineDownload } from "react-icons/ai";
import { BsShieldCheck } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";

import { Carousel, CategoryCard, ListOutlet, Modal, ProductCard, PromoCard, SectionTitle } from "components";
// import {
//     BannerHeader,
//     PromoCard,
//     Tag,
//     ProductCard,
//     Carousel,
//     ListOutlet
// } from "components";
import { useRouter } from "next/router";
// import { SORT_PRODUCT } from "constants";

const Index = ({ 
    // products, 
    // categories, 
    // home, 
    // promos, 
    // recomendedProducts,
    // listOutlet,
}) => {
    const router = useRouter();
    const goToProduct = (query) => {
        const { sort_type, sort_by } = query;
        const sortQuery = { sort_type, sort_by };
        router.push({
            pathname: "/produk",
            query: { ...router.query, ...sortQuery }
        });
    }

    const flickityOptions = {
        initialIndex: 2
    }

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
                        <div
                            className={`mx-2 w-full cursor-pointer relative h-[350px] overflow-x-clip p-4 bg-green-100 rounded-3xl`}
                        >
                                <Image src="/images/carousel/1.jpeg" layout="fill" objectFit="cover" priority />
                        </div>

                        <div
                            className={`mx-2 w-full cursor-pointer relative h-[350px] overflow-x-clip p-4 bg-green-100 rounded-3xl`}
                        >
                                <Image src="/images/carousel/2.jpeg" layout="fill" objectFit="cover" priority />
                        </div>

                        <div
                            className={`mx-2 w-full cursor-pointer relative h-[350px] overflow-x-clip p-4 bg-green-100 rounded-3xl`}
                        >
                                <Image src="/images/carousel/3.jpeg" layout="fill" objectFit="cover" priority />
                        </div>
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

            <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                <div className="md:mx-auto md:max-w-[1110px] px-4">
                    <SectionTitle title="Produk Terlaris" subtitle="Ayo jangan sampai kelewatan produk terlaris kami" />

                    <div className="grid gap-4 grid-cols-4 my-4">
                        <ProductCard name="Akun Iconscout" category="Akun Design" price="35000" discount="Disc 40$" imageUrl={"/1.png"} />
                        <ProductCard name="Akun Canva" category="Akun Design" price="35000" discount="Disc 40$" imageUrl={"/2.png"} />
                        <ProductCard name="Akun Powtoon" category="Akun Design" price="35000" discount="Disc 40$" imageUrl={"/3.png"} />
                        <ProductCard name="Akun Vecteezy" category="Akun Design" price="35000" discount="Disc 40$" imageUrl={"/4.png"} />
                    </div>
                </div>
            </section>

            <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                <div className="md:mx-auto md:max-w-[1110px] px-4">
                    <SectionTitle title="Produk Terbaru" subtitle="Produk yang baru kami rilis di minggu ini" />

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
