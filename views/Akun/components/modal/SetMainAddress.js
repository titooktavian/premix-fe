import propTypes from "prop-types";

import { Button, Modal } from "components";

const ModalSetMainAddress = ({ show, onClose, onConfirm }) => {
    return (
        <Modal
            staticBackdrop
            isPopup={show}
            isDivider={false}
            title="Atur Sebagai Alamat Utama"
            type="mobile"
            onRequestClose={onClose}
        >
            <p className="text-sm text-dark-100 font-medium">Yakin ingin mengatur alamat berikut sebagai alamat utama?</p>
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
                    label="Ya"
                    size="lg"
                    onClick={onConfirm}
                />
            </div>
        </Modal>
    )
};

ModalSetMainAddress.propTypes = {
    show: propTypes.bool,
    onClose: propTypes.func,
    onConfirm: propTypes.func,
};

ModalSetMainAddress.defaultProps = {
    show: false,
    onClose: () => {},
    onConfirm: () => {},
};

export default ModalSetMainAddress;
