import PropTypes from "prop-types";
import ImageSlider from "components/ImageSilder/ImageSlider";
import { Modal } from "components";
import { useEffect, useState } from "react";
import useResponsive from "hooks/useResponsive";
import { POPUP_BACKGROUND } from "constants/enum";

const ImageProduct = ({images , className}) => {
    const { isMobile } = useResponsive();
    const [slide , setSlide] = useState(0);
    const [isLightboxPopup , setLightboxPopup] = useState(false);

    const closeLightboxPopup = () => {
        setLightboxPopup(false);
    }

    const openLightbox = (slide) => {
        if(isMobile) {    
            setSlide(slide);
            setLightboxPopup(true);
        }
    }
    
    useEffect(()=> {
        if(!isMobile) closeLightboxPopup();
    },[isMobile])

    return (
        <div className={className}>
            <Modal
                isPopup={isLightboxPopup}
                title={`${slide + 1} / ${images.length}`}
                type="fullscreen"
                onRequestClose={closeLightboxPopup}
                background={POPUP_BACKGROUND.dark}
            >
                <ImageSlider 
                    images={images}
                    slide={slide}
                    afterChange={setSlide}
                    isLightbox={true}
                />
            </Modal>
            <ImageSlider images={images} handleClick={openLightbox}/>
        </div>
    )
}

ImageProduct.propTypes = {
    images: PropTypes.array,
};

ImageProduct.defaultProps = {
    images: [],
}

export default ImageProduct;