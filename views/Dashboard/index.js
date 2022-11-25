import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { useRouter } from "next/router";
import { AlertService } from "services";
import { SectionTitle, Sidebar } from "components";
import Link from "next/link";
import { useState } from "react";
import fetchApi from "helpers/config";
import { catchError } from "helpers/formatter";
import { setTokenLocalStorage } from "helpers/utils";

const Index = ({
    pageTitle,
}) => {
    const { setLoading, userLogin } = useStateContext();

    const router = useRouter();

    const expiredAccount = [
        {
            id: 1,
            name: 'Akun Canva',
            purchase_date: '2022-11-25',
            expired_date: '2022-11-27',
            status: 1,
            duration: 30,
        },
        {
            id: 2,
            name: 'Akun Iconscout',
            purchase_date: '2022-11-25',
            expired_date: '2022-11-27',
            status: 1,
            duration: 7,
        },
        {
            id: 1,
            name: 'Akun Vecteezy',
            purchase_date: '2022-11-25',
            expired_date: '2022-11-27',
            status: 1,
            duration: 30,
        }
    ];

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
                        <div><span>Halo, <label className="font-bold">{userLogin?.name}!</label></span></div>
                        <div className="flex gap-3">
                            <div className="bg-white p-4 shadow flex flex-col w-1/3 rounded-2xl gap-3">
                                <div className="text-sm text-normal text-[#6E6C85]">Akun</div>
                                <div className="text-[#FF5C6F] text-2xl font-bold">2</div>
                            </div>
                            <div className="bg-white p-4 shadow flex flex-col w-1/3 rounded-2xl gap-3">
                                <div className="text-sm text-normal text-[#6E6C85]">Belum Lunas</div>
                                <div className="text-[#F8CA56] text-2xl font-bold">2</div>
                            </div>
                            <div className="bg-white p-4 shadow flex flex-col w-1/3 rounded-2xl gap-3">
                                <div className="text-sm text-normal text-[#6E6C85]">Lunas</div>
                                <div className="text-[#66AE76] text-2xl font-bold">2</div>
                            </div>
                        </div>
                        <div className="text-base font-bold mt-6">Akun yang akan berakhir</div>

                        <div className="overflow-x-auto relative">
                            <table className="w-full text-sm text-left">
                                <thead className="text-base text-[#272541] bg-white">
                                    <tr>
                                        <th scope="col" className="py-5 px-6">
                                            Nama Akun
                                        </th>
                                        <th scope="col" className="py-5 px-6">
                                            Tanggal Beli
                                        </th>
                                        <th scope="col" className="py-5 px-6">
                                            Tanggal Berakhir
                                        </th>
                                        <th scope="col" className="py-5 px-6">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expiredAccount.length > 0 ? expiredAccount.map((items) => (
                                        <tr key={`${items.id_product}-${items.id_product_duration}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="py-4 px-6">
                                                {items.name}
                                            </td>
                                            <td className="py-4 px-6">
                                                {items.purchase_date}
                                            </td>
                                            <td className="py-4 px-6">
                                                {items.expired_date}
                                            </td>
                                            <td className="py-4 px-6">
                                                {items.status}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td colSpan="4" className="py-4 px-6 text-center">
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
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
