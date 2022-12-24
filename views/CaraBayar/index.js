import PropTypes from "prop-types";
import Image from "next/image";

const Index = ({
    pageTitle,
}) => {
    return (
        <div 
            className="mb-6 md:mt-3 mt-0"
        >
            <section className="-mx-4 mb-4 p-4 md:mx-0">
                <div className="md:mx-auto md:max-w-[1110px] px-4">
                    <div
                        className="flex flex-col w-full h-[220px] bg-fill bg-right bg-[#272541] bg-no-repeat rounded-3xl text-white justify-center p-10"
                        style={{
                            backgroundImage: `url('/images/carousel/bg.png')`,
                        }}
                    >
                        <div className="font-bold text-3xl">Cara Bayar</div>
                        <div className="font-normal text-base">Jika kamu belum mengerti cara bayar di premixstore.com, yuk simak artikel dibawah.</div>
                    </div>
                </div>
            </section>

            <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                <div className="md:mx-auto md:max-w-[1110px] px-4 flex flex-col items-center gap-5">
                    <div className="w-[354px]">
                        <Image src="/images/qris.png" width="354" height="500" />
                    </div>
                    
                    <div className="w-[354px] flex flex-col items-start">
                        <div className="text-base font-bold">Bagaimana cara bayarnya?</div>
                        <ul className="list-disc mt-3">
                            <li className="text-base font-normal text-[#6E6C85]">
                                Buka Aplikasi OVO, DANA, Go-Pay, LinkAja, BCA
                            </li>
                            <li className="text-base font-normal text-[#6E6C85]">
                                Scan QR Code diatas
                            </li>
                            <li className="text-base font-normal text-[#6E6C85]">
                                Masukkan nominal transfer
                            </li>
                            <li className="text-base font-normal text-[#6E6C85]">
                                Konfirmasi ke Kami jika sudah melakukan transfer
                            </li>
                        </ul>
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
