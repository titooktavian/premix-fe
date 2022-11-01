import Link from "next/link";
import { useRouter } from "next/router";
import propTypes from "prop-types";

import AddressItem from "./AddressItem";
import { Button } from "components";

const AddressList = ({ addressList }) => {
    const router = useRouter();

    if (addressList.length === 0) {
        return (
            <p className="text-dark-300 font-bold text-center mt-5">Data Alamat tidak ditemukan</p>
        )
    }

    return (
        <>
            <div className="h-[52vh] md:h-[50vh] overflow-y-scroll pt-4">
                {
                    addressList.map((address) => (
                        <AddressItem
                            key={address.id}
                            data={address}
                        />
                    ))
                }
            </div>
            <div className="flex flex-col items-center justify-center mt-5">
                <Link href="/akun/alamat/tambah">
                    <a className="w-full flex justify-center">
                        <Button
                            label="Tambah Alamat"
                            size="lg"
                            className="w-full md:w-8/12"
                        />
                    </a>
                </Link>
                <Button
                    full
                    label="Kembali"
                    size="lg"
                    variant="secondary"
                    className="mt-3 block md:hidden"
                    onClick={() => router.back()}
                />
            </div>
        </>
    )
};

AddressList.propTypes = {
    addressList: propTypes.arrayOf(propTypes.shape({
        id: propTypes.number,
    })).isRequired,
};

export default AddressList;
