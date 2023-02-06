import { INFORMATION_NAVIGATIONS } from "constants/enum";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import { RiTelegramLine, RiWhatsappLine, RiMailLine, RiTwitterLine} from "react-icons/ri";

const Footer = () => {
    return (
        <div className="flex min-h-[10vh] justify-center py-6 bg-[#F4F4FD] pt-8 pb-10">
            <div className="flex flex-col md:flex-row px-4 md:w-[1110px] gap-4">
                <div className="flex flex-col w-full md:w-1/3 gap-2">
                    <div className="font-bold text-base mb-3">Metode Pembayaran</div>
                    <div className="flex gap-4">
                        <Image
                            src={"/icons/payment/ovo.png"}
                            width={52}
                            height={16}
                            objectFit="contain"
                        />
                        <Image
                            src={"/icons/payment/dana.png"}
                            width={63}
                            height={18}
                            objectFit="contain"
                        />
                        <Image
                            src={"/icons/payment/gopay.png"}
                            width={71}
                            height={16}
                            objectFit="contain"
                        />
                        <Image
                            src={"/icons/payment/qris.png"}
                            width={48}
                            height={17}
                            objectFit="contain"
                        />
                    </div>
                    <div className="flex-grow"></div>
                    <div className="text-sm font-normal">
                        © 2022 Premix Store
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full md:w-2/3">
                    <div className="flex flex-col w-full md:w-1/3 gap-2">
                        <div className="font-bold text-base mb-0 md:mb-3 mt-3 md:mt-0">Informasi</div>
                        <div className="flex text-sm font-normal gap-2">
                            <RiWhatsappLine className="text-lg" /> +62 8123-5222-233
                        </div>
                        <div className="flex text-sm font-normal gap-2">
                            <RiTelegramLine className="text-xl" /> premixstore
                        </div>
                        <div className="flex text-sm font-normal gap-2">
                            <RiMailLine className="text-lg" /> hello@premixstore.com
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-1/3 gap-2">
                        <div className="font-bold text-base mb-0 md:mb-3 mt-3 md:mt-0">Follow Kami</div>
                        <div className="flex text-sm font-normal gap-2">
                            <AiOutlineFacebook className="text-lg" /> Premix Store
                        </div>
                        <div className="flex text-sm font-normal gap-2">
                            <AiOutlineInstagram className="text-lg" /> @premixstore
                        </div>
                        <div className="flex text-sm font-normal gap-2">
                            <RiTwitterLine className="text-lg" /> @premixstore
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-1/3 gap-2">
                        <div className="font-bold text-base mb-0 md:mb-3 mt-3 md:mt-0">Menu Lain</div>
                        {INFORMATION_NAVIGATIONS.map((info) => (
                            <Link href={info.link} key={info.link}>
                                <div className="flex text-sm font-normal gap-2 cursor-pointer">
                                    {info.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
