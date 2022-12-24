import { USER_SIDEBAR } from "constants/enum";
import { useStateContext } from "context/StateContext";
import Image from "next/image";
import Link from "next/link";
import propTypes from "prop-types";
import { useState } from "react";
import { AiOutlineDashboard, AiOutlineMessage, AiOutlineMinus, AiOutlinePlus, AiOutlinePoweroff, AiOutlineUser } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useRouter } from "next/router";

const Sidebar = ({ title, icon, children }) => {
    const { userLogin } = useStateContext();
    const router = useRouter();

    const checkActiveMenu = (currentMenu) => {
        if (currentMenu === router.pathname) return true;
        return false;
    }

    const renderIcon = (name) => {
        switch (name) {
            case '/dashboard':
                return ( <AiOutlineDashboard className="text-xl" /> );
            case '/order':
                return ( <HiOutlineShoppingCart className="text-xl" /> );
            case '/bantuan':
                return ( <AiOutlineMessage className="text-xl" /> );
            case '/akun':
                    return ( <AiOutlineUser className="text-xl" /> );
            case '/logout':
                return ( <AiOutlinePoweroff className="text-xl" /> );
            default:
                return null;
        }
    }

    return (
        <div className="flex flex-col w-full bg-[#F4F4FD] rounded-3xl py-8">
            <div className="flex gap-4 px-8">
                {/* <div className="relative h-12 w-12">
                    <Image src="/profile.png" className="rounded-lg" layout='fill' objectFit='contain'/>
                </div> */}
                <div>
                    <p className="text-base font-bold text-[#272541]">{userLogin?.name}</p>
                    <p className="text-sm text-[#6E6C85]">Customer</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-8">
                {USER_SIDEBAR.map( (userNav, index) =>(
                    <Link href={userNav.link} key={`sidebar-nav-${index}`}>
                        <div className={`flex cursor-pointer items-center gap-4 px-8 py-3 ${checkActiveMenu(userNav.link) ? 'bg-[#272541] text-white' : ''}`}>
                            <div className={`flex w-10 h-10 items-center justify-center ${checkActiveMenu(userNav.link) ? 'bg-[#FF5C6F] text-white' : 'bg-white text-[#03053D]'} rounded-xl`}>
                                {renderIcon(userNav.link)}
                            </div>
                            <div>
                                <span>{userNav.name}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    title: propTypes.string,
    icon: propTypes.string,
};

Sidebar.defaultProps = {
    title: "",
    icon: "",
};

export default Sidebar;
