import { useState, useEffect } from "react";
import { Carousel, ListOutlet, Modal, ProductCard, PromoCard } from "components";
import { useRouter } from "next/router";

import {
    FaChevronDown,
    FaSearch,
    FaThLarge,
    FaThList,
    FaDesktop
} from "react-icons/fa";

import { BsCheckLg } from "react-icons/bs";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { getOutletProducts } from "helpers/api";
import { useStateContext } from "context/StateContext";
import { AlertService } from "services";
import { catchError } from "helpers/formatter";
import { SORT_PRODUCT, PRODUCT_VIEW, PRODUCT_VIEW_CLASS } from "constants/enum";
import useResponsive from "hooks/useResponsive";

const Index = ({ categories, promos, listOutlet, selectedOutlet }) => {
    const listSort = Object.keys(SORT_PRODUCT);
    const [productView, setProductView] = useState(PRODUCT_VIEW.GRID);
    const [queryType, setQueryType] = useState(SORT_PRODUCT[listSort[0]]);
    const [categoryPopup, setCategoryPopup] = useState(false);
    const [sortPopup, setSortPopup] = useState(false);
    const [productViewClasses, setProductViewClasses] = useState(PRODUCT_VIEW_CLASS.GRID);
    const { setLoading } = useStateContext();
    const [ products, setProducts ] = useState([]);
    const [ totalProduct, setTotalProduct] = useState(0);
    const [ currentPage, setCurrentPage] = useState(1);
    const [isHasMore, setIsHasMore] = useState(true);
    const [search, setSearch] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const router = useRouter();
    const { query: { kategori, sort_type, sort_by } } = router;
    const { isMobile } = useResponsive();

    const changeProductView = (view=null) => {
        if (view) {
            setProductView(PRODUCT_VIEW[view.toUpperCase()]);
            setProductViewClasses(PRODUCT_VIEW_CLASS[view.toUpperCase()]);
        } else {
            switch (productView) {
            case PRODUCT_VIEW.GRID:
                setProductView(PRODUCT_VIEW.LIST);
                setProductViewClasses(PRODUCT_VIEW_CLASS.LIST);
                break;
            case PRODUCT_VIEW.LIST:
                setProductView(PRODUCT_VIEW.DESKTOP);
                setProductViewClasses(PRODUCT_VIEW_CLASS.DESKTOP);
                break;
            case PRODUCT_VIEW.DESKTOP:
                setProductView(PRODUCT_VIEW.GRID);
                setProductViewClasses(PRODUCT_VIEW_CLASS.GRID);
                break;
            }
        }
    };

    const selectCategory = (id) => {
        if (id !== "all") router.push(`/produk?kategori=${id}`);
        else router.push("/produk");
    };

    const selectSortBy = (type) => {
        let sortQuery;
        const { sort_type, sort_by } = SORT_PRODUCT[type];
        sortQuery = { sort_type, sort_by};
        router.push({
            pathname: "/produk",
            query: { ...router.query, ...sortQuery }
        });
    };

    const fetchProduct = (isInit = false) => {
        if(isFetching) return;
        setIsFetching(true);
        setLoading(true);
        let tempProducts = products;
        let page = currentPage + 1;
        if (isInit) {
            page = 1;
            tempProducts = [];
        }
        const payload = {
            per_page: 15,
            page: page,
            sort_type: sort_type,
            sort_by: sort_by,
            search: search ? encodeURIComponent(search) : '',
            "filter[category]": kategori
        };
        getOutletProducts(selectedOutlet, payload).then( res => {
            if(!res.status) {
                throw (res);
            }
            setTotalProduct(res.data.length > 0 ? res.meta.total : 0);
            setIsHasMore(res.meta.current_page != res.meta.last_page);
            setCurrentPage(page);
            setProducts(tempProducts.concat(res.data));
        }).catch( (error) =>{
            AlertService.error(catchError(error))
        }).finally(()=>{
            setIsFetching(false);
            setLoading(false);
        });
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        fetchProduct(true);
    }

    const productIcon = () =>{
        switch(productView) {
        case PRODUCT_VIEW.GRID:
            return <FaThLarge />
        case PRODUCT_VIEW.LIST:
            return <FaThList />
        case PRODUCT_VIEW.DESKTOP:
            return <FaDesktop />
        }
    }

    useEffect(() => {
        if(sort_by && sort_type) {
            const selectedSort = listSort.find((v)=> {
                return (SORT_PRODUCT[v].sort_by === sort_by && SORT_PRODUCT[v].sort_type === sort_type )
            })
            setQueryType(selectedSort);
        } else setQueryType(listSort[0]);
        fetchProduct(true);
        setSortPopup(false);
        setCategoryPopup(false);
    }, [router]);

    useEffect(() => {
        if(!isMobile && productView === PRODUCT_VIEW.DESKTOP) changeProductView();
    }, [isMobile]);
    return (
        <div className="">
            <Modal
                isPopup={categoryPopup}
                title="Pilih Kategori"
                type="halfscreen"
                onRequestClose={() => setCategoryPopup(false)}
                isDivider={false}
                isShowClose={false}
            >
                <div className="flex max-h-screen-80 flex-col space-y-4 overflow-y-scroll py-4 md:h-full md:overflow-y-visible">
                    <div
                        onClick={() => selectCategory("all")}
                        className={`flex cursor-pointer justify-between text-sm font-bold  ${
                            kategori === undefined
                                ? "text-turq-300"
                                : "text-dark-300"
                        }`}
                    >
                        <p className="">Semua Produk</p>
                        {kategori === undefined && <BsCheckLg />}
                    </div>
                    {categories.length >= 1 &&
                        categories?.map((category) => (
                            <div
                                onClick={() => selectCategory(category.id)}
                                key={category.id}
                                className={`flex cursor-pointer justify-between text-sm font-bold  ${
                                    kategori === category.id
                                        ? "text-turq-300"
                                        : "text-dark-300"
                                }`}
                            >
                                <p className="">{category.name}</p>
                                {kategori === category.id && (
                                    <BsCheckLg />
                                )}
                            </div>
                        ))}
                </div>
            </Modal>
            <Modal
                isPopup={sortPopup}
                title="Urutkan"
                type="halfscreen"
                onRequestClose={() => setSortPopup(false)}
                isDivider={false}
                isShowClose={false}
            >
                <div className="flex max-h-screen-80 flex-col space-y-4 overflow-y-scroll py-4 md:h-auto md:overflow-visible">
                    {listSort?.map((sort) => (
                        <div 
                            key={sort}
                            onClick={() => selectSortBy(sort)}
                            className={`flex cursor-pointer justify-between text-base font-bold ${queryType === sort
                                ? "text-turq-300"
                                : "text-dark-300"
                            }`}
                        >
                            <p className="">{SORT_PRODUCT[sort].label}</p>
                            {queryType === sort && <BsCheckLg />}
                        </div>
                    ))}
                </div>
            </Modal>
            <section className="md:mx-auto md:max-w-[960px]">
                <ListOutlet listOutlet={listOutlet} />
            </section>
            {promos.length > 0 && (
                <section className="-mx-4 mb-4 bg-neutral-100 p-4 md:mx-0 ">
                    <div className="flex items-center justify-between pb-4 md:mx-auto md:max-w-[960px]">
                        <h2 className="text-base font-bold text-dark-300">
                            Promo Terkini
                        </h2>
                        <Link href="/promo">
                            <a className="text-xs font-bold text-turq-300">
                                Semua Promo
                            </a>
                        </Link>
                    </div>
                    <div className="md:mx-auto md:max-w-[960px]">
                        <Carousel>
                            {promos?.map((promo) => (
                                <PromoCard
                                    key={promo.promo_id}
                                    className="mx-2 w-full cursor-pointer md:w-2/5"
                                    {...promo}
                                />
                            ))}
                        </Carousel>
                    </div>
                </section>
            )}
            <div className="md:mx-auto md:grid  md:max-w-[960px] md:grid-cols-[245px_auto] md:grid-rows-[auto_auto_1fr_1fr] md:gap-4">
                {/* Left side */}
                <div className="max-height-[60vh] hidden md:block md:h-fit md:rounded-2xl md:bg-neutral-100 md:p-4">
                    <h3 className="mb-[5px] text-base font-bold">Kategori</h3>
                    <div className="flex max-h-[60vh] flex-col space-y-2 overflow-y-auto p-1">
                        <p
                            onClick={() => selectCategory("all")}
                            className={`cursor-pointer rounded-2xl bg-dark-100 py-[10px] px-4 text-sm font-medium text-white ${
                                kategori === undefined
                                    ? "bg-dark-100 text-white"
                                    : "bg-transparent text-dark-300"
                            }`}
                        >
                            Semua Produk
                        </p>
                        {categories.length >= 1 &&
                            categories?.map((category) => (
                                <p
                                    key={category.id}
                                    onClick={() => selectCategory(category.id)}
                                    className={`cursor-pointer rounded-2xl py-[10px] px-4 text-sm font-medium ${
                                        kategori === category.id
                                            ? "bg-dark-100 text-white"
                                            : "bg-transparent text-dark-300"
                                    }`}
                                >
                                    {category.name}
                                </p>
                            ))}
                    </div>
                </div>
                {/* Right side */}
                <div className="">
                    <button
                        onClick={() => setCategoryPopup(true)}
                        className="mt-4 mb-2 flex w-full items-center justify-between rounded-full bg-neutral-100 p-[10px] text-base font-bold md:hidden"
                    >
                        <span>Kategori</span>
                        <span>
                            <FaChevronDown />
                        </span>
                    </button>
                    <div className="md:sticky md:top-0 md:flex md:items-center md:justify-between md:bg-white md:pb-2">
                        <h3 className="hidden text-base font-bold md:block">
                            Total {totalProduct} Produk
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setSortPopup(true)}
                                className="flex w-full items-center justify-between rounded-full bg-neutral-100 p-[10px] text-base font-bold"
                            >
                                <span>Urutkan</span>
                                <span>
                                    <FaChevronDown />
                                </span>
                            </button>
                            <div className="flex w-full items-center space-x-2 rounded-full border border-neutral-100 p-[10px] text-base">
                                <span>
                                    <FaSearch className="text-neutral-300" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Cari produk..."
                                    className="w-full font-bold outline-none placeholder:font-normal"
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="hidden justify-end items-center gap-2 md:flex">
                        <span className="font-bold text-xs">Tampilan:</span>
                        <div
                            onClick={() => changeProductView(PRODUCT_VIEW.GRID)}
                            className={`
                                ${ productView === PRODUCT_VIEW.GRID ? 'bg-dark-200 text-white' : 'text-neutral-300'}
                                flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-neutral-300
                            `}
                        >
                            <FaThLarge />
                        </div>
                        <div
                            onClick={() => changeProductView(PRODUCT_VIEW.LIST)}
                            className={`
                                ${productView === PRODUCT_VIEW.LIST ? 'bg-dark-200 text-white' : 'text-neutral-300'}
                                flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-neutral-300
                            `}
                        >
                            <FaThList />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between md:hidden">
                        <h3 className="text-base font-bold">Semua Produk</h3>
                        <div
                            onClick={() => changeProductView()}
                            className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-neutral-300 text-neutral-300"
                        >
                            {productIcon()}
                        </div>
                    </div>
                    <div
                        className="mt-6 md:h-[60vh] md:overflow-y-scroll md:pr-4"
                        id="scrollableDiv"
                    >
                        <InfiniteScroll
                            className={`!overflow-visible md:pl-1.5 pl-0 ${productViewClasses}`}
                            dataLength={products.length}
                            next={fetchProduct}
                            hasMore={isHasMore}
                            loader={<h4>Loading...</h4>}
                            endMessage={<></>}
                            scrollableTarget={isMobile ? "" : "scrollableDiv"}
                        >
                            {products?.map((product) => (
                                <ProductCard
                                    key={`card-${product.id_product}`}
                                    imgUrl={product.img_path}
                                    title={product.name}
                                    description={product.desc + product.long_desc}
                                    price={product.price}
                                    productID={product.id_product}
                                    view={productView}
                                    isAvailable={product.available_stock}
                                    hasPromo={product.has_promo}
                                />
                            ))}
                            {totalProduct === 0 && (
                                <span className="text-sm font-neutral-300 px-4 italic">Tidak ada produk.</span>
                            )}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
