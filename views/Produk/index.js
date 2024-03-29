import PropTypes from "prop-types";
import { PageHeader, ProductSection, SectionTitle } from "components";
import { HiOutlineSearch } from "react-icons/hi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AlertService } from "services";
import { catchError } from "helpers/formatter";
import { getAllCategories } from "helpers/api";
import { useStateContext } from "context/StateContext";

const Index = ({
    pageTitle,
}) => {
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const router = useRouter();
    const { query: { kategori } } = router;
    const { searchValue, setSearchValue } = useStateContext();

    let typingTimeout = 0;

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

    const handleChangeSearch = (e) => {
        clearTimeout(typingTimeout);

        typingTimeout = setTimeout(() => {
            setSearchValue(e.target.value)
        }, 500);
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
            <PageHeader title="Kategori Produk" subtitle="Temukan akun yang sesuai dengan kebutuhanmu disini" />

            <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                <div className="md:mx-auto md:max-w-[1110px] px-4">
                    <SectionTitle title={`Kategori Produk ${kategori !== 'all' ? selectedCategory : ''}`} subtitle="Disini kamu bisa melihat semua kategori produk kami" rightButton={false} />
                </div>
            </section>

            <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                <div className="md:mx-auto md:max-w-[1110px] px-4">
                    <div className="flex md:flex-row flex-col gap-2">
                        <div className="w-full md:w-1/2">
                            <label className="relative block w-full md:w-1/2">
                                <span className="sr-only">Search</span>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <HiOutlineSearch />
                                </span>
                                <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm rounded-lg" placeholder="Cari" type="text" name="search" onChange={(e) => {handleChangeSearch(e)}}/>
                            </label>
                        </div>
                        <div className="flex w-full md:w-1/2 justify-end">
                            <div className="w-full md:w-1/2">
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
                                                <option key={`cat-${catItem.id_product_category}`} value={catItem.id_product_category.toString()}>{catItem.category_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ProductSection perPage={12} withPagination category={kategori} search={searchValue} />
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
