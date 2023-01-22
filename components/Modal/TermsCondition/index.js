import propTypes from "prop-types";

import ModalContent from "./ModalContent";
import { Modal } from "components";

const ModalTermsConditions = ({ show, onClose }) => {
    return (
        <Modal
            show={show}
            title="Syarat dan Ketentuan"
            type="fullscreen"
            popupClassName="md:w-[700px]"
            onClosePopup={onClose}
        >
            <ModalContent />
        </Modal>
    )
};

ModalTermsConditions.propTypes = {
    show: propTypes.bool,
    onClose: propTypes.func,
};

ModalTermsConditions.defaultProps = {
    show: false,
    onClose: () => {},
};

export default ModalTermsConditions;
