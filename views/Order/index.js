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
                        <SectionTitle title={!showDetail ? 'List Order' : 'Order Detail'} subtitle=""  />

                        <div className="relative">
                            {!showDetail && (
                                <Table header={headerContent} content={content} />
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
