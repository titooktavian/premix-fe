import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { SectionTitle, Sidebar } from "components";
import { useState } from "react";
import { catchError } from "helpers/formatter";

const Index = ({
    pageTitle,
}) => {
    const { setLoading, userLogin } = useStateContext();
    const [nama, setNama] = useState(userLogin.name || '');
    const [email, setEmail] = useState(userLogin.email || '');
    const [telp, setTelp] = useState(userLogin.phone_number || '');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    console.log(userLogin)

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
                        <div className="font-bold text-3xl">Dashboard</div>
                        <div className="font-normal text-base">Selamat datang di dashboard customer Premix Store</div>
                    </div>
                </div>
            </section>

            <section className="-mx-4 mb-4 p-4 md:mx-0">
                <div className="md:mx-auto md:max-w-[1110px] px-4 flex gap-4">
                    <div className="w-2/6 self-start">
                        <Sidebar />
                    </div>
                    <div className="w-4/6 flex flex-col bg-[#F4F4FD] rounded-3xl p-8 gap-4 self-start">
                        <SectionTitle title="Akun Profil" subtitle=""  />

                        <div className="relative">
                            <div className="flex flex-col">
                                <div className="mt-3 w-full">
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Nama</label>
                                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan nama" value={nama} onChange={(e) => { setNama(e.target.value) }} />
                                </div>
                                <div className="mt-3 w-full">
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <div className="mt-3 w-full">
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Nomor Handphone</label>
                                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan nomor handphone" value={telp} onChange={(e) => { setTelp(e.target.value) }} />
                                </div>
                                <div className="mt-3 w-full">
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Password Baru</label>
                                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan password baru" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                </div>
                                <div className="mt-3 w-full">
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Ulangi Password Baru</label>
                                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan password baru" value={rePassword} onChange={(e) => { setRePassword(e.target.value) }} />
                                </div>
                                <div className="flex mt-4">
                                    <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full flex justify-center items-center text-white text-base font-bold cursor-pointer" onClick={() => {}}>
                                        Simpan
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
