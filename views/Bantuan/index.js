import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { Sidebar, TextEditor } from "components";
import { useEffect, useState } from "react";
import { catchError } from "helpers/formatter";
import CurrencyColumn from "components/Table/components/CurrencyColumn";
import StatusColumn from "components/Table/components/StatusColumn";
import ActionColumn from "components/Table/components/ActionColumn";
import { HiOutlineChatAlt, HiOutlineSearch, HiOutlineTicket } from "react-icons/hi";
import { AiOutlineTag, AiOutlineUser } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";
import { RiImageLine } from "react-icons/ri";
import { getComplaint } from "helpers/api";
import { AlertService } from "services";
import { useRouter } from "next/router";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Index = ({
    pageTitle,
}) => {
    const { setLoading, userLogin } = useStateContext();
    const [showDetail, setShowDetail] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [email, setEmail] = useState('');
    const [nama, setNama] = useState('');
    const [subjek, setSubjek] = useState('');
    const [pesan, setPesan] = useState('');
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [complaintList, setComplaintList] = useState([]);
    const [orderDetail, setOrderDetail] = useState(null);

    const router = useRouter();

    const fetchData = async (page) => {
        setLoading(true);
        try {
            const res = await getComplaint({
                limit: limit,
                page: page + 1,
            });

            if (!res.status) throw Error(res.msg);

            const {
                data,
                meta: {
                    last_page,
                    per_page,
                    current_page,
                },
            } = res;

            setComplaintList(data);
            setCurrentPage(current_page);
            setLimit(per_page);
            setTotalPage(last_page);
            setLoading(false);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    };

    useEffect(() => {
        fetchData(0)
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
                            <div className="font-bold w-2/3 text-2xl">{showDetail ? 'Detail Tiket' : 'Bantuan'}</div>
                            {!showDetail && (
                                <div className="w-1/3 flex justify-end">
                                    <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full flex justify-center items-center text-white text-base font-bold cursor-pointer" onClick={() => { router.push('bantuan/buat') }}>
                                        Buat Tiket
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            {!showDetail && (
                                <div className="w-full flex flex-col gap-4">
                                    <div className="flex">
                                        <div className="text-[#272541] cursor-pointer font-bold p-2 text-center border-b-2 border-[#272541] px-5">Semua Tiket</div>
                                        <div className="text-[#6E6C85] cursor-pointer font-normal p-2 text-center border-b-2 border-[#E2E2E7] px-5">Belum Selesai</div>
                                        <div className="text-[#6E6C85] cursor-pointer font-normal p-2 text-center border-b-2 border-[#E2E2E7] px-5">Dijawab</div>
                                        <div className="text-[#6E6C85] cursor-pointer font-normal p-2 text-center border-b-2 border-[#E2E2E7] px-5">Selesai</div>
                                    </div>

                                    <label className="relative block">
                                        <span className="sr-only">Search</span>
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                            <HiOutlineSearch />
                                        </span>
                                        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm rounded-lg" placeholder="Cari Tiket" type="text" name="search"/>
                                    </label>

                                    <div className="flex flex-col w-full gap-3">
                                        {complaintList.length > 0 && complaintList.map((complaint) => (
                                            <div key={`complaint-${complaint.id_complain}`} className="rounded-lg bg-white p-4 flex flex-col w-full">
                                                <div className="flex">
                                                    <div className="w-1/2 flex items-center gap-2">
                                                        <HiOutlineTicket />
                                                        <span className="text-sm font-bold cursor-pointer" onClick={() => { setShowDetail(true) }}>Tiket #0002</span>
                                                    </div>
                                                    <div className="w-1/2 flex items-center justify-end gap-2">
                                                        <span className="text-xs text-[#6E6C85]">12:00 AM</span>
                                                        <div className="bg-[#272541] rounded-full text-white py-1 px-2 w-fit text-xs font-bold">Dibaca</div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col mt-5 gap-2">
                                                    <div className="text-base font-bold">Tidak bisa login ke member area</div>
                                                    <div className="text-sm font-normal text-[#6E6C85]">Kenapa ya pada saat saya login password saya salah terus, padahal sama dengan yang...</div>
                                                </div>

                                                <div className="flex mt-5">
                                                    <div className="w-1/3 flex items-center gap-2">
                                                        <div className="rounded-full w-6 h-6 bg-[#F4F4FD] flex items-center justify-center">
                                                            <AiOutlineUser className="text-xs" />
                                                        </div>
                                                        <span className="text-xs font-normal text-[#3F0071]">Samsul Arif</span>
                                                    </div>
                                                    <div className="w-2/3 flex items-center justify-end gap-2">
                                                        <div className="flex items-center gap-1">
                                                            <AiOutlineTag className="text-xs" />
                                                            <span className="text-xs font-normal text-[#3F0071]">Login, Akun profil</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <GrAttachment className="text-xs" />
                                                            <span className="text-xs font-normal text-[#3F0071]">3</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <HiOutlineChatAlt className="text-xs" />
                                                            <span className="text-xs font-normal text-[#3F0071]">12</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {complaintList.length <= 0 && (
                                            <div className="rounded-lg bg-white p-4 flex flex-col w-full">
                                                <div className="flex">
                                                    <div className="w-1/2 flex items-center gap-2">
                                                        <HiOutlineTicket />
                                                        <span className="text-sm font-bold cursor-pointer" onClick={() => { setShowDetail(true) }}>Tiket #0002</span>
                                                    </div>
                                                    <div className="w-1/2 flex items-center justify-end gap-2">
                                                        <span className="text-xs text-[#6E6C85]">12:00 AM</span>
                                                        <div className="bg-[#272541] rounded-full text-white py-1 px-2 w-fit text-xs font-bold">Dibaca</div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col mt-5 gap-2">
                                                    <div className="text-base font-bold">Tidak bisa login ke member area</div>
                                                    <div className="text-sm font-normal text-[#6E6C85]">Kenapa ya pada saat saya login password saya salah terus, padahal sama dengan yang...</div>
                                                </div>

                                                <div className="flex mt-5">
                                                    <div className="w-1/3 flex items-center gap-2">
                                                        <div className="rounded-full w-6 h-6 bg-[#F4F4FD] flex items-center justify-center">
                                                            <AiOutlineUser className="text-xs" />
                                                        </div>
                                                        <span className="text-xs font-normal text-[#3F0071]">Samsul Arif</span>
                                                    </div>
                                                    <div className="w-2/3 flex items-center justify-end gap-2">
                                                        <div className="flex items-center gap-1">
                                                            <AiOutlineTag className="text-xs" />
                                                            <span className="text-xs font-normal text-[#3F0071]">Login, Akun profil</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <GrAttachment className="text-xs" />
                                                            <span className="text-xs font-normal text-[#3F0071]">3</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <HiOutlineChatAlt className="text-xs" />
                                                            <span className="text-xs font-normal text-[#3F0071]">12</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {showDetail && (
                                <div className="w-full flex flex-col gap-4">
                                    <div className="rounded-lg bg-white p-4 flex flex-col w-full">
                                        <div className="flex">
                                            <div className="w-1/2 flex items-center gap-2">
                                                <HiOutlineTicket />
                                                <span className="text-sm font-bold cursor-pointer" onClick={() => { setShowDetail(true) }}>Tiket #0002</span>
                                            </div>
                                            <div className="w-1/2 flex items-center justify-end gap-2">
                                                <span className="text-xs text-[#6E6C85]">12:00 AM</span>
                                                <div className="bg-[#272541] rounded-full text-white py-1 px-2 w-fit text-xs font-bold">Dibaca</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col mt-5 gap-2">
                                            <div className="text-base font-bold">Tidak bisa login ke member area</div>
                                            <div className="text-sm font-normal text-[#6E6C85]">Kenapa pada saat saya login password saya salah terus, padahal sama dengan yang dikirim dengan yang di email akunnya. Terima kasih.</div>
                                        </div>

                                        <div className="border-b-[1px] mt-6 mb-6"></div>

                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-sm mb-2">Lampiran</span>
                                            <div className="flex gap-1 items-center">
                                                <RiImageLine />
                                                <span className="text-sm font-normal">Screenshot_Login.jpg</span>
                                            </div>
                                            <div className="flex gap-1 items-center">
                                                <RiImageLine />
                                                <span className="text-sm font-normal">Screenshot_Login2.jpg</span>
                                            </div>
                                            <div className="flex gap-1 items-center">
                                                <RiImageLine />
                                                <span className="text-sm font-normal">Screenshot_Login3.jpg</span>
                                            </div>
                                        </div>

                                        <div className="border-b-[1px] mt-6 mb-6"></div>

                                        <div className="flex mt-5">
                                            <div className="w-1/3 flex items-center gap-2">
                                                <div className="rounded-full w-6 h-6 bg-[#F4F4FD] flex items-center justify-center">
                                                    <AiOutlineUser className="text-xs" />
                                                </div>
                                                <span className="text-xs font-normal text-[#3F0071]">Samsul Arif</span>
                                            </div>
                                            <div className="w-2/3 flex items-center justify-end gap-2">
                                                <div className="flex items-center gap-1">
                                                    <AiOutlineTag className="text-xs" />
                                                    <span className="text-xs font-normal text-[#3F0071]">Login, Akun profil</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <GrAttachment className="text-xs" />
                                                    <span className="text-xs font-normal text-[#3F0071]">3</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <HiOutlineChatAlt className="text-xs" />
                                                    <span className="text-xs font-normal text-[#3F0071]">12</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {showForm ? (
                                        <>
                                            <div className="h-[37px] px-[24px] rounded-full w-fit flex justify-center items-center text-[#8581B7] text-base font-bold cursor-pointer mt-3 border-[1px] border-[#8581B7]" onClick={() => {setShowForm(false);}}>
                                                Batal Balas Tiket
                                            </div>

                                            <div className="flex flex-col">
                                                <div className="flex gap-4">
                                                    <div className="mt-3 w-1/2">
                                                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Nama</label>
                                                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan nama" value={nama} onChange={(e) => { setNama(e.target.value) }} />
                                                    </div>
                                                    <div className="mt-3 w-1/2">
                                                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 mt-3">
                                                    <div className="mt-3 w-full">
                                                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Subjek</label>
                                                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukkan subjek" value={subjek} onChange={(e) => { setSubjek(e.target.value) }} />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col mt-3">
                                                    <div className="mt-3 w-full">
                                                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Pesan</label>
                                                        <TextEditor editorState={pesan} changeEvent={setPesan} />
                                                    </div>
                                                    <div className="w-full">
                                                        <label htmlFor="formFile" className="block mb-2 text-sm font-medium text-gray-900">Lampiran</label>
                                                        <input className="form-control
                                                            block
                                                            w-full
                                                            px-3
                                                            py-1.5
                                                            text-base
                                                            font-normal
                                                            text-gray-700
                                                            bg-white bg-clip-padding
                                                            border border-solid border-gray-300
                                                            rounded
                                                            transition
                                                            ease-in-out
                                                            m-0
                                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex mt-4">
                                                    <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full flex justify-center items-center text-white text-base font-bold cursor-pointer" onClick={() => {}}>
                                                        Kirim Tiket
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        
                                    ) : (
                                        <div className="h-[37px] px-[24px] bg-[#FF5C6F] w-fit rounded-full flex justify-center items-center text-white text-base font-bold cursor-pointer mt-3" onClick={() => {setShowForm(true)}}>
                                            Balas Tiket
                                        </div>
                                    )}
                                </div>
                            )}
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
