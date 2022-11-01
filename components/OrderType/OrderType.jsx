import { Modal } from "components";
import { SUB_ORDER_EXCEPTION, ORDER_TYPE_DELIVERY, } from "constants";
import { ORDER_TYPE, ORDER_TYPE_DINE_IN, ORDER_TYPE_IMAGE, SUB_ORDER_TYPE, SUB_ORDER_TYPE_IMAGE } from "constants/enum";
import { useStateContext } from "context/StateContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import propTypes from "prop-types";

const OrderType = ({isDefault}) => {
    const [orderTypePopup, setOrderTypePopup] = useState(false);
    const [eligibleOrderType, setEligibleOrderType] = useState([]);
    const [eligibleSubOrderType, setEligibleSubOrderType] = useState([]);
    const [jenisPesanan, setJenisPesanan] = useState('Pilih Jenis Pesanan');
    const { selectedOrderType, outlet, setOrderType } = useStateContext();
    
    const setDefaultValue = async () => {
        const filteredOrderTypes = await outlet.eligible_order_type.filter(x => x === ORDER_TYPE_DELIVERY);
        const filteredSubOrderTypes = await outlet.eligible_sub_order_type.filter(x => !SUB_ORDER_EXCEPTION.includes(x));
        await setEligibleOrderType(filteredOrderTypes);
        await setEligibleSubOrderType(filteredSubOrderTypes);
        if(isDefault || (!selectedOrderType.orderType && !selectedOrderType.subOrderType)) {
            if(filteredOrderTypes.length > 0 ) {
                handleCourrierOption(0);
            } else if (filteredSubOrderTypes.length > 0 ) {
                handleCourrierOption(filteredSubOrderTypes[0]);
            }
            return 
        }
        handleCourrierOption(selectedOrderType.subOrderType || 0);
    };

    useEffect(()=>{
        if(outlet) { 
            setDefaultValue();
        }
    },[]);

    const closeOrderTypePopup = () => {
        setOrderTypePopup(!orderTypePopup);
    };

    const handleCourrierOption = (option) => {
        if (option) {
            setOrderType({ orderType: ORDER_TYPE_DINE_IN, subOrderType: option });
            setJenisPesanan(SUB_ORDER_TYPE[option]);
        }
        else {
            setOrderType({ orderType: ORDER_TYPE_DELIVERY, subOrderType: undefined });
            setJenisPesanan(ORDER_TYPE[ORDER_TYPE_DELIVERY]);
        }
    };

    return (
        <>  
            <Modal
                isPopup={orderTypePopup}
                title="Pilih Jenis Pesanan"
                type="halfscreen"
                isDivider={false}
                isShowClose={false}
                subtitle="Pilih salah satu opsi pesanan di bawah ini sesuai yang kamu inginkan"
                onRequestClose={closeOrderTypePopup}
            >
                <div className="flex flex-col space-y-4 py-2 md:h-full md:overflow-y-visible">
                    <div className="grid grid-rows-1 gap-4">
                        {eligibleOrderType.map((orderType) => (
                            <button 
                                key={`orderType${orderType}`}
                                className="grid grid-cols-[0.3fr_2.4fr_0.3fr] items-center gap-2 rounded-full border border-dark-300/10  py-[10px] px-[15px] text-sm font-bold text-dark-300"
                                onClick={() => handleCourrierOption(0)}
                            >
                                <div>
                                    <Image
                                        src={ORDER_TYPE_IMAGE[orderType]}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <span className="text-left">
                                    {ORDER_TYPE[orderType]}
                                </span>
                                {selectedOrderType.orderType === orderType && (
                                    <BsCheckLg className="text-turq-300" />
                                )}
                            </button>
                        ))}
                        {eligibleSubOrderType.map((subOrderType) => (
                            <button 
                                key={`subOrderType${subOrderType}`}
                                className="grid grid-cols-[0.3fr_2.4fr_0.3fr] items-center gap-2 rounded-full border border-dark-300/10  py-[10px] px-[15px] text-sm font-bold text-dark-300"
                                onClick={() => handleCourrierOption(subOrderType)}
                            >
                                <div>
                                    <Image
                                        src={SUB_ORDER_TYPE_IMAGE[subOrderType]}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <span className="text-left">
                                    {SUB_ORDER_TYPE[subOrderType]}
                                </span>
                                {selectedOrderType.subOrderType === subOrderType && (
                                    <BsCheckLg className="text-turq-300" />
                                )}

                            </button>
                        ))}
                    </div>
                </div>
            </Modal>
            <div>
                <h2 className="text-base font-bold text-dark-300 md:px-2">
                    Jenis Pesanan
                </h2>
                <div
                    onClick={() => setOrderTypePopup(true)}
                    className="my-4 flex cursor-pointer items-center justify-between md:p-2 md:my-0"
                >
                    <span className={`text-[15px] font-bold ${ isDefault ? 'text-dark-300' : 'text-dark-100'}`}>
                        { jenisPesanan }
                    </span>
                    <FaChevronRight />
                </div>
            </div>
        </>
    )
}

OrderType.propTypes = {
    isDefault: propTypes.bool,
}

OrderType.defaultProps = {
    isDefault: false,
}

export default OrderType;