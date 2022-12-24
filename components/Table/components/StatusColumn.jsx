import propTypes from "prop-types";
import { TRANSACTION_STATUS } from "constants/enum";

const StatusColumn = ({ data }) => {
    const renderStatus = (status) => {
        switch (status) {
            case TRANSACTION_STATUS.WAITING:
                return ( <div className="bg-[#F8CA56] rounded-md text-[#272541] py-1 px-2 w-fit text-xs">Belum dibayar</div> );
            case TRANSACTION_STATUS.ACTIVE:
                return ( <div className="bg-[#66AE76] rounded-md text-white py-1 px-2 w-fit text-xs">Aktif</div> );
            case TRANSACTION_STATUS.REJECT:
                return ( <div className="bg-[#D64949] rounded-md text-white py-1 px-2 w-fit text-xs">Batal</div> );
            default:
                return null;
        }
    }

    return (
        <div>{renderStatus(data)}</div>
    );
};

StatusColumn.propTypes = {
    data: propTypes.number,
};

StatusColumn.defaultProps = {
    data: 0,
};

export default StatusColumn;
