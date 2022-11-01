import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const DetailTransaksiSkeleton = () => {
    return (
        <div className="mt-2">
            <Skeleton width={140} height={25} />
            <Skeleton width={170} height={28} className="mt-3" />
            <Skeleton width={120} className="mt-2" />
            <Skeleton height={1} className="mt-2" />
            <Skeleton height={40} />
            <Skeleton width={100} className="mt-4" />
            <Skeleton width={80} />
            <Skeleton width={120} />
            <Skeleton height={1} className="mt-2" />
            <div className="flex gap-4">
                <Skeleton width={40} height={40} />
                <div className="w-full">
                    <div className="w-full">
                        <Skeleton />
                    </div>
                    <Skeleton width={50} />
                    <div className="flex justify-between">
                        <Skeleton width={80} height={20} className="mt-2" />
                        <Skeleton width={40} height={20} />
                    </div>
                    <Skeleton width={180} className="mt-2" />
                </div>
            </div>
            <Skeleton height={1} className="mt-4" />
            <Skeleton width={180} height={25} />
            <div className="flex justify-between mt-3">
                <Skeleton width={100} />
                <Skeleton width={60} />
            </div>
            <div className="flex justify-between">
                <Skeleton width={120} />
                <Skeleton width={50} />
            </div>
            <Skeleton height={1} className="mt-4" />
            <div className="flex justify-between">
                <Skeleton width={100} height={22} />
                <Skeleton width={60} height={22} />
            </div>
            <div className="flex gap-4 justify-between mt-4">
                <div className="w-full">
                    <Skeleton height={40} borderRadius={20} />
                </div>
                <div className="w-full">
                    <Skeleton height={40} borderRadius={20} />
                </div>
            </div>
        </div>
    )
};

export default DetailTransaksiSkeleton;
