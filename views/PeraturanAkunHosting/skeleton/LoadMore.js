import propTypes from "prop-types";
import 'react-loading-skeleton/dist/skeleton.css';

import ColView from "./ColView";
import RowView from "./RowView";
import { PRODUCT_VIEW } from "constants/enum";

const LoadMoreSkeleton = ({ view, count }) => {
    let skeletonContent = [];

    for (let i = 0; i < count; i += 1) {
        skeletonContent.push(view === PRODUCT_VIEW.LIST ? <RowView key={i} /> : <ColView key={i} />);
    }

    return skeletonContent;
};

LoadMoreSkeleton.propTypes = {
    view: propTypes.string,
    count: propTypes.number,
};

LoadMoreSkeleton.defaultProps = {
    view: PRODUCT_VIEW.GRID,
    count: 3,
};

export default LoadMoreSkeleton;
