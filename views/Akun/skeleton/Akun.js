import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const AkunSkeleton = () => {
    return (
        <>
            <Skeleton width={110} />
            <Skeleton height={45} className="mt-1" />
            <Skeleton width={70} className="mt-5" />
            <Skeleton height={45} className="mt-1" />
            <div className="mt-7 flex justify-between">
                <Skeleton height={20} width={150} />
                <Skeleton width={20} />
            </div>
            <Skeleton width={100} className="mt-3" />
            <div className="mt-7 flex justify-between">
                <Skeleton height={20} width={120} />
                <Skeleton width={20} />
            </div>
            <div className="flex gap-2 mt-6">
                <div className="w-full">
                    <Skeleton height={50} borderRadius={25} />
                </div>
                <div className="w-full">
                    <Skeleton height={50} borderRadius={25} />
                </div>
            </div>
        </>
    )
};

export default AkunSkeleton;
