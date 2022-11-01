import { useState } from "react";
import propTypes from "prop-types";
import Calendar from "react-calendar";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Button } from "components";
import { formatDate } from "helpers/utils";
import {
    convertDateToText,
    convertToDate,
    createSavedDate,
    getFirstDateOfMonth,
    getLastDateOfMonth,
} from "./utils";

const CalendarPicker = ({ startDate, endDate, defaultDate, isRange, onChangeEvent }) => {
    const newSavedDate = createSavedDate(startDate, endDate, defaultDate, isRange);
    const [rangeDate, setRangeDate] = useState({ startDate, endDate });
    const [savedDate, setSavedDate] = useState(newSavedDate);
    const [showPopover, setShowPopover] = useState(false);

    const handleRangeChange = (range) => {
        if (!range) return;
        if (range && range.length === 0) return;

        const [startDateObj, endDateObj] = range;

        const startDate = convertDateToText(startDateObj);
        const endDate = convertDateToText(endDateObj);
        setRangeDate({ startDate, endDate });
    }

    const handleChange = (dateObj) => {
        const date = convertDateToText(dateObj);
        setSavedDate(formatDate(date, 'dd mmm yyyy'));
        setShowPopover(false);
    }

    const handleApplyChange = () => {
        const { startDate, endDate } = rangeDate;
        const newSavedDate = (startDate === endDate) ? createSavedDate(startDate, endDate, defaultDate, true, true) : createSavedDate(startDate, endDate, defaultDate, true, false);
        setSavedDate(newSavedDate);
        setShowPopover(false);
        onChangeEvent(startDate, endDate);
    }

    const handleCancelChange = () => {
        const newSavedDate = createSavedDate(startDate, endDate, defaultDate, isRange);
        setSavedDate(newSavedDate);
        setRangeDate({ startDate, endDate });
        setShowPopover(false);
    }

    const handleTogglePopover = () => setShowPopover(prevState => !prevState);

    return (
        <>
            <input
                type="text"
                readOnly
                className="absolute opacity-0 -left-96 w-0 h-0"
                value={savedDate}
            />
            <div
                className="w-full border-b py-2 border-neutral-200 cursor-pointer flex justify-between items-center"
                onClick={handleTogglePopover}
                role="presentation"
            >
                <span className="font-medium text-dark-300 text-sm md:text-base">{savedDate}</span>
                <FaChevronDown className="text-xs text-dark-100" />
            </div>
            {showPopover && (
                <div className="modal over fixed top-0 left-0 z-modal h-full w-full bg-black/30">
                    <div className="calendar-picker-wrapper z-[201] shadow-lg rounded-lg">
                        {
                            isRange ? (
                                <Calendar
                                    nextLabel={<FaChevronRight />}
                                    prevLabel={<FaChevronLeft />}
                                    next2Label={null}
                                    prev2Label={null}
                                    defaultValue={[convertToDate(startDate), convertToDate(endDate)]}
                                    value={[convertToDate(rangeDate.startDate), convertToDate(rangeDate.endDate)]}
                                    onChange={handleRangeChange}
                                    returnValue="range"
                                    selectRange
                                />
                            ) : (
                                <Calendar
                                    nextLabel={<FaChevronRight />}
                                    prevLabel={<FaChevronLeft />}
                                    next2Label={null}
                                    prev2Label={null}
                                    value={defaultDate === '' ? null : convertToDate(defaultDate)}
                                    onChange={handleChange}
                                />
                            )
                        }
                        {
                            isRange && (
                                <div className="flex justify-between border-t border-t-neutral-100 pt-3 mt-1">
                                    <Button
                                        label="Batal"
                                        variant="secondary"
                                        onClick={handleCancelChange}
                                    />
                                    <Button
                                        label="Terapkan"
                                        onClick={handleApplyChange}
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div className="absolute top-0 left-0 z-[200] h-full w-full"></div>
                </div>
            )}
        </>
    )
};

CalendarPicker.propTypes = {
    startDate: propTypes.string,
    endDate: propTypes.string,
    defaultDate: propTypes.string,
    isRange: propTypes.bool,
    onChangeEvent: propTypes.func,
};

CalendarPicker.defaultProps = {
    startDate: getFirstDateOfMonth,
    endDate: getLastDateOfMonth,
    defaultDate: "",
    isRange: false,
    onChangeEvent: () => {},
};

export default CalendarPicker;
