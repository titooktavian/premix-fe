import PropTypes from "prop-types";
import { ProductSection, SectionTitle } from "components";
import { HiOutlineSearch } from "react-icons/hi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AlertService } from "services";
import { catchError } from "helpers/formatter";
import { getAllCategories } from "helpers/api";

const Index = ({
    pageTitle,
}) => {
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const router = useRouter();
    const { query: { kategori } } = router;

    const fetchCategory = async () => {
        try {
            const res = await getAllCategories();

            if (!res.status) throw Error(res.msg);

            setCategoryList(res.data);
            getCategoryName(res.data);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    };

    const getCategoryName = (list) => {
        const findItem = list.find((x) => x.id_product_category.toString() === kategori);
        if (findItem) setSelectedCategory(findItem.category_name);
    }

    const handleChangeCategory = (e) => {
        router.push({
            pathname: '/produk',
            query: { kategori: e.target.value },
        })
    }

    useEffect(() => {
        fetchCategory();
    }, []);

    useEffect(() => {
        getCategoryName(categoryList);
    }, [kategori]);

    return (
        <div 
            className="mb-6 md:mt-3 mt-0"
        >
            <section className="-mx-4 mb-4 p-4 md:mx-0">
                <div className="md:mx-auto md:max-w-[1110px] px-4">
                    <div
                        className="flex flex-col w-full h-[220px] bg-fill bg-right bg-[#272541] bg-no-repeat rounded-3xl text-white justify-center p-10"
                        style={{
                            backgroundImage: `url('/images/carousel/bg.png')`,
                        }}
                    >
                        <div className="font-bold text-3xl">Kategori Produk</div>
                        <div className="font-normal text-base">Temukan akun yang sesuai dengan kebutuhanmu disini</div>
                    </div>
                </div>
            </section>

            <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                <div className="md:mx-auto md:max-w-[1110px] px-4">
                    <SectionTitle title={`Kategori Produk ${kategori !== 'all' ? selectedCategory : ''}`} subtitle="Disini kamu bisa melihat semua kategori produk kami" rightButton={false} />
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
                                <div className="flex justify-center">
                                    <div className="mb-3 w-full">
                                        <select
                                            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-slate-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:ring-sky-500 focus:ring-1 focus:outline-none"
                                            aria-label="Default select example"
                                            onChange={handleChangeCategory}
                                            value={kategori}
                                        >
                                            <option value="all">Pilih Kategori</option>
                                            {categoryList.map((catItem) => (
                                                <option value={catItem.id_product_category.toString()}>{catItem.category_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ProductSection perPage={12} withPagination category={kategori} />
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
