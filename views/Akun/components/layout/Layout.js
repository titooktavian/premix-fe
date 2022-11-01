import { useState } from "react";
import propTypes from "prop-types";

import SidebarMenu from "./SidebarMenu";
import ModalTermsConditions from "components/Modal/TermsCondition";

const Layout = ({ title, menu, mobileShowMenu, mtChild, children }) => {
    const [showTerms, setShowTerms] = useState(false);

    const handleToggleModalTerms = () => setShowTerms(prevState => !prevState);

    return (
        <>
            <div className="flex flex-col gap-6 mt-3 md:flex-row md:mx-auto md:w-[960px]">
                <SidebarMenu menu={menu} mobileShowMenu={mobileShowMenu} onShowTerms={handleToggleModalTerms} />
                <div className={`bg-white pt-3 p-0 md:p-6 rounded-lg w-full md:w-[calc(100%-376px)] ${mobileShowMenu ? "hidden md:block" : ""}`}>
                    <h3 className="text-xl font-bold text-dark-300">{title}</h3>
                    <div className={`${mtChild || "mt-5 md:mt-10"}`}>
                        {children}
                    </div>
                </div>
            </div>
            <ModalTermsConditions show={showTerms} onClose={handleToggleModalTerms} />
        </>
    )
};

Layout.propTypes = {
    title: propTypes.string,
    menu: propTypes.string,
    mtChild: propTypes.string,
    mobileShowMenu: propTypes.bool,
    children: propTypes.node,
};

Layout.defaultProps = {
    title: "",
    menu: "",
    mtChild: "",
    mobileShowMenu: false,
    children: null,
};

export default Layout;
