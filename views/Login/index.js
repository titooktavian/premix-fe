import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { useRouter } from "next/router";
import { AlertService } from "services";
import { SectionTitle } from "components";
import Link from "next/link";
import { useState } from "react";
import fetchApi from "helpers/config";
import { catchError } from "helpers/formatter";
import { getTokenLocalStorage, setTokenLocalStorage } from "helpers/utils";
import { getCartUser } from "helpers/api";

const Index = ({
    pageTitle,
}) => {
    const { cartItems, onResetCart, onReplaceCart, setLoading, setUserLogin } = useStateContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const doLogin = async () => {
        const body = {
            email: email,
            password: password,
        };

        setLoading(true);
        fetchApi("/api/login", body, "post", {
            serviceDomainType: "local"
        }).then(async (res) => {
            if (res.status) {
                await setUserLogin(res.data.user_data);
                setTokenLocalStorage(res.data.access_token);
                await getCart(res.data.user_data);

                router.push('/produk');
                return;
            }

            throw Error(res.msg);
        }).catch((error) => {
            setLoading(false);
            AlertService.error(catchError(error));
        });
    }

    const getCart = async (user) => {
        try {
            const res = await getCartUser();

            if (!res.status && (res.data && res.data !== '')) throw Error(res.msg);

            let combinedCart = [];
            if (cartItems.data.length > 0) {
                combinedCart = [...cartItems.data];
            }

            if (res.data && res.data.cart_details) {
                res.data.cart_details.map(serverCart => {
                    const itemToAdd = {
                        id_product: serverCart.id_product,
                        id_product_duration: serverCart.id_product_duration,
                        qty: serverCart.qty,
                        name: serverCart.products.product_name,
                        subtotal: serverCart.total,
                        variant: serverCart.product_duration.duration_value,
                        imgURL: serverCart.products.img_url[0],
                        price: serverCart.product_duration.price,
                    };

                    combinedCart.push(itemToAdd)
                })
            }

            if (combinedCart.length > 0) {
                await onReplaceCart(combinedCart, user.id_user);
            }

        } catch (error) {
            AlertService.error(catchError(error));
        }
    }

    return (
        <div 
            className="mb-6 md:mt-3 mt-0"
        >
            <section className="-mx-4 mb-4 p-4 md:mx-0">
                <div className="md:mx-auto md:max-w-[1110px] px-4 flex flex-col items-center">
                    <div className="w-[354px] flex flex-col rounded-3xl p-10 gap-2 shadow-[0px_4px_40px_rgba(39,38,65,0.06)]">
                        <SectionTitle title="Masuk" subtitle="" rightButton={false} />
                        <span className="text-base">
                            <label className="text-[#6E6C85]">Tidak punya akun? </label> 
                            <Link href="/register">
                                <a className="text-[#FF5C6F]">Daftar</a>
                            </Link>
                        </span>

                        <div className="mt-3">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>

                        <div className="flex mt-3">
                            <div className="flex items-center mb-4">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900">Ingatkan saya</label>
                            </div>
                        </div>

                        <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full w-full flex justify-center items-center text-white text-base font-bold cursor-pointer mt-3" onClick={() => {doLogin()}}>
                            Login
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
