import propTypes from "prop-types";

const AccountColumn = ({ data }) => {
    return (
        <div className="flex flex-col">
            <div className="text-sm font-bold">{data.product.product_name}</div>
            <label className="w-fit bg-[#3F0071] text-white text-xs px-4 py-[2px] rounded-[4px]">{`${data.product_duration.duration_value} Hari`}</label>
        </div>
    );
};

AccountColumn.propTypes = {
    data: propTypes.shape(),
};

AccountColumn.defaultProps = {
    data: {},
};

export default AccountColumn;
