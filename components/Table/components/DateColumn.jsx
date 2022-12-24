import propTypes from "prop-types";
import moment from "moment/moment";

const DateColumn = ({ data }) => {
    return (
        <div>{data ? moment(data).format('YYYY-MM-DD') : '-'}</div>
    );
};

DateColumn.propTypes = {
    data: propTypes.string,
};

DateColumn.defaultProps = {
    data: '',
};

export default DateColumn;
