import Link from "next/link";

const ErrorPage = () => {
    return (
        <div className="m-auto flex flex-col items-center">
            <h1 className="mb-6 text-9xl font-bold text-turq-400">404</h1>
            <h1 className="mb-1 font-bold text-turq-400 text-2xl">
                Pages not found
            </h1>
            <h1 className="mb-6 font-bold text-turq-400 text-base">
                Oops! The page you are looking for does not exist.
            </h1>
            <Link href="/">
                <button
                    className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full flex justify-center items-center text-white text-base font-bold cursor-pointer mt-3"
                >
                    Back to Home
                </button>
            </Link>
        </div>
    );
};

ErrorPage.layout = "ERR";

export default ErrorPage;
