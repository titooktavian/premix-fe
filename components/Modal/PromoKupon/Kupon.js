import { AlertDialog, Button, Divider, FormikInput, Modal } from "components";
import { TYPE_PROMO } from "components/PromoCard/enum";
import { promoBadgeStyles } from "components/PromoCard/styles";
import { POPUP_TYPE } from "constants/enum";
import { useStateContext } from "context/StateContext";
import { Form, Formik } from "formik";
import { validateCoupon } from "helpers/api";
import Image from "next/image";
import propTypes from "prop-types";
import { useState } from "react";
import { FaCheckCircle, FaChevronLeft, FaCopy, FaInfoCircle } from "react-icons/fa";
import { AlertService } from "services";
import { promoTime } from "./utils";

const Kupon = ({ onSetCoupon, usedCoupon, onDeleteCoupon }) => {
    const { selectedOutlet, setLoading } = useStateContext();
    const [show, setShow] = useState(false);
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [couponName, setCouponName] = useState('');
    const [detailCoupon, setDetailCoupon] = useState(null);
    const [infoCoupon, setInfoCoupon] = useState(false);

    const handleSubmit = (values, { setFieldError, setFieldValue }) => {
        setLoading(true);
        const { coupon } = values;
        const payload = {
            coupon,
            used_coupon: usedCoupon.map(x => x.code),
        };
        validateCoupon(selectedOutlet, payload).then(async (res) => {
            const { data: couponData, message } = res;
            if(couponData) {
                await setFieldValue('coupon', '');
                await setCouponName(couponData?.name);
                onSetCoupon(couponData);
                setShow(true);
                setLoading(false);
                setTimeout(()=> {
                    onClose();
                },1000)
                return;
            }
            await setFieldError('coupon', message);
        }).finally(() => setLoading(false));
    };
    const onClose = () => {
        setShow(false);
    };

    const openDetailKupon = async (detail) => {
        await setDetailCoupon(detail);
        setIsShowDetail(true);
    };  

    const onCloseDetail = () => {
        setIsShowDetail(false);
    };

    const copyCode = (code)=> {
        navigator.clipboard.writeText(code);
        AlertService.success('Kode kupon berhasil disalin');
    }

    return (
        <div>
            <Modal
                show={show}
                type={POPUP_TYPE.alert}
                onClosePopup={onClose}
                isPlainPopup
                popupClassName="rounded-lg"
            >   
                <div className="md:w-[400px] px-20 py-10 flex flex-col gap-4 items-center font-bold">
                    <Image src="/images/success-kupon.png" width={200} height={200} />
                    <p >Kupon Berhasil Digunakan</p>
                    <p className="text-turq-300">{couponName}</p>
                </div>
            </Modal>
            <Modal
                show={isShowDetail}
                type={POPUP_TYPE.full}
                title="Detail Kupon"
                onClosePopup={onCloseDetail}
                withBottomSpace={false}
                closeOtherPopup
                hideDesktopHeader
            >
                <>
                    {detailCoupon && (
                        <div className="mt-4 flex flex-col gap-6 w-full md:mt-0 md:w-[400px]">
                            <FaChevronLeft className=" hidden text-lg cursor-pointer md:block" onClick={onCloseDetail}/>
                            <div>
                                <h3 className="font-bold text-lg">{detailCoupon.name}</h3>
                                <div className="mt-2 flex justify-between text-sm text-dark-300">
                                    <span>Periode Promo</span>
                                    <span>{promoTime(detailCoupon.start_time, detailCoupon.finish_time)}</span>
                                </div>
                            </div>
                            <Divider className="py-1" />
                            <div>
                                <h3 className="font-bold text-base">Deskripsi Promo</h3>
                                <p className=" break-all">{detailCoupon.description}</p>
                            </div>
                            <Divider className="py-1" />
                            <div className="border border-lg p-4">
                                <h4 className="text-sm text-center font-bold">Kode Kupon</h4>
                                <div className="mt-4 flex justify-between gap-4 items-center md:flex-col">
                                    <h1 className="font-bold text-lg md:text-[34px]">{detailCoupon.code}</h1>
                                    <Button 
                                        leftIcon={(<FaCopy />)}
                                        variant="secondary" 
                                        label="Salin"
                                        onClick={() => copyCode(detailCoupon.code)}
                                    />
                                </div>
                            </div>
                            <div className="sticky bottom-0 bg-white right-0 py-4 w-full md:sticky">
                                <Button full variant="secondary" label="Kembali" onClick={onCloseDetail}/>
                            </div>
                        </div>
                    )}
                </>
            </Modal>
            <AlertDialog
                show={infoCoupon}
                title="Info"
                description="Kamu bisa menggunakan lebih dari 1 kode kupon dengan jenis kupon yang sama."
                labelCancel="Tutup"
                popupClassName="md:w-96"
                onClose={() => setInfoCoupon(false)}
                onCancel={() => setInfoCoupon(false)}
            />
            <h4 className="flex text-sm font-bold text-dark-300 gap-2 items-center">
                Masukkan Kode Kupon
                <FaInfoCircle className="text-dark-200 cursor-pointer" onClick={() => setInfoCoupon(true)} />
            </h4>
            <Formik
                initialValues={{ coupon: "", }}
                onSubmit={handleSubmit}
            >
                {({ handleChange, values, dirty }) => (
                    <Form className="w-full grid grid-flow-col gap-2 items-start">
                        <FormikInput
                            required
                            topSpace={false}
                            name="coupon"
                            id="coupon"
                            type="text"
                            placeholder="Contoh: KODE100K"
                            value={values.coupon}
                            clearText
                            onChange={(event) => handleChange(event)}
                        />
                        <Button 
                            className="mt-2"
                            type="submit"
                            label="Terapkan"
                            variant="primary"
                            size="lg"
                            disabled={!dirty} />
                    </Form>
                )}
            </Formik>
            <Divider className="my-4" />
            {usedCoupon.length > 0 ? (
                <div className="my-3">
                    <p className="font-bold text-sm text-dark-300 my-2">Kupon Digunakan</p>
                    {usedCoupon.map((coupon, index) => (
                        <div key={coupon.code + index} className="flex my-2 justify-between border border-turq-300 bg-turq-200/30 rounded-lg">
                            <div className="font-bold p-4">
                                <p className="text-base">{coupon.name}</p>
                                <p className="mt-2 text-xs text-dark-100">
                                    {isNaN(coupon.available_coupon) ? coupon.available_coupon : `Sisa ${coupon.available_coupon} kupon`}
                                    <span 
                                        className="ml-2 cursor-pointer text-sm text-turq-300"
                                        onClick={() => openDetailKupon(coupon)}
                                    >
                                        Lihat Detail
                                    </span>
                                </p>
                            </div>
                            <div className="pl-8 flex flex-col border-2 border-l-turq-300 border-dashed p-4">
                                <div className="flex gap-2 items-center">
                                    <span className={`rounded-full py-1 px-2 text-xs font-bold text-white  ${promoBadgeStyles(coupon.type)}`}>
                                        {coupon.type.toUpperCase() === TYPE_PROMO.PERCENT ? "%" : "Rp"}
                                    </span>
                                    <FaCheckCircle className=" text-lg text-turq-300"/>
                                </div >
                                <span className="cursor-pointer font-bold text-red-300" onClick={() => onDeleteCoupon(coupon.id)}>Hapus</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) :  (
                <div className="flex flex-col items-center mt-12 mb-8">
                    <Image 
                        width={200}
                        height={124}
                        src="/images/empty-kupon.png"/>
                    <p className=" mt-6 font-bold text-dark-300">Kamu Belum Memasukkan Kupon</p>
                    <p className="text-dark-200">Gunakan kupon untuk menghemat belanjamu!</p>
                </div>
            )}
        </div>
    )
};

Kupon.propTypes = {
    onSetCoupon: propTypes.func,
    usedCoupon: propTypes.array,
    onDeleteCoupon: propTypes.func,
};

Kupon.defaultProps = {
    onSetCoupon: () => {},
    usedCoupon: [],
    onDeleteCoupon: () => {},
}
export default Kupon;