import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import propTypes from "prop-types";
import { RiCloseFill } from "react-icons/ri";

import Portal from "helpers/PortalHOC";
import useResponsive from "hooks/useResponsive";
import { POPUP_BACKGROUND, POPUP_TYPE } from "constants/enum";
import { useStateContext } from "context/StateContext";

const Modal = ({
    show,
    staticBackdrop,
    closeOtherPopup,
    showWithAnimation,
    closeWithAnimation,
    isPlainPopup,
    title,
    type,
    popupClassName,
    children,
    onClosePopup,
    onResetButton,
    hideDesktopHeader,
    headerLogo,
    withBottomSpace,
    bodyClassName,
    background,
}) => {
    const [hiddingPopup, setHiddingPopup] = useState(false);
    const mounted = useRef(false);
    const { isMobile } = useResponsive();
    const { outlet } = useStateContext();
    const { logo_path, nama } = outlet;
    const isHalfscreen = type === POPUP_TYPE.half;
    const isAlert = type === POPUP_TYPE.alert || (!isMobile && hideDesktopHeader);
    const isHalfAndMobile = isHalfscreen && isMobile;

    useEffect(() => {
        const documentBody = document.body;
        if(show) {
            mounted.current = true;
            documentBody.style.overflow = "hidden";
            return () => {
                mounted.current = false;
                documentBody.style.overflow = "visible";
            }
        }
    }, [show]);

    const handleClosePopup = (from = null) => {
        if (staticBackdrop && !isMobile && from === "overlay") return;
        if ((!isHalfAndMobile && isMobile) || !closeWithAnimation) return onClosePopup();
        setHiddingPopup(true);
        setTimeout(() => {
            setHiddingPopup(false);
            onClosePopup();
        }, isHalfAndMobile ? 400 : 200);
    };

    const bodyClasses = isMobile ? "mt-16" : "overflow-y-auto";
    let popupClasses = isMobile ? "h-full" : "h-fit";
    let overlayClasses;

    if (isHalfAndMobile) {
        popupClasses = `${popupClasses} h-fit bottom-0 rounded-tl-lg rounded-tr-lg max-h-screen-80`;
        if (hiddingPopup) {
            popupClasses = `${popupClasses} translate-y-full hide-modal-dialog-mobile`;
            overlayClasses = `${overlayClasses} opacity-0 animate-fadeout-04`;
        } else {
            popupClasses = `${popupClasses} modal-dialog-mobile`;
            overlayClasses = "animate-fadein-04";
        }
    } else if(isAlert) {
        popupClasses += "h-max !w-max";
    } else if (!isMobile) {
        if (hiddingPopup) {
            popupClasses = `${popupClasses} opacity-0 animate-fade-zoomout-02`;
            overlayClasses = `${overlayClasses} opacity-0 animate-fadeout-02`;
        } else {
            popupClasses = showWithAnimation && `${popupClasses} animate-fade-zoomin-02`;
            overlayClasses = showWithAnimation && "animate-fadein-02";
        }
    }
    
    return (
        <Portal selector={closeOtherPopup ? "#myportal" : "#portalWithoutStyle"}>
            {show && (
                <div className="modal over fixed top-0 left-0 z-modal h-full w-full flex justify-center items-center">
                    <div className={`z-50 w-full md:w-[480px] absolute ${background.bgClass} md:rounded-lg md:max-h-screen-min-150 ${isMobile ? "overflow-y-auto" : ""} ${popupClassName} ${popupClasses}`}>
                        {isPlainPopup ? children : (
                            <>
                                <div className={`px-4 md:px-6 flex justify-between items-center text-dark-300 w-full z-alert md:rounded-none ${isHalfAndMobile ? "pt-4 rounded-tl-lg rounded-tr-lg" : ""} ${isPlainPopup ? "" : "h-16"} ${isMobile ? `fixed ${background.bgClass}` : "sticky"}`}>
                                    {isHalfscreen && isMobile && (
                                        <div className="absolute left-0 flex justify-center top-[10px] w-full">
                                            <div className="w-12 h-1 rounded-full bg-neutral-300"></div>
                                        </div>
                                    )}
                                    {!title && !headerLogo && isMobile ? (
                                        <div className="flex gap-2 items-center">
                                            <div className="h-[40px] w-[40px] overflow-hidden">
                                                <Image
                                                    src={logo_path || "/images/item-default.png"}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full object-cover"
                                                />
                                            </div>
                                            <h3 className={`text-lg font-bold text-dark-400 ${background.textClass}`}>
                                                {nama}
                                            </h3>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            {headerLogo && (
                                                <Image
                                                    src={headerLogo}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full object-cover"
                                                />
                                            )}
                                            <h4 className={`text-xl font-bold ${background.textClass}`}>{title}</h4>
                                        </div> 
                                    )}
                                    {!isHalfAndMobile && !onResetButton && (
                                        <button type="button" onClick={handleClosePopup}>
                                            <RiCloseFill className="text-3xl font-extrabold" style={{ fill: background.iconColor }} />
                                        </button>
                                    )}
                                    {onResetButton && (
                                        <button
                                            type="button"
                                            className="text-sm text-turq-300 font-medium"
                                            onClick={onResetButton}
                                        >
                                            Reset
                                        </button>
                                    )}
                                </div>
                                <div className={`px-4 md:px-6 ${withBottomSpace ? "pb-4" : ""} ${bodyClasses} ${bodyClassName} md:max-h-screen-min-242`}>
                                    {children}
                                </div>
                            </>
                        )}
                    </div>
                    <div
                        onClick={() => handleClosePopup("overlay")}
                        className={`absolute top-0 left-0 z-40 h-full w-full bg-black/60 ${overlayClasses}`}
                    />
                </div>
            )}
            <></>
        </Portal>
    )
};

Modal.propTypes = {
    show: propTypes.bool,
    staticBackdrop: propTypes.bool,
    closeOtherPopup: propTypes.bool,
    showWithAnimation: propTypes.bool,
    closeWithAnimation: propTypes.bool,
    isPlainPopup: propTypes.bool,
    title: propTypes.string,
    type: propTypes.string,
    popupClassName: propTypes.string,
    children: propTypes.node.isRequired,
    onClosePopup: propTypes.func,
    onResetButton: propTypes.func,
    hideDesktopHeader: propTypes.bool,
    headerLogo: propTypes.string,
    withBottomSpace: propTypes.bool,
    bodyClassName: propTypes.string,
    background: propTypes.object,
};

Modal.defaultProps = {
    show: false,
    staticBackdrop: false,
    closeOtherPopup: false,
    showWithAnimation: true,
    closeWithAnimation: true,
    isPlainPopup: false,
    title: "",
    type: "fullscreen",
    popupClassName: "",
    onClosePopup: () => {},
    onResetButton: null,
    hideDesktopHeader: false,
    headerLogo: null,
    withBottomSpace: true,
    bodyClassName: "",
    background: POPUP_BACKGROUND.light,
};

export default Modal;
