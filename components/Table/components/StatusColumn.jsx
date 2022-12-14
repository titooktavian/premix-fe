import propTypes from "prop-types";

const StatusColumn = ({ data }) => {
    const renderStatus = (status) => {
        switch (status) {
            case 1:
                return ( <div className="bg-[#66AE76] rounded-md text-white py-1 px-2 w-fit text-xs">Aktif</div> );
            case 2:
                return ( <div className="bg-[#8E8E9A] rounded-md text-white py-1 px-2 w-fit text-xs">Tidak Aktif</div> );
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
