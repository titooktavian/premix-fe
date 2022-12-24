import propTypes from "prop-types";
import { useState } from "react";
import { RiMoreFill } from "react-icons/ri";

const ActionColumn = ({ data, clickHandler }) => {
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
                <div className="absolute shadow bg-white p-4 w-28 z-10">
                    <div className="cursor-pointer" onClick={() => {clickHandler(data)}}>Lihat Detail</div>
                </div>
            )}
        </div>
    );
};

ActionColumn.propTypes = {
    data: propTypes.shape().isRequired,
};

export default ActionColumn;
