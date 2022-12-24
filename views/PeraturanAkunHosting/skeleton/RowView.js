import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const RowView = () => (
    <div className="w-full">
        <div className="w-[80px] float-left mr-3">
            <Skeleton height={80} borderRadius={4} />
        </div>
        <div className="flex flex-col w-[calc(100%-180)] float-left">
            <div className="w-[80%]">
                <Skeleton height={16} />
            </div>
            <Skeleton height={14} className="mt-2" />
            <Skeleton height={14} width={100} />
        </div>
        <div className="flex flex-col w-16 float-right">
            <Skeleton height={12} />
            <Skeleton height={14} />
        </div>
    </div>    
);

export default RowView;
