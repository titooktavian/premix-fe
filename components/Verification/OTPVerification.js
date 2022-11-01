import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import propTypes from "prop-types";

import { OTPField } from "components";
import { catchError } from "helpers/formatter";
import { AlertService } from "services";
import { ERROR_MESSAGE_VERIFY_LIMIT, USER_INFO, VALID_OTP_DATA, VERIF_METHOD_IDENTITY } from "constants/enum";
import { useStateContext } from "context/StateContext";
import { getVerifySession } from "helpers/utils";
import { authVerification, sendVerification } from "helpers/api";

const OTP_TIMER = 120;

const OTPVerification = ({ isLimit, customerNo, onDataOTP, nextPage, isForgot }) => {
    const getMethodIdentity = getVerifySession(VERIF_METHOD_IDENTITY);
    const { setLoading, outletCode } = useStateContext();
    const router = useRouter();

    const [codeOTP, setCodeOTP] = useState("");
    const [countdownTimer, setCountdownTimer] = useState(OTP_TIMER);
    const [isLimitAgain, setIsLimitAgain] = useState(false);
    const [isFailedOTP, setIsFailedOTP] = useState(false);
    let countdownInterval = null;

    useEffect(() => {
        handleCountdownTimer();
        return () => clearInterval(countdownInterval);
    }, []);

    const handleCountdownTimer = () => {
        countdownInterval = setInterval(() => {
            setCountdownTimer(prevState => {
                if (prevState <= 1) clearInterval(countdownInterval);
                return prevState - 1;
            });
        }, 1000);
    }

    const handleSendVerification = async () => {
        if (countdownTimer > 0) return;

        setLoading(true);
        const payload = {
            method: getMethodIdentity.typeId,
            identity: getMethodIdentity.identity,
            outlet_code: outletCode,
        };
        try {
            const res = await sendVerification(payload);
            const messageLimit = res.msg === ERROR_MESSAGE_VERIFY_LIMIT;
            if (!res.status && !messageLimit) throw new Error(res.msg);
            setIsLimitAgain(messageLimit);
            setCountdownTimer(OTP_TIMER);
            handleCountdownTimer();
        } catch (error) {
            AlertService.error(catchError(error));
        } finally {
            setLoading(false);
        }
    };

    const handleOTPVerify = async () => {
        setLoading(true);
        
        const payload = {
            phone_no: getMethodIdentity.identity,
            code: codeOTP,
            customer_no: customerNo,
            version: 2,
            outlet_code: outletCode,
        };
        
        try {
            const res = await authVerification(payload);
            if (!res.status) throw new Error(res.message);
            sessionStorage.removeItem(USER_INFO);
            sessionStorage.removeItem(VERIF_METHOD_IDENTITY);
            if (isForgot) {
                sessionStorage.setItem(VALID_OTP_DATA, JSON.stringify(res.data));
                onDataOTP(res.data);
            }
            router.push(nextPage);
        } catch (error) {
            setIsFailedOTP(true);
            setLoading(false);
            AlertService.error(catchError(error));
        }
    };

    const handleSetOTP = (value) => {
        setCodeOTP(value);
        setIsFailedOTP(false);
    };

    return (
        <div className="pb-5">
            <OTPField failedInput={isFailedOTP} onOTPValue={handleSetOTP} />
            <button
                className="w-full p-3 bg-turq-300 text-white rounded-full mt-6 font-bold transition duration-200 hover:bg-[#009B9A] disabled:bg-neutral-200 disabled:text-neutral-300 disabled:cursor-not-allowed"
                type="submit"
                disabled={codeOTP.length !== 4}
                onClick={handleOTPVerify}
            >
                Verifikasi
            </button>
            <div className="text-[15px] text-dark-300 font-medium mt-4">
                {
                    isLimit || isLimitAgain ? (
                        <p>Kamu telah mencapai batas maksimal pengiriman kode (maks. 3 kali). Silakan ulangi proses pengiriman kode OTP setelah 1x24 jam</p>
                    ) : (
                        <p className="text-center flex justify-center">
                            Belum menerima kode?&nbsp;
                            <span
                                className={countdownTimer <= 0 ? "font-bold text-turq-300 cursor-pointer" : "cursor-text"}
                                onClick={handleSendVerification}
                                onKeyDown={handleSendVerification}
                                role="button"
                                tabIndex={0}
                            >
                                Kirim Ulang
                            </span>&nbsp;
                            {countdownTimer > 0 && `(${countdownTimer}s)`}
                        </p>
                    )
                }
            </div>
        </div>
    );
};

OTPVerification.propTypes = {
    isLimit: propTypes.bool,
    isForgot: propTypes.bool,
    customerNo: propTypes.string,
    nextPage: propTypes.string,
    onDataOTP: propTypes.func,
};

OTPVerification.defaultProps = {
    isLimit: false,
    isForgot: true,
    customerNo: "",
    nextPage: "",
    onDataOTP: () => {},
};

export default OTPVerification;
