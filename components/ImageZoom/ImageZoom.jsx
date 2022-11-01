import PropTypes from "prop-types";
import Image from "next/image";
import useResponsive from "hooks/useResponsive";
import Zoom from "components/Zoom/Zoom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ImageZoom = ({ image }) => {
    const { isMobile } = useResponsive();

    return (
        <>
            {isMobile ? (
                <TransformWrapper>
                    <TransformComponent>
                        <div className="relative w-screen h-[450px]">
                            <Image
                                src={image}
                                layout="fill"
                                objectFit="contain"
                                priority
                            />
                        </div>
                    </TransformComponent>
                </TransformWrapper>
            ) : (
                <div className="hover:cursor-crosshair">
                    <Zoom
                        img={image}
                        zoomScale={2}
                        height={250}
                        width={250}
                    />
                </div>
            )}
        </>
    )
}

ImageZoom.propTypes = {
    image: PropTypes.string.isRequired,
};

export default ImageZoom;