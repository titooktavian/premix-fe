import { TRANSACTION_STATUS, USER_PERMISSION } from "constants/enum";
import { useStateContext } from "context/StateContext";
import propTypes from "prop-types";
import { useState } from "react";
import { RiMoreFill } from "react-icons/ri";

const ActionColumn = ({ data, clickHandler, confirmHandler }) => {
    const { userLogin } = useStateContext();
    const [openDetail, setOpenDetail] = useState(false);
    const hideDropdown = () => {
        if (openDetail) {
          setOpenDetail(false);
        }
    };

    return (
        <div className="relative" onBlur={hideDropdown} tabIndex={0}>
            <div className="cursor-pointer w-fit" onClick={() => { setOpenDetail(!openDetail) }} >
                <RiMoreFill />
            </div>
            {openDetail && (
                <div className="absolute shadow bg-white p-4 w-28 z-10 flex flex-col gap-2">
                    <div className="cursor-pointer" onClick={() => {clickHandler(data)}}>Lihat Detail</div>
                    {confirmHandler && userLogin?.id_permission === USER_PERMISSION.ADMIN && data.id_status === TRANSACTION_STATUS.WAITING && (
                        <div className="cursor-pointer" onClick={() => {confirmHandler(data)}}>Konfirmasi</div>
                    )}
                </div>
            )}
        </div>
    );
};

ActionColumn.propTypes = {
    data: propTypes.shape().isRequired,
    confirmHandler: propTypes.func,
};

ActionColumn.defaultProps = {
    confirmHandler: undefined,
};

export default ActionColumn;
