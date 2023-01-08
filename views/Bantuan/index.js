import PropTypes from "prop-types";
import { useStateContext } from "context/StateContext";
import { ComplaintStatus, Pagination, Sidebar, TextEditor } from "components";
import { useEffect, useState } from "react";
import { catchError } from "helpers/formatter";
import { HiOutlineChatAlt, HiOutlineSearch, HiOutlineTicket } from "react-icons/hi";
import { AiOutlineTag, AiOutlineUser } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";
import { RiImageLine } from "react-icons/ri";
import { getComplaint, getDetailComplaint } from "helpers/api";
import { AlertService } from "services";
import { useRouter } from "next/router";
import moment from "moment";
import { getTokenLocalStorage } from "helpers/utils";

const Index = ({
    pageTitle,
}) => {
    const { setLoading, userLogin } = useStateContext();
    const [showDetail, setShowDetail] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [subjek, setSubjek] = useState('');
    const [lampiran, setLampiran] = useState([]);
    const [pesan, setPesan] = useState('');
    const [limit, setLimit] = useState(3);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [complaintList, setComplaintList] = useState([]);
    const [complaintDetailList, setComplaintDetailList] = useState([]);
    const [limitDetail, setLimitDetail] = useState(3);
    const [currentPageDetail, setCurrentPageDetail] = useState(0);
    const [totalPageDetail, setTotalPageDetail] = useState(0);
    const [complaintDetail, setComplaintDetail] = useState(null);

    const router = useRouter();

    const changePageHandler = (event) => {
        fetchData(event.selected);
    }

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

    const doShowDetail = async (complaint, page) => {
        setLoading(true);
        try {
            const res = await getDetailComplaint(complaint.id_complain, {
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

            setComplaintDetail(complaint);
            setComplaintDetailList(data);
            setCurrentPageDetail(current_page);
            setLimitDetail(per_page);
            setTotalPageDetail(last_page);
            setLoading(false);
            setShowDetail(true);
        } catch (error) {
            AlertService.error(catchError(error));
        }
    }

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
                                                        <span className="text-sm font-bold cursor-pointer" onClick={() => { doShowDetail(complaint, 0) }}>{`Tiket #${complaint.id_complain}`}</span>
                                                    </div>
                                                    <div className="w-1/2 flex items-center justify-end gap-2">
                                                        <span className="text-xs text-[#6E6C85]">{moment(complaint.created_at).format('DD MMM YYYY HH:mm') }</span>
                                                        <ComplaintStatus status={complaint.status} />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col mt-5 gap-2">
                                                    <div className="text-base font-bold">{complaint.subject}</div>
                                                    <div className="text-sm font-normal text-[#6E6C85]" dangerouslySetInnerHTML={{__html: complaint.complain_details[0].message_value}} />
                                                </div>

                                                <div className="flex mt-5">
                                                    <div className="w-1/3 flex items-center gap-2">
                                                        <div className="rounded-full w-6 h-6 bg-[#F4F4FD] flex items-center justify-center">
                                                            <AiOutlineUser className="text-xs" />
                                                        </div>
                                                        <span className="text-xs font-normal text-[#3F0071]">{complaint.customer_name}</span>
                                                    </div>
                                                    <div className="w-2/3 flex items-center justify-end gap-2">
                                                        {/* <div className="flex items-center gap-1">
                                                            <AiOutlineTag className="text-xs" />
                                                            <span className="text-xs font-normal text-[#3F0071]">Login, Akun profil</span>
                                                        </div> */}
                                                        <div className="flex items-center gap-1">
                                                            <GrAttachment className="text-xs" />
                                                            <span className="text-xs font-normal text-[#3F0071]">{complaint.complain_details[0].file_url.length}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <HiOutlineChatAlt className="text-xs" />
                                                            <span className="text-xs font-normal text-[#3F0071]">{complaint.complain_details.length}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {complaintList.length <= 0 && (
                                            <div className="rounded-lg bg-white p-4 flex flex-col w-full">
                                                Belum ada Tiket
                                            </div>
                                        )}
                                        <div className="w-full px-4 flex justify-center mt-5">
                                            <Pagination handlePageClick={changePageHandler} pageCount={totalPage} perPage={limit} currentPage={currentPage} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showDetail && (
                                <div className="w-full flex flex-col gap-4">
                                    <div className="rounded-lg bg-white p-4 flex flex-col w-full">
                                        <div className="flex">
                                            <div className="w-1/2 flex items-center gap-2">
                                                <HiOutlineTicket />
                                                <span className="text-sm font-bold cursor-pointer">{`Tiket #${complaintDetail.id_complain}`}</span>
                                            </div>
                                            <div className="w-1/2 flex items-center justify-end gap-2">
                                                <span className="text-xs text-[#6E6C85]">{moment(complaintDetail.created_at).format('DD MMM YYYY HH:mm') }</span>
                                                <ComplaintStatus status={complaintDetail.status} />
                                            </div>
                                        </div>

                                        <div className="flex flex-col mt-5 gap-2">
                                            <div className="text-base font-bold">{complaintDetail.subject}</div>
                                            <div className="text-sm font-normal text-[#6E6C85]" dangerouslySetInnerHTML={{__html: complaintDetail.complain_details[0].message_value}} />
                                        </div>

                                        <div className="border-b-[1px] mt-6 mb-6"></div>

                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-sm mb-2">Lampiran</span>
                                            {complaintDetail.complain_details[0].file_url.map((attach, i) => (
                                                <a href={attach} key={`attachment-${i}`} rel="noopener noreferrer" target="_blank">
                                                    <div className="flex gap-1">
                                                        <RiImageLine />
                                                        <span className="text-sm font-normal underline cursor-pointer">{`Lampiran ${i+1}`}</span>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>

                                        <div className="border-b-[1px] mt-6 mb-6"></div>

                                        {complaintDetailList.map((detail) => {
                                            if (detail.id_complain_detail === complaintDetail.complain_details[0].id_complain_detail) {
                                                return null;
                                            }

                                            return (
                                                <div key={`com-det-${detail.id_complain_detail}`} className="flex flex-col rounded-lg border-[1px] border-[#E2E2E7] p-3">
                                                    <div className="flex">
                                                        <div className="w-1/2 text-xs font-bold">
                                                            Samsul Arif
                                                        </div>
                                                        <div className="w-1/2 text-right text-xs text-[#6E6C85]">
                                                            {moment(detail.created_at).format('DD MMM YYYY HH:mm')}
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-normal text-[#6E6C85] mt-2" dangerouslySetInnerHTML={{__html: detail.message_value}} />
                                                </div>
                                            )
                                        })}

                                        <div className="flex">
                                            <div className="w-1/3 flex items-center gap-2">
                                                <div className="rounded-full w-6 h-6 bg-[#F4F4FD] flex items-center justify-center">
                                                    <AiOutlineUser className="text-xs" />
                                                </div>
                                                <span className="text-xs font-normal text-[#3F0071]">{complaintDetail.customer_name}</span>
                                            </div>
                                            <div className="w-2/3 flex items-center justify-end gap-2">
                                                {/* <div className="flex items-center gap-1">
                                                    <AiOutlineTag className="text-xs" />
                                                    <span className="text-xs font-normal text-[#3F0071]">Login, Akun profil</span>
                                                </div> */}
                                                <div className="flex items-center gap-1">
                                                    <GrAttachment className="text-xs" />
                                                    <span className="text-xs font-normal text-[#3F0071]">{complaintDetail.complain_details[0].file_url.length}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <HiOutlineChatAlt className="text-xs" />
                                                    <span className="text-xs font-normal text-[#3F0071]">{complaintDetail.complain_details.length}</span>
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
