import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { AddCart, ContentHeader, SectionTitle, Sidebar, Variant } from "components";
import { useEffect, useState } from "react";
import { catchError, toRupiah } from "helpers/formatter";
import { createTransaction, getListProduct } from "helpers/api";
import { AlertService } from "services";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Image from "next/image";

const Index = ({
    pageTitle,
}) => {
    const { setLoading, userLogin, cartItems } = useStateContext();
    const [productList, setProductList] = useState([]);
    const [searchProduct, setSearchProduct] = useState('');
    const [selectedProduct, setSelectedProduct] = useState([]);

    const fetchData = async (page) => {
        setLoading(true);
        try {
            const res = await getListProduct({
                limit: -1,
                page: page + 1,
            });

            if (!res.status) throw Error(res.msg);

            const { data } = res;
            
            reformatProduct(data);
        } catch (error) {
            AlertService.error(catchError(error));
        }

        setLoading(false);
    };

    const reformatProduct = (data) => {
        const newProductList = data.map((item) => {
            const newObj = {
                id: item.id_product,
                name: item.product_name,
                ...item
            };

            return newObj;
        });

        setProductList(newProductList);
    }

    const handleOnSearch = (string, results) => {
        console.log(string, results)
    }

    const handleOnSelect = (item) => {
        const newSelectedProduct = [
            ...selectedProduct,
            ...[{
                ...item,
                ...{ selectedVariant: '', qty: 1, price: 0, subtotal: 0 }
            }],
        ];

        setSelectedProduct(newSelectedProduct);
    }

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </>
        )
    }

    const changeVariantHandler = (productId, variantId, price) => {
        const newProductList = selectedProduct.map((items) => {
            if (items.id_product === productId) {
                const newObj = {
                    ...items,
                    ...{
                        selectedVariant: variantId,
                        price: price,
                        subtotal: price * items.qty
                    }
                }

                return newObj;
            }

            return items;
        });

        setSelectedProduct(newProductList);
    }

    const changeProductQty = (qty, productId) => {
        let newProductList = [];
        if (qty != 0) {
            newProductList = selectedProduct.map((items) => {
                if (items.id_product === productId) {
                    const newObj = {
                        ...items,
                        ...{
                            subtotal: qty * items.price,
                            qty: qty,
                        }
                    }
                    return newObj;
                }
    
                return items;
            });
        } else {
            newProductList = selectedProduct.filter(item => item.id_product !== productId);
        }

        setSelectedProduct(newProductList);
    }

    const doCreateTransaction = async () => {
        if (selectedProduct.length <= 0) {
            AlertService.error('Pilih produk terlebih dahulu');
            return;
        }

        let isVariantSelected = true;
        selectedProduct.map((items) => {
            if (items.selectedVariant === '') {
                isVariantSelected = false;
            }
        });

        if (!isVariantSelected) {
            AlertService.error('Pilih durasi terlebih dahulu');
            return;
        }

        setLoading(true);
        try {
            let transactionDetail = [];
            let total = 0;
            let subtotal = 0;
            let promoTotal = 0;
            selectedProduct.map((items) => {
                const detail = {
                    id_product: items.id_product,
                    id_product_duration: items.selectedVariant,
                    qty: items.qty,
                    subtotal: items.subtotal,
                    promo_value: (parseFloat(items.promo) / 100) * parseFloat(items.subtotal),
                }

                const price = items.subtotal;
                const promo = (parseFloat(items.promo_percentage) / 100) * items.subtotal;

                subtotal += price;
                promoTotal += promo;
                total += price - promo;

                transactionDetail.push(detail);
            })

            const res = await createTransaction({
                id_user_buyer: 2,
                subtotal: subtotal,
                total: total,
                details: transactionDetail,
                unique_code: 0,
            });

            if (!res.status) throw Error(res.msg);

            AlertService.success('Pesanan berhasil dibuat');
        } catch (error) {
            AlertService.error(catchError(error));
        }
        setLoading(false);
    }

    const renderRingkasan = () => {
        let subtotal = 0;
        let total = 0;
        let promoTotal = 0;

        selectedProduct.map((items) => {
            const price = items.subtotal;
            const promo = (parseFloat(items.promo_percentage) / 100) * items.subtotal;

            subtotal += price;
            promoTotal += promo;
            total += price - promo;
        });

        return (
            <>
                <div className="flex w-full">
                    <div className="flex w-1/3">
                        Subtotal
                    </div>
                    <div className="w-2/3 text-right">
                        {toRupiah(subtotal)}
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="flex w-1/3">
                        Promo
                    </div>
                    <div className="w-2/3 text-right text-[#FF5C6F]">
                        {`- ${toRupiah(promoTotal)}`}
                    </div>
                </div>
                <div className="flex w-full font-bold">
                    <div className="flex w-1/3">
                        Total
                    </div>
                    <div className="w-2/3 text-right">
                        {toRupiah(total)}
                    </div>
                </div>
            </>
        );
    }

    useEffect(() => {
        fetchData(0)
    }, []);

    return (
        <div 
            className="mb-6 md:mt-3 mt-0"
        >
            <ContentHeader title="Buat Transaksi" subtitle="Buat transaksi anda di sini" />

            <section className="-mx-4 mb-4 p-4 md:mx-0">
                <div className="md:mx-auto md:max-w-[1110px] px-4 flex gap-4">
                    <div className="w-2/6 self-start">
                        <Sidebar />
                    </div>
                    <div className="w-4/6 flex flex-col bg-[#F4F4FD] rounded-3xl p-8 gap-4 self-start">
                        <SectionTitle title="Input Transaction" subtitle=""  />

                        <div className="relative">
                            <div className="flex flex-col">
                                <div className="mt-3 w-full">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Pilih Produk</label>
                                    <ReactSearchAutocomplete
                                        items={productList}
                                        onSearch={handleOnSearch}
                                        onSelect={handleOnSelect}
                                        autoFocus
                                        formatResult={formatResult}
                                        placeholder="Cari produk yang akan dijadikan transaksi"
                                        styling={{ zIndex: 2 }}
                                    />
                                </div>

                                <div className="relative overflow-x-auto shadow mt-4 mb-4">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-base text-[#272541] bg-[#F4F4FD]">
                                            <tr>
                                                <th scope="col" className="py-5 px-6">
                                                    Produk
                                                </th>
                                                <th scope="col" className="py-5 px-6">
                                                    Harga
                                                </th>
                                                <th scope="col" className="py-5 px-6">
                                                    Jumlah
                                                </th>
                                                <th scope="col" className="py-5 px-6">
                                                    Subtotal
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedProduct.length > 0 ? selectedProduct.map((items) => (
                                                <tr key={`${items.id_product}-${items.id_product_duration}`} className="bg-white border-b hover:bg-gray-50">
                                                    <td className="py-4 px-6">
                                                        <div className="flex gap-4">
                                                            <div className="flex flex-col justify-center">
                                                                <span className="font-bold text-base -mb-6">{items.product_name}</span>
                                                                <Variant list={items.product_durations} clickHandler={(idProductDuration, stock, price) => { changeVariantHandler(items.id_product, idProductDuration, price); }} selectedVariant={items.selectedVariant} />
                                                            </div>
                                                        </div>
                                                        
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {toRupiah(items.price)}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="-mt-6">
                                                            <AddCart cartValue={items.qty} setCartValue={(qty) => { changeProductQty(qty, items.id_product); }} withStock={false} withLabel={false} />
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex flex-col">
                                                            <div>
                                                                {toRupiah(items.subtotal)}
                                                            </div>
                                                            <div className="text-[#FF5C6F]">
                                                                {`- ${toRupiah((parseFloat(items.promo_percentage) / 100) * items.subtotal)}`}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr className="bg-white border-b hover:bg-gray-50">
                                                    <td colSpan="4" className="py-4 px-6 text-center">
                                                        Anda belum memilih produk
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex flex-col bg-white rounded-2xl p-5">
                                    <label htmlFor="name" className="block mb-2 text-lg font-bold text-gray-900">Ringkasan Transaksi</label>
                                    {renderRingkasan()}
                                </div>

                                <div className="flex mt-4">
                                    <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full flex justify-center items-center text-white text-base font-bold cursor-pointer" onClick={() => {doCreateTransaction();}}>
                                        Buat Transaksi
                                    </div>
                                </div>
                            </div>
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
