import { useState } from "react";
import propTypes from "prop-types";

import ModalFilterTransaction from "../modal/FilterTransaction";
import { Button, Search } from "components";
import { icons } from "constants";

const FilterTransaction = ({
    isFiltered, isHistory, searchValue, onApplyFilter, onResetFilter, onSearch,
}) => {
    const [showModal, setShowModal] = useState();

    const handleShowModal = () => setShowModal(prevState => !prevState);

    const handleApplyFilter = (payload) => {
        onApplyFilter(payload);
        setShowModal(false);
    };

    const handleResetFilter = () => {
        onResetFilter();
        setShowModal(false);
    };

    return (
        <>
            <div className="flex gap-2 sticky py-4 top-14 bg-white">
                <div className="w-[120px] md:w-[35%]">
                    <Button
                        full
                        label="Filter"
                        variant={isFiltered ? "" : "secondary"}
                        className={`h-11 ${isFiltered ? "bg-green-100" : ""}`}
                        leftImage={icons.preferences}
                        onClick={handleShowModal}
                    />
                </div>
                <div className="w-[calc(100%-120px)] md:w-[65%]">
                    <Search
                        placeholder="Cari No Order ..."
                        className="h-11"
                        value={searchValue}
                        onChange={onSearch}
                    />
                </div>
            </div>
            <ModalFilterTransaction
                show={showModal}
                isHistory={isHistory}
                onClose={handleShowModal}
                onConfirm={handleApplyFilter}
                onResetFilter={handleResetFilter}
            />
        </>
    )
};

FilterTransaction.propTypes = {
    isFiltered: propTypes.bool,
    isHistory: propTypes.bool,
    searchValue: propTypes.string,
    onApplyFilter: propTypes.func,
    onResetFilter: propTypes.func,
    onSearch: propTypes.func,
};

FilterTransaction.defaultProps = {
    isFiltered: false,
    isHistory: false,
    searchValue: "",
    onApplyFilter: () => {},
    onResetFilter: () => {},
    onSearch: () => {},
};

export default FilterTransaction;
