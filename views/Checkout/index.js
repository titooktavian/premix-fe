import PropTypes from "prop-types";
import Image from "next/image";
import { useStateContext } from "context/StateContext";
import { catchError, toRupiah } from "helpers/formatter";
import { Accordion, AddCart, SectionTitle } from "components";
import { useRouter } from "next/router";
import { AlertService } from "services";
import { BANK_LIST } from "constants/enum";
import { useState } from "react";
import { createTransaction } from "helpers/api";

const Index = ({
    pageTitle,
}) => {
    const [checkoutStatus, setCheckoutStatus] = useState(false);
    const [checkoutData, setCheckoutData] = useState(null);
    const [email, setEmail] = useState('');
    const [nama, setNama] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const { cartItems, onResetCart, onAddToCart, setLoading, userLogin } = useStateContext();
    const router = useRouter();

    const doCheckout = async () => {
        setLoading(true);
        try {
            let transactionDetail = [];
            cartItems.data.map((cart) => {
                const detail = {
                    id_product: cart.id_product,
                    id_product_duration: cart.id_product_duration,
                    qty: cart.qty
                }

                transactionDetail.push(detail);
            })

            const res = await createTransaction({
                id_user_buyer: userLogin.id_user,
                subtotal: cartItems.price,
                total: cartItems.price,
                details: transactionDetail,
            });

            setCheckoutStatus(true);
            setCheckoutData(res);
        } catch (error) {
            AlertService.error(catchError(error));
        }
        setLoading(false);
    }

    console.log(cartItems)
    console.log(userLogin)
    console.log(checkoutData)

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
                        <div className="font-bold text-3xl">Checkout</div>
                        <div className="font-normal text-base">Ayo checkout belanjaanmu sekarang juga!</div>
                    </div>
                </div>
            </section>
            
            {!checkoutStatus && (
                <section className="-mx-4 mb-4 p-4 md:mx-0">
                    <div className="md:mx-auto md:max-w-[1110px] px-4 flex gap-4">
                        <div className="flex flex-col w-2/5 gap-4">
                            <div className="w-full flex flex-col rounded-3xl shadow-[0px_4px_40px_rgba(39,38,65,0.06)] p-10 gap-2">
                                <SectionTitle title="Info Pemesan" subtitle="" rightButton={false} />

                                <div className="mt-3">
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Contoh: Tito Hamzah" value={nama} onChange={(e) => { setNama(e.target.value) }} />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Contoh: titohamzah@gmail.com" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. Handphone</label>
                                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Contoh: 08162758732" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                                </div>
                            </div>
                            <div className="w-full flex flex-col rounded-3xl shadow-[0px_4px_40px_rgba(39,38,65,0.06)] p-10 gap-2">
                                <SectionTitle title="Informasi Bank" subtitle="" rightButton={false} />
                                <div className="flex flex-col gap-3">
                                    {BANK_LIST.map((bank) => (
                                        <Accordion key={`bank-${bank.id}`} title={bank.bankName} icon={bank.logo}>
                                            <div className="flex flex-col gap-1 text-sm">
                                                <span>Nama Pemilik Rekening: <strong>{bank.receiverName}</strong></span>
                                                <span>No. Rekening: <strong>{bank.rekening}</strong></span>
                                            </div>
                                        </Accordion>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="w-3/5 flex flex-col rounded-3xl shadow-[0px_4px_40px_rgba(39,38,65,0.06)] p-10 gap-2 pb-20 self-start">
                            <SectionTitle title="Detail Pesanan" subtitle="" rightButton={false} />

                            <div className="overflow-x-auto relative">
                                <table className="w-full text-sm text-left">
                                    
                                    <tbody>
                                        {cartItems.data.length > 0 ?cartItems.data.map((items) => (
                                            <tr key={`${items.id_product}-${items.id_product_duration}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="py-4 pr-6">
                                                    <div className="flex gap-4">
                                                        <div className="w-14 h-14 relative">
                                                            <Image src={items.imgURL} className="rounded-lg" layout='fill' objectFit='contain'/>
                                                        </div>
                                                        <div className="flex flex-col justify-center">
                                                            <span className="font-bold text-base">{items.name}</span>
                                                            <label className="w-fit bg-[#3F0071] text-white text-xs px-4 py-[2px] rounded-[4px]">{`${items.variant} Hari`}</label>
                                                        </div>
                                                    </div>
                                                    
                                                </td>
                                                <td className="py-4 px-6">
                                                    {items.qty}
                                                </td>
                                                <td className="py-4 pl-6 text-right">
                                                    {toRupiah(items.subtotal)}
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td colSpan="4" className="py-4 px-6 text-center">
                                                    Keranjang anda kosong
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex w-full font-bold mt-6">
                                <div className="flex w-1/3">
                                    Total
                                </div>
                                <div className="w-2/3 text-right">
                                    {toRupiah(cartItems.price)}
                                </div>
                            </div>
                            <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full w-full flex justify-center items-center text-white text-base font-bold cursor-pointer mt-3" onClick={() => {doCheckout();}}>
                                Order Sekarang
                            </div>
                        </div>
                    </div>
                </section>
            )}
            
            {checkoutStatus && (
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
                                        <tr key={`${items.id_product}-${items.id_product_duration}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="py-4 px-6">
                                                <div className="flex gap-4">
                                                    <div className="h-20 w-20 relative">
                                                        <Image src={items.imgURL} className="rounded-lg" layout='fill' objectFit='contain'/>
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
                                                {`${items.qty} Akun`}
                                            </td>
                                            <td className="py-4 px-6">
                                                {toRupiah(items.subtotal)}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td colSpan="4" className="py-4 px-6 text-center">
                                                Keranjang anda kosong
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            )}
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
