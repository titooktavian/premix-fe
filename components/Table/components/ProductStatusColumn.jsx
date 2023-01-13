import propTypes from "prop-types";
import { PRODUCT_STATUS } from "constants/enum";

const ProductStatusColumn = ({ data }) => {
    const renderStatus = (status) => {
        switch (status) {
            case PRODUCT_STATUS.INACTIVE:
                return ( <div className="bg-[#F8CA56] rounded-md text-[#272541] py-1 px-2 w-fit text-xs">Tidak Aktif</div> );
            case PRODUCT_STATUS.ACTIVE:
                return ( <div className="bg-[#66AE76] rounded-md text-white py-1 px-2 w-fit text-xs">Aktif</div> );
            default:
                return null;
        }
    }

    return (
        <div>{renderStatus(data)}</div>
    );
};

ProductStatusColumn.propTypes = {
    data: propTypes.string,
};

ProductStatusColumn.defaultProps = {
    data: '',
};

export default ProductStatusColumn;
