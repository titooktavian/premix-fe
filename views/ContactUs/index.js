import { PageHeader } from "components";
import PropTypes from "prop-types";

const Index = ({
    pageTitle,
}) => {
    return (
        <div 
            className="mb-6 md:mt-3 mt-0"
        >
            <PageHeader title="Hubungi Kami" subtitle="Kirim pesan kamu sekarang juga, kami akan membalas secepatnya." />

            <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                <div className="md:mx-auto md:max-w-[1110px] px-4 flex md:flex-row flex-col gap-5">
                    <div className="flex flex-col w-full md:w-1/4">
                        <div className="text-base font-bold text-[#272541]">Lokasi Kantor</div>
                        <div className="text-base text-[#6E6C85]">Online</div>
                    </div>
                    <div className="flex flex-col w-full md:w-2/4">
                        <div className="text-base font-bold text-[#272541]">Contact</div>
                        <div className="flex">
                            <div className="w-1/2 md:w-1/4 text-base text-[#6E6C85]">WhatsApp:</div>
                            <div className="w-1/2 md:w-2/4 text-base font-bold text-[#6E6C85]">(+62) 8123-5222-233</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 md:w-1/4 text-base text-[#6E6C85]">Telegram:</div>
                            <div className="w-1/2 md:w-2/4 text-base font-bold text-[#6E6C85]">premixstore</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 md:w-1/4 text-base text-[#6E6C85]">Email:</div>
                            <div className="w-1/2 md:w-2/4 text-base font-bold text-[#6E6C85]">hello@premixstore.com</div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-1/4">
                        <div className="text-base font-bold text-[#272541]">Jam Operasional</div>
                        <div className="text-base text-[#6E6C85]">Everyday: 08:00 - 21:00</div>
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
