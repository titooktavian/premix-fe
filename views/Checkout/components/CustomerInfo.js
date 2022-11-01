import { Input } from "components";
import { ORDER_TYPE_DELIVERY } from "constants";
import { useStateContext } from "context/StateContext";
import propTypes from "prop-types";

const CustomerInfo = ({name, setName}) => {
    const { selectedOrderType } = useStateContext();

    return (
        <>
            <h2 className="text-base font-bold text-dark-300 md:p-2">
                Info Pelanggan
            </h2>
            <div className="text-sm md:p-2">
                <div className="my-4 md:my-0">
                    <label className="font-bold">
                        Nama
                        {selectedOrderType.orderType != ORDER_TYPE_DELIVERY && (
                            <span className="text-red-300">*</span>
                        )}
                    </label>
                    <Input 
                        topSpace={false} 
                        name="name"
                        id="name"
                        placeholder="Masukkan nama kamu"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>
        </>
    )
};

CustomerInfo.propTypes = {
    name: propTypes.string,
    setName: propTypes.func
};

CustomerInfo.defaultProps = {
    name: '',
    setName: () => {},
}
export default CustomerInfo;