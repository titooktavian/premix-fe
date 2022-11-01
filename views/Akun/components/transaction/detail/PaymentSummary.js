import propTypes from "prop-types";

import { ORDER_TYPE } from "constants";
import { toRupiah } from "helpers/formatter";

const PaymentSummary = ({ data }) => {
    return (
        <div className="mt-4">
            <h3 className="text-dark-300 font-bold mb-4">Ringkasan Pembayaran</h3>
            <div className="flex items-center mb-2 justify-between text-dark-300 text-xs font-medium">
                <p>Subtotal Harga Produk</p>
                <p>{toRupiah(data.sub_total || 0)}</p>
            </div>
            <div className="flex items-center mb-2 justify-between text-dark-300 text-xs font-medium">
                <p>Subtotal Service Charge</p>
                <p>{toRupiah(data.service || 0)}</p>
            </div>
            <div className="flex items-center mb-2 justify-between text-dark-300 text-xs font-medium">
                <p>Subtotal Pajak</p>
                <p>{data.price_include_tax ? toRupiah(0) : toRupiah(data.tax ?? 0)}</p>
            </div>
            <div className="flex items-center mb-2 justify-between text-dark-300 text-xs font-medium">
                <p>Subtotal Promo/Diskon Produk</p>
                <p className="text-green-300">{toRupiah(data.promo_detail.promo_product_total_nominal || 0)}</p>
            </div>
            <div className="flex items-center mb-2 justify-between text-dark-300 text-xs font-medium">
                <p>Subtotal Promo/Diskon Transaksi</p>
                <p className="text-green-300">{toRupiah(data.promo_detail.promo_transaction_total_nominal || 0)}</p>
            </div>
            <div className="flex items-center mb-2 justify-between text-dark-300 text-xs font-medium">
                <p>Subtotal Kupon</p>
                <p className="text-green-300">{toRupiah(data.promo_detail.coupon_total_nominal || 0)}</p>
            </div>
            {
                data.type_order === ORDER_TYPE.DELIVERY && (
                    <>
                        <div className="flex items-center mb-2 justify-between text-dark-300 text-xs font-medium">
                            <p>Biaya Ongkir</p>
                            <p>{toRupiah(data.shipment_cost)}</p>
                        </div>
                        <div className="flex items-center mb-2 justify-between text-dark-300 text-xs font-medium">
                            <p>Asuransi Pengiriman</p>
                            <p className="text-red-500">({toRupiah(data.insurance_fee)})</p>
                        </div>
                    </>
                )
            }
            <div className="flex items-center mb-2 justify-between text-dark-300 text-xs font-medium">
                <p>Biaya Lainnya</p>
                <p>Rp 0</p>
            </div>
            <div className="flex items-center mb-2 justify-between text-dark-300 text-xs font-medium mt-3 pt-2 border-t border-neutral-200">
                <p className="text-dark-300 font-bold text-sm">Total Bayar</p>
                <p className="text-dark-300 font-bold text-sm">{toRupiah(data.total)}</p>
            </div>
        </div>
    )
};

PaymentSummary.propTypes = {
    data: propTypes.shape({
        sub_total: propTypes.number,
        service: propTypes.number,
        price_include_tax: propTypes.bool,
        tax: propTypes.number,
        type_order: propTypes.number,
        shipment_cost: propTypes.number,
        insurance_fee: propTypes.number,
        total: propTypes.number,
        promo_detail: propTypes.shape({
            promo_product_total_nominal: propTypes.number,
            promo_transaction_total_nominal: propTypes.number,
            coupon_total_nominal: propTypes.number,
        }),
    }),
};

PaymentSummary.defaultProps = {
    data: {
        sub_total: 0,
        service: 0,
        price_include_tax: false,
        tax: 0,
        type_order: 0,
        shipment_cost: 0,
        insurance_fee: 0,
        total: 0,
        promo_detail: {
            promo_product_total_nominal: 0,
            promo_transaction_total_nominal: 0,
            coupon_total_nominal: 0,
        }
    },
};

export default PaymentSummary;
