import propTypes from "prop-types";
import { toRupiah } from "helpers/formatter";

const CurrencyColumn = ({ data }) => {
    return (
        <div>{toRupiah(data)}</div>
    );
};

CurrencyColumn.propTypes = {
    data: propTypes.oneOfType([
        propTypes.string,
        propTypes.number,
    ]),
};

CurrencyColumn.defaultProps = {
    data: 0,
};

export default CurrencyColumn;
