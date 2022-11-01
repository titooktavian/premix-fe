import { useRouter } from "next/router";
import propTypes from "prop-types";

import { Button, Modal } from "components";

const ModalConfirmReOrder = ({ show, onClose, onConfirm }) => {
    const router = useRouter();

    const handleOpenProduct = () => router.push("/produk");

    return (
        <Modal
            staticBackdrop
            isPopup={show}
            isDivider={false}
            title="Ingin Melakukan Pemesanan Ulang?"
            type="mobile"
            onRequestClose={onClose}
        >
            <p className="text-sm text-dark-100 font-medium">Kamu bisa melakukan pemesanan kembali dengan produk yang sama atau produk baru</p>
            <div className="flex md:flex-row flex-col-reverse gap-2 md:4 items-center mt-5 mb-2">
                <Button
                    full
                    label="Tidak, Buat Pesanan Baru"
                    size="lg"
                    variant="secondary"
                    onClick={handleOpenProduct}
                />
                <Button
                    full
                    label="Ya, Ulangi Pesanan"
                    size="lg"
                    onClick={onConfirm}
                />
            </div>
        </Modal>
    )
};

ModalConfirmReOrder.propTypes = {
    show: propTypes.bool,
    onClose: propTypes.func,
    onConfirm: propTypes.func,
};

ModalConfirmReOrder.defaultProps = {
    show: false,
    onClose: () => {},
    onConfirm: () => {},
};

export default ModalConfirmReOrder;
