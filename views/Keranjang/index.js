import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Modal, Divider, OrderType, Button, Checkbox } from "components";
import { useStateContext } from "context/StateContext";
import { toRupiah } from "helpers/formatter";
import ProductListCart from "./components/ProductListCart/ProductListCart";
import { useRouter } from "next/router";

const Index = () => {
    const [removeAllProductPopup, setRemoveAllProductPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { 
        cartItems,  
        onResetCart, 
        onAddToCart, 
        userLogin, 
        setIsConfirmLogin, 
        setLoginParam, 
        setCheckoutItems,
        selectedOrderType,
        onSetBgColor,
    } = useStateContext();
    const [isCheckAll, setCheckItemsAll] = useState(false);
    const [checkItems, setCheckItems] = useState([]);
    const router = useRouter();

    const closeRemoveAllProductPopup = () => {
        setRemoveAllProductPopup(!removeAllProductPopup);
    };

    const confirmDeleteItem = async () => {
        if (selectedProduct) {
            selectedProduct.quantity = 0;
            await onAddToCart(
                selectedProduct,
                setRemoveAllProductPopup(false)
            );
            setSelectedProduct(null);
            return;
        }
        onResetCart();
        closeRemoveAllProductPopup();
    };

    const openConfirmDeleteItemPopup = (product) => {
        setSelectedProduct(product);
        setRemoveAllProductPopup(true);
    };

    const handleSelectAll = async () => {
        await setCheckItemsAll(!isCheckAll);
        await setCheckItems(cartItems.data.map(li => li.cart_id));
        setTimeout(() => {
            if (isCheckAll) {
                setCheckItems([]);
            }
        },50)
    };

    const handleSelectItem = async (id) => {
        const findIndex = checkItems.findIndex(x => x === id);
        let temp;
        if (findIndex < 0) {
            temp = [...checkItems, id]
        }
        else {
            temp = checkItems.filter(item => item !== id);
        }
        await setCheckItems(temp);
        if(cartItems.data.length === temp.length) {
            await setCheckItemsAll(true);
        } else {
            await setCheckItemsAll(false);
        }
    };

    const prosesPesanan = () => {
        if (!userLogin) {
            setLoginParam('checkout');
            setIsConfirmLogin(true);
            return 
        }
        setCheckoutItems(checkItems);
        localStorage.setItem('checkoutItems', JSON.stringify(checkItems));
        router.push('/checkout');
    }

    const isDisabledButton = () => {
        return (checkItems.length === 0 || (!selectedOrderType.orderType && !selectedOrderType.subOrderType))
    }

    const countTotal = () => {
        const totalPrice = cartItems.data.filter((x) => checkItems.includes(x.cart_id)).reduce((total, item) => {
            return (total += item.price * item.quantity);
        }, 0);
        return totalPrice;
    }

    useEffect(() => {
        handleSelectAll();
    }, []);

    useEffect(() => {
        if (cartItems.data.length > 0) onSetBgColor("md:bg-neutral-100");
        return () => onSetBgColor();
    }, [cartItems]);

    return (
        <>
            {cartItems.data.length > 0 ? (
                <>
                    <Modal
                        isPopup={removeAllProductPopup}
                        title="Hapus Item?"
                        type="halfscreen"
                        onRequestClose={closeRemoveAllProductPopup} 
                        isDivider={false}
                        isShowClose={false}
                        subtitle="Yakin ingin menghapus item dari keranjang?"
                    >
                        <p className="px-4 text-sm font-normal text-dark-100 md:px-0">
                            
                        </p>
                        <div className="flex flex-col-reverse gap-4 mt-6 md:grid md:grid-cols-2">
                            <Button
                                full
                                label="Batal"
                                variant="secondary"
                                size="lg"
                                onClick={() => setRemoveAllProductPopup(false)}
                            />
                            <Button
                                full
                                label="Hapus"
                                size="lg"
                                onClick={() => confirmDeleteItem()}
                            />
                        </div>
                    </Modal>
                    <div className=" pt-3 md:mx-auto md:grid md:max-w-[960px] md:grid-cols-3">
                        <div className="bg-white md:col-span-2 md:mr-4 md:rounded-lg md:p-4">
                            <h2 className="text-base font-bold text-dark-300">
                                Keranjang Belanja
                            </h2>
                            <div className="my-4 flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                    <Checkbox
                                        type="checkbox"
                                        name="selectAll"
                                        id="selectAll"
                                        handleClick={handleSelectAll}
                                        isChecked={isCheckAll}
                                    />
                                    <label
                                        htmlFor="check-all"
                                        className="text-sm font-bold"
                                    >
                                        Pilih semua
                                    </label>
                                </div>
                                <button
                                    onClick={() =>
                                        setRemoveAllProductPopup(true)
                                    }
                                    className="text-sm font-bold text-red-300"
                                >
                                    Hapus Semua
                                </button>
                            </div>
                            <div className="md:max-h-[350px] md:overflow-y-scroll">
                                {cartItems.data.length > 0 &&
                                    cartItems.data.map((product) => (
                                        <ProductListCart
                                            key={product.cart_id}
                                            productID={product.id_product}
                                            checkItems={checkItems}
                                            handleSelectItem={(id) =>{handleSelectItem(id)}}
                                            {...product}
                                            onDeleteItem={() =>
                                                openConfirmDeleteItemPopup(
                                                    product
                                                )
                                            }
                                        />
                                    ))}
                            </div>
                            <Divider />
                            <div className="mt-8 flex items-center justify-between rounded-lg border border-neutral-200 p-[10px] md:border-none md:mt-4">
                                <div className="">
                                    <h4 className="text-base font-bold text-dark-300">
                                        Ingin tambah pesanan?
                                    </h4>
                                    <p className="text-xs font-bold text-dark-100">
                                        {" "}
                                        Silakan pilih produk di menu utama
                                    </p>
                                </div>
                                <Link href="/produk">
                                    <a className="rounded-full bg-turq-300 px-3 py-[5px] text-sm font-bold text-white md:px-5">
                                        Tambah
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <Divider className="my-8 md:hidden"/>
                        <div className="mt-[5px] bg-white md:mt-0 md:ml-4 md:bg-transparent">
                            <div className="pt-[10px] md:md:rounded-lg md:bg-white md:p-4">
                                <OrderType isDefault={true}/>
                            </div>
                            <div className="fixed bottom-0 right-0 left-0 z-50 w-full bg-white py-[10px] px-4 md:static md:mt-4 md:rounded-lg md:p-4">
                                <Button
                                    className="h-[70px] md:h-[50px]"
                                    full
                                    variant="primary"
                                    size="lg"
                                    disabled={isDisabledButton()}
                                    onClick={() => prosesPesanan()}
                                >
                                    <div className="w-full flex items-center justify-between">
                                        <div className="flex flex-col items-start">
                                            <span className="block text-base">
                                                {checkItems.length} Produk
                                            </span>
                                            <span className="block text-base font-bold">
                                                {toRupiah(countTotal())}
                                            </span>
                                        </div>
                                        <p className="text-base font-bold">
                                            Pesan
                                        </p>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="md:mx-auto md:w-[960px]">
                    <div className="mx-auto h-[287px] w-[287px]">
                        <Image
                            src="/images/keranjang-kosong.png "
                            width={287}
                            height={287}
                            className=""
                            layout="responsive"
                            priority
                        />
                    </div>
                    <h4 className="text-center text-sm font-bold text-dark-300">
                        Keranjangmu kosong nih
                    </h4>
                    <p className="mt-4 text-center text-sm font-medium text-dark-100">
                        Yuk, pilih produk favoritmu dan segera lakukan
                        pemesanan!
                    </p>
                    <Link href="/produk">
                        <a className="mt-10 block w-full rounded-full bg-neutral-100 p-3 text-center text-base  font-bold text-dark-400">
                            Pilih Produk
                        </a>
                    </Link>
                </div>
            )}
        </>
    );
};

export default Index;
