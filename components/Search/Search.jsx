import propTypes from "prop-types";
import { FaSearch } from "react-icons/fa";

const Search = ({ value, placeholder, className, onChange }) => {
    return (
        <div className="relative">
            <FaSearch className="absolute top-1/2 -translate-y-1/2 ml-6 text-sm text-neutral-300" />
            <input
                type="text"
                value={value}
                className={`w-full border border-neutral-200 rounded-full h-10 px-6 py-3 pl-12 outline-none text-sm text-dark-300 font-medium transition focus:border-neutral-300 ${className}`}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )
};

Search.propTypes = {
    value: propTypes.string,
    placeholder: propTypes.string,
    className: propTypes.string,
    onChange: propTypes.func,
};

Search.defaultProps = {
    value: "",
    placeholder: "Cari...",
    className: "",
    onChange: () => {},
};

export default Search;
