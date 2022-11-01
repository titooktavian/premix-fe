import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import propTypes from "prop-types";
import Image from "next/image";

import DefaultMenuItem from "./DefaultMenuItem";
import SmallMenuItem from "./SmallMenuItem";
import { useStateContext } from "context/StateContext";
import { ACCOUNT_MENU } from "constants/enum";
import { icons } from "constants";

const SidebarMenu = ({ menu, mobileShowMenu, onShowTerms }) => {
    const [topLine, setTopLine] = useState(null);
    const [smallLine, setSmallLine] = useState(false);
    const { handleLogout } = useStateContext();
    const router = useRouter();

    useEffect(() => {
        handleMoveLine(menu);
    }, [menu]);

    const handleMoveLine = (menu) => {
        switch (menu) {
        case ACCOUNT_MENU.DATA_DIRI:
            setTopLine("8px");
            setSmallLine(false);
            break;
        case ACCOUNT_MENU.ALAMAT:
            setTopLine("96px");
            setSmallLine(false);
            break;
        case ACCOUNT_MENU.PESANAN:
            setTopLine("230px");
            setSmallLine(true);
            break;
        case ACCOUNT_MENU.HISTORI:
            setTopLine("282px");
            setSmallLine(true);
            break;
        }
    };

    const handleLogoutAccount = () => {
        handleLogout();
        router.push("/masuk");
    };

    return (
        <div className={`rounded-lg w-full h-full md:mt-0 mt-3 md:w-[376px] bg-white ${mobileShowMenu ? "" : "hidden md:block"}`}>
            <div className="md:p-6 mb:pb-0 pb-0">
                <h3 className="text-xl font-bold text-dark-300">Akun Saya</h3>
            </div>
            <div className="relative p-0 md:p-6 pt-3 md:pt-0">
                <div className={`${topLine ? "w-1" : "w-0"} ${smallLine ? "h-8" : "h-16"} hidden md:block absolute bg-turq-300 left-0 rounded-r-lg`} style={{ transition: "0.2s", top: topLine }} />
                <DefaultMenuItem
                    title="Data Diri"
                    subtitle="Nama, nomor ponsel, email dan kata sandi"
                    link="/akun/pengaturan"
                    menu={ACCOUNT_MENU.DATA_DIRI}
                    onChangePage={handleMoveLine}
                />
                <DefaultMenuItem
                    title="Data Alamat"
                    subtitle="Daftar alamat pengiriman"
                    link="/akun/alamat"
                    menu={ACCOUNT_MENU.ALAMAT}
                    onChangePage={handleMoveLine}
                />
                <p className="font-bold text-dark-300 mt-4 mb-6">Daftar Transaksi</p>
                <SmallMenuItem
                    title="Transaksi Berlangsung"
                    link="/transaksi-berlangsung"
                    menu={ACCOUNT_MENU.PESANAN}
                    icon={icons.transactionIcon}
                    onChangePage={handleMoveLine}
                />
                <SmallMenuItem
                    title="Riwayat Transaksi"
                    link="/riwayat-transaksi"
                    menu={ACCOUNT_MENU.HISTORI}
                    icon={icons.historyIcon}
                    onChangePage={handleMoveLine}
                />
                <hr className="border-neutral-200" />
                <br />
                <SmallMenuItem title="Syarat dan Ketentuan" onClick={onShowTerms} />
                <button
                    className="border mb-3 border-red-300 w-full flex items-center justify-center h-12 rounded-full transition hover:bg-red-50"
                    type="button"
                    onClick={handleLogoutAccount}
                >
                    <Image width={24} height={24} src={icons.logoutIcon} />
                    <span className="font-bold text-red-300 ml-1">Keluar</span>
                </button>
            </div>
        </div>
    )
};

SidebarMenu.propTypes = {
    menu: propTypes.string.isRequired,
    mobileShowMenu: propTypes.bool.isRequired,
    onShowTerms: propTypes.func,
};

SidebarMenu.defaultProps = {
    onShowTerms: () => {},
};

export default SidebarMenu;
