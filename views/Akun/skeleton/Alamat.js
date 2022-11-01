import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const AlamatSkeleton = () => {
    return (
        <>
            <Skeleton height={40} borderRadius={20} className="mb-4" />
            <div className="w-full border border-neutral-200 rounded-md p-4">
                <Skeleton height={22} width={90} />
                <Skeleton width={120} className="mt-4" />
                <Skeleton className="mt-1" />
                <Skeleton width="80%" className="mt-1" />
                <Skeleton width={100} className="mt-4" />
            </div>
            <div className="w-full border border-neutral-200 rounded-md mt-2 p-4">
                <Skeleton height={22} width={90} />
                <Skeleton width={120} className="mt-4" />
                <Skeleton className="mt-1" />
                <Skeleton width="80%" className="mt-1" />
                <Skeleton width={100} className="mt-4" />
            </div>
        </>
    )
};

export default AlamatSkeleton;
