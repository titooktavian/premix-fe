import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export const TransaksiItem = () => {
    return (
        <div className="border-b border-neutral-200 w-full py-2 mb-2">
            <div className="flex justify-between">
                <Skeleton width={130} height={20} />
                <Skeleton width={70} height={20} />
            </div>
            <div className="flex justify-between mt-2">
                <Skeleton width={170} height={20} />
                <Skeleton width={100} height={20} />
            </div>
            <div className="flex justify-between mt-2">
                <Skeleton width={120} />
            </div>
        </div>
    )
};

const TransaksiSkeleton = () => {
    return (
        <div className="pt-4">
            <div className="flex gap-2 mb-5">
                <div className="w-[120px] md:w-[35%]">
                    <Skeleton height={50} borderRadius={25} />
                </div>
                <div className="w-[calc(100%-120px)] md:w-[65%]">
                    <Skeleton height={50} borderRadius={25} />
                </div>
            </div>
            <TransaksiItem />
            <TransaksiItem />
            <TransaksiItem />
        </div>
    )
};

export default TransaksiSkeleton;
