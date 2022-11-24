import Image from "next/image";
import propTypes from "prop-types";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Accordion = ({ title, icon, children }) => {
    const [isExpand, setIsExpand] = useState(false);

    return (
        <div className="flex gap-2 px-6 py-5 w-full border rounded-lg flex-col">
            <div className="flex w-full gap-2 items-center">
                <div className="w-1/6 h-[20px] relative">
                    <Image src={icon} layout="fill" objectFit="contain" />
                </div>
                <div className="w-4/6 h-[20px] text-sm">
                    <span>{title}</span>
                </div>
                <div className="w-1/6 h-[20px] flex justify-end">
                    {isExpand ? (
                        <AiOutlineMinus className="cursor-pointer" onClick={() => { setIsExpand(!isExpand) }} />
                    ) : (
                        <AiOutlinePlus className="cursor-pointer" onClick={() => { setIsExpand(!isExpand) }} />
                    )}
                </div>
            </div>
            {isExpand && (
                <div className="w-full border-t mt-2 pt-4">
                    {children}
                </div>
            )}
        </div>
    );
};

Accordion.propTypes = {
    title: propTypes.string,
    icon: propTypes.string,
    children: propTypes.node.isRequired,
};

Accordion.defaultProps = {
    title: "",
    icon: "",
};

export default Accordion;
