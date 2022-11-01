import { useRouter } from "next/router";
import propTypes from "prop-types";
import { FaAngleRight } from "react-icons/fa";

const DefaultMenuItem = ({ title, subtitle, menu, link, mt, withDivider, onChangePage }) => {
    const router = useRouter();

    const handleRouting = () => {
        onChangePage(menu);
        router.push(link);
    };

    return (
        <div
            className={`mt-${mt} border-b-neutral-200 pb-4 relative cursor-pointer ${withDivider ? "border-b" : ""}`}
            onClick={handleRouting}
            onKeyDown={handleRouting}
            role="button"
            tabIndex={0}
        >
            {title && <p className="font-bold text-dark-300">{title}</p>}
            <p className="text-dark-100 font-medium text-sm mt-2 w-full md:w-64">{subtitle}</p>
            <FaAngleRight className="absolute right-0 top-0 text-dark-100 text-sm" />
        </div>
    )
};

DefaultMenuItem.propTypes = {
    title: propTypes.string,
    subtitle: propTypes.string,
    menu: propTypes.string,
    link: propTypes.string,
    mt: propTypes.string,
    withDivider: propTypes.bool,
    onChangePage: propTypes.func,
};

DefaultMenuItem.defaultProps = {
    title: "",
    subtitle: "",
    menu: "",
    link: "",
    mt: "4",
    withDivider: true,
    onChangePage: () => {},
};

export default DefaultMenuItem;
