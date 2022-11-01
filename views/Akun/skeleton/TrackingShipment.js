import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const TrackingShipmentSkeleton = () => {
    return (
        <div className="mt-2">
            <Skeleton width={160} />
            <div className="flex justify-between mt-1">
                <Skeleton width={140} height={20} />
                <Skeleton width={50} height={20} />
            </div>
            <hr className="my-5" />
            <div className="mb-4">
                <div className="flex justify-between mt-1 mb-2 w-full">
                    <Skeleton width={140} />
                    <Skeleton width={70} />
                </div>
                <Skeleton />
                <Skeleton width={70} />
            </div>
            <div className="mb-4">
                <div className="flex justify-between mt-1 mb-2 w-full">
                    <Skeleton width={140} />
                    <Skeleton width={70} />
                </div>
                <Skeleton />
                <Skeleton width={70} />
            </div>
            <div className="mb-4">
                <div className="flex justify-between mt-1 mb-2 w-full">
                    <Skeleton width={140} />
                    <Skeleton width={70} />
                </div>
                <Skeleton />
                <Skeleton width={70} />
            </div>
            <Skeleton borderRadius={24} height={48} />
        </div>
    )
};

export default TrackingShipmentSkeleton;
