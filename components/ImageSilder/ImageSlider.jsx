import Image from "next/image";
import PropTypes from "prop-types";
import Slider from "react-slick";
import useResponsive from "hooks/useResponsive";
import { useEffect, useState } from "react";
import ImageZoom from "components/ImageZoom/ImageZoom";

const ImageSlider = ({images , isLightbox, afterChange, slide, handleClick}) => {
    const { isMobile } = useResponsive();
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    const optionsSlider = {
        adaptiveHeight: true,
        arrows: images.length > 1,
        slidesToShow: 1,
        dots: false,
        autoplay: false,
        infinite: false,
        afterChange: afterChange,
        asNavFor:  nav2,
    };

    const optionsSliderThumbnail = {
        adaptiveHeight: true,
        infinite: false,
        slidesToShow: images.length,
        slidesToScroll: images.length,
        asNavFor: nav1,
        focusOnSelect: true,
        variableWidth: true
    };

    useEffect(()=> {
        if(nav1) nav1.slickGoTo(slide);
    },[nav1])

    return (
        <>
            <Slider ref={(slider1) => setNav1(slider1)} {...optionsSlider} className="img-slider">
                {images.map((image, index) =>(
                    <div key={`image-product-${index}`} className="relative w-full h-[300px] md:h-[250px] md:w-[250px]" onClick={() => { handleClick(index)}}>
                        {(!isMobile || isLightbox) ? (
                            <ImageZoom image={image}/>
                        )
                            :(
                                <Image
                                    src={image}
                                    layout="fill"
                                    objectFit="contain"
                                    priority
                                />
                            )}
                    </div>
                ))}
            </Slider>
            {(!isMobile && images.length > 1) && (
                <Slider ref={(slider2) => setNav2(slider2)} {...optionsSliderThumbnail} className="img-slider-thumbnail">
                    {images.map((image, index) =>(
                        <div key={`image-product-thumbnail-${index}`} className="px-1">
                            <div  className="relative h-[40px] min-w-[40px]">
                                <Image
                                    src={image}
                                    layout="fill"
                                    priority
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
        </>
    )
}

ImageSlider.propTypes = {
    images: PropTypes.array,
    isLightbox: PropTypes.bool,
    afterChange: PropTypes.func,
    slide: PropTypes.number,
    handleClick: PropTypes.func,
};

ImageSlider.defaultProps = {
    images: [],
    isLightbox: false,
    afterChange: () => {},
    slide: 0,
    handleClick: () => {},
}

export default ImageSlider;