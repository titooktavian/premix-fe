import { useStateContext } from "context/StateContext";
import { getAddressList } from "helpers/api";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { catchError } from "rxjs";
import { AlertService } from "services";

const DeliveryAddress = ({ setAddress }) => {
    const { userLogin } = useStateContext();
    const [selectedAddress, setSelectedAddress] = useState();

    useEffect(() => {
        let payload = { 
            page: 1,
            limit: 1, 
            sort_by: 'Is_main_address',
            customer_no: userLogin.customer_no, 
            sort: "desc" 
        };
        getAddressList(payload).then((res) => {
            if (res.status_code >= 200 || res.status_code <= 299) {
                const mainAddress = res.data.find(x => x.is_main_address);
                if(mainAddress) {
                    setSelectedAddress(mainAddress);
                    setAddress(mainAddress.id);
                }
            } else {
                AlertService.error(catchError(res));
            }
        })
    }, [])
    return (
        <>  
            <div className="flex justify-between font-bold md:p-2">
                <h2 className="text-base text-dark-300 ">
                    Alamat Pengiriman
                </h2>
                <span className="cursor-pointer text-turq-300 text-sm">
                    Atur
                </span>
            </div>
            <div className="text-sm md:p-2">
                {selectedAddress ? (
                    <div className="flex flex-col gap-2 text-xs text-dark-200">
                        <span className="font-bold text-sm">{selectedAddress.recipient_name}</span>
                        <span>{selectedAddress.phone_no}</span>
                        <span>{selectedAddress.detail}</span>
                    </div>
                ) : (
                    <></>
                )
                }
            </div>
        </>
    )
};

DeliveryAddress.propTypes = {
    setAddress: propTypes.func.required,
};

export default DeliveryAddress;