import propTypes from "prop-types";

const Tag = ({ text, className }) => {
    return (
        <div
            className={`${className} rounded-full bg-neutral-100 px-4 py-[8px] text-sm text-center font-medium text-dark-100 whitespace-nowrap shrink-0 cursor-pointer snap-start transition truncate hover:bg-dark-100 hover:text-white`}
        >
            {text}
        </div>
    );
};

Tag.propTypes = {
    text: propTypes.string,
    className: propTypes.string,
};

Tag.defaultProps = {
    text: "",
    className: "",
};

export default Tag;
