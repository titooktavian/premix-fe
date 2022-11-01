import Image from "next/image";
import { useRouter } from "next/router";
import propTypes from "prop-types";
import { FaAngleRight } from "react-icons/fa";

const SmallMenuItem = ({ title, menu, link, icon, onChangePage, onClick }) => {
    const router = useRouter();

    const handleRouting = () => {
        onClick();
        if (link) {
            onChangePage(menu);
            router.push(link);
        }
    };

    return (
        <div
            className="mb-8 border-b-neutral-200 relative cursor-pointer flex items-center"
            onClick={handleRouting}
            onKeyDown={handleRouting}
            role="button"
            tabIndex={0}
        >
            {icon && (
                <Image
                    src={icon}
                    width={20}
                    height={20}
                />
            )}
            <p className=" text-dark-300 font-medium ml-2 text-sm">{title}</p>
            <FaAngleRight className="absolute right-0 top-0 text-dark-100 text-sm" />
        </div>
    )
};

SmallMenuItem.propTypes = {
    title: propTypes.string,
    menu: propTypes.string,
    link: propTypes.string,
    onChangePage: propTypes.func,
    onClick: propTypes.func,
    icon: propTypes.shape({
        type: propTypes.oneOf(["img", "svg"]),
    }),
};

SmallMenuItem.defaultProps = {
    title: "",
    menu: "",
    link: "",
    onChangePage: () => {},
    onClick: () => {},
    icon: null,
};

export default SmallMenuItem;
