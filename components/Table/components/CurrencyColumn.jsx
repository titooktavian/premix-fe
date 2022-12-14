import propTypes from "prop-types";
import { toRupiah } from "helpers/formatter";

const CurrencyColumn = ({ data }) => {
    return (
        <div>{toRupiah(data)}</div>
    );
};

CurrencyColumn.propTypes = {
    data: propTypes.number,
};

CurrencyColumn.defaultProps = {
    data: 0,
};

export default CurrencyColumn;
