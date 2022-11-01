import Modal from "../Modal";
import ModalContent from "./ModalContent";

const ModalTermsConditions = ({ show, onClose }) => {
    return (
        <Modal
            isPopup={show}
            isDivider={false}
            title="Syarat dan Ketentuan"
            type="fullscreen"
            onRequestClose={onClose}
        >
            <ModalContent />
        </Modal>
    )
};

export default ModalTermsConditions;
