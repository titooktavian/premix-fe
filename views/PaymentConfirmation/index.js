import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { AlertService } from "services";
import { ContentHeader, Modal, Pagination, SectionTitle, Sidebar } from "components";
import { useEffect, useState } from "react";
import { catchError, toRupiah } from "helpers/formatter";
import Table from "components/Table/Table";
import CurrencyColumn from "components/Table/components/CurrencyColumn";
import ActionColumn from "components/Table/components/ActionColumn";
import { getConfirmPayment } from "helpers/api";
import DateColumn from "components/Table/components/DateColumn";
import Image from "next/image";
import TransactionDetail from "components/Modal/Content/TransactionDetail";

const Index = ({
    pageTitle,
}) => {
    const { setLoading } = useStateContext();
    const [showDetail, setShowDetail] = useState(false);
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [orderList, setOrderList] = useState([]);
    const [orderDetail, setOrderDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const headerContent = [
        {
            name: 'Nama Akun',
            selector: 'account_name',
        },
        {
            name: 'Tanggal',
            selector: 'created_at',
            customComponent: (data) => (
                <DateColumn data={data.created_at} />
            )
        },
        {
            name: 'Tujuan',
            selector: 'destination_account',
        },
        {
            name: 'Total',
            selector: 'total',
            customComponent: (data) => (
                <CurrencyColumn data={data.transfer_nominal} />
            ),
        },
        {
            name: 'Aksi',
            selector: 'name',
            customComponent: (data) => (
                <ActionColumn data={data} clickHandler={(data) => { rowClickHandler(data) }} />
            ),
        },
    ];

    const rowClickHandler = (data) => {
        setOrderDetail(data);
        setShowDetail(true);
    }

    const changePageHandler = (event) => {
        fetchData(event.selected);
    }

    const fetchData = async (page) => {
        setLoading(true);
        try {
            const res = await getConfirmPayment({
                limit: limit,
                page: page + 1,
            });

            if (!res.status) throw Error(res.msg);

            const {
                data,
                meta: {
                    last_page,
                    per_page,
                    current_page,
                },
            } = res;

            setOrderList(data);
            setCurrentPage(current_page);
            setLimit(per_page);
            setTotalPage(last_page);
            setLoading(false);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    };

    const openConfirmTransaction = async () => {
        setShowModal(true);
    };

    const callbackAction = () => {
        setShowModal(false);
        setShowDetail(false);
        fetchData(0);
    }

    useEffect(() => {
        fetchData(0)
    }, []);

    return (
        <div 
            className="mb-6 md:mt-3 mt-0"
        >
            <ContentHeader title="Konfirmasi Pembayaran" subtitle="Lihat daftar Konfirmasi Pembayaran dari customer" />

            <section className="-mx-4 mb-4 p-4 md:mx-0">
                <div className="md:mx-auto md:max-w-[1110px] px-4 flex gap-4">
                    <div className="w-2/6 self-start">
                        <Sidebar />
                    </div>
                    <div className="w-4/6 flex flex-col bg-[#F4F4FD] rounded-3xl p-8 gap-4 self-start">
                        <SectionTitle title={!showDetail ? 'List Payment' : 'Payment Detail'} subtitle=""  />

                        <div className="relative">
                            {!showDetail && (
                                <>
                                    <Table header={headerContent} content={orderList} />
                                    <div className="w-full px-4 flex justify-center mt-5">
                                        <Pagination handlePageClick={changePageHandler} pageCount={totalPage} perPage={limit} currentPage={currentPage} />
                                    </div>
                                </>
                            )}
                            {showDetail && (
                                <div className="w-full flex flex-col gap-4">
                                    <div className="flex flex-col w-full bg-white rounded-lg p-6 gap-4">
                                        <div className="flex flex-col w-full">
                                            <div className="flex gap-2">
                                                <div className="text-sm font-bold w-1/2">Order Number</div>
                                                <div className="text-sm w-1/2">{orderDetail.transaction.order_number}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="text-sm font-bold w-1/2">Nama Akun</div>
                                                <div className="text-sm w-1/2">{orderDetail.account_name}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="text-sm font-bold w-1/2">Tujuan</div>
                                                <div className="text-sm w-1/2">{orderDetail.destination_account}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="text-sm font-bold w-1/2">Nominal Transfer</div>
                                                <div className="text-sm w-1/2">{toRupiah(orderDetail.transfer_nominal)}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="text-sm font-bold w-1/2">Total Transaksi</div>
                                                <div className="text-sm w-1/2">{toRupiah(orderDetail.transaction.total)}</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <div className="text-sm font-bold w-full">Bukti Transfer</div>
                                            <div className="text-sm w-1/2 relative aspect-[0.5]">
                                                <Image src={orderDetail.img_url} layout="fill" objectFit="contain" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex gap-2">
                                        <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full flex justify-center items-center text-white text-base font-bold cursor-pointer mt-3" onClick={() => { openConfirmTransaction(); }}>
                                            {'Konfirmasi Pesanan'}
                                        </div>
                                        <div className="h-[37px] px-[24px] rounded-full w-fit flex justify-center items-center text-[#8581B7] text-base font-bold cursor-pointer mt-3 border-[1px] border-[#8581B7]" onClick={() => {setShowDetail(false);}}>
                                            Kembali
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Modal
                show={showModal}
                isPlainPopup={true}
                title="Detail Promo"
                type="fullscreen"
                popupClassName={`md:w-[720px]`}
                onClosePopup={() => {setShowModal(false)}}
            >
                <TransactionDetail transactionId={orderDetail ? orderDetail.id_transaction : ''} callbackAction={() => {callbackAction()}} />
            </Modal>
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
