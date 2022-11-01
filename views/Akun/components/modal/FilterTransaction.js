import { useState } from "react";
import moment from "moment";
import propTypes from "prop-types";

import { Button, CalendarPicker, Modal } from "components";

const firstDate = moment().subtract(31, 'days').format('DD/MM/YYYY');
const lastDate = moment().format('DD/MM/YYYY');

const ModalFilterTransaction = ({
    show, isHistory, onClose, onConfirm, onResetFilter,
}) => {
    const [startDate, setStartDate] = useState(firstDate);
    const [endDate, setEndDate] = useState(lastDate);
    const [status, setStatus] = useState("");

    const handleChangePeriode = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
    }

    const handleChangeStatus = (event) => {
        const { value } = event.target;
        setStatus(value);
    }

    const handleApplyFilter = () => {
        const payload = {
            startDate: moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            endDate: moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            status,
        };
        onConfirm(payload);
    }

    return (
        <Modal
            isPopup={show}
            isDivider={false}
            title="Filter"
            handleResetButton={onResetFilter}
            type="mobile"
            isShowClose={false}
            onRequestClose={onClose}
        >
            <>
                <div className="flex flex-col gap-2 mt-2">
                    <span className="text-sm text-dark-300 font-bold">Periode</span>
                    <CalendarPicker
                        isRange
                        startDate={startDate}
                        endDate={endDate}
                        onChangeEvent={handleChangePeriode}
                    />
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <span className="text-sm text-dark-300 font-bold">Status</span>
                    <select onChange={handleChangeStatus} value={status} className="outline-none py-1 border-b border-neutral-200 text-sm md:text-base font-medium text-dark-300">
                        <option value="">Semua Status</option>
                        {isHistory ? (
                            <>
                                <option value="5">Pesanan Selesai</option>
                                <option value="6">Pesanan Dibatalkan</option>
                            </>
                        ) : (
                            <>
                                <option value="1">Menunggu Pembayaran</option>
                                <option value="2">Pembayaran Berhasil</option>
                                <option value="3">Pesanan Diproses</option>
                                <option value="4">Dalam Proses Pengiriman</option>
                            </>
                        )}
                    </select>
                </div>
                <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-2 items-center mt-6 md:mt-8">
                    <Button
                        full
                        label="Batal"
                        variant="secondary"
                        size="lg"
                        className="md:text-sm text-base"
                        onClick={onClose}
                    />
                    <Button
                        full
                        label="Terapkan Filter"
                        size="lg"
                        className="md:text-sm text-base"
                        onClick={handleApplyFilter}
                    />
                </div>
            </>
        </Modal>
    )
};

ModalFilterTransaction.propTypes = {
    show: propTypes.bool,
    isHistory: propTypes.bool,
    onClose: propTypes.func,
    onConfirm: propTypes.func,
    onResetFilter: propTypes.func,
};

ModalFilterTransaction.defaultProps = {
    show: false,
    isHistory: false,
    onClose: () => {},
    onConfirm: () => {},
    onResetFilter: () => {},
};

export default ModalFilterTransaction;
