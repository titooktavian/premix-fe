import PropTypes from "prop-types";
import Image from "next/image";
import { PageHeader } from "components";

const Index = ({
    pageTitle,
}) => {
    return (
        <div 
            className="mb-6 md:mt-3 mt-0"
        >
            <PageHeader title="Cara Bayar" subtitle="Jika kamu belum mengerti cara bayar di premixstore.com, yuk simak artikel dibawah." />

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
