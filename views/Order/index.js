import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { AlertService } from "services";
import { ContentHeader, OrderDetail, Pagination, SectionTitle, Sidebar } from "components";
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
            <ContentHeader title="Order" subtitle="Lihat daftar transaksi anda di sini" />

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
                                <OrderDetail transactionId={orderDetail.id_transaction} callbackAction={() => {setShowDetail(false)}} />
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
