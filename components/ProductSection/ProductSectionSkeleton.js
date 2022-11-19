import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSectionSkeleton = () => {
    return (
        <section className="-mx-4 mb-4 p-4 md:mx-0 ">
            <div className="md:mx-auto md:max-w-[1110px] px-4">
                <div className="w-1/6">
                    <Skeleton height={28} />
                </div>
                
                <div className="w-3/6">
                    <Skeleton height={24} />
                </div>
                

                <div className="grid gap-4 grid-cols-4 my-4">
                    <div className="flex flex-col rounded-3xl shadow-[0px_4px_24px_rgba(39,38,65,0.06)] p-4">
                        <div className="flex flex-col gap-2 rounded-3xl">
                            <div className="relative aspect-video cursor-pointer">
                                <Skeleton height={100} />
                            </div>
                            <div className="w-3/6 mt-1">
                                <Skeleton height={24} />
                            </div>
                            <div className="w-5/6">
                                <Skeleton height={24} />
                            </div>
                            <div className="w-3/6">
                                <Skeleton height={20} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col rounded-3xl shadow-[0px_4px_24px_rgba(39,38,65,0.06)] p-4">
                        <div className="flex flex-col gap-2 rounded-3xl">
                            <div className="relative aspect-video cursor-pointer">
                                <Skeleton height={100} />
                            </div>
                            <div className="w-3/6 mt-1">
                                <Skeleton height={24} />
                            </div>
                            <div className="w-5/6">
                                <Skeleton height={24} />
                            </div>
                            <div className="w-3/6">
                                <Skeleton height={20} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col rounded-3xl shadow-[0px_4px_24px_rgba(39,38,65,0.06)] p-4">
                        <div className="flex flex-col gap-2 rounded-3xl">
                            <div className="relative aspect-video cursor-pointer">
                                <Skeleton height={100} />
                            </div>
                            <div className="w-3/6 mt-1">
                                <Skeleton height={24} />
                            </div>
                            <div className="w-5/6">
                                <Skeleton height={24} />
                            </div>
                            <div className="w-3/6">
                                <Skeleton height={20} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col rounded-3xl shadow-[0px_4px_24px_rgba(39,38,65,0.06)] p-4">
                        <div className="flex flex-col gap-2 rounded-3xl">
                            <div className="relative aspect-video cursor-pointer">
                                <Skeleton height={100} />
                            </div>
                            <div className="w-3/6 mt-1">
                                <Skeleton height={24} />
                            </div>
                            <div className="w-5/6">
                                <Skeleton height={24} />
                            </div>
                            <div className="w-3/6">
                                <Skeleton height={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductSectionSkeleton;