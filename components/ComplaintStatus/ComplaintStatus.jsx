import { COMPLAINT_STATUS } from "constants/enum";
import propTypes from "prop-types";

const ComplaintStatus = ({ status }) => {
    switch (status) {
        case COMPLAINT_STATUS.BELUM_SELESAI:
            return ( <div className="bg-[#272541] rounded-full text-white py-1 px-2 w-fit text-xs font-bold">Dibaca</div> );
        case COMPLAINT_STATUS.DIBALAS:
            return ( <div className="bg-[#66AE76] rounded-full text-white py-1 px-2 w-fit text-xs font-bold">Dibalas</div> );
        case COMPLAINT_STATUS.SELESAI:
            return ( <div className="bg-[#DFDFDF] rounded-full text-[#272541] py-1 px-2 w-fit text-xs font-bold">Selesai</div> );
        default:
            return null;
    }
};

ComplaintStatus.propTypes = {
    status: propTypes.string,
};

ComplaintStatus.defaultProps = {
    status: "1",
};

export default ComplaintStatus;
