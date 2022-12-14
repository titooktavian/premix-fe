import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { AlertService } from "services";
import { SectionTitle, Sidebar } from "components";
import { useState } from "react";
import { catchError } from "helpers/formatter";
import Table from "components/Table/Table";
import CurrencyColumn from "components/Table/components/CurrencyColumn";
import StatusColumn from "components/Table/components/StatusColumn";
import ActionColumn from "components/Table/components/ActionColumn";
import { HiOutlineChatAlt, HiOutlineSearch, HiOutlineTicket } from "react-icons/hi";
import { AiOutlineTag, AiOutlineUser } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";

const Index = ({
    pageTitle,
}) => {
    const { setLoading, userLogin } = useStateContext();
    const [showDetail, setShowDetail] = useState(false);

    const content = [
        {
            id: 1,
            name: 'Akun Canva',
            purchase_date: '2022-11-25',
            status: 1,
            duration: 30,
            total: 50000,
        },
        {
            id: 2,
            name: 'Akun Iconscout',
            purchase_date: '2022-11-25',
            status: 1,
            duration: 7,
            total: 100000,
        },
        {
            id: 1,
            name: 'Akun Vecteezy',
            purchase_date: '2022-11-25',
            status: 2,
            duration: 30,
            total: 150000,
        }
    ];

    const headerContent = [
        {
            name: 'Nama Akun',
            selector: 'name',
        },
        {
            name: 'Tanggal Beli',
            selector: 'purchase_date',
        },
        {
            name: 'Status',
            selector: 'status',
            customComponent: (data) => (
                <StatusColumn data={data.status} />
            ),
        },
        {
            name: 'Total',
            selector: 'total',
            customComponent: (data) => (
                <CurrencyColumn data={data.total} />
            ),
        },
        {
            name: 'Aksi',
            selector: 'name',
            customComponent: (data) => (
                <ActionColumn data={data.id} clickHandler={(id) => { rowClickHandler(id) }} />
            ),
        },
    ];

    const rowClickHandler = (id) => {
        setShowDetail(true);
    }

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
                        <div className="flex gap-2">
                            <div className="font-bold w-2/3 text-2xl">Bantuan</div>
                            <div className="w-1/3 flex justify-end">
                                <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full flex justify-center items-center text-white text-base font-bold cursor-pointer" onClick={() => {}}>
                                    Buat Tiket
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            {!showDetail && (
                                <div className="w-full flex flex-col gap-4">
                                    <div className="flex">
                                        <div className="text-[#272541] cursor-pointer font-bold p-2 text-center border-b-2 border-[#272541] px-5">Semua Tiket</div>
                                        <div className="text-[#6E6C85] cursor-pointer font-normal p-2 text-center border-b-2 border-[#E2E2E7] px-5">Dijawab</div>
                                        <div className="text-[#6E6C85] cursor-pointer font-normal p-2 text-center border-b-2 border-[#E2E2E7] px-5">Dibaca</div>
                                        <div className="text-[#6E6C85] cursor-pointer font-normal p-2 text-center border-b-2 border-[#E2E2E7] px-5">Selesai</div>
                                    </div>

                                    <label className="relative block">
                                        <span className="sr-only">Search</span>
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                            <HiOutlineSearch />
                                        </span>
                                        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm rounded-lg" placeholder="Cari Tiket" type="text" name="search"/>
                                    </label>

                                    <div className="flex flex-col w-full gap-3">
                                        <div className="rounded-lg bg-white p-4 flex flex-col w-full">
                                            <div className="flex">
                                                <div className="w-1/2 flex items-center gap-2">
                                                    <HiOutlineTicket />
                                                    <span className="text-sm font-bold cursor-pointer" onClick={() => { setShowDetail(true) }}>Tiket #0002</span>
                                                </div>
                                                <div className="w-1/2 flex items-center justify-end gap-2">
                                                    <span className="text-xs text-[#6E6C85]">12:00 AM</span>
                                                    <div className="bg-[#272541] rounded-full text-white py-1 px-2 w-fit text-xs font-bold">Dibaca</div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col mt-5 gap-2">
                                                <div className="text-base font-bold">Tidak bisa login ke member area</div>
                                                <div className="text-sm font-normal font-bold text-[#6E6C85]">Kenapa ya pada saat saya login password saya salah terus, padahal sama dengan yang...</div>
                                            </div>

                                            <div className="flex mt-5">
                                                <div className="w-1/3 flex items-center gap-2">
                                                    <div className="rounded-full w-6 h-6 bg-[#F4F4FD] flex items-center justify-center">
                                                        <AiOutlineUser className="text-xs" />
                                                    </div>
                                                    <span className="text-xs font-normal text-[#3F0071]">Samsul Arif</span>
                                                </div>
                                                <div className="w-2/3 flex items-center justify-end gap-2">
                                                    <div className="flex items-center gap-1">
                                                        <AiOutlineTag className="text-xs" />
                                                        <span className="text-xs font-normal text-[#3F0071]">Login, Akun profil</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <GrAttachment className="text-xs" />
                                                        <span className="text-xs font-normal text-[#3F0071]">3</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <HiOutlineChatAlt className="text-xs" />
                                                        <span className="text-xs font-normal text-[#3F0071]">12</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-lg bg-white p-4 flex flex-col w-full">
                                            <div className="flex">
                                                <div className="w-1/2 flex items-center gap-2">
                                                    <HiOutlineTicket />
                                                    <span className="text-sm font-bold cursor-pointer" onClick={() => { setShowDetail(true) }}>Tiket #0002</span>
                                                </div>
                                                <div className="w-1/2 flex items-center justify-end gap-2">
                                                    <span className="text-xs text-[#6E6C85]">12:00 AM</span>
                                                    <div className="bg-[#66AE76] rounded-full text-white py-1 px-2 w-fit text-xs font-bold">Dijawab</div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col mt-5 gap-2">
                                                <div className="text-base font-bold">Tidak bisa login ke member area</div>
                                                <div className="text-sm font-normal font-bold text-[#6E6C85]">Kenapa ya pada saat saya login password saya salah terus, padahal sama dengan yang...</div>
                                            </div>

                                            <div className="flex mt-5">
                                                <div className="w-1/3 flex items-center gap-2">
                                                    <div className="rounded-full w-6 h-6 bg-[#F4F4FD] flex items-center justify-center">
                                                        <AiOutlineUser className="text-xs" />
                                                    </div>
                                                    <span className="text-xs font-normal text-[#3F0071]">Samsul Arif</span>
                                                </div>
                                                <div className="w-2/3 flex items-center justify-end gap-2">
                                                    <div className="flex items-center gap-1">
                                                        <AiOutlineTag className="text-xs" />
                                                        <span className="text-xs font-normal text-[#3F0071]">Login, Akun profil</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <GrAttachment className="text-xs" />
                                                        <span className="text-xs font-normal text-[#3F0071]">3</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <HiOutlineChatAlt className="text-xs" />
                                                        <span className="text-xs font-normal text-[#3F0071]">12</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-lg bg-white p-4 flex flex-col w-full">
                                            <div className="flex">
                                                <div className="w-1/2 flex items-center gap-2">
                                                    <HiOutlineTicket />
                                                    <span className="text-sm font-bold cursor-pointer" onClick={() => { setShowDetail(true) }}>Tiket #0002</span>
                                                </div>
                                                <div className="w-1/2 flex items-center justify-end gap-2">
                                                    <span className="text-xs text-[#6E6C85]">12:00 AM</span>
                                                    <div className="bg-[#DFDFDF] rounded-full text-white py-1 px-2 w-fit text-xs font-bold text-[#272541]">Selesai</div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col mt-5 gap-2">
                                                <div className="text-base font-bold">Tidak bisa login ke member area</div>
                                                <div className="text-sm font-normal font-bold text-[#6E6C85]">Kenapa ya pada saat saya login password saya salah terus, padahal sama dengan yang...</div>
                                            </div>

                                            <div className="flex mt-5">
                                                <div className="w-1/3 flex items-center gap-2">
                                                    <div className="rounded-full w-6 h-6 bg-[#F4F4FD] flex items-center justify-center">
                                                        <AiOutlineUser className="text-xs" />
                                                    </div>
                                                    <span className="text-xs font-normal text-[#3F0071]">Samsul Arif</span>
                                                </div>
                                                <div className="w-2/3 flex items-center justify-end gap-2">
                                                    <div className="flex items-center gap-1">
                                                        <AiOutlineTag className="text-xs" />
                                                        <span className="text-xs font-normal text-[#3F0071]">Login, Akun profil</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <GrAttachment className="text-xs" />
                                                        <span className="text-xs font-normal text-[#3F0071]">3</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <HiOutlineChatAlt className="text-xs" />
                                                        <span className="text-xs font-normal text-[#3F0071]">12</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showDetail && (
                                <div className="w-full flex flex-col gap-4">
                                    <div
                                        className="flex w-full h-[94px] bg-fill bg-right bg-[#272541] bg-no-repeat rounded-lg text-white items-center p-6 gap-6"
                                        style={{
                                            backgroundImage: `url('/images/bg-dashboard.png')`,
                                        }}
                                    >
                                        <div className="flex flex-col">
                                            <div className="flex gap-2">
                                                <span className="text-base font-bold">No. Order</span>
                                                <div className="bg-[#66AE76] rounded-md text-white py-1 px-2 w-fit text-xs">Aktif</div>
                                            </div>
                                            <div className="text-base font-normal">0004</div>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="flex gap-2">
                                                <span className="text-base font-bold">Tanggal Pembelian</span>
                                            </div>
                                            <div className="text-base font-normal">23 November 2022</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex w-full bg-white rounded-lg p-6 gap-6">
                                        <div className="flex w-full flex-col">
                                            <div className="flex gap-2">
                                                <div className="text-base font-bold w-2/3">Produk</div>
                                                <div className="text-base font-bold text-right w-1/3">Total</div>
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                                <div className="flex flex-col w-2/3">
                                                    <span className="text-sm font-bold text-[#6E6C85]">Akun Canva -  1 Bulan x1</span>
                                                    <span className="text-xs font-normal text-[#8E8E9A]">Berakhir pada 23 Desember 2022</span>
                                                </div>
                                                <div className="text-sm font-normal text-[#6E6C85] text-right w-1/3">Rp 35.000</div>
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                                <div className="flex flex-col w-2/3">
                                                    <span className="text-sm font-bold text-[#6E6C85]">Akun Icounscout -  1 Bulan x1</span>
                                                    <span className="text-xs font-normal text-[#8E8E9A]">Berakhir pada 23 Desember 2022</span>
                                                </div>
                                                <div className="text-sm font-normal text-[#6E6C85] text-right w-1/3">Rp 40.000</div>
                                            </div>

                                            <div className="border-b-[1px] mt-6 mt- mb-6"></div>

                                            <div className="flex gap-2">
                                                <div className="flex flex-col w-2/3">
                                                    <span className="text-sm font-bold text-[#272541]">Subtotal</span>
                                                </div>
                                                <div className="text-sm font-normal text-[#6E6C85] text-right w-1/3">Rp 75.000</div>
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                                <div className="flex flex-col w-2/3">
                                                    <span className="text-sm font-bold text-[#272541]">Kode Pembayaran</span>
                                                </div>
                                                <div className="text-sm font-normal text-[#6E6C85] text-right w-1/3">Rp 602</div>
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                                <div className="flex flex-col w-2/3">
                                                    <span className="text-sm font-bold text-[#272541]">Metode Pembayaran</span>
                                                </div>
                                                <div className="text-sm font-normal text-[#6E6C85] text-right w-1/3">Bank Transfer (BCA)</div>
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                                <div className="flex flex-col w-2/3">
                                                    <span className="text-sm font-bold text-[#272541]">Total Pembayaran</span>
                                                </div>
                                                <div className="text-sm font-normal text-[#6E6C85] text-right w-1/3">Rp 75.602</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="h-[37px] px-[24px] rounded-full w-fit flex justify-center items-center text-[#8581B7] text-base font-bold cursor-pointer mt-3 border-[1px] border-[#8581B7]" onClick={() => {setShowDetail(false);}}>
                                        Kembali
                                    </div>
                                </div>
                            )}
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
