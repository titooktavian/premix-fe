import propTypes from "prop-types";

import { Button, Modal } from "components";

const ModalDeleteAddress = ({ step, show, onClose, onConfirm }) => {
    return (
        <Modal
            staticBackdrop
            isPopup={show}
            isDivider={false}
            title="Hapus Alamat"
            type="mobile"
            onRequestClose={onClose}
        >
            <p className="text-sm text-dark-100 font-medium">{step === 1 ? "Yakin ingin menghapus alamat?" : "Anda tidak dapat menghapus alamat utama"}</p>
            <div className="flex md:flex-row flex-col-reverse gap-2 md:4 items-center mt-5 mb-2">
                <Button
                    full
                    label={step === 1 ? "Batal" : "Tutup"}
                    size="lg"
                    variant="secondary"
                    onClick={onClose}
                />
                {
                    step === 1 && (
                        <Button
                            full
                            label="Ya, Hapus"
                            size="lg"
                            variant="primary-"
                            onClick={onConfirm}
                        />
                    )
                }
            </div>
        </Modal>
    )
};

ModalDeleteAddress.propTypes = {
    step: propTypes.number,
    show: propTypes.bool,
    onClose: propTypes.func,
    onConfirm: propTypes.func,
};

ModalDeleteAddress.defaultProps = {
    step: 1,
    show: false,
    onClose: () => {},
    onConfirm: () => {},
};

export default ModalDeleteAddress;
