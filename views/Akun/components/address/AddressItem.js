import Link from "next/link";
import propTypes from "prop-types";

const AddressItem = ({ data }) => {
    return (
        <div className={`border ${data.is_main_address ? "border-turq-300 bg-turq-100/30" : "border-neutral-200"} p-4 rounded-md mb-3`}>
            <div className="flex justify-between items-center mb-4">
                <p className="text-base font-bold text-dark-300">{data.address_label}</p>
                {data.is_main_address && <p className="font-bold text-xs text-dark-300 bg-neutral-200 rounded-full py-0.5 px-2">Utama</p>}
            </div>
            <p className="text-sm font-medium text-dark-300">{data.recipient_name}</p>
            <p className="text-sm font-medium text-dark-100 mt-1">{data.phone_no}</p>
            <p className="text-sm font-medium text-dark-100 mt-1 mb-3">{data.detail}</p>
            <Link href={`/akun/alamat/ubah/${data.id}`}>
                <a className="text-sm text-turq-300 transition hover:text-turq-400">Ubah Alamat</a>
            </Link>
        </div>
    )
};

AddressItem.propTypes = {
    data: propTypes.shape({
        id: propTypes.number,
        address_label: propTypes.string,
        is_main_address: propTypes.bool,
        recipient_name: propTypes.string,
        phone_no: propTypes.string,
        detail: propTypes.string,
    }).isRequired,
};

export default AddressItem;
