import { useState } from "react";
import propTypes from "prop-types";
import { FaInfoCircle } from "react-icons/fa";
import { useRouter } from "next/router";

import TransactionStatus from "./TransactionStatus";
import ListProducts from "./detail/ListProducts";
import CountDownTimer from "./detail/CountDownTimer";
import PaymentSummary from "./detail/PaymentSummary";
import ButtonActions from "./detail/ButtonActions";
import ModalCancelTransaction from "../modal/CancelTransaction";
import ModalCompleteTransaction from "../modal/CompleteTransaction";
import ModalTracking from "../modal/Tracking";
import { dateFormatted } from "views/Akun/utils";
import { ORDER_TYPE, statusDownloadEreceipt } from "./utils";
import { TransactionTypeDelivery, TransactionTypeDineIn } from "./detail/DescTransactionType";
import { useStateContext } from "context/StateContext";
import { cancelTransaction, checkOrder, completeTransaction, downloadEreceipt, trackingShipment } from "helpers/api";
import { AlertService } from "services";
import { catchError } from "helpers/formatter";
import { TRANSACTION_STATUS, TRANSACTION_STATUS_LABEL } from "constants/enum";
import { Button, ModalConfirmReorder } from "components";

const TransactionDetail = ({ data, merchantCode, onFetchDetail }) => {
    const initCountdownFinish = data.status !== TRANSACTION_STATUS.MENUNGGU_PEMBAYARAN || !data.expired_date;
    const [confirmCancel, setConfirmCancel] = useState(false);
    const [confirmComplete, setConfirmComplete] = useState(false);
    const [confirmReorder, setConfirmReorder] = useState(false);
    const [trackingPopup, setTrackingPopup] = useState(false);
    const [trackingLoading, setTrackingLoading] = useState(true);
    const [trackingData, setTrackingData] = useState(null);
    const [countdownFinish, setCountdownFinish] = useState(initCountdownFinish);
    const { setLoading, onResetCart, onAddToCart, setTransactionNumber } = useStateContext();
    const router = useRouter();

    const transactionTypeContent = (data) => {
        if (data.type_order === ORDER_TYPE.DINE_IN) {
            return <TransactionTypeDineIn data={data} />
        } else if (data.type_order === ORDER_TYPE.DELIVERY) {
            return <TransactionTypeDelivery data={data} />
        }
    };

    const handleCheckOrder = async () => {
        setLoading(true);
        try {
            const res = await checkOrder(data.no);
            if (!res.status) throw new Error(res.msg);
            const messageError = TRANSACTION_STATUS_LABEL[res.data.status];
            AlertService.error(messageError || "Pesanan tidak ditemukan");
        } catch (error) {
            AlertService.error(catchError(error));
        } finally {
            setLoading(false);
        }
    };

    const handleCancelTransaction = async () => {
        setLoading(true);
        try {
            const payload = { transaction_no: data.no };
            const res = await cancelTransaction(merchantCode, payload);
            if (!res.status) throw new Error(res.msg);
            AlertService.error("Pesanan berhasil dibatalkan");
            onFetchDetail(data.no);
        } catch (error) {
            AlertService.error(catchError(error));
        } finally {
            setLoading(false);
        }
    };

    const handleCompleteTransaction = async () => {
        setLoading(true);
        try {
            const payload = { transaction_no: data.no };
            const res = await completeTransaction(merchantCode, payload);
            if (!res.status) throw new Error(res.msg);
            AlertService.success("Pesanan berhasil diselesaikan");
            onFetchDetail(data.no);
        } catch (error) {
            AlertService.error(catchError(error));
        } finally {
            setLoading(false);
        }
    };

    const handleCountdownFinish = () => {
        setTransactionNumber(data.no);
        setCountdownFinish(true);
        setTimeout(() => {
            handleCheckOrder();
            router.push("/riwayat-transaksi");
        }, 1000);
    };

    const handleOpenCart = () => router.push("/keranjang");

    const handleReorder = async () => {
        setLoading(true);
        await onResetCart();
        const productList = data.products;
        productList.forEach(async (product, index) => {
            const newProduct = {
                id_product: product.id,
                note: product.notes,
                quantity: 1,
                add_on_detail_id: product.add_on,
            };
            if(productList.length - 1 === index) {
                await onAddToCart(newProduct, handleOpenCart);
            } else {
                await onAddToCart(newProduct);
            }
        });
    };

    const handleFetchTracking = async () => {
        setTrackingLoading(true);
        handleTrackingPopup();
        try {
            const res = await trackingShipment(merchantCode, data.no);
            if (res.data === null) throw new Error(res.message);
            setTrackingData(res.data);
        } catch (error) {
            handleTrackingPopup();
            AlertService.error(catchError(error));
        } finally {
            setTrackingLoading(false);
        }
    };

    const handlePayTransaction = () => {
        const { app_direct: appDirect, web_direct: webDirect } = data;
        let redirectURL;
        if (appDirect === '' || !appDirect || appDirect === null) {
            if (webDirect === '' || !webDirect || webDirect === null) {
                redirectURL = `/cek-status-transaksi/${data.no}`;
            } else {
                redirectURL = webDirect;
            }
        } else {
            redirectURL = appDirect;
        }
        router.push(redirectURL);
    };

    const handleDownloadEreceipt = async () => {
        setLoading(true);
        try {
            const res = await downloadEreceipt(data.no);
            if (!res.data.url_link) throw new Error(res.message);
            const link = document.createElement("a");
            document.body.appendChild(link);
            link.style.display = "none";
            link.href = res.data.url_link;
            link.target = "_blank";
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            AlertService.error(catchError(error));
        } finally {
            setLoading(false);
        }
    };

    const handleToggleConfirmCancel = () => setConfirmCancel(prevState => !prevState);

    const handleConfirmComplete = () => setConfirmComplete(prevState => !prevState);

    const handleConfirmReorder = () => setConfirmReorder(prevState => !prevState);

    const handleTrackingPopup = () => setTrackingPopup(prevState => !prevState);

    return (
        <>
            {data.status === 1 && data.expired_date && (
                <CountDownTimer expiredDate={data.expired_date} onCountdownFinish={handleCountdownFinish} />
            )}
            <div className="pb-2 border-b border-neutral-200">
                <div className="flex justify-between items-center">
                    <div className="inline-block">
                        <TransactionStatus status={data.status} statusValue={data.status_val} fontWeight="md:font-medium" />
                    </div>
                    {statusDownloadEreceipt.includes(data.status) && (
                        <Button
                            label="Unduh E-Receipt"
                            size="xs"
                            onClick={handleDownloadEreceipt}
                        />
                    )}
                </div>
                <p className="text-dark-300 font-semibold mt-2">{data.no}</p>
                <p className="text-dark-100 font-medium text-xs mt-2">{dateFormatted(data.order_date)}</p>
            </div>
            <div className="flex items-center bg-neutral-200 rounded-lg py-3 px-2 mt-3">
                <FaInfoCircle className="text-dark-100 text-sm" />
                <p className="text-dark-200 font-medium w-full text-xs ml-2">{data.notes}</p>
            </div>
            {transactionTypeContent(data)}
            <ListProducts products={data.products} />
            <PaymentSummary data={data} />
            <div className="mt-8">
                <ButtonActions
                    countdownFinish={countdownFinish}
                    data={data}
                    onCheckOrder={handleCheckOrder}
                    onCancel={handleToggleConfirmCancel}
                    onComplete={handleConfirmComplete}
                    onReorder={handleConfirmReorder}
                    onOpenTracking={handleFetchTracking}
                    onPay={handlePayTransaction}
                />
            </div>
            <ModalCancelTransaction
                show={confirmCancel}
                onClose={handleToggleConfirmCancel}
                onConfirm={handleCancelTransaction}
            />
            <ModalCompleteTransaction
                show={confirmComplete}
                onClose={handleConfirmComplete}
                onConfirm={handleCompleteTransaction}
            />
            <ModalConfirmReorder
                show={confirmReorder}
                onClose={handleConfirmReorder}
                onConfirm={handleReorder}
            />
            <ModalTracking
                show={trackingPopup}
                data={trackingData}
                isLoading={trackingLoading}
                onClose={handleTrackingPopup}
            />
        </>
    )
};

TransactionDetail.propTypes = {
    merchantCode: propTypes.string.isRequired,
    onFetchDetail: propTypes.func.isRequired,
    data: propTypes.shape({
        status: propTypes.number,
        expired_date: propTypes.string,
        type_order: propTypes.number,
        no: propTypes.string,
        products: propTypes.arrayOf(propTypes.shape({})),
        app_direct: propTypes.string,
        web_direct: propTypes.string,
        status_val: propTypes.string,
        order_date: propTypes.string,
        notes: propTypes.string,
    }),
};

TransactionDetail.defaultProps = {
    data: {
        status: 0,
        expired_date: "",
        type_order: 0,
        no: "",
        products: [],
        app_direct: "",
        web_direct: "",
        status_val: "",
        order_date: "",
        notes: "",
    },
}

export default TransactionDetail;
