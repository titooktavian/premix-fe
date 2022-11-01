import { useEffect, useRef } from "react";
import { RiCloseLine } from "react-icons/ri";
import Divider from "../Divider/Divider";
import Portal from "helpers/PortalHOC";
import propTypes from "prop-types";
import useResponsive from "hooks/useResponsive";
import { POPUP_BACKGROUND, POPUP_TYPE } from "constants/enum";
import { IconContext } from "react-icons/lib";

const Modal = ({
    children,
    isPopup,
    title,
    type,
    onRequestClose,
    subtitle,
    isDivider,
    isShowClose,
    background,
    staticBackdrop,
    mediumWidth,
    handleResetButton,
}) => {
    const { isMobile } = useResponsive();
    const closePopup = () => {
        onRequestClose();
    };
    const modalWidth = mediumWidth ? 'md:w-[450px]' : type === POPUP_TYPE.full ? 'md:w-[600px]' : 'md:w-auto';
    const halfScreenMobileBody = "bottom-0 rounded-lg " + modalWidth;
    const fullScreenMobileBody = "h-full " + modalWidth;
    const mounted = useRef(false);
    useEffect(() => {
        if(isPopup) {
            mounted.current = true;
            document.body.style.overflow = "hidden";
            return () => {
                mounted.current = false;
                document.body.style.overflow = "visible";
            }

        }
    }, [isPopup]);
    return (
        <Portal>
            {isPopup && (
                <div className="modal over fixed top-0 left-0 z-modal h-full w-full bg-black/30">
                    <div className={`${type === POPUP_TYPE.full ? fullScreenMobileBody : halfScreenMobileBody} z-50 w-full absolute bg-white md:rounded-lg md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-fit md:min-w-30% md:max-w-80% md:max-h-100% md:p-4`}>
                        <div className={`${type === POPUP_TYPE.full ? 'h-[60px]' : 'h-fit mt-4'} w-full px-2.5 flex items-center md:p-0 md:h-fit md:mt-0`}>
                            <h3 className={`text-lg font-bold w-11/12 ${background.textClass}`}>
                                {title}
                            </h3>
                            {(!isMobile || isShowClose) && !handleResetButton && (
                                <IconContext.Provider 
                                    value={{ 
                                        color: background.iconColor, 
                                        className: "w-1/12 z-loading cursor-pointer text-lg font-extrabold",
                                        size: "2rem",
                                    }}
                                >
                                    <RiCloseLine onClick={closePopup}/>
                                </IconContext.Provider>
                            )}
                            {(handleResetButton !== null) && (
                                <button
                                    type="button"
                                    className="text-sm text-turq-300 font-medium"
                                    onClick={handleResetButton}
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                        <p className="px-4 text-sm font-normal text-dark-100 md:px-0">{subtitle}</p>
                        {isDivider && <Divider className="hidden md:block" /> }
                        {/* Content children goes belows */}
                        <div className={`${type === POPUP_TYPE.full ? 'max-h-screen-min-60' : 'max-h-screen-55'} px-4 py-2.5 overflow-y-scroll md:max-h-screen-min-210 mt-2 md:px-1`}>
                            {children}
                        </div>
                    </div>
                    <div
                        onClick={() => staticBackdrop ? {} : closePopup()}
                        className="absolute top-0 left-0 z-40 h-full w-full bg-black/30"
                    />
                </div>
            )}
        </Portal>
    );
};

Modal.propTypes = {
    children: propTypes.node.isRequired,
    isPopup: propTypes.bool,
    title: propTypes.string,
    subtitle: propTypes.string,
    type: propTypes.string,
    onRequestClose: propTypes.func.isRequired,
    isDivider: propTypes.bool,
    isShowClose: propTypes.bool,
    background: propTypes.object,
    staticBackdrop: propTypes.bool,
    mediumWidth: propTypes.bool,
    handleResetButton: propTypes.func,
};

Modal.defaultProps = {
    isPopup: false,
    title: 'Modal Title',
    type: 'fullscreen',
    subtitle: '',
    isDivider: true,
    isShowClose: true,
    background: POPUP_BACKGROUND.light,
    staticBackdrop: false,
    mediumWidth: false,
    handleResetButton: null,
}

export default Modal;
