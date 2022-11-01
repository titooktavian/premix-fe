import Link from "next/link";
import Image from "next/image";

const ErrorPage = () => {
    return (
        <div className="m-auto flex flex-col items-center">
            <h1 className="mb-10 text-4xl font-bold text-turq-400">404</h1>
            <div className="relative mb-10 h-[30vh] w-full overflow-hidden">
                <Image
                    src="/images/404.png"
                    layout="fill"
                    objectFit="contain"
                    priority
                />
            </div>
            <h1 className="mb-5 text-base font-bold">
                Halaman yang kamu cari tidak ketemu
            </h1>
            <Link href="/">
                <button
                    className="
                    rounded-full 
                    border 
                    border-green-300 
                    px-8 
                    py-4 
                    text-base 
                    font-bold 
                    uppercase 
                    text-green-300
                    hover:bg-green-300
                    hover:text-white"
                >
                    Kembali ke Home
                </button>
            </Link>
        </div>
    );
};

ErrorPage.layout = "ERR";

export default ErrorPage;
