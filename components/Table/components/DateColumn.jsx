import propTypes from "prop-types";
import moment from "moment/moment";

const DateColumn = ({ data, format }) => {
    return (
        <div>{data ? moment(data, format).format('YYYY-MM-DD') : '-'}</div>
    );
};

DateColumn.propTypes = {
    data: propTypes.string,
    format: propTypes.string,
};

DateColumn.defaultProps = {
    data: '',
    format: 'YYYY-MM-DD'
};

export default DateColumn;
