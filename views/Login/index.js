import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { useRouter } from "next/router";
import { AlertService } from "services";
import { SectionTitle } from "components";
import Link from "next/link";
import { useState } from "react";
import fetchApi from "helpers/config";
import { catchError } from "helpers/formatter";
import { setTokenLocalStorage } from "helpers/utils";

const Index = ({
    pageTitle,
}) => {
    const { cartItems, onResetCart, onAddToCart, setLoading, setUserLogin } = useStateContext();
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
            if (res) {
                await setUserLogin(res.user_data);
                setTokenLocalStorage(res.access_token);
                router.push('/produk');
            }

            throw Error('Gagal melakukan login');
        }).catch((error) => {
            setLoading(false);
            AlertService.error(catchError(error));
        });
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
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>

                        <div className="flex mt-3">
                            <div className="flex items-center mb-4">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ingatkan saya</label>
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
