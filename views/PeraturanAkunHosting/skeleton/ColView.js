import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const TEXT_HEIGHT = 12;

const ColView = () => (
    <div className="w-full">
        <Skeleton height={120} borderRadius={4} />
        <div className="p-2 border rounded">
            <Skeleton height={TEXT_HEIGHT} />
            <div className="w-[70%] -mt-1 mb-1">
                <Skeleton height={TEXT_HEIGHT} />
            </div>
            <Skeleton height={TEXT_HEIGHT} />
            <Skeleton width={60} height={TEXT_HEIGHT} className="mt-2" />
        </div>
    </div>    
);

export default ColView;
