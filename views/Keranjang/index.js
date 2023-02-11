import PropTypes from "prop-types";
import Image from "next/image";
import { useStateContext } from "context/StateContext";
import { toRupiah } from "helpers/formatter";
import { AddCart } from "components";
import { useRouter } from "next/router";
import { AlertService } from "services";
import { useEffect, useState } from "react";

const Index = ({
    pageTitle,
}) => {
    const { cartItems, onResetCart, onAddToCart, setLoading } = useStateContext();
    const [total, setTotal] = useState(cartItems.price || 0);
    const [promoTotal, setPromoTotal] = useState(0);
    const router = useRouter();

    const changeCartValue = async (qty, productId, variant, name) => {
        setLoading(true);
        const productCart = {
            idProduct: productId,
            quantity: qty,
            variant: variant,
            name: name,
        };

        await onAddToCart(productCart);
        setLoading(false);
    }

    const resetCart = async () => {
        setLoading(true);
        await onResetCart();
        setLoading(false);
    }

    const goProduct = () => {
        router.push('/produk');
    }

    const goCheckout = () => {
        if (cartItems.data.length > 0) {
            router.push('/checkout');
        } else {
            AlertService.error('Tidak ada item di keranjang anda');
        }
    }

    const countTransaction = () => {
        let tempPromo = 0;
        cartItems.data.map((cart) => {
            tempPromo += (parseFloat(cart.promo) / 100) * parseFloat(cart.subtotal);
        });

        setPromoTotal(tempPromo);
        setTotal(parseFloat(cartItems.price) - tempPromo);
    }

    useEffect(() => {
        countTransaction();
    }, [cartItems]);

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
                        <div className="font-bold text-3xl">Keranjang Belanja</div>
                        <div className="font-normal text-base">Ini adalah list pesananmu, segera checkout dan miliki akunmu!</div>
                    </div>
                </div>
            </section>

            <section className="-mx-4 mb-4 p-4 md:mx-0">
                <div className="md:mx-auto md:max-w-[1110px] px-4 flex flex-col">
                    <div className="overflow-x-auto relative">
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
                                {cartItems.data.length > 0 ?cartItems.data.map((items) => (
                                    <tr key={`${items.id_product}-${items.id_product_duration}`} className="bg-white border-b hover:bg-gray-50">
                                        <td className="py-4 px-6">
                                            <div className="flex gap-4">
                                                <div className="h-20 w-20 relative">
                                                    <Image src={items.imgURL || '/images/image-slider/1.jpeg'} className="rounded-lg" layout='fill' objectFit='contain'/>
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <span className="font-bold text-base">{items.name}</span>
                                                    <label className="w-fit bg-[#3F0071] text-white text-xs px-4 py-[2px] rounded-[4px]">{`${items.variant} Hari`}</label>
                                                </div>
                                            </div>
                                            
                                        </td>
                                        <td className="py-4 px-6">
                                            {toRupiah(items.price)}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="-mt-6">
                                                <AddCart cartValue={items.qty} setCartValue={(qty) => { changeCartValue(qty, items.id_product, items.id_product_duration, items.name); }} withStock={false} withLabel={false} />
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col">
                                                <div>
                                                    {toRupiah(items.subtotal)}
                                                </div>
                                                <div className="text-[#FF5C6F]">
                                                    {`- ${toRupiah((parseFloat(items.promo) / 100) * items.subtotal)}`}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr className="bg-white border-b hover:bg-gray-50">
                                        <td colSpan="4" className="py-4 px-6 text-center">
                                            Keranjang anda kosong
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex gap-2 mt-6">
                        <div className="h-[37px] px-[24px] bg-[white] border-[1px] border-[#8581B7] rounded-full w-fit flex items-center text-[#8581B7] text-base font-bold cursor-pointer" onClick={() => {goProduct();}}>
                            Lanjutkan Belanja
                        </div>
                        <div className="h-[37px] px-[24px] bg-[white] rounded-full w-fit flex items-center text-[#8581B7] text-base font-bold cursor-pointer" onClick={() => {resetCart();}}>
                            Hapus Keranjang
                        </div>
                    </div>
                </div>
            </section>

            <section className="-mx-4 mb-4 p-4 md:mx-0">
                <div className="md:mx-auto md:max-w-[1110px] px-4">
                    <div className="flex gap-2 justify-end w-full border-[#e5e7eb] border-t py-4">
                        <div className="w-96 p-6 bg-[#F4F4FD] rounded-lg flex flex-col gap-3">
                            <div className="flex w-full">
                                <div className="flex w-1/3">
                                    Subtotal
                                </div>
                                <div className="w-2/3 text-right">
                                    {toRupiah(cartItems.price)}
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
                            <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full w-full flex justify-center items-center text-white text-base font-bold cursor-pointer mt-3" onClick={() => {goCheckout();}}>
                                Checkout
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
