import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { useRouter } from "next/router";
import { AlertService } from "services";
import { SectionTitle } from "components";
import { useEffect, useState } from "react";
import { catchError } from "helpers/formatter";
import { getTokenLocalStorage } from "helpers/utils";
import { confirmPayment } from "helpers/api";
import { BANK_LIST } from "constants/enum";
import Image from "next/image";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

const Index = ({
    pageTitle,
}) => {
    const { setLoading } = useStateContext();
    const [pemilikRekening, setPemilikRekening] = useState('');
    const [nominal, setNominal] = useState('0');
    const [paymentType, setPaymentType] = useState('');
    const [buktiBayar, setBuktiBayar] = useState('');

    const router = useRouter();
    const { query: { payment, transaction } } = router;

    const handleUploadFile = async (e) => {
        setLoading(true);
        try {
            const image = e.target.files[0];
            const formdata = new FormData();
            formdata.append("images[]", image);

            const headers = {
                access_token: getTokenLocalStorage(),
            };
            const response = await fetch("https://api.nusahabbat.com/api/image-upload", {
                method: "POST",
                headers,
                body: formdata,
            });

            let data;
            try {
                data = await response.json();
            } catch (e) {
                data = null;
            }

            if (!data.status) throw Error(data.msg);

            setBuktiBayar(data.data[0]);
        } catch (error) {
            AlertService.error(catchError(error));
        }
        setLoading(false);
    }

    const doConfirmPayment = async () => {
        setLoading(true);

        const bankList = BANK_LIST.filter(item => item.id == paymentType);
        try {
            const res = await confirmPayment({
                id_transaction: transaction,
                account_name: pemilikRekening,
                transfer_nominal: nominal,
                destination_account: bankList[0].bankName || '',
                img_url: buktiBayar,
            });

            if (!res.status) throw Error(res.msg);

            AlertService.success('Pesanan anda telah terkonfirmasi, silahkan tunggu informasi dari admin');
        } catch (error) {
            AlertService.error(catchError(error));
        }
        setLoading(false);
    }

    useEffect(() => {
        setPaymentType(payment);
    }, []);

    return (
        <div 
            className="mb-6 md:mt-3 mt-0"
        >
            <section className="-mx-4 mb-4 p-4 md:mx-0">
                <div className="md:mx-auto md:max-w-[1110px] px-4 flex flex-col items-center">
                    <div className="w-[354px] flex flex-col rounded-3xl p-10 gap-2 shadow-[0px_4px_40px_rgba(39,38,65,0.06)]">
                        <SectionTitle title="Konfirmasi Pembayaran" subtitle="Upload bukti pembayaran berupa gambar atau foto." rightButton={false} />

                        <div className="mt-3">
                            <label htmlFor="pemilik-rekening" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Pemilik Rekening</label>
                            <input type="text" id="pemilik-rekening" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan nama pemilik rekening" value={pemilikRekening} onChange={(e) => { setPemilikRekening(e.target.value) }} />
                        </div>

                        <div className="mt-3">
                            <label htmlFor="nominal-transfer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nominal Transfer</label>
                            <input type="text" id="nominal-transfer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan nominal transfer" value={nominal} onChange={(e) => { setNominal(e.target.value) }} />
                        </div>

                        <div className="mt-3">
                            <label htmlFor="pemilik-rekening" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rekening Tujuan</label>
                            <select
                                className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-slate-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:ring-sky-500 focus:ring-1 focus:outline-none"
                                aria-label="Default select example"
                                onChange={(e) => { setPaymentType(e.target.value) }}
                                value={paymentType}
                            >
                                <option value="">Pilih Kategori</option>
                                {BANK_LIST.map((bank) => (
                                    <option key={`bank-${bank.id}`} value={bank.id.toString()}>{bank.bankName}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-3">
                            <div className="flex items-center justify-center w-full flex-col">
                                <label htmlFor="file-uploader" className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100">
                                    {buktiBayar === '' ? (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Upload Gambar</span></p>
                                            <p className="text-xs text-gray-500">Maksimal gambar 1 MB</p>
                                        </div>
                                    ) : (
                                        <div className="relative w-full h-20 cursor-pointer">
                                            <Image src={buktiBayar} layout="fill" objectFit="contain" />
                                        </div>
                                    )}
                                    <input id="file-uploader" type="file" className="hidden" onChange={handleUploadFile} />
                                </label>
                                <div className="flex gap-2 mt-2 w-full text-[#8581B7]">
                                    <label className="flex gap-1 w-1/2 cursor-pointer" htmlFor="file-uploader">
                                        <AiOutlineEdit />
                                        <span className="text-sm font-normal">Ubah Gambar</span>
                                    </label>
                                    <div className="flex gap-1 w-1/2 justify-end cursor-pointer">
                                        <AiOutlineEye />
                                        <span className="text-sm font-normal">Lihat Gambar</span>
                                    </div>
                                </div>
                            </div> 
                        </div>

                        <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full w-full flex justify-center items-center text-white text-base font-bold cursor-pointer mt-3" onClick={() => {doConfirmPayment()}}>
                            Konfirmasi Pembayaran
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

Index.propTypes = {
    products: PropTypes.array,
    categories: PropTypes.array,
    home: PropTypes.object
};

Index.defaultProps = {
    products: [],
    categories: [],
    home: {}
};

export default Index;
