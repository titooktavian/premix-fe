import StatusColumn from "components/Table/components/StatusColumn";
import { useStateContext } from "context/StateContext";
import { acceptTransaction, getTransactionDetail } from "helpers/api";
import { catchError } from "helpers/formatter";
import moment from "moment/moment";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { AlertService } from "services";

const TransactionDetail = ({ transactionId, callbackAction }) => {
    const { setLoading } = useStateContext();
    const [transactionDetail, setTransactionDetail] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getTransactionDetail(transactionId, {});

            if (!res.status) throw Error(res.msg);
            reformatData(res.data);
        } catch (error) {
            AlertService.error(catchError(error));
        }

        setLoading(false);
    };

    const reformatData = (data) => {
        
        const baseForm = {
            email: '',
            password: '',
        };
        
        const dataFix = data.map(list => {
            let formList = [];
            for (let index = 0; index < parseInt(list.qty); index++) {
                formList.push(baseForm);
            }

            const newObj = {
                ...list,
                formData: [...formList],
            }

            return newObj;
        })

        setTransactionDetail(dataFix);
    }

    const changeInputHandler = (value, key, idTransactionDetail, compKey) => {
        const newTransactionDetail = transactionDetail.map((detail) => {
            if (idTransactionDetail === detail.id_transaction_detail) {
                const newFormData = detail.formData.map((form, idx) => {
                    let tempForm = {...form};
                    const tempKey = `form-data-${key}-${idx}-${idTransactionDetail}`;
                    if (compKey === tempKey) {
                        tempForm = {
                            ...tempForm,
                            [key]: value,
                        }
                    }
                    
                    return tempForm;
                });

                const newObj = {
                    ...detail,
                    formData: [...newFormData],
                }
                return newObj;
            }
            return detail;
        })

        setTransactionDetail(newTransactionDetail);
    }

    const doUpdateTransaction = async () => {
        setLoading(true);
        try {
            const detail = transactionDetail.map(trx => {
                const trxDetail = trx.formData.map((formData) => {
                    const newTrxDetail = {
                        credential: formData.email,
                    }

                    return newTrxDetail;
                });

                const expDate = moment().add(parseInt(trx.product_duration.duration_value), 'days').format('DD-MM-YYYY');
                const newObj = {
                    id_transaction_detail: trx.id_transaction_detail,
                    qty: trx.qty,
                    account_value: [...trxDetail],
                    expired_date: expDate,
                }
                return newObj;
            })
            
            const payload = {
                id_transaction: transactionId,
                id_status: 2,
                details: [...detail]
            }

            const res = await acceptTransaction(payload);

            if (!res.status) throw Error(res.msg);
            
            AlertService.success('Berhasil mengubah transaksi');
            callbackAction();
        } catch (error) {
            AlertService.error(catchError(error));
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [transactionId]);

    return (
        <div>
            <div className="w-full flex flex-col gap-4 pb-6">
                {transactionDetail.length > 0 && (
                    <>
                        <div
                            className="flex w-full h-[94px] bg-fill bg-right bg-[#272541] bg-no-repeat rounded-lg text-white items-center p-6 gap-6"
                            style={{
                                backgroundImage: `url('/images/bg-dashboard.png')`,
                            }}
                        >
                            <div className="flex flex-col">
                                <div className="flex gap-2">
                                    <span className="text-base font-bold">No. Order</span>
                                    <StatusColumn data={transactionDetail[0].id_status} />
                                </div>
                                <div className="text-base font-normal">{transactionDetail[0].order_number}</div>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex gap-2">
                                    <span className="text-base font-bold">Tanggal Pembelian</span>
                                </div>
                                <div className="text-base font-normal">{moment(transactionDetail[0].created_at).format('DD MMMM YYYY')}</div>
                            </div>
                        </div>
                        
                        <div className="flex w-full bg-white rounded-lg p-6 gap-6 overflow-y-auto max-h-96">
                            <div className="flex w-full flex-col">
                                {transactionDetail && transactionDetail.map((detail) => (
                                    <>
                                        <div className="flex gap-2">
                                            <div className="text-base font-bold w-1/2">Produk</div>
                                            <div className="text-base font-bold w-1/2">Durasi</div>
                                        </div>
                                        <div className="flex gap-2 mt-2" key={`detail-${detail.id_transaction_detail}`}>
                                            <div className="flex flex-col w-1/2">
                                                <span className="text-sm font-bold text-[#6E6C85]">{`${detail.product.product_name}`}</span>
                                                {detail.expired_date && (
                                                    <span className="text-xs font-normal text-[#8E8E9A]">{`Berakhir pada ${moment(detail.expired_date).format('DD MMMM YYYY')}`}</span>
                                                )}
                                            </div>
                                            <div className="text-sm font-normal flex flex-col w-1/2">
                                            <span className="text-sm font-bold text-[#6E6C85]">{`${detail.product_duration.duration_value} Hari x${detail.qty}`}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="text-base font-bold w-full mt-4">List Akun</div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {detail.formData.map((dataForm, i) => (
                                                <div className="flex gap-2" key={`form-data-${i}-${detail.id_transaction_detail}`}>
                                                    <div className="w-2/3 mt-3">
                                                        <label htmlFor={`email-${i}-${detail.id_transaction_detail}`} className="block mb-2 text-sm font-medium text-gray-900">Credential</label>
                                                        {/* <input type="text" id={`email-${i}-${detail.id_transaction_detail}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan email" value={dataForm.email} onChange={(e) => { changeInputHandler(e.target.value, 'email', detail.id_transaction_detail, `form-data-email-${i}-${detail.id_transaction_detail}`) }} /> */}
                                                        <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Masukkan credential akun" onChange={(e) => { changeInputHandler(e.target.value, 'email', detail.id_transaction_detail, `form-data-email-${i}-${detail.id_transaction_detail}`) }} value={dataForm.email} />
                                                    </div>
                                                    {/* <div className="w-1/3 mt-3">
                                                        <label htmlFor={`password-${i}-${detail.id_transaction_detail}`} className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                                        <input type="password" id={`password-${i}-${detail.id_transaction_detail}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan email" value={dataForm.password} onChange={(e) => { changeInputHandler(e.target.value, 'password', detail.id_transaction_detail, `form-data-password-${i}-${detail.id_transaction_detail}`) }} />
                                                    </div> */}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="border-b-[1px] mt-6 mt- mb-6"></div>
                                    </>
                                ))}

                                <div className="w-full flex gap-2">
                                    <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full flex justify-center items-center text-white text-base font-bold cursor-pointer mt-3" onClick={() => { doUpdateTransaction(); }}>
                                        {'Konfirmasi Pesanan'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    
                )}
            </div>
        </div>
    )
};

TransactionDetail.propTypes = {
    transactionId: propTypes.string,
    callbackAction: propTypes.func,
};

TransactionDetail.defaultProps = {
    transactionId: '',
    callbackAction: () => {},
};

export default TransactionDetail;
