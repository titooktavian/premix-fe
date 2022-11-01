import propTypes from "prop-types";

import { ORDER_TYPE, subOrderTypeLabel, SUB_ORDER_TYPE } from "../utils";

export const TransactionTypeDineIn = ({ data }) => {
    const tableNo = data.type_order === ORDER_TYPE.DINE_IN && data.sub_order_type === SUB_ORDER_TYPE.ANTAR_KE_MEJA ? data.table_no : "-";
    const subTypeOrder = subOrderTypeLabel(data.sub_order_type);

    return (
        <>
            <div className="flex justify-between text-dark-300 text-xs mt-3">
                <p className="font-medium">Nama: {data.name}</p>
                <p className="font-medium">{subTypeOrder}</p>
            </div>
            <p className="font-medium text-dark-300 text-xs mt-2">No Meja: {tableNo}</p>
        </>
    )
};

TransactionTypeDineIn.propTypes = {
    data: propTypes.shape({
        type_order: propTypes.number,
        sub_order_type: propTypes.number,
        table_no: propTypes.string,
        name: propTypes.string,
    }),
};

TransactionTypeDineIn.defaultProps = {
    data: {
        type_order: 0,
        sub_order_type: 0,
        table_no: "",
        name: propTypes.string,
    },
};

export const TransactionTypeDelivery = ({ data }) => {
    const subTypeOrder = subOrderTypeLabel(data.sub_order_type);
    const courier = data.shipment ? data.shipment.courier : "-";
    const tracking = data.shipment ? data.shipment.waybill_id : "-";

    return (
        <table className="text-xs font-medium text-dark-300 border-t border-neutral-200 w-full mt-2">
            <tbody>
                <tr>
                    <td className="pb-2 pt-3">Jenis</td>
                    <td className="pb-2 pt-3">:</td>
                    <td className="pb-2 pt-3">{subTypeOrder}</td>
                </tr>
                <tr>
                    <td className="pb-2">Kurir</td>
                    <td className="pb-2">:</td>
                    <td className="pb-2">{courier}</td>
                </tr>
                <tr>
                    <td className="pb-2">No Resi</td>
                    <td className="pb-2">:</td>
                    <td className="pb-2">{tracking || "-"}</td>
                </tr>
                <tr>
                    <td className="align-top w-[95px]">Info Pelanggan</td>
                    <td className="align-top w-2">:</td>
                    <td>
                        {data.name}
                        <br />
                        {data.phone_number}
                        <br />
                        {data.address}
                    </td>
                </tr>
            </tbody>
        </table>
    )
};

TransactionTypeDelivery.propTypes = {
    data: propTypes.shape({
        sub_order_type: propTypes.number,
        name: propTypes.string,
        phone_number: propTypes.string,
        address: propTypes.string,
        shipment: propTypes.shape({}),
    }),
};

TransactionTypeDelivery.defaultProps = {
    data: {
        sub_order_type: 0,
        name: "",
        phone_number: "",
        address: "",
        shipment: {},
    }
};
