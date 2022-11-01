import Flickity from "react-flickity-component";
import propTypes from "prop-types";
import "flickity/css/flickity.css";
import { useEffect } from "react";
import useResponsive from "hooks/useResponsive";

const Carousel = ({ children, options }) => {
    const { isMobile } = useResponsive();
    const onWindowResize = () => {
        if (isMobile) options.groupCells = 1;
        // else options.groupCells = 2;
        options.pageDots = children.length > options.groupCells;
    };

    useEffect(() => {
        onWindowResize();
        window.addEventListener("resize", onWindowResize);
    }, []);
    return (
        <Flickity className="carousel" options={options} reloadOnUpdate>
            {children}
        </Flickity>
    );
};

Carousel.propTypes = {
    children: propTypes.any,
    options: propTypes.shape({
        accessibility: propTypes.bool,
        adaptiveHeight: propTypes.bool,
        autoPlay: propTypes.bool,
        cellAlign: propTypes.oneOfType([propTypes.number, propTypes.string]),
        contain: propTypes.bool,
        draggable: propTypes.bool,
        lazyLoad: propTypes.bool,
        pageDots: propTypes.bool,
        prevNextButtons: propTypes.bool,
        groupCells: propTypes.number
    })
};

Carousel.defaultProps = {
    options: {
        accessibility: true,
        adaptiveHeight: false,
        autoPlay: false,
        cellAlign: 0,
        contain: false,
        draggable: true,
        lazyLoad: true,
        pageDots: false,
        prevNextButtons: false,
        groupCells: 1
    }
};

export default Carousel;
