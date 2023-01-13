import { ADMIN_SIDEBAR, USER_PERMISSION, USER_SIDEBAR } from "constants/enum";
import { useStateContext } from "context/StateContext";
import Link from "next/link";
import propTypes from "prop-types";
import { AiOutlineCheckCircle, AiOutlineDashboard, AiOutlineGroup, AiOutlineLaptop, AiOutlineMessage, AiOutlinePoweroff, AiOutlineUser } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useRouter } from "next/router";

const Sidebar = () => {
    const { userLogin, handleLogout } = useStateContext();
    const router = useRouter();

    const checkActiveMenu = (currentMenu) => {
        if (router.pathname.includes(currentMenu)) return true;
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
            case '/master-product':
                return ( <AiOutlineLaptop className="text-xl" /> );
            case '/input-transaction':
                return ( <AiOutlineGroup className="text-xl" /> );
            case '/payment-confirmation':
                return ( <AiOutlineCheckCircle className="text-xl" /> );
            default:
                return null;
        }
    }

    const sidebarList = userLogin?.id_permission === USER_PERMISSION.ADMIN ? ADMIN_SIDEBAR : USER_SIDEBAR;

    return (
        <div className="flex flex-col w-full bg-[#F4F4FD] rounded-3xl py-8">
            <div className="flex gap-4 px-8">
                {/* <div className="relative h-12 w-12">
                    <Image src="/profile.png" className="rounded-lg" layout='fill' objectFit='contain'/>
                </div> */}
                <div>
                    <p className="text-base font-bold text-[#272541]">{userLogin?.name}</p>
                    <p className="text-sm text-[#6E6C85]">{userLogin?.id_permission === USER_PERMISSION.ADMIN ? 'Admin' : 'Customer'}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-8">
                {sidebarList.map( (userNav, index) => {
                    if (userNav.link === '/logout') {
                        return (
                            <div onClick={() => {handleLogout()}} key={`sidebar-nav-${index}`}>
                                <div className={`flex cursor-pointer items-center gap-4 px-8 py-3 ${checkActiveMenu(userNav.link) ? 'bg-[#272541] text-white' : ''}`}>
                                    <div className={`flex w-10 h-10 items-center justify-center ${checkActiveMenu(userNav.link) ? 'bg-[#FF5C6F] text-white' : 'bg-white text-[#03053D]'} rounded-xl`}>
                                        {renderIcon(userNav.link)}
                                    </div>
                                    <div>
                                        <span>{userNav.name}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    return (
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
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
