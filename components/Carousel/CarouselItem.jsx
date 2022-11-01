import propTypes from "prop-types";
import Link from "next/link";

const CarouselItem = ({ name, description, link, imageUrl }) => {
    return (
        <div
            className="mx-2 w-full p-4 rounded-3xl bg-cover bg-no-repeat relative pt-[30%]"
            style={{
                backgroundImage: `url('${imageUrl}')`,
            }}
        >
            <div className="flex flex-col absolute inset-0 justify-center p-10 w-1/2">
                <div className="text-[32px] text-[#FFFFFF] font-bold">
                    {name}
                </div>
                <div className="text-base text-[#FFFFFF] font-normal">
                    {description}
                </div>
                <div className="rounded-full bg-[#FFFFFF] w-[184px] h-10 text-[#272541] text-base font-bold mt-4 cursor-pointer flex justify-center items-center">
                    <Link href={link}>Beli Sekarang</Link>
                </div>
            </div>
        </div>
    );
};

CarouselItem.propTypes = {
    name: propTypes.string,
    description: propTypes.string,
    link: propTypes.string,
    imageUrl: propTypes.string,
};

CarouselItem.defaultProps = {
    name: "",
    description: "",
    link: "",
    imageUrl: "",
};

export default CarouselItem;
