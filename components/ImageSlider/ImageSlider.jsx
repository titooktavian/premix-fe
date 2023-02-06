import propTypes from "prop-types";
import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick";

const ImageSlider = ({ imageList }) => {
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    return (
        <div className="w-full">
            <Slider
                asNavFor={nav2}
                ref={(slider1) => setNav1(slider1)}
                {...settings}
            >
                {imageList.map((imgTop, i) => (
                    <div className="w-full relative aspect-[4/3]" key={`img-top-${i}`}>
                        <Image 
                            src={imgTop}
                            layout="fill"
                            objectFit="contain"
                            className="object-cover rounded-xl"
                            priority
                        />
                    </div>    
                ))}
            </Slider>
            <Slider
                asNavFor={nav1}
                ref={(slider2) => setNav2(slider2)}
                slidesToShow={imageList.length}
                swipeToSlide={true}
                focusOnSelect={true}
            >
                {imageList.map((img, index) => (
                    <div className="pr-3 mt-2 cursor-pointer" key={`img-nav-${index}`}>
                        <div className="w-full relative aspect-square pr-3 w-[50px] h-[50px] md:w-[124px] md:h-[124px]">
                            <Image 
                                src={img}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-lg"
                                priority
                            />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

ImageSlider.propTypes = {
    imageList: propTypes.array,
};

ImageSlider.defaultProps = {
    imageList: [],
};

export default ImageSlider;