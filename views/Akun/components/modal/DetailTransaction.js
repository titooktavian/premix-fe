import propTypes from "prop-types";

import TransactionDetail from "../transaction/TransactionDetail";
import DetailTransaksiSkeleton from "views/Akun/skeleton/DetailTransaksi";
import { Modal } from "components";

const ModalDetailTransaction = ({ data, show, isLoadingDetail, merchantCode, onClose, onFetchDetail }) => {
    return (
        <Modal
            mediumWidth
            staticBackdrop
            isPopup={show}
            isDivider={false}
            title="Detail Pesanan"
            type="fullscreen"
            onRequestClose={onClose}
        >
            {
                isLoadingDetail ? (
                    <DetailTransaksiSkeleton />
                ) : (
                    <TransactionDetail
                        data={data}
                        merchantCode={merchantCode}
                        onFetchDetail={onFetchDetail}
                    />
                )
            }
        </Modal>
    )
};

ModalDetailTransaction.propTypes = {
    data: propTypes.shape({}),
    show: propTypes.bool,
    isLoadingDetail: propTypes.bool,
    merchantCode: propTypes.string,
    onClose: propTypes.func,
    onFetchDetail: propTypes.func,
};

ModalDetailTransaction.defaultProps = {
    data: {},
    show: false,
    isLoadingDetail: false,
    merchantCode: "",
    onClose: () => {},
    onFetchDetail: () => {},
};

export default ModalDetailTransaction;
