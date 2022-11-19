import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick";

const ImageSlider = () => {
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
                <div className="w-full relative aspect-[4/3]">
                    <Image 
                        src="/images/image-slider/1.jpeg"
                        layout="fill"
                        objectFit="cover"
                        className="object-cover rounded-xl"
                        priority
                    />
                </div>
                <div className="w-full relative aspect-[4/3]">
                    <Image 
                        src="/images/image-slider/2.jpeg"
                        layout="fill"
                        objectFit="cover"
                        className="object-cover rounded-xl"
                        priority
                    />
                </div>
                <div className="w-full relative aspect-[4/3]">
                    <Image 
                        src="/images/image-slider/3.jpeg"
                        layout="fill"
                        objectFit="cover"
                        className="object-cover rounded-xl"
                        priority
                    />
                </div>
                <div className="w-full relative aspect-[4/3]">
                    <Image 
                        src="/images/image-slider/4.jpeg"
                        layout="fill"
                        objectFit="cover"
                        className="object-cover rounded-xl"
                        priority
                    />
                </div>
                <div className="w-full relative aspect-[4/3]">
                    <Image 
                        src="/images/image-slider/5.jpeg"
                        layout="fill"
                        objectFit="cover"
                        className="object-cover rounded-xl"
                        priority
                    />
                </div>
            </Slider>
            <Slider
                asNavFor={nav1}
                ref={(slider2) => setNav2(slider2)}
                slidesToShow={5}
                swipeToSlide={true}
                focusOnSelect={true}
            >
                <div className="pr-3 mt-2 cursor-pointer">
                    <div className="w-full relative aspect-square pr-3">
                        <Image 
                            src="/images/image-slider/1.jpeg"
                            layout="fill"
                            objectFit="contain"
                            className="object-cover rounded-lg"
                            priority
                        />
                    </div>
                </div>
                <div className="pr-3 mt-2 cursor-pointer">
                    <div className="w-full relative aspect-square pr-3">
                        <Image 
                            src="/images/image-slider/2.jpeg"
                            layout="fill"
                            objectFit="contain"
                            className="object-cover rounded-lg"
                            priority
                        />
                    </div>
                </div>
                <div className="pr-3 mt-2 cursor-pointer">
                    <div className="w-full relative aspect-square pr-3">
                        <Image 
                            src="/images/image-slider/3.jpeg"
                            layout="fill"
                            objectFit="contain"
                            className="object-cover rounded-lg"
                            priority
                        />
                    </div>
                </div>
                <div className="pr-3 mt-2 cursor-pointer">
                    <div className="w-full relative aspect-square pr-3">
                        <Image 
                            src="/images/image-slider/4.jpeg"
                            layout="fill"
                            objectFit="contain"
                            className="object-cover rounded-lg"
                            priority
                        />
                    </div>
                </div>
                <div className="pr-3 mt-2 cursor-pointer">
                    <div className="w-full relative aspect-square pr-3">
                        <Image 
                            src="/images/image-slider/5.jpeg"
                            layout="fill"
                            objectFit="contain"
                            className="object-cover rounded-lg"
                            priority
                        />
                    </div>
                </div>
            </Slider>
        </div>
    );
}

export default ImageSlider;