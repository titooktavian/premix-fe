/* eslint-disable no-unused-vars */
import { Footer, Navbar, Modal, Button } from "..";
import Head from "next/head";
import { useEffect } from "react";
import { useStateContext } from "context/StateContext";
import { useRouter } from "next/router";
import Link from "next/link";

const DefaultLayout = ({ children, outletInfo, merchantCode, user, selectedOutlet}) => {
    const { 
    //     outlet, 
    //     setOutletInfo, 
    //     setOutletCode, 
    //     outletCode, 
    //     bgColor,
    //     isConfirmLogin,
    //     setIsConfirmLogin,
        setUserLogin,
    //     setSelectedOutlet,
    //     loginParam
    } = useStateContext();
    // const { nama } = outlet;
    const router = useRouter();
    const { route } = router;
    // const urlLogin = loginParam ? `/masuk?source=${loginParam}` : '/masuk';
    
    // useEffect(()=>{
    //     if (selectedOutlet) setSelectedOutlet(selectedOutlet);
    // },[selectedOutlet])
    
    useEffect(()=>{
        if (user) setUserLogin(user);
    },[user])

    const headTitle = (route) => {
        switch (route) {
        case "/produk":
            return `Produk`;
        case "/produk-detail/[id_produk]":
            return `Produk Detail`;
        default:
            return 'Home';
        }
    };

    return (
        <>
            <div className="grid h-screen w-screen bg-white bg-[url('/background.jpeg')] bg-fill md:bg-contain bg-no-repeat overflow-x-hidden">
                <Head>
                    <link
                        rel="shortcut icon"
                        href={"/logo.png"}
                    />
                    <title>{headTitle(route)}</title>
                </Head>
                <header className="top-0 z-10">
                    <Navbar />
                </header>
                <main className={`mb-4 flex-1 px-4 md:mb-0 md:px-0 md:py-4`}>
                    {children}
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    );
};

export default DefaultLayout;
