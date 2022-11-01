import propTypes from "prop-types";
import { FaAngleRight } from "react-icons/fa";

const UserDataItem = ({ title, subtitle, onClick }) => {
    return (
        <div
            className="pb-4 mt-5 border-b border-b-neutral-200 relative cursor-pointer"
            onClick={onClick}
            onKeyDown={onClick}
            role="button"
            tabIndex={0}
        >
            <p className="font-semibold text-dark-300">{title}</p>
            <p className="text-dark-100 font-medium text-sm mt-2 w-64">{subtitle}</p>
            <FaAngleRight className="absolute right-0 top-2 text-dark-100" />
        </div>
    )
};

UserDataItem.propTypes = {
    title: propTypes.string,
    subtitle: propTypes.string,
    link: propTypes.string,
};

UserDataItem.defaultProps = {
    title: "",
    subtitle: "",
    link: "",
};

export default UserDataItem;
