import propTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";

import TrackingShipmentSkeleton from "views/Akun/skeleton/TrackingShipment";
import { Button, Modal } from "components";
import { AlertService } from "services";
import { convertDateToTimezone } from "helpers/formatter";

const HistoryContent = ({ updatedAt, note }) => {
    const historyDate = convertDateToTimezone(updatedAt, false);
    const historyTime = convertDateToTimezone(updatedAt, true, true);

    return  (
        <li className="mb-10 ml-4">
            <span className="w-4 h-4 rounded-full border-[3px] bg-white border-turq-300 absolute -left-[9px]">
            </span>
            <div className="flex justify-between items-center">
                <h3 className="text-dark-300 font-bold text-sm">{historyDate}</h3>
                <p className="text-dark-100 font-bold text-sm mt-2">{historyTime} WIB</p>
            </div>
            <p className="text-dark-100 font-medium text-sm mt-2">{note}</p>
        </li>
    );
};

HistoryContent.propTypes = {
    updatedAt: propTypes.string.isRequired,
    note: propTypes.string.isRequired,
};

const ModalTracking = ({ show, data, isLoading, onClose }) => {
    const handleCopy = () => {
        AlertService.success("Nomor Resi berhasil disalin");
    };

    return (
        <Modal
            staticBackdrop
            isPopup={show}
            isDivider={false}
            title="Lacak Pesanan"
            onRequestClose={onClose}
            mediumWidth
        >
            {isLoading ? (
                <TrackingShipmentSkeleton />
            ) : (
                <>
                    <p className="text-dark-300 font-bold text-sm mt-2">No Resi: {data.courier.company}</p>
                    <div className="flex justify-between items-center mt-1">
                        <p className="text-dark-100 font-bold text-base">{data.waybill_id}</p>
                        <CopyToClipboard onCopy={handleCopy} text={data.waybill_id}>
                            <button className="border-0 p-0 text-turq-300 font-bold text-base">Salin</button>
                        </CopyToClipboard>
                    </div>
                    <hr className="my-4" />
                    <ol className="relative border-l-[2px] left-3 mr-3 border-neutral-200 mb-20">
                        {data.history.map((history, index) => (
                            <HistoryContent key={index} note={history.note} updatedAt={history.updated_at} />
                        ))}
                    </ol>
                    <div className="absolute bottom-0 w-full left-0 px-5 py-4 bg-white">
                        <Button
                            full
                            label="Kembali"
                            size="lg"
                            variant="secondary"
                            onClick={onClose}
                        />
                    </div>
                </>
            )}
        </Modal>
    )
};

ModalTracking.propTypes = {
    show: propTypes.bool,
    isLoading: propTypes.bool,
    onClose: propTypes.func,
    data: propTypes.shape({
        waybill_id: propTypes.string,
        courier: propTypes.shape({
            company: propTypes.string,
        }),
        history: propTypes.arrayOf(propTypes.shape({
            updatedAt: propTypes.string,
            note: propTypes.string,
        }))
    }),
};

ModalTracking.defaultProps = {
    show: false,
    isLoading: false,
    onClose: () => {},
    data: {
        waybill_id: "",
        courier: {
            company: "",
        },
        history: {
            updatedAt: "",
            note: "",
        }
    },
};

export default ModalTracking;
