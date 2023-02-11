import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { useRouter } from "next/router";
import { AlertService } from "services";
import { SectionTitle } from "components";
import Link from "next/link";
import { useState } from "react";
import { catchError } from "helpers/formatter";
import { register } from "helpers/api";
import fetchApi from "helpers/config";
import { setTokenLocalStorage } from "helpers/utils";

const Index = ({
    pageTitle,
}) => {
    const { cartItems, onResetCart, onAddToCart, setLoading, setUserLogin } = useStateContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nama, setNama] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const router = useRouter();

    const doRegister = async () => {
        if (email === '') {
            AlertService.error('Email tidak boleh kosong');
            return;
        }

        if (nama === '') {
            AlertService.error('Nama tidak boleh kosong');
            return;
        }

        if (password === '') {
            AlertService.error('Password tidak boleh kosong');
            return;
        }

        if (password.length < 8) {
            AlertService.error('Password yang anda masukkan kurang dari 8 karakter');
            return;
        }

        if (phoneNumber === '') {
            AlertService.error('No. Handphone tidak boleh kosong');
            return;
        }

        setLoading(true);

        try {
            const res = await register({
                email: email,
                name: nama,
                password: password,
                phone_number: phoneNumber,
            });

            if (!res.status) throw Error(res.msg);
            
            doLogin();
        } catch (error) {
            AlertService.error(catchError(error));
        }
        setLoading(false)
    }

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
                await setUserLogin(res.data.user_data);
                setTokenLocalStorage(res.data.access_token);
                router.push('/produk');
                return;
            }

            throw Error(res.msg);
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
                        <SectionTitle title="Daftar" subtitle="" rightButton={false} />
                        <span className="text-base">
                            <label className="text-[#6E6C85]">Sudah punya akun? </label> 
                            <Link href="/login">
                                <a className="text-[#FF5C6F]">Masuk</a>
                            </Link>
                        </span>

                        <div className="mt-3">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Nama</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan nama" value={nama} onChange={(e) => { setNama(e.target.value) }} />
                        </div>

                        <div className="mt-3">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            <span className="text-sm font-normal text-[#6E6C85] mt-2">Password minimal 8 karakter</span>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">No. Handphone</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan nomor handphone" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                        </div>

                        <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full w-full flex justify-center items-center text-white text-base font-bold cursor-pointer mt-3" onClick={() => {doRegister();}}>
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
