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
    // const closeLoginPopup = ()=>{
    //     setIsConfirmLogin(!isConfirmLogin);
    // }

    return (
        <>
            {/* <Modal
                isPopup={isConfirmLogin}
                title="Masuk ke Akun Web Store"
                type="halfscreen"
                onRequestClose={closeLoginPopup}
                isDivider={false}
                isShowClose={false}
                subtitle="Kamu perlu masuk ke akun Web Store untuk melanjutkan"
            >
                <div className="flex flex-col-reverse gap-4 mt-4 md:grid md:mt-6 md:grid-cols-2">
                    <Button
                        label="Batal"
                        variant="secondary"
                        size="lg"
                        full
                        onClick={() => closeLoginPopup()}
                    />
                    <Link href={urlLogin}>
                        <a  onClick={() => closeLoginPopup()}>
                            <Button
                                label="Masuk"
                                size="lg"
                                full
                            />
                        </a>
                    </Link>
                </div>
            </Modal> */}
            <div className="flex min-h-screen w-full flex-col bg-[url('/background.jpeg')] bg-fill bg-no-repeat">
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
                <main className={`mb-4 flex-1 px-4  md:mb-0 md:px-0 md:py-4`}>
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
