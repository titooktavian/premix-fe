import StatusColumn from "components/Table/components/StatusColumn";
import { useStateContext } from "context/StateContext";
import { getTransactionDetail } from "helpers/api";
import { catchError, toRupiah } from "helpers/formatter";
import moment from "moment/moment";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { AlertService } from "services";

const OrderDetail = ({ transactionId, callbackAction }) => {
    const { setLoading } = useStateContext();
    const [transactionDetail, setTransactionDetail] = useState([]);
    const [transaction, setTransaction] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getTransactionDetail(transactionId, {});

            if (!res.status) throw Error(res.msg);
            setTransactionDetail(res.data);
            setTransaction(res.data[0].transaction);
        } catch (error) {
            AlertService.error(catchError(error));
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [transactionId]);

    return (
        <div className="w-full flex flex-col gap-4">
            {transaction && (
                <div
                    className="flex w-full h-[94px] bg-fill bg-right bg-[#272541] bg-no-repeat rounded-lg text-white items-center p-6 gap-6"
                    style={{
                        backgroundImage: `url('/images/bg-dashboard.png')`,
                    }}
                >
                    <div className="flex flex-col">
                        <div className="flex gap-2">
                            <span className="text-base font-bold">No. Order</span>
                            <StatusColumn data={transaction.id_status} />
                        </div>
                        <div className="text-base font-normal">{transaction.order_number}</div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex gap-2">
                            <span className="text-base font-bold">Tanggal Pembelian</span>
                        </div>
                        <div className="text-base font-normal">{moment(transaction.created_at).format('DD MMMM YYYY')}</div>
                    </div>
                </div>
            )}
            
            <div className="flex w-full bg-white rounded-lg p-6 gap-6">
                <div className="flex w-full flex-col">
                    <div className="flex gap-2">
                        <div className="text-base font-bold w-2/3">Produk</div>
                        <div className="text-base font-bold text-right w-1/3">Total</div>
                    </div>
                    {transactionDetail && transactionDetail.map((detail) => (
                        <div className="flex flex-col" key={`detail-${detail.id_transaction_detail}`}>
                            <div className="flex gap-2 mt-4">
                                <div className="flex flex-col w-2/3">
                                    <span className="text-sm font-bold text-[#6E6C85]">{`${detail.product.product_name} - ${detail.product_duration.duration_value} Hari x${detail.qty}`}</span>
                                    {detail.expired_date && (
                                        <span className="text-xs font-normal text-[#8E8E9A]">{`Berakhir pada ${moment(detail.expired_date, 'DD-MM-YYYY').format('DD MMMM YYYY')}`}</span>
                                    )}
                                </div>
                                <div className="text-sm font-normal flex flex-col text-right w-1/3">
                                    <div className="text-[#6E6C85]">{toRupiah(detail.subtotal)}</div>
                                    <div className="text-[#FF5C6F]">{`- ${toRupiah(detail.promo_value)}`}</div>
                                </div>
                            </div>
                            {detail.account_value && (
                                <div className="flex gap-2 mt-2">
                                    <div className="text-sm font-bold w-full">Daftar Akun</div>
                                </div>
                            )}
                            
                            {detail.account_value && detail.account_value.map((account, i) => {
                                const accountSplited = account.credential.split(' - ');
                                return (
                                    <div className="flex flex-col" key={`account-value-${i}`}>
                                        <div className="flex gap-1" >
                                            <div className="text-sm w-1/4 text-[#6E6C85]">Email</div>
                                            <div className="text-sm font-bold w-3/4">{accountSplited[0]}</div>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="text-sm w-1/4 text-[#6E6C85]">Password</div>
                                            <div className="text-sm font-bold w-3/4">{accountSplited[1]}</div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="border-b-[1px] mt-6"></div>
                        </div>
                    ))}

                    {transaction && (
                        <>
                            <div className="flex gap-2 mt-6">
                                <div className="flex flex-col w-2/3">
                                    <span className="text-sm font-bold text-[#272541]">Subtotal</span>
                                </div>
                                <div className="text-sm font-normal text-[#6E6C85] text-right w-1/3">{toRupiah(transaction.subtotal)}</div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <div className="flex flex-col w-2/3">
                                    <span className="text-sm font-bold text-[#272541]">Kode Pembayaran</span>
                                </div>
                                <div className="text-sm font-normal text-[#6E6C85] text-right w-1/3">{toRupiah(transaction.unique_code)}</div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <div className="flex flex-col w-2/3">
                                    <span className="text-sm font-bold text-[#272541]">Total Pembayaran</span>
                                </div>
                                <div className="text-sm font-normal text-[#6E6C85] text-right w-1/3">{toRupiah(transaction.total)}</div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            
            <div className="h-[37px] px-[24px] rounded-full w-fit flex justify-center items-center text-[#8581B7] text-base font-bold cursor-pointer mt-3 border-[1px] border-[#8581B7]" onClick={() => {callbackAction();}}>
                Kembali
            </div>
        </div>
    )
};

OrderDetail.propTypes = {
    transactionId: propTypes.oneOfType([
        propTypes.number,
        propTypes.string,
    ]),
    callbackAction: propTypes.func,
};

OrderDetail.defaultProps = {
    transactionId: null,
    callbackAction: () => {},
};

export default OrderDetail;
