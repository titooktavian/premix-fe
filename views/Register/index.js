import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { useRouter } from "next/router";
import { AlertService } from "services";
import { SectionTitle } from "components";
import Link from "next/link";
import { useState } from "react";
import { catchError } from "helpers/formatter";
import { register } from "helpers/api";

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
        setLoading(true);
        try {
            const res = await register({
                email: email,
                name: nama,
                password: password,
            });
            console.log(res)
        } catch (error) {
            AlertService.error(catchError(error));
        }
        setLoading(false)
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
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan nama" value={nama} onChange={(e) => { setNama(e.target.value) }} />
                        </div>

                        <div className="mt-3">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            <span className="text-sm font-normal text-[#6E6C85] mt-2">Password minimal 8 karakter</span>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. Handphone</label>
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
