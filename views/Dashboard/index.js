import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { useRouter } from "next/router";
import { AlertService } from "services";
import { Pagination, Sidebar } from "components";
import Link from "next/link";
import { useState, useEffect } from "react";
import fetchApi from "helpers/config";
import { catchError } from "helpers/formatter";
import { setTokenLocalStorage } from "helpers/utils";
import { getAccountDashboard, getSummary } from "helpers/api";
import Table from "components/Table/Table";
import DateColumn from "components/Table/components/DateColumn";
import StatusColumn from "components/Table/components/StatusColumn";
import CurrencyColumn from "components/Table/components/CurrencyColumn";
import ActionColumn from "components/Table/components/ActionColumn";
import AccountColumn from "components/Table/components/AccountColumn";

const Index = ({
    pageTitle,
}) => {
    const { setLoading, userLogin } = useStateContext();
    const [showDetail, setShowDetail] = useState(false);
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [accountList, setAccountList] = useState([]);
    const [accountDetail, setAccountDetail] = useState(null);
    const [transactionCount, setTransactionCount] = useState(0);
    const [transactionConfirmed, setTransactionConfirmed] = useState(0);
    const [transactionWaiting, setTransactionWaiting] = useState(0);

    const headerContent = [
        {
            name: 'No. Order',
            selector: 'order_number',
        },
        {
            name: 'Nama Akun',
            selector: 'id_product',
            customComponent: (data) => (
                <AccountColumn data={data} />
            )
        },
        {
            name: 'Tanggal Beli',
            selector: 'created_at',
            customComponent: (data) => (
                <DateColumn data={data.created_at} />
            )
        },
        {
            name: 'Tanggal Berakhir',
            selector: 'expired_date',
            customComponent: (data) => (
                <DateColumn data={data.expired_date} />
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
            name: 'Aksi',
            selector: 'name',
            customComponent: (data) => (
                <ActionColumn data={data} clickHandler={(data) => { rowClickHandler(data) }} />
            ),
        },
    ];

    const changePageHandler = (event) => {
        fetchData(event.selected);
    }

    const fetchData = async (page) => {
        setLoading(true);
        try {
            const res = await getAccountDashboard({
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

            setAccountList(data);
            setCurrentPage(current_page);
            setLimit(per_page);
            setTotalPage(last_page);
            setLoading(false);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    };

    const fetchSummary = async () => {
        setLoading(true);
        try {
            const res = await getSummary({});

            if (!res.status) throw Error(res.msg);

            const {
                data: {
                    transaction_count,
                    transaction_confirmed,
                    transaction_waiting,
                }
            } = res;

            setTransactionCount(transaction_count);
            setTransactionConfirmed(transaction_confirmed);
            setTransactionWaiting(transaction_waiting);
            setLoading(false);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    };

    useEffect(() => {
        fetchData(0);
        fetchSummary();
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
                        <div><span>Halo, <label className="font-bold">{userLogin?.name}!</label></span></div>
                        <div className="flex gap-3">
                            <div className="bg-white p-4 shadow flex flex-col w-1/3 rounded-2xl gap-3">
                                <div className="text-sm text-normal text-[#6E6C85]">Akun</div>
                                <div className="text-[#FF5C6F] text-2xl font-bold">{transactionCount}</div>
                            </div>
                            <div className="bg-white p-4 shadow flex flex-col w-1/3 rounded-2xl gap-3">
                                <div className="text-sm text-normal text-[#6E6C85]">Menunggu</div>
                                <div className="text-[#F8CA56] text-2xl font-bold">{transactionWaiting}</div>
                            </div>
                            <div className="bg-white p-4 shadow flex flex-col w-1/3 rounded-2xl gap-3">
                                <div className="text-sm text-normal text-[#6E6C85]">Lunas</div>
                                <div className="text-[#66AE76] text-2xl font-bold">{transactionConfirmed}</div>
                            </div>
                        </div>
                        <div className="text-base font-bold mt-6">Akun yang akan berakhir</div>

                        <div className="overflow-x-auto relative">
                            <Table header={headerContent} content={accountList} />
                            <div className="w-full px-4 flex justify-center mt-5">
                                <Pagination handlePageClick={changePageHandler} pageCount={totalPage} perPage={limit} currentPage={currentPage} />
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
