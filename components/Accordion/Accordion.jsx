
import React, { useState } from "react";
import propTypes from "prop-types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Image from "next/image";

const Accordion = ({ title, imgSrc, children, className }) => {
    const [isActive, setIsActive] = useState(false);

    const handleSetIndex = () => setIsActive(!isActive);

    return (
        <div className={className}>
            <div onClick={() => handleSetIndex()} className="flex justify-between">
                <div className="flex gap-2">
                    {imgSrc && (
                        <Image
                            width={24}
                            height={24}
                            src={imgSrc}
                        />
                    )}
                    <div className="font-bold">{title}</div>
                </div>
                <div>
                    {
                        (isActive) 
                            ? <FaChevronDown />
                            : <FaChevronUp />
                    }
                </div>
            </div>
            {(isActive) && (
                <div className="pl-8 mt-4">
                    {children}
                </div>
            )}
        </div>
    );
};


Accordion.propTypes = {
    title: propTypes.string, 
    imgSrc: propTypes.string, 
    className: propTypes.string, 
    children: propTypes.node,
}

export default Accordion;