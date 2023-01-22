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
import moment from "moment";
import ChartFilter from "components/ChartFilter/ChartFilter";

const Index = ({
    pageTitle,
}) => {
    const { setLoading, userLogin } = useStateContext();
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [accountList, setAccountList] = useState([]);
    const [transactionCount, setTransactionCount] = useState(0);
    const [transactionConfirmed, setTransactionConfirmed] = useState(0);
    const [transactionWaiting, setTransactionWaiting] = useState(0);
    const [filteredChart, setFilteredChart] = useState('1');
    const [startDate, setStartDate] = useState(moment().subtract(1, 'months').toDate());
    const [endDate, setEndDate] = useState(moment().toDate());
    const [chartData, setChartData] = useState(null)
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
            const res = await getSummary({
                from_date: moment(startDate, 'MM/DD/YYYY').format('DD-MM-YYYY'),
                to_date: moment(endDate, 'MM/DD/YYYY').format('DD-MM-YYYY'),
                filter_type: '1'
            });

            if (!res.status) throw Error(res.msg);

            const {
                data: {
                    transaction_count,
                    transaction_confirmed,
                    transaction_waiting,
                    chart_data,
                }
            } = res;

            setTransactionCount(transaction_count);
            setTransactionConfirmed(transaction_confirmed);
            setTransactionWaiting(transaction_waiting);
            if (userLogin?.id_permission === USER_PERMISSION.ADMIN) {
                reformatDataToChart(chart_data);
            }
            
            setLoading(false);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    };

    const reformatDataToChart = (data) => {
        let labels = [];
        let datasets = [];
        let dates = [moment(startDate, 'DD-MM-YYYY').format('MM/DD/YYYY')];

        let currDate = moment(startDate).startOf('day');
        let lastDate = moment(endDate).startOf('day');

        while(currDate.add(1, 'days').diff(lastDate) <= 0) {
            dates.push(currDate.clone().format('MM/DD/YYYY'));
        }

        if (filteredChart === '1') {
            dates.map((dateList) => {
                data.map((chart) => {
                    if (moment(chart.date, 'DD-MM-YYYY').format('MM/DD/YYYY') === dateList) {
                        datasets.push(parseFloat(chart.total_sales));
                    } else {
                        datasets.push(0);
                    }

                    labels.push(dateList);
                })
            })
        } else if (filteredChart === '2') {
            const groups = dates.reduce((acc, date) => {
                const yearWeek = `${moment(date).year()}-${moment(date).week()}`;
                if (!acc[yearWeek]) {
                    acc[yearWeek] = [];
                }

                acc[yearWeek].push(date);
                
                return acc;
            
            }, {});

            Object.keys(groups).forEach((weekGroup) => {
                const label = weekGroup.replace('-', ' Minggu ke ');
                labels.push(label)

                let totalTransaksi = 0;
                groups[weekGroup].map(week => {
                    data.map((chart) => {
                        if (moment(chart.date, 'DD-MM-YYYY').format('MM/DD/YYYY') === week) {
                            totalTransaksi += parseFloat(chart.total_sales);
                        } else {
                            totalTransaksi += 0;
                        }
                    })
                })

                datasets.push(totalTransaksi)
            })
        }

        const dataFix = {
            labels: labels,
            datasets: [
                {
                    data: datasets,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }
            ]
        }

        setChartData(dataFix);
    }

    useEffect(() => {
        fetchData(0);
        fetchSummary();
    }, []);

    useEffect(() => {
        fetchSummary();
    }, [filteredChart, startDate, endDate]);

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
        <button className="border-[#8581B7] text-[#8581B7] cursor-pointer border-[1px] p-1 text-xs w-[170px] rounded-md" onClick={onClick} ref={ref}>
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
                                        <ChartFilter changeEvent={ setFilteredChart } />
                                    </div>
                                    {chartData && (
                                        <Line data={chartData} width={100} height={40} options={options} />
                                    )}
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
