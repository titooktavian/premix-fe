import Image from "next/image";
import propTypes from "prop-types";

const MethodItem = ({ text, icon, onClick }) => {
    return (
        <div
            className="border border-neutral-200 rounded-full px-6 py-3 flex items-center cursor-pointer mb-3 transition hover:border-turq-300/50"
            onClick={onClick}
            onKeyDown={onClick}
            role="button"
            tabIndex={0}
        >
            <Image
                src={icon}
                width={24}
                height={24}
            />
            <span className="font-bold text-sm text-dark-300 ml-2">{text}</span>
        </div>
    );
}

MethodItem.propTypes = {
    text: propTypes.string,
    onClick: propTypes.func,
    icon: propTypes.shape({
        type: propTypes.oneOf(["img", "svg"]),
    }),
};

MethodItem.defaultProps = {
    text: "",
    onClick: () => {},
    icon: {},
};

export default MethodItem;
