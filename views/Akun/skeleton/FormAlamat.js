import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const FormAlamatSkeleton = () => {
    return (
        <>
            <Skeleton width={110} />
            <Skeleton height={45} className="mt-1" />
            <Skeleton width={70} className="mt-5" />
            <Skeleton height={45} className="mt-1" />
            <Skeleton width={100} className="mt-5" />
            <Skeleton height={45} className="mt-1" />
            <Skeleton width={80} className="mt-5" />
            <Skeleton className="mt-1" />
            <Skeleton width={150} className="mt-1" />
            <Skeleton height={200} className="mt-1" />
        </>
    )
};

export default FormAlamatSkeleton;
