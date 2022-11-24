import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { useRouter } from "next/router";
import { AlertService } from "services";
import { SectionTitle } from "components";
import Link from "next/link";

const Index = ({
    pageTitle,
}) => {
    const { cartItems, onResetCart, onAddToCart, setLoading } = useStateContext();
    const router = useRouter();

    const changeCartValue = async (qty, productId, variant, name) => {
        setLoading(true);
        const productCart = {
            idProduct: productId,
            quantity: qty,
            variant: variant,
            name: name,
        };

        await onAddToCart(productCart);
        setLoading(false);
    }

    const resetCart = async () => {
        setLoading(true);
        await onResetCart();
        setLoading(false);
    }

    const goProduct = () => {
        router.push('/produk');
    }

    const goCheckout = () => {
        if (cartItems.data.length > 0) {
            router.push('/checkout');
        } else {
            AlertService.error('Tidak ada item di keranjang anda');
        }
    }

    return (
        <div 
            className="mb-6 md:mt-3 mt-0"
        >
            <section className="-mx-4 mb-4 p-4 md:mx-0">
                <div className="md:mx-auto md:max-w-[1110px] px-4 flex flex-col items-center">
                    <div className="w-[354px] flex flex-col rounded-3xl p-10 gap-2 shadow-[0px_4px_40px_rgba(39,38,65,0.06)]">
                        <SectionTitle title="Daftar" subtitle="" rightButton={false} />
                        <span className="text-base">
                            <label className="text-[#6E6C85]">Sudah punya akun? </label> 
                            <Link href="/login">
                                <a className="text-[#FF5C6F]">Masuk</a>
                            </Link>
                        </span>

                        <div className="mt-3">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan nama" required />
                        </div>

                        <div className="mt-3">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan email" required />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan password" required />
                            <span className="text-sm font-normal text-[#6E6C85] mt-2">Password minimal 8 karakter</span>
                        </div>

                        <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full w-full flex justify-center items-center text-white text-base font-bold cursor-pointer mt-3" onClick={() => {goCheckout();}}>
                            Login
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

Index.propTypes = {
    products: PropTypes.array,
    categories: PropTypes.array,
    home: PropTypes.object
};

Index.defaultProps = {
    products: [],
    categories: [],
    home: {}
};

export default Index;
