import propTypes from "prop-types";
import { FaInfoCircle } from 'react-icons/fa';

import { Button, Modal } from "components";

const ModalCompleteTransaction = ({ show, onClose, onConfirm }) => {
    return (
        <Modal
            staticBackdrop
            isPopup={show}
            isDivider={false}
            title="Pesanan Selesai"
            type="mobile"
            onRequestClose={onClose}
        >
            <p className="text-sm text-dark-100 font-medium">Apakah anda yakin akan menyelesaikan pesanan ini?</p>
            <div className="flex gap-2 items-center mt-2">
                <FaInfoCircle className="w-[20px]" />
                <p className="text-xs text-dark-100 font-medium">
                    Pastikan anda telah menerima barang yang dikirimkan oleh outlet,
                    <br />
                    karena kami akan meneruskan pembayaran ke outlet terkait setelah orderan selesai.
                </p>
            </div>
            <div className="flex md:flex-row flex-col-reverse gap-2 md:4 items-center mt-5 mb-2">
                <Button
                    full
                    label="Tidak, Batal"
                    size="lg"
                    variant="secondary"
                    onClick={onClose}
                />
                <Button
                    full
                    label="Ya, Proses"
                    size="lg"
                    onClick={onConfirm}
                />
            </div>
        </Modal>
    )
};

ModalCompleteTransaction.propTypes = {
    show: propTypes.bool,
    onClose: propTypes.func,
    onConfirm: propTypes.func,
};

ModalCompleteTransaction.defaultProps = {
    show: false,
    onClose: () => {},
    onConfirm: () => {},
};

export default ModalCompleteTransaction;
