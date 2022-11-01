import React from "react";
import Image from "next/image";

const Tentang = ({ about }) => {
    const { profile, banner_url } = about;
    return (
        <div className="flex-1 md:mx-auto md:w-[960px]">
            <h4 className="py-2.5 text-xl font-bold">Tentang Kami</h4>
            {banner_url && (
                <div className="relative -mx-4 h-[152px] lg:mx-0 lg:h-[300px]">
                    <Image src={banner_url} layout="fill" priority />
                </div>
            )}
            <section
                className="py-4 text-neutral-300"
                dangerouslySetInnerHTML={{ __html: profile }}
            />
        </div>
    );
};

export default Tentang;
