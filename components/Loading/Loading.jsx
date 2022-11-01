import { useStateContext } from "context/StateContext";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import { useRef } from "react";

const Loading = () => {
    const router = useRouter();

    const { isLoading, setLoading } = useStateContext();
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);
    const mounted = useRef(true);
    
    useEffect(() => {
        router.events.on("routeChangeStart", handleStart);
    }, [router]);

    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);
    
    useEffect(() => {
        if(isLoading) {
            mounted.current = true;
            document.body.style.overflow = "hidden";
            return () => {
                mounted.current = false;
                document.body.style.overflow = "visible";
            }

        }
    }, [isLoading]);

    return (
        isLoading && (
            <div className="over fixed top-0 left-0 z-loading flex h-full w-full bg-neutral-300/50">
                <div className="z-alert m-auto bg-white p-4">
                    <Image
                        src="/images/loading.gif"
                        width={100}
                        height={100}
                        layout="responsive"
                        priority
                    />
                    <span className="font-bold">Loading</span>
                </div>
            </div>
        )
    );
};
export default Loading;
