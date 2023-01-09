import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { Sidebar, TextEditor } from "components";
import { useEffect, useState } from "react";
import { catchError } from "helpers/formatter";
import { HiOutlineChatAlt, HiOutlineSearch, HiOutlineTicket } from "react-icons/hi";
import { AiOutlineTag, AiOutlineUser } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";
import { RiImageLine } from "react-icons/ri";
import { createComplaint, getComplaint, getTransactionList } from "helpers/api";
import { AlertService } from "services";
import { getTokenLocalStorage } from "helpers/utils";
import { useRouter } from "next/router";

const Form = ({
    pageTitle,
}) => {
    const { setLoading, userLogin } = useStateContext();
    const [lampiran, setLampiran] = useState([]);
    const [subjek, setSubjek] = useState('');
    const [pesan, setPesan] = useState('');
    const [selectedTransaction, setSelectedTransaction] = useState('');
    const [transactionList, setTransactionList] = useState([]);
    const router = useRouter();

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

            const tempLampiran = lampiran;
            tempLampiran.push(data.data[0]);

            setLampiran(tempLampiran);
        } catch (error) {
            AlertService.error(catchError(error));
        }
        setLoading(false);
    }
    
    const doCreateComplaint = async () => {
        setLoading(true);
        try {
            const payload = {
                id_transaction: selectedTransaction,
                status: 1,
                subject: subjek,
                detail: {
                    message_value: pesan,
                    file_url: lampiran,
                    user_name: userLogin.name,
                    user_email: userLogin.email,
                }
            }

            const res = await createComplaint(payload);

            if (!res.status) throw Error(res.msg);

            setLoading(false);
            AlertService.success('Berhasil membuat tiket');
            setTimeout(() => {
                router.push({
                    pathname: '/bantuan',
                })
            }, 500);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    }

    const handleChangeTransaction = (e) => {
        setSelectedTransaction(e.target.value);
    }

    const fetchTransaction = async () => {
        setLoading(true);
        try {
            const res = await getTransactionList({
                limit: -1,
                page: 1,
            });

            if (!res.status) throw Error(res.msg);

            const { data } = res;
            setTransactionList(data);
            setLoading(false);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    };

    useEffect(() => {
        fetchTransaction();
    }, []);

    return (
        <div 
            className="mb-6 md:mt-3 mt-0"
        >
            <section className="-mx-4 mb-4 p-4 md:mx-0">
                <div className="md:mx-auto md:max-w-[1110px] px-4">
                    <div
                        className="flex flex-col w-full h-[220px] bg-fill bg-right bg-[#272541] bg-no-repeat rounded-3xl text-white justify-center p-10"
                        style={{
                            backgroundImage: `url('/images/carousel/bg.png')`,
                        }}
                    >
                        <div className="font-bold text-3xl">Dashboard</div>
                        <div className="font-normal text-base">Selamat datang di dashboard customer Premix Store</div>
                    </div>
                </div>
            </section>

            <section className="-mx-4 mb-4 p-4 md:mx-0">
                <div className="md:mx-auto md:max-w-[1110px] px-4 flex gap-4">
                    <div className="w-2/6 self-start">
                        <Sidebar />
                    </div>
                    <div className="w-4/6 flex flex-col bg-[#F4F4FD] rounded-3xl p-8 gap-4 self-start">
                        <div className="flex gap-2">
                            <div className="font-bold w-full text-2xl">Buat Tiket</div>
                        </div>
                        <div className="relative">
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex flex-col">
                                    <div className="flex gap-4">
                                        <div className="mt-3 w-1/2">
                                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Subjek</label>
                                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan subjek" value={subjek} onChange={(e) => { setSubjek(e.target.value) }} />
                                        </div>
                                        <div className="mt-3 w-1/2">
                                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">No. Transaksi</label>
                                            <select
                                                className="h-[42px] form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-slate-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:ring-sky-500 focus:ring-1 focus:outline-none"
                                                aria-label="Default select example"
                                                onChange={handleChangeTransaction}
                                                value={selectedTransaction}
                                            >
                                                <option value="">Pilih Transaksi</option>
                                                {transactionList.map((trx) => (
                                                    <option key={`trx-${trx.id_transaction}`} value={trx.id_transaction.toString()}>{trx.order_number}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <div className="mt-3 w-full">
                                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Pesan</label>
                                            <TextEditor editorState={pesan} changeEvent={setPesan} />
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="formFile" className="block mb-2 text-sm font-medium text-gray-900">Lampiran</label>
                                            <input 
                                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                type="file"
                                                id="formFile"
                                                onChange={handleUploadFile}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex mt-4">
                                        <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full flex justify-center items-center text-white text-base font-bold cursor-pointer" onClick={() => { doCreateComplaint(); }}>
                                            Kirim Tiket
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

Form.propTypes = {
    products: PropTypes.array,
    categories: PropTypes.array,
    home: PropTypes.object
};

Form.defaultProps = {
    products: [],
    categories: [],
    home: {}
};

export default Form;
