import { CHART_FILTER } from "constants/enum";
import propTypes from "prop-types";
import { useState } from "react";

const ChartFilter = ({ changeEvent }) => {
    const [selected, setSelected] = useState('1');

    const doChangeFilter = (id) => {
        setSelected(id);
        changeEvent(id);
    }

    return (
        <div className="flex w-full">
            {CHART_FILTER.map(filter => {
                let classList = `border-[#8581B7] text-[#8581B7] cursor-pointer border-[1px] p-1 text-xs px-3 w-1/2 text-center`;
                if (selected === filter.id) {
                    classList = `bg-[#8581B7] border-[#8581B7] text-[white] cursor-pointer border-[1px] p-1 text-xs px-3 w-1/2 text-center`;
                }

                return (
                    <div key={`chart-filter-${filter.id}`} className={classList} style={filter.additionalClass} onClick={() => {doChangeFilter(filter.id)}}>{filter.name}</div>
                );
            })}
        </div>
    );
};

ChartFilter.propTypes = {
    changeEvent: propTypes.func,
};

ChartFilter.defaultProps = {
    changeEvent: () => {},
};

export default ChartFilter;
