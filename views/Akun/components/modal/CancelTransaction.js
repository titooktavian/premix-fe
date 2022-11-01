import propTypes from "prop-types";

import { Button, Modal } from "components";

const ModalCancelTransaction = ({ show, onClose, onConfirm }) => {
    return (
        <Modal
            staticBackdrop
            isPopup={show}
            isDivider={false}
            title="Batalkan Pesanan"
            type="mobile"
            onRequestClose={onClose}
        >
            <p className="text-sm text-dark-100 font-medium">Yakin ingin membatalkan pesanan ini?</p>
            <div className="flex md:flex-row flex-col-reverse gap-2 md:4 items-center mt-5 mb-2">
                <Button
                    full
                    label="Batal"
                    size="lg"
                    variant="secondary"
                    onClick={onClose}
                />
                <Button
                    full
                    label="Proses"
                    size="lg"
                    onClick={onConfirm}
                />
            </div>
        </Modal>
    )
};

ModalCancelTransaction.propTypes = {
    show: propTypes.bool,
    onClose: propTypes.func,
    onConfirm: propTypes.func,
};

ModalCancelTransaction.defaultProps = {
    show: false,
    onClose: () => {},
    onConfirm: () => {},
};

export default ModalCancelTransaction;
