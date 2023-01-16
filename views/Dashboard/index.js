import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { AlertService } from "services";
import { ContentHeader, Pagination, Sidebar } from "components";
import { useState, useEffect, forwardRef } from "react";
import { catchError } from "helpers/formatter";
import { getAccountDashboard, getSummary } from "helpers/api";
import { useRouter } from "next/router";
import Table from "components/Table/Table";
import DateColumn from "components/Table/components/DateColumn";
import StatusColumn from "components/Table/components/StatusColumn";
import ActionColumn from "components/Table/components/ActionColumn";
import AccountColumn from "components/Table/components/AccountColumn";
import { USER_PERMISSION } from "constants/enum";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    const [filteredChart, setFilteredChart] = useState('minggu');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const router = useRouter();

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

    const rowClickHandler = (data) => {
        router.replace({
            pathname: 'order'
        })
    }

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

    const chartData = {
        labels: ["Januari", "februari", "maret"],
        datasets: [
            {
                data: [10, 35, 70],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
        },
    };

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const ButtonDatepicker = forwardRef(({ value, onClick }, ref) => (
        <button className="border-[#8581B7] text-[#8581B7] cursor-pointer border-[1px] p-1 text-xs w-[150px]" onClick={onClick} ref={ref}>
          {value}
        </button>
    ));

    return (
        <div 
            className="mb-6 md:mt-3 mt-0"
        >
            <ContentHeader title="Dashboard" subtitle="Selamat datang di dashboard customer Premix Store" />

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

                        {userLogin?.id_permission === USER_PERMISSION.ADMIN && (
                            <>
                                
                                <div className="bg-white p-4 rounded-lg flex flex-col gap-3 mt-6">
                                    <div className="flex w-full justify-end">
                                        <div className="text-base font-bold w-full">Grafik Total Penjualan</div>
                                        <div className="mr-2 text-xs">
                                            <DatePicker
                                                selected={startDate}
                                                onChange={onChange}
                                                startDate={startDate}
                                                endDate={endDate}
                                                selectsRange
                                                customInput={<ButtonDatepicker />}
                                            />
                                        </div>
                                        <div className="border-[#8581B7] text-[#8581B7] cursor-pointer border-y-[1px] border-l-[1px] p-1 text-xs px-3">Minggu</div>
                                        <div className="bg-[#8581B7] border-[#8581B7] text-[white] cursor-pointer border-[1px] p-1 text-xs px-3">Bulan</div>
                                    </div>
                                    <Line data={chartData} width={100} height={40} options={options} />
                                </div>
                            </>
                        )}

                        <div className="text-base font-bold mt-6">Akun yang akan berakhir</div>

                        <div className="relative">
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
