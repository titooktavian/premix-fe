import PropTypes from "prop-types";
import { useRouter } from "next/router";
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
                        <div className="font-bold text-3xl">Peraturan Akun Desain</div>
                        <div className="font-normal text-base">Yuk simak peraturan akun desain dibawah.</div>
                    </div>
                </div>
            </section>

            <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                <div className="md:mx-auto md:max-w-[1110px] px-4 flex flex-col items-center gap-5">
                    <div className="w-[700px]">
                        <Image src="/images/akun-design.png" width="700" height="363" />
                    </div>
                    
                    <div className="w-[487px] flex flex-col items-start">
                        <div className="text-base font-bold">Peraturan Khusus untuk Akun Desain</div>
                        <ul className="list-disc mt-3">
                            <li className="text-base font-normal text-[#6E6C85]">
                                Jangan pernah merubah Email/Username/Password/Billing
                            </li>
                            <li className="text-base font-normal text-[#6E6C85]">
                                Akun tidak boleh di SHARE, hanya untuk pemakaian PRIBADI.
                            </li>
                            <li className="text-base font-normal text-[#6E6C85]">
                                Kami hanya bertanggung jawab terhadap Akun.
                            </li>
                            <li className="text-base font-normal text-[#6E6C85]">
                                Akun yang sudah dibeli tidak dapat dikembalikan/dipindah.
                            </li>
                            <li className="text-base font-normal text-[#6E6C85]">
                                Download melebihi batas kuota yang sudah Kami sarankan maka Garansi Hangus
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
