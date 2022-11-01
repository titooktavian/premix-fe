import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingSkeleton = () => {
    return (
        <div className="flex flex-col items-center">
            <Skeleton width={80} height={80} borderRadius={40} />
            <Skeleton width={150} height={60} className="mt-8" />
            <Skeleton width={200} height={25} className="mt-8" />
            <div className="w-full">
                <Skeleton className="mt-6" />
                <Skeleton />
                <div className="w-4/5 mx-auto">
                    <Skeleton />
                </div>
            </div>
            <div className="flex md:flex-row flex-col md:gap-4 gap-2 w-full mt-12">
                <div className="w-full">
                    <Skeleton height={50} borderRadius={25} />
                </div>
                <div className="w-full">
                    <Skeleton height={50} borderRadius={25} />
                </div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;
