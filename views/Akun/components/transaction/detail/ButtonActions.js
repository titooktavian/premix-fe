import { useEffect, useState } from "react";
import propTypes from "prop-types";

import { Button } from "components";
import { ORDER_TYPE } from "../utils";
import { TRANSACTION_STATUS } from "constants/enum";
import { reformatNumber } from "helpers/formatter";
import { AlertService } from "services";

const dateNow = new Date().getTime();

const ButtonPaymentWaiting = ({
    countdownFinish, onCheckOrder, onCancel, onPay,
}) => {
    return (
        <>
            <Button
                full
                disabled={countdownFinish}
                size="lg"
                label="Bayar Sekarang"
                onClick={onPay}
            />
            <div className="grid md:grid-cols-2 mt-2 md:mt-4 gap-2 md:gap-4">
                <Button
                    full
                    size="lg"
                    variant="secondary"
                    label="Cek Status Bayar"
                    className="md:text-sm"
                    onClick={onCheckOrder}
                />
                <Button
                    full
                    size="lg"
                    variant="secondary"
                    label="Batalkan Pesanan"
                    className="text-red-300 md:text-sm"
                    onClick={onCancel}
                />
            </div>
        </>
    )
};

const ButtonPaidAndProcess = ({
    isProcess = false, orderType, disabledFinish, onCallMerchant, onCancel, onComplete,
}) => {
    return (
        <div className="md:grid md:grid-cols-2 gap-2 md:gap-4 flex flex-col-reverse">
            <Button
                full
                disabled={disabledFinish}
                size="lg"
                label={isProcess && orderType === ORDER_TYPE.DINE_IN ? "Selesai" : "Batalkan Pesanan"}
                className="md:text-sm"
                onClick={isProcess && orderType === ORDER_TYPE.DINE_IN ? onComplete : onCancel}
            />
            <Button
                full
                size="lg"
                variant="secondary"
                label="Hubungi Outlet"
                className="md:text-sm"
                onClick={onCallMerchant}
            />
        </div>
    )
};

const ButtonDeliver = ({ onCallMerchant, onComplete, onOpenTracking }) => {
    return (
        <>
            <div className="grid md:grid-cols-2 mb-2 md:mb-4 gap-2 md:gap-4">
                <Button
                    full
                    size="lg"
                    variant="secondary"
                    label="Hubungi Outlet"
                    className="md:text-sm"
                    onClick={onCallMerchant}
                />
                <Button
                    full
                    size="lg"
                    variant="secondary"
                    label="Lacak"
                    className="md:text-sm"
                    onClick={onOpenTracking}
                />
            </div>
            <Button
                full
                disabled
                size="lg"
                label="Selesai"
                onClick={onComplete}
            />
        </>
    )
};

const ButtonFinishTransaction = ({ onCallMerchant, onReorder }) => {
    return (
        <div className="grid md:grid-cols-2 gap-2 md:gap-4">
            <Button
                full
                size="lg"
                variant="secondary"
                label="Hubungi Outlet"
                className="md:text-sm"
                onClick={onCallMerchant}
            />
            <Button
                full
                size="lg"
                label="Ulangi Pesanan"
                className="md:text-sm"
                onClick={onReorder}
            />
        </div>
    )
};

const ButtonActions = ({
    countdownFinish,
    onCheckOrder,
    onCancel,
    onComplete,
    onReorder,
    onOpenTracking,
    onPay,
    data: {
        status,
        type_order,
        order_date,
        shipment,
        whatsapp_merchant,
    },
}) => {
    const [disabledFinish, setDisabledFinish] = useState(true);
    const handleCallMerchant = () => {
        if (!whatsapp_merchant) {
            AlertService.error("Tidak dapat menghubungi outlet");
            return;
        }
        const whatsapp = reformatNumber(whatsapp_merchant);
        window.open(`https://wa.me/${whatsapp}`);
    };

    useEffect(() => {
        let isActiveTime = false;
        if (status === TRANSACTION_STATUS.PESANAN_DIPROSES || status === TRANSACTION_STATUS.PROSES_PENGIRIMAN) {
            if (status === TRANSACTION_STATUS.PESANAN_DIPROSES && type_order === ORDER_TYPE.DINE_IN) {
                const enableDinein = new Date(order_date).getTime() + (3*60*60*1000);
                isActiveTime = dateNow > enableDinein;
            } else {
                const enableDelivery = new Date(shipment.picked_at).getTime() + (24*60*60*1000);
                isActiveTime = shipment.picked_at && dateNow > enableDelivery;
            }
        }
        setDisabledFinish(!isActiveTime);
    }, []);

    switch (status) {
    case TRANSACTION_STATUS.MENUNGGU_PEMBAYARAN:
        return (
            <ButtonPaymentWaiting
                countdownFinish={countdownFinish}
                onCheckOrder={onCheckOrder}
                onCancel={onCancel}
                onPay={onPay}
            />
        )
    case TRANSACTION_STATUS.PEMBAYARAN_BERHASIL:
    case TRANSACTION_STATUS.PESANAN_DIPROSES:
        return (
            <ButtonPaidAndProcess
                isProcess={status === TRANSACTION_STATUS.PESANAN_DIPROSES}
                orderType={type_order}
                disabledFinish={disabledFinish}
                onCallMerchant={handleCallMerchant}
                onCancel={onCancel}
                onComplete={onComplete}
            />
        )
    case TRANSACTION_STATUS.PROSES_PENGIRIMAN:
        return (
            <ButtonDeliver
                onCallMerchant={handleCallMerchant}
                onComplete={onComplete}
                onOpenTracking={onOpenTracking}
            />
        )
    case TRANSACTION_STATUS.PESANAN_SELESAI:
    case TRANSACTION_STATUS.PESANAN_DIBATALKAN:
        return <ButtonFinishTransaction onCallMerchant={handleCallMerchant} onReorder={onReorder} />
    default:
        return null;
    }
};

ButtonActions.propTypes = {
    countdownFinish: propTypes.bool,
    onCheckOrder: propTypes.func,
    onCancel: propTypes.func,
    onComplete: propTypes.func,
    onReorder: propTypes.func,
    onOpenTracking: propTypes.func,
    onPay: propTypes.func,
    data: propTypes.shape({
        status: propTypes.number,
        type_order: propTypes.number,
        order_date: propTypes.string,
        whatsapp_merchant: propTypes.string,
        shipment: propTypes.shape({
            picked_at: propTypes.string,
        }),
    }),
};

ButtonActions.defaultProps = {
    countdownFinish: false,
    onCheckOrder: () => {},
    onCancel: () => {},
    onComplete: () => {},
    onReorder: () => {},
    onOpenTracking: () => {},
    onPay: () => {},
    data: {
        status: 0,
        type_order: 0,
        order_date: "",
        whatsapp_merchant: "",
        shipment: {
            picked_at: "",
        },
    },
};

export default ButtonActions;
