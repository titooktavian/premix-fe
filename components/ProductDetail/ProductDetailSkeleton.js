import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const ProductDetailSkeleton = () => {
    return (
        <div className="h-full md:flex gap-5 md:pt-4">
            <div className="w-full md:max-w-[250px]">
                <Skeleton width={250} height={240} />
            </div>
            <div className="md:flex-1 md:px-0">
                <div className="mt-4 md:mt-0">
                    <Skeleton count={10} />
                </div>
            </div>
        </div>
    )
};

export default ProductDetailSkeleton;