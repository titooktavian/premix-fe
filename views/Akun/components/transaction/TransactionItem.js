import propTypes from "prop-types";

import TransactionStatus from "./TransactionStatus";
import { toRupiah } from "helpers/formatter";
import { dateFormatted } from "views/Akun/utils";

const TransactionItem = ({
    data: {
        status,
        status_val,
        outlet_name,
        no,
        total_price,
        date,
    },
    onOpenDetail,
}) => {
    return (
        <div className="border-b border-neutral-200 w-full py-2 mb-2 cursor-pointer" onClick={onOpenDetail}>
            <div className="flex justify-between items-center">
                <TransactionStatus status={status} statusValue={status_val} />
                <p className="text-xs font-bold text-dark-100">{outlet_name}</p>
            </div>
            <div className="flex justify-between items-center mt-3 text-sm font-medium text-dark-300 md:text-base">
                <p>{no}</p>
                <p>{toRupiah(total_price)}</p>
            </div>
            <p className="mt-2 text-xs font-medium text-dark-100">{dateFormatted(date)}</p>
        </div>
    )
};

TransactionItem.propTypes = {
    data: propTypes.shape({
        status: propTypes.number,
        status_val: propTypes.string,
        outlet_name: propTypes.string,
        no: propTypes.string,
        total_price: propTypes.number,
        date: propTypes.string,
    }),
    onOpenDetail: propTypes.func,
};

TransactionItem.defaultProps = {
    data: {
        status: 0,
        status_val: "",
        outlet_name: "",
        no: "",
        total_price: 0,
        date: "",
    },
    onOpenDetail: () => {},
};

export default TransactionItem;
