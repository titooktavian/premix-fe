import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { AlertService } from "services";
import { Pagination, SectionTitle, Sidebar } from "components";
import { useEffect, useState } from "react";
import { catchError, toRupiah } from "helpers/formatter";
import Table from "components/Table/Table";
import CurrencyColumn from "components/Table/components/CurrencyColumn";
import StatusColumn from "components/Table/components/StatusColumn";
import ActionColumn from "components/Table/components/ActionColumn";
import { getTransactionList } from "helpers/api";
import DateColumn from "components/Table/components/DateColumn";
import moment from "moment";

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

    const headerContent = [
        {
            name: 'No. Order',
            selector: 'order_number',
        },
        {
            name: 'Tanggal Beli',
            selector: 'created_at',
            customComponent: (data) => (
                <DateColumn data={data.created_at} />
            )
        },
        {
            name: 'Status',
            selector: 'status',
            customComponent: (data) => (
                <StatusColumn data={data.id_status} />
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
            const res = await getTransactionList({
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

    useEffect(() => {
        fetchData(0)
    }, []);

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
                                <>
                                    <Table header={headerContent} content={orderList} />
                                    <div className="w-full px-4 flex justify-center mt-5">
                                        <Pagination handlePageClick={changePageHandler} pageCount={totalPage} perPage={limit} currentPage={currentPage} />
                                    </div>
                                </>
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
                                                <StatusColumn data={orderDetail.id_status} />
                                            </div>
                                            <div className="text-base font-normal">{orderDetail.order_number}</div>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="flex gap-2">
                                                <span className="text-base font-bold">Tanggal Pembelian</span>
                                            </div>
                                            <div className="text-base font-normal">{moment(orderDetail.created_at).format('DD MMMM YYYY')}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex w-full bg-white rounded-lg p-6 gap-6">
                                        <div className="flex w-full flex-col">
                                            <div className="flex gap-2">
                                                <div className="text-base font-bold w-2/3">Produk</div>
                                                <div className="text-base font-bold text-right w-1/3">Total</div>
                                            </div>
                                            {orderDetail.transaction_details && orderDetail.transaction_details.map((detail) => (
                                                <div className="flex gap-2 mt-4" key={`detail-${detail.id_transaction_detail}`}>
                                                    <div className="flex flex-col w-2/3">
                                                        <span className="text-sm font-bold text-[#6E6C85]">{`${detail.product.product_name} - ${detail.product_duration.duration_value} Hari x${detail.qty}`}</span>
                                                        {detail.expired_date && (
                                                            <span className="text-xs font-normal text-[#8E8E9A]">{`Berakhir pada ${moment(detail.expired_date).format('DD MMMM YYYY')}`}</span>
                                                        )}
                                                    </div>
                                                    <div className="text-sm font-normal flex flex-col text-right w-1/3">
                                                        <div className="text-[#6E6C85]">{toRupiah(detail.subtotal)}</div>
                                                        <div className="text-[#FF5C6F]">{`- ${toRupiah(detail.promo_value)}`}</div>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="border-b-[1px] mt-6 mt- mb-6"></div>

                                            <div className="flex gap-2">
                                                <div className="flex flex-col w-2/3">
                                                    <span className="text-sm font-bold text-[#272541]">Subtotal</span>
                                                </div>
                                                <div className="text-sm font-normal text-[#6E6C85] text-right w-1/3">{toRupiah(orderDetail.subtotal)}</div>
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                                <div className="flex flex-col w-2/3">
                                                    <span className="text-sm font-bold text-[#272541]">Kode Pembayaran</span>
                                                </div>
                                                <div className="text-sm font-normal text-[#6E6C85] text-right w-1/3">{toRupiah(orderDetail.unique_code)}</div>
                                            </div>
                                            {/* <div className="flex gap-2 mt-4">
                                                <div className="flex flex-col w-2/3">
                                                    <span className="text-sm font-bold text-[#272541]">Metode Pembayaran</span>
                                                </div>
                                                <div className="text-sm font-normal text-[#6E6C85] text-right w-1/3">Bank Transfer (BCA)</div>
                                            </div> */}
                                            <div className="flex gap-2 mt-4">
                                                <div className="flex flex-col w-2/3">
                                                    <span className="text-sm font-bold text-[#272541]">Total Pembayaran</span>
                                                </div>
                                                <div className="text-sm font-normal text-[#6E6C85] text-right w-1/3">{toRupiah(orderDetail.total)}</div>
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
