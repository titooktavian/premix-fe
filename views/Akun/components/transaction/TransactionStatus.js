import propTypes from "prop-types";

const TransactionStatus = ({ status, statusValue, fontWeight }) => {

    let classes = "";
    switch (status) {
    case 1:
        classes = "bg-blue-100 text-dark-300";
        break;
    case 2:
    case 5:
        classes = "bg-green-100 text-dark-300";
        break;
    case 3:
        classes = "bg-orange-100 text-dark-300";
        break;
    case 4:
    case 6:
        classes = "bg-red-100 text-dark-300";
        break;
    case 7:
        classes = "bg-red-300 text-white";
        break;
    default:
        classes = "bg-blue-100 text-dark-300";
    }

    return (
        <p className={`text-xs ${fontWeight} py-1 px-2 rounded-full ${classes}`}>
            {statusValue}
        </p>
    )
};

TransactionStatus.propTypes = {
    status: propTypes.number.isRequired,
    statusValue: propTypes.string.isRequired,
    fontWeight: propTypes.string,
};

TransactionStatus.defaultProps = {
    fontWeight: "font-medium md:font-bold",
};

export default TransactionStatus;
