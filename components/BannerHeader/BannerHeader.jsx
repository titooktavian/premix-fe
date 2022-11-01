import Image from "next/image";

const BannerHeader = ({ banner_url }) => {
    return (
        <div className="relative -mx-4 mb-2 h-[152px] bg-gray-400 md:mx-0 md:h-[300px]">
            {banner_url && <Image src={banner_url} layout="fill" priority />}
        </div>
    );
};

export default BannerHeader;
