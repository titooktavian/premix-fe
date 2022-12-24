/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { FaBars, FaChevronDown, FaChevronRight, FaUser } from "react-icons/fa";
import { HiOutlineShoppingCart, HiOutlineSearch } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { useStateContext } from "context/StateContext";
import { NAVIGATIONS, USER_NAVIGATIONS } from "constants/enum";
import { toRupiah } from "helpers/formatter";

const Navbar = () => {
    const router = useRouter();
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [navigations, setNavigations] = useState(NAVIGATIONS);
    const activeMenu = (link) => {
        let menus;
        menus = navigations.map((nav) => {
            nav.isActive = nav.link === link ? true : false;
            return { ...nav };
        });
        setNavigations(menus);
    };

    const { 
        cartItems,
        setIsConfirmLogin,
        userLogin,
        handleLogout,
        setLoginParam,
    } = useStateContext();

    const openPopupLogin = () =>{
        if(userLogin){ 
            router.push('/akun');
            return;
        }
        setIsHamburgerOpen(false);
        setLoginParam('');
        setIsConfirmLogin(true);
    };

    useEffect(() => {
        activeMenu(router.route);
    }, []);

    const [clientWindowHeight, setClientWindowHeight] = useState(0);
    const [clientScroll, setClientScroll] = useState(0);

    const handleScroll = () => {
        setClientWindowHeight(window.innerHeight);
        setClientScroll(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll); 
        return () => window.removeEventListener("scroll", handleScroll);
    });

    const [navBackground, setNavBackground] = useState("");

    useEffect(() => {
        if (clientScroll > 60) {
            setNavBackground("bg-[#FFFFFF] fixed top-0 z-10 w-full");
        } else {
            setNavBackground("relative");
        }
    }, [clientScroll]);

    return (
        <div
            className={`${navBackground} transition-all duration-250`}
        >
            <div className="relative z-50 flex h-[60px] items-center justify-between  px-4 md:mx-auto md:max-w-[1110px]">
                <Link href={"/"}>
                    <a
                        className="flex items-center space-x-4"
                        onClick={() => setIsHamburgerOpen(false)}
                    >
                        <div className="h-[21px] w-[166px] overflow-hidden">
                            <Image
                                src={"/logo.png"}
                                width={166}
                                height={21}
                                className="object-cover"
                            />
                        </div>
                    </a>
                </Link>
                <div className="flex items-center space-x-6 ">
                    <label className="relative block">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <HiOutlineSearch />
                        </span>
                        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm rounded-lg" placeholder="Cari" type="text" name="search"/>
                    </label>
                </div>
            </div>

            <div className="relative z-50 flex h-[60px] items-center justify-between  px-4 md:mx-auto md:max-w-[1110px]">
                <ul className="hidden space-x-8 md:flex">
                    {navigations.map((nav) => (
                        <li
                            className={`group relative h-full cursor-pointer py-4 transition-all duration-100 hover:font-bold ${
                                nav.isActive ? "font-bold" : "font-normal"
                            } text-base font-bo`}
                            key={nav.name}
                        >
                            <Link href={nav.link}>
                                <a className="block h-full" onClick={() => activeMenu(nav.link)}>{nav.name}</a>
                            </Link>
                            {nav.detail && (
                                <div className="absolute right-0 top-full w-[200px] z-cart hidden h-fit rounded-b-2xl bg-white shadow-md md:group-hover:block">
                                    <ul className="flex flex-col whitespace-nowrap">
                                        {nav.detail.map( (detailNav, index) =>(
                                            <li key={`user-nav-${index}`} className="p-3 group relative w-full h-full cursor-pointer text-sm font-medium hover:font-bold">
                                                <Link href={detailNav.link}>
                                                    <a className="block h-full">{detailNav.name}</a>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="flex items-center space-x-6 ">
                    {userLogin ?(
                        <div className="group relative hidden md:block">
                            <div className="grid grid-flow-col gap-1 place-items-center cursor-pointer">
                                <span>Halo, <label className="font-bold">{userLogin.name}!</label></span>
                                <FaChevronDown className="text-base" />
                            </div>
                            <div className="absolute right-0 top-full w-[200px] z-cart hidden h-fit rounded-b-2xl bg-white shadow-md md:group-hover:block">
                                <ul className="flex flex-col whitespace-nowrap">
                                    {USER_NAVIGATIONS.map( (userNav, index) =>(
                                        <li key={`user-nav-${index}`} className="p-3 group relative w-full h-full cursor-pointer text-sm font-medium hover:font-bold">
                                            <Link href={userNav.link}>
                                                <a className="block h-full">{userNav.name}</a>
                                            </Link>
                                        </li>
                                    ))}
                                    <li className="p-3 text-red-300 group relative w-full h-full cursor-pointer text-sm font-medium hover:font-bold" onClick={handleLogout}>
                                        <a className="block h-full">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <a className="block h-full">Login</a>
                            </Link>
                            <Link href="/register">
                                <a className="block h-full">Register</a>
                            </Link>
                        </>
                    )}
                    <div className="group relative  py-4">
                        <Link href="/keranjang">
                            <a
                                className="relative group-hover:bg-blue-400"
                                onClick={() => setIsHamburgerOpen(false)}
                            >
                                <HiOutlineShoppingCart className="text-2xl text-[#1d1d1d]" />
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#FF5C6F] text-center text-xs font-bold text-white">
                                    {cartItems.data.length}
                                </span>
                            </a>
                        </Link>
                        {/* <div className="absolute right-0 top-full z-cart hidden h-fit min-w-[350px] rounded-b-2xl bg-white py-2 px-4 shadow-md md:group-hover:block">
                            {cartItems.data.length > 0 ? (
                                <>
                                    <h4 className="mb-2 text-base font-bold">
                                        Keranjang ({cartItems.data.length} Item){" "}
                                    </h4>
                                    <div className="mb-2 mt-2 flex flex-col space-y-2 p-4">
                                        {cartItems.data.map((item) => (
                                            <div
                                                key={item.cart_id}
                                                className=""
                                            >
                                                <div className="grid grid-cols-[50px_200px_90px] gap-[5px]">
                                                    <div className="h-[50px] w-[50px] ">
                                                        <Image
                                                            src={
                                                                item.img_path ||
                                                                "/images/item-default-new.png"
                                                            }
                                                            width={30}
                                                            height={30}
                                                            layout="responsive"
                                                            className="rounded-lg object-cover"
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <p className="text-xs font-bold text-dark-300">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-sm font-bold text-dark-300">
                                                            x{item.qty}
                                                        </p>
                                                    </div>
                                                    <p className="text-right text-sm font-bold text-dark-300">
                                                        {toRupiah(item.subtotal)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/keranjang">
                                        <a className="mt-2 flex w-full items-center justify-between rounded-full bg-turq-300 p-4 text-white">
                                            <div className="flex items-center space-x-1">
                                                <span>Keranjang</span>
                                                <span>•</span>
                                                <span>
                                                    {cartItems.data.length} Item
                                                </span>
                                            </div>
                                            <span>{toRupiah(cartItems.price)}</span>
                                        </a>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <div className="mx-auto mt-4 h-[143px] w-[143px]">
                                        <Image
                                            src="/images/keranjang-kosong.png "
                                            width={143}
                                            height={143}
                                            className=""
                                            layout="responsive"
                                        />
                                    </div>
                                    <h4 className="pb-3 text-center text-base font-bold text-dark-300">
                                        Keranjangmu kosong nih!
                                    </h4>
                                    <p className="pb-3 text-center text-sm font-semibold text-dark-100">
                                        Yuk, pilih produk favoritmu dan segera{" "}
                                        <br /> lakukan pemesanan!
                                    </p>
                                </>
                            )}
                        </div> */}
                    </div>
                    <div
                        className="md:hidden"
                        onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
                    >
                        {isHamburgerOpen ? (
                            <GrClose className="text-2xl" />
                        ) : (
                            <FaBars className="text-2xl" />
                        )}
                    </div>
                </div>
            </div>
            
            {/* Mobile Menu */}
            <div
                className={`absolute top-full left-0 z-40  h-screen-min-60 w-screen bg-dark-300/40 pb-10 transition-all duration-300 ease-in-out ${
                    isHamburgerOpen ? "opacity-1 block" : "hidden opacity-0"
                }`}
            >
                <ul className=" bg-white px-8 pb-5 pt-5">
                    <a className="flex items-center justify-between py-4" onClick={openPopupLogin}>
                        <li
                            className="flex items-center"
                            onClick={() =>
                                setIsHamburgerOpen(!isHamburgerOpen)
                            }
                        > 
                            {userLogin ? (
                                <>
                                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-dark-400">
                                        <FaUser className="text-xl text-white" />
                                    </div>
                                    <div className="ml-4 flex flex-col space-y-4">
                                        <p className="text-base font-medium text-dark-300">
                                            {userLogin.customer_fullname}
                                        </p>
                                        <p className="text-xs font-medium text-dark-100">
                                            {userLogin.phone_no}
                                        </p>
                                    </div>
                                </>

                            ):(
                                <div className="cursor-pointer flex flex-col space-y-4">
                                    <p className="text-base font-medium text-dark-300">
                                        Masuk
                                    </p>
                                    <p className="text-xs font-medium text-dark-100">
                                        Klik untuk melanjutkan
                                    </p>
                                </div>

                            )}
                        </li>
                        <FaChevronRight className="text-base" />
                    </a>
                    {navigations.map((nav) => (
                        <li
                            className="py-4 text-base font-medium text-dark-300"
                            key={nav.name}
                        >
                            <Link href={nav.link}>
                                <a
                                    onClick={() =>
                                        setIsHamburgerOpen(!isHamburgerOpen)
                                    }
                                    className="block"
                                >
                                    {nav.name}
                                </a>
                            </Link>
                        </li>
                    ))}
                    {userLogin && (
                        <>
                            <button
                                type="button"
                                className="text-red-300 py-4 text-base font-medium"
                                onClick={handleLogout}
                            >
                                Keluar
                            </button>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
