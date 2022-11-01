import Link from "next/link";
import propTypes from "prop-types";

const Success = ({ isForgot }) => {
    return ( 
        <div className="flex flex-col justify-center items-center w-80 mx-auto mb-3">
            <img src="/images/success-circle.png" className="w-16" />
            <p className="text-xl font-bold mt-2">Selamat!</p>
            <p className="text-center text-sm text-dark-100 mt-1">
                {isForgot ? (
                    "Kata sandi kamu berhasil diubah. Silakan masuk kembali menggunakan kata sandi baru"
                ) : (
                    "Akun webstore telah berhasil dibuat"
                )}
            </p>
            <Link href={isForgot ? "/masuk" : "/produk"}>
                <a className="w-full text-center p-3 bg-turq-300 text-white rounded-full mt-7 font-bold transition duration-200 hover:bg-[#009B9A]">
                    {isForgot ? "Masuk" : "Mulai Berbelanja"}
                </a>
            </Link>
        </div>
    )
};

Success.propTypes = {
    isForgot: propTypes.bool,
};

Success.defaultProps = {
    isForgot: true,
};

export default Success;
