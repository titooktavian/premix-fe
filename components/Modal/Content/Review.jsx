import { useStateContext } from "context/StateContext";
import { addReview } from "helpers/api";
import { catchError } from "helpers/formatter";
import propTypes from "prop-types";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { AlertService } from "services";

const Review = ({ idTransactionDetail, idProduct, callbackAction, productName }) => {
    const defaultReview = [1, 2, 3, 4, 5];

    const { setLoading, userLogin } = useStateContext();
    const [reviewList] = useState(defaultReview);
    const [review, setReview] = useState(0);
    const [ulasan, setUlasan] = useState('');

    const kirimReview = async () => {
        setLoading(true);
        try {
            const payload = {
                id_product: idProduct,
                id_transaction_detail: idTransactionDetail,
                reviewer_star: review,
                reviewer_value: ulasan,
                reviewer_name: userLogin.name,
                reviewer_email: userLogin.email, 
            }

            const res = await addReview(payload);

            if (!res.status) throw Error(res.msg);
            
            AlertService.success('Berhasil memberi ulasan');
            callbackAction();
        } catch (error) {
            AlertService.error(catchError(error));
        }

        setLoading(false);
    }

    return (
        <div>
            <div className="w-full flex flex-col gap-4 pb-6 p-6">
                <div className="text-lg font-bold">Berikan Ulasan Untuk Produk {productName}</div>
                <div className="md:max-w-[1110px] flex flex-col gap-8">
                    <div className="flex flex-col mt-6">
                        <label className="text-sm font-bold">Beri Rating</label>
                        <div className="flex gap-1 mt-1">
                            {reviewList.map(rev => {
                                if (rev <= review) {
                                    return (
                                        <AiFillStar key={`review-${rev}`} className="text-3xl text-[#F8CA56] cursor-pointer" onClick={() => {setReview(rev)}} />
                                    );
                                }

                                return (
                                    <AiOutlineStar key={`review-${rev}`} className="text-3xl text-[#F8CA56] cursor-pointer" onClick={() => {setReview(rev)}} />
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
                            Review
                        </label>
                        <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Tulis ulasan anda" onChange={(e) => {setUlasan(e.target.value)}} value={ulasan} />
                    </div>
                    <div className="h-[37px] px-[24px] bg-[#FF5C6F] rounded-full w-fit flex items-center text-white text-base font-bold cursor-pointer" onClick={() => {kirimReview()}}>
                        Tulis Review
                    </div>
                </div>
            </div>
        </div>
    )
};

Review.propTypes = {
    idTransactionDetail: propTypes.number,
    idProduct: propTypes.string,
    callbackAction: propTypes.func,
};

Review.defaultProps = {
    idTransactionDetail: null,
    idProduct: '',
    callbackAction: () => {},
};

export default Review;
