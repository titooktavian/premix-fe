import { Divider } from "components";
import { ORDER_TYPE_DELIVERY } from "constants";
import { toRupiah } from "helpers/formatter";
import propTypes from "prop-types";

const PaymentSummary = ({ data }) => {
    const {
        sub_total,
        service_charge,
        tax,
        tax_type,
        promo_product_total_nominal,
        promo_transaction_total_nominal,
        coupon_total_nominal,
        type_order,
        shipment_cost,
        insurance_fee,
        grand_total,
    } = data;
    const pajak = () => {
        return (
            <>
                <div className="my-1 flex justify-between">
                    <span>Subtotal Service Charge</span>
                    <span>{toRupiah(service_charge)}</span>
                </div>
                <div className="my-1 flex justify-between">
                    <span>Subtotal Pajak</span>
                    <span>{toRupiah(tax)}</span>
                </div>
            </>
        )
    }
    return (
        <>
            <h2 className="text-base font-bold text-dark-300 md:px-2">
                Ringkasan Pembayaran
            </h2>
            <div className="my-4 md:my-0 flex flex-col text-sm font-bold text-dark-300 p-2">
                <div className="my-1 flex justify-between">
                    <span>Subtotal Produk</span>
                    <span>{toRupiah(sub_total)}</span>
                </div>
                {tax_type !== 2 && pajak()}
                <div className="my-1 flex justify-between">
                    <span>Subtotal Promo/Diskon Produk</span>
                    <span className="text-green-300">{toRupiah(promo_product_total_nominal)}</span>
                </div>
                <div className="my-1 flex justify-between">
                    <span>Subtotal Promo/Diskon Transaksi</span>
                    <span className="text-green-300">{toRupiah(promo_transaction_total_nominal)}</span>
                </div>
                <div className="my-1 flex justify-between">
                    <span>Subtotal Kupon</span>
                    <span className="text-green-300">{toRupiah(coupon_total_nominal)}</span>
                </div>
                {tax_type === 2 && pajak()}
                {type_order === ORDER_TYPE_DELIVERY && (
                    <>
                        <div className="my-1 flex justify-between">
                            <span>Biaya Ongkir</span>
                            <span>{toRupiah(shipment_cost)}</span>
                        </div>
                        <div className="my-1 flex justify-between">
                            <span>Asuransi Pengiriman</span>
                            <span>{toRupiah(insurance_fee)}</span>
                        </div>
                    </>
                )}
                <div className="my-1 flex justify-between">
                    <span>Biaya Lainnya</span>
                    <span>{toRupiah(0)}</span>
                </div>
                <Divider className="my-2"/>
                <div className="my-1 flex justify-between">
                    <span>Total Bayar</span>
                    <span>{toRupiah(grand_total)}</span>
                </div>
                {tax_type === 3 && (
                    <span>Total bayar sudah termasuk pajak senilai {toRupiah(tax)}</span>
                )}
            </div>
        </>
    )
};

PaymentSummary.propTypes = {
    data: propTypes.shape({
        sub_total: propTypes.number,
        service_charge: propTypes.number,
        tax: propTypes.number,
        tax_type: propTypes.number,
        type_order: propTypes.number,
        promo_product_total_nominal: propTypes.number,
        promo_transaction_total_nominal: propTypes.number,
        coupon_total_nominal: propTypes.number,
        shipment_cost: propTypes.number,
        insurance_fee: propTypes.number,
        grand_total: propTypes.number,
    }),
};

PaymentSummary.defaultProps = {
    data: {
        sub_total: 0,
        service_charge: 0,
        tax: 0,
        promo_product_total_nominal: 0,
        promo_transaction_total_nominal: 0,
        coupon_total_nominal: 0,
        type_order: 0,
        shipment_cost: 0,
        insurance_fee: 0,
        grand_total: 0,
    },
};


export default PaymentSummary;