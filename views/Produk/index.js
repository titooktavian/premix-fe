import PropTypes from "prop-types";
import { AiOutlinePicture, AiOutlineHdd, AiOutlineDownload } from "react-icons/ai";
import { BsShieldCheck } from "react-icons/bs";

import { CategoryCard, ProductCard, PromoCard, SectionTitle } from "components";
import { HiOutlineSearch } from "react-icons/hi";
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
            <section className="-mx-4 mb-4 p-4 md:mx-0">
                <div className="md:mx-auto md:max-w-[1110px] px-4">
                    <div
                        className="flex flex-col w-full h-[220px] bg-cover bg-no-repeat rounded-3xl text-white justify-center p-4"
                        style={{
                            backgroundImage: `url('/images/carousel/2.jpeg')`,
                        }}
                    >
                        <div className="font-bold text-3xl">Kategori Produk</div>
                        <div className="font-normal text-base">Temukan akun yang sesuai dengan kebutuhanmu disini</div>
                    </div>
                </div>
            </section>

            <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                <div className="md:mx-auto md:max-w-[1110px] px-4">
                    <SectionTitle title="Kategori Produk “Akun Desain”" subtitle="Disini kamu bisa melihat semua kategori produk kami" rightButton={false} />
                </div>
            </section>

            <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                <div className="md:mx-auto md:max-w-[1110px] px-4">
                    <div className="flex">
                        <div className="w-1/2">
                            <label className="relative block w-1/2">
                                <span className="sr-only">Search</span>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <HiOutlineSearch />
                                </span>
                                <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm rounded-lg" placeholder="Cari" type="text" name="search"/>
                            </label>
                        </div>
                        <div className="flex w-1/2 justify-end">
                            <div className="w-1/2">
                                <div class="flex justify-center">
                                    <div class="mb-3 w-full">
                                        <select
                                            class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-slate-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:ring-sky-500 focus:ring-1 focus:outline-none"
                                            aria-label="Default select example"
                                        >
                                            <option selected>Pilih Kategori</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
