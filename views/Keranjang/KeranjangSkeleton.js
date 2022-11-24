import ProductSectionSkeleton from "components/ProductSection/ProductSectionSkeleton";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const ProdukDetailSkeleton = () => {
    return (
        <div 
            className="mb-6 md:mt-3 mt-0"
        >
            <section className="-mx-4 mb-4 p-4 md:mx-0 ">
                <div className="md:mx-auto md:max-w-[1110px] px-4 flex gap-8">
                    <div className="flex flex-col w-1/2">
                        <div>
                            <Skeleton height={400} />
                        </div>
                        
                        <div className="flex mt-2 gap-2">
                            <div className="w-1/5">
                                <Skeleton height={96} />
                            </div>
                            <div className="w-1/5">
                                <Skeleton height={96} />
                            </div>
                            <div className="w-1/5">
                                <Skeleton height={96} />
                            </div>
                            <div className="w-1/5">
                                <Skeleton height={96} />
                            </div>
                            <div className="w-1/5">
                                <Skeleton height={96} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <div className="w-3/5">
                            <Skeleton height={36} />
                        </div>

                        <div className="w-2/5">
                            <Skeleton height={28} />
                        </div>

                        <div className="w-full">
                            <Skeleton height={100} />
                        </div>

                        <div className="flex flex-col mt-3">
                            <div className="w-1/6">
                                <Skeleton height={20} />
                            </div>
                            
                            <div className="flex gap-1">
                                <div className="w-1/6">
                                    <Skeleton height={38} />
                                </div>
                                <div className="w-1/6">
                                    <Skeleton height={38} />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col mt-3">
                            <div className="w-1/6">
                                <Skeleton height={20} />
                            </div>
                            
                            <div className="flex gap-1">
                                <div className="w-1/12">
                                    <Skeleton height={38} />
                                </div>
                                <div className="w-2/12">
                                    <Skeleton height={38} />
                                </div>
                                <div className="w-1/12">
                                    <Skeleton height={38} />
                                </div>
                                <div className="w-3/12 pl-2">
                                    <Skeleton height={38} />
                                </div>
                            </div>
                        </div>

                        <div className="w-2/6 mt-3">
                            <Skeleton height={38} />
                        </div>
                    </div>
                </div>
            </section>

            <ProductSectionSkeleton />
        </div>
    );
};

export default ProdukDetailSkeleton;