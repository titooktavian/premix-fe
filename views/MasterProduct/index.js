import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { AlertService } from "services";
import { ContentHeader, Pagination, Sidebar, TextEditor } from "components";
import { useEffect, useState } from "react";
import { catchError } from "helpers/formatter";
import Table from "components/Table/Table";
import ActionColumn from "components/Table/components/ActionColumn";
import { createProduct, getAllCategories, getListProduct, updateProduct } from "helpers/api";
import ProductStatusColumn from "components/Table/components/ProductStatusColumn";
import { AiFillCloseCircle } from "react-icons/ai";
import { getTokenLocalStorage, generateRandomId } from "helpers/utils";
import Switch from "react-switch";
import { HiTrash } from "react-icons/hi";

const Index = ({
    pageTitle,
}) => {
    const { setLoading } = useStateContext();
    const [showDetail, setShowDetail] = useState(false);
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [orderList, setOrderList] = useState([]);
    const [productName, setProductName] = useState('');
    const [productPromo, setProductPromo] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [productImage, setProductImage] = useState([]);
    const [productStatus, setProductStatus] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productDuration, setProductDuration] = useState([{
        id: generateRandomId(10),
        duration: 0,
        price: 0,
        stock: 0,
    }]);
    const [categoryList, setCategoryList] = useState([]);
    const [formType, setFormType] = useState('add');
    const [productId, setProductId] = useState('');

    const headerContent = [
        {
            name: 'Product',
            selector: 'product_name',
        },
        {
            name: 'Category',
            selector: 'category_name',
        },
        {
            name: 'Status',
            selector: 'is_active',
            customComponent: (data) => (
                <ProductStatusColumn data={data.is_active} />
            ),
        },
        {
            name: 'Aksi',
            selector: 'name',
            customComponent: (data) => (
                <ActionColumn data={data} clickHandler={(data) => { rowClickHandler(data) }} />
            ),
        },
    ];

    const rowClickHandler = (data) => {
        setProductName(data.product_name);
        setProductPromo(data.promo_percentage);
        setSelectedCategory(data.id_product_category);
        setDeskripsi(data.description);
        setProductImage(data.img_url);
        setProductStatus(data.is_active === '1' ? true : false);
        setProductId(data.id_product);

        const newProductDuration = data.product_durations.map((dur) => {
            const newObj = {
                id: dur.id_product_duration,
                duration: dur.duration_value,
                price: dur.price,
                stock: dur.stock,
            }

            return newObj;
        });

        setProductDuration(newProductDuration);

        setFormType('edit');
        setShowDetail(true);
    }

    const changePageHandler = (event) => {
        fetchData(event.selected);
    }

    const fetchData = async (page) => {
        setLoading(true);
        try {
            const res = await getListProduct({
                limit: limit,
                page: page + 1,
            });

            if (!res.status) throw Error(res.msg);

            const {
                data,
                meta: {
                    last_page,
                    per_page,
                    current_page,
                },
            } = res;

            setOrderList(data);
            setCurrentPage(current_page);
            setLimit(per_page);
            setTotalPage(last_page);
            setLoading(false);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    };

    const showForm = (type) => {
        setFormType(type);
        setShowDetail(true);
    }

    const handleUploadFile = async (e) => {
        setLoading(true);
        try {
            const image = e.target.files[0];
            const formdata = new FormData();
            formdata.append("images[]", image);

            const headers = {
                access_token: getTokenLocalStorage(),
            };
            const response = await fetch("https://api.premixstore.com/api/image-upload", {
                method: "POST",
                headers,
                body: formdata,
            });

            let data;
            try {
                data = await response.json();
            } catch (e) {
                data = null;
            }

            if (!data.status) throw Error(data.msg);

            const tempProductImage = [...productImage, ...[data.data[0]]];

            setProductImage(tempProductImage);
        } catch (error) {
            AlertService.error(catchError(error));
        }
        setLoading(false);
    }

    const addProductDuration = () => {
        const tempProductDuration = [...productDuration, ...[{
            id: generateRandomId(10),
            duration: 0,
            price: 0,
            stock: 0,
        }]];

        setProductDuration(tempProductDuration);
    }

    const removeProductDuration = (id) => {
        const newDuration = productDuration.filter(item => item.id !== id);

        setProductDuration(newDuration);
    }

    const editProductDuration = (id, value, key) => {
        const newDuration = productDuration.map((duration) => {
            if (duration.id === id) {
                let newObj = {...duration};
                newObj[key] = value;

                return newObj;
            }

            return duration;
        })
        
        setProductDuration(newDuration);
    }

    const fetchCategory = async () => {
        try {
            const res = await getAllCategories();

            if (!res.status) throw Error(res.msg);

            setCategoryList(res.data);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    };

    const onSubmit = async () => {
        setLoading(true);
        try {
            const newDuration = productDuration.map((duration) => {
                const durationObj = {
                    duration_value: duration.duration,
                    price: duration.price,
                    stock: duration.stock,
                }
    
                return durationObj;
            });
    
            const payload ={
                product_name: productName,
                description:deskripsi,
                id_product_category: selectedCategory,
                is_active: productStatus,
                promo_percentage: productPromo,
                product_duration: [...newDuration],
                images: [...productImage],
                ...formType === 'edit' && {
                    id_product: productId,
                }
            };


            let formAction = createProduct;
            if (formType === 'edit') formAction = updateProduct;

            const res = await formAction(payload);

            if (!res.status) throw Error(res.msg);

            const messageUser = formType === 'edit' ? 'Berhasil mengubah produk' : 'Berhasil membuat produk baru';
            AlertService.error(messageUser);
            fetchData(0);
            setShowDetail(false);
        } catch (error) {
            console.log(error)
            AlertService.error(catchError(error));
        }
        setLoading(false);
    }

    const removeImageProduct = (imgProduct) => {
        const filteredImage = productImage.filter(e => e !== imgProduct);

        setProductImage(filteredImage);
    }

    useEffect(() => {
        fetchData(0)
    }, []);

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <div 
            className="mb-6 md:mt-3 mt-0"
        >
            <ContentHeader title="Produk" subtitle="Lihat, buat, dan ubah produk yang ingin anda jual" />

            <section className="-mx-4 mb-4 p-4 md:mx-0">
                <div className="md:mx-auto md:max-w-[1110px] px-4 flex gap-4">
                    <div className="w-2/6 self-start">
                        <Sidebar />
                    </div>
                    <div className="w-4/6 flex flex-col bg-[#F4F4FD] rounded-3xl p-8 gap-4 self-start">
                        <div className="flex gap-2">
                            <div className="font-bold w-2/3 text-2xl">{!showDetail ? 'List Produk' : 'Produk'}</div>
                            {!showDetail && (
                                <div className="w-1/3 flex justify-end">
                                    <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full flex justify-center items-center text-white text-base font-bold cursor-pointer" onClick={() => { showForm('add'); }}>
                                        Buat
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            {!showDetail && (
                                <>
                                    <Table header={headerContent} content={orderList} />
                                    <div className="w-full px-4 flex justify-center mt-5">
                                        <Pagination handlePageClick={changePageHandler} pageCount={totalPage} perPage={limit} currentPage={currentPage} />
                                    </div>
                                </>
                            )}
                            {showDetail && (
                                <div className="w-full flex flex-col gap-4">
                                    <div className="flex w-full flex-col bg-white rounded-lg p-6 gap-5">
                                        <div className="flex w-full gap-5">
                                            <div className="flex items-center justify-center w-1/2 flex-col">
                                                <label htmlFor="file-uploader" className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Upload Gambar</span></p>
                                                        <p className="text-xs text-gray-500">Maksimal gambar 1 MB</p>
                                                    </div>
                                                    <input id="file-uploader" type="file" className="hidden" onChange={handleUploadFile} />
                                                </label>
                                                <div className="flex gap-2 mt-2 w-full">
                                                    {productImage.map((img, i) => (
                                                        <div
                                                            className="relative w-12 h-12 cursor-pointer bg-cover p-[2px] rounded-md flex justify-end"
                                                            key={`product-img-${i}`}
                                                            style={{
                                                                backgroundImage: `url(${img})`,
                                                            }}
                                                        >
                                                            <AiFillCloseCircle onClick={() => { removeImageProduct(img) }} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex w-1/2 flex-col gap-2">
                                                <div className="">
                                                    <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900">Nama</label>
                                                    <input type="text" id="product_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 -mt-1" placeholder="Masukkan nama produk" value={productName} onChange={(e) => { setProductName(e.target.value) }} />
                                                </div>
                                                <div className="mt-2">
                                                    <label htmlFor="product_promo" className="block mb-2 text-sm font-medium text-gray-900">Promo</label>
                                                    <input type="text" id="product_promo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 -mt-1" placeholder="Masukkan persen promo" value={productPromo} onChange={(e) => { setProductPromo(e.target.value) }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="mt-3 w-full">
                                                <label htmlFor="deskripsi" className="block mb-1 text-sm font-medium text-gray-900">Kategori</label>
                                                <select
                                                    className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-slate-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:ring-sky-500 focus:ring-1 focus:outline-none"
                                                    aria-label="Default select example"
                                                    onChange={(e) => { setSelectedCategory(e.target.value) }}
                                                    value={selectedCategory}
                                                >
                                                    <option value="all">Pilih Kategori</option>
                                                    {categoryList.map((catItem) => (
                                                        <option key={`cat-${catItem.id_product_category}`} value={catItem.id_product_category.toString()}>{catItem.category_name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mt-3 w-full">
                                                <label htmlFor="deskripsi" className="block -mb-3 text-sm font-medium text-gray-900">Deskripsi</label>
                                                <TextEditor editorState={deskripsi} changeEvent={setDeskripsi} />
                                            </div>
                                            <div className="mt-3 w-full">
                                                <div className="flex gap-3">
                                                    <label htmlFor="deskripsi" className="block -mb-3 text-sm font-medium text-gray-900 mt-[2px]">Durasi</label>
                                                    <div className="h-[24px] px-[16px] rounded-full flex justify-center items-center text-[#8581B7] text-base font-bold cursor-pointer border-[1px] border-[#8581B7]" onClick={() => { addProductDuration(); }}>
                                                        Tambah
                                                    </div>
                                                </div>
                                                
                                                {productDuration.map((duration) => (
                                                    <div className="flex gap-2" key={`duration-${duration.id}`}>
                                                        <div className="mt-2">
                                                            <label htmlFor="product_promo" className="block mb-2 text-sm font-medium text-gray-900">Hari</label>
                                                            <input type="text" id="product_promo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 -mt-1" placeholder="Jumlah hari" value={duration.duration} onChange={(e) => { editProductDuration(duration.id, e.target.value, 'duration') }} />
                                                        </div>
                                                        <div className="mt-2">
                                                            <label htmlFor="product_promo" className="block mb-2 text-sm font-medium text-gray-900">Harga</label>
                                                            <input type="text" id="product_promo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 -mt-1" placeholder="Harga" value={duration.price} onChange={(e) => { editProductDuration(duration.id, e.target.value, 'price') }} />
                                                        </div>
                                                        <div className="mt-2">
                                                            <label htmlFor="product_promo" className="block mb-2 text-sm font-medium text-gray-900">Stok</label>
                                                            <input type="text" id="product_promo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 -mt-1" placeholder="Stok" value={duration.stock} onChange={(e) => { editProductDuration(duration.id, e.target.value, 'stock') }} />
                                                        </div>
                                                        <div className="mt-2 flex items-end">
                                                            <div className="h-[42px] w-[42px] bg-[#FF5C6F] rounded-lg flex justify-center items-center text-white text-base font-bold cursor-pointer" onClick={() => { removeProductDuration(duration.id); }}>
                                                                <HiTrash />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                
                                            </div>
                                            <div className="mt-6 w-full flex">
                                                <label htmlFor="first_name" className="block -mb-3 text-sm font-medium text-gray-900 w-1/6 mt-[2px]">Status</label>
                                                <Switch
                                                    checked={productStatus}
                                                    onChange={() => { setProductStatus(!productStatus) }}
                                                    onColor="#86d3ff"
                                                    onHandleColor="#2693e6"
                                                    handleDiameter={30}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                    height={20}
                                                    width={48}
                                                    className="react-switch"
                                                    id="material-switch"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="w-full flex gap-2">
                                        <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full flex justify-center items-center text-white text-base font-bold cursor-pointer mt-3" onClick={() => { onSubmit(); }}>
                                            {formType === 'add' ? 'Buat Produk' : 'Ubah Produk'}
                                        </div>
                                        <div className="h-[37px] px-[24px] rounded-full w-fit flex justify-center items-center text-[#8581B7] text-base font-bold cursor-pointer mt-3 border-[1px] border-[#8581B7]" onClick={() => {setShowDetail(false);}}>
                                            Kembali
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
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
