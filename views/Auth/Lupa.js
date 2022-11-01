import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import propTypes from "prop-types";

import ResetPassword from "./components/Lupa/ResetPassword";
import VerificationMethod from "components/Verification/VerificationMethod";
import OTPVerification from "components/Verification/OTPVerification";
import NewPassword from "./components/Lupa/NewPassword";
import Success from "./components/Lupa/Success";
import { useStateContext } from "context/StateContext";
import { formattedSubtitle, SUBTITLE_FORGOT, TITLE_FORGOT } from "./utils";
import { USER_INFO, VALID_OTP_DATA, VERIF_METHOD_IDENTITY } from "constants/enum";
import { getVerifySession } from "helpers/utils";

const Lupa = ({ pageID }) => {
    const getUserInfo = getVerifySession(USER_INFO);
    const getMethodIdentity = getVerifySession(VERIF_METHOD_IDENTITY);
    const validDataOTP = getVerifySession(VALID_OTP_DATA);

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [contentWrapper, setContentWrapper] = useState(null);
    const [identity, setIdentity] = useState(getUserInfo);
    const [methodIdentity, setMethodIdentity] = useState(getMethodIdentity);
    const [dataOTP, setDataOTP] = useState(validDataOTP);
    const router = useRouter();

    const { onSetBgColor } = useStateContext();
    
    useEffect(() => {
        onSetBgColor("md:bg-neutral-100");
        return () => onSetBgColor();
    }, []);

    useEffect(() => {
        switch (pageID) {
        case 1:
            setTitle(TITLE_FORGOT.RESET);
            setSubtitle(SUBTITLE_FORGOT.RESET);
            setContentWrapper(<ResetPassword onChangeIdentity={handleChangeIdentity} />);
            break;
        case 2:
            if (!identity) return handleRedirect();
            setTitle(TITLE_FORGOT.VERIFICATION_METHOD);
            setSubtitle(SUBTITLE_FORGOT.VERIFICATION_METHOD);
            setContentWrapper(<VerificationMethod onChangeMethod={handleChangeMethod} identity={identity} nextPage="/forgot/verifikasi?page=2" />);
            break;
        case 3:
            if (!methodIdentity) return handleRedirect();
            setTitle(TITLE_FORGOT.VERIFICATION_CODE);
            setSubtitle(formattedSubtitle(SUBTITLE_FORGOT.VERIFICATION_CODE, methodIdentity.type, methodIdentity.identity));
            setContentWrapper(<OTPVerification isLimit={methodIdentity.isLimit} customerNo={getUserInfo.customer_no} onDataOTP={handleChangeDataOTP} nextPage="/forgot/reset" />);
            break;
        case 4:
            if (!dataOTP) return handleRedirect();
            setTitle(TITLE_FORGOT.NEW_PASSWORD);
            setSubtitle(SUBTITLE_FORGOT.NEW_PASSWORD);
            setContentWrapper(<NewPassword customerNo={dataOTP.customer_no} />);
            break;
        case 5:
            setTitle("");
            setSubtitle("");
            setContentWrapper(<Success />);
        }
    }, [pageID, router, identity]);

    const handleRedirect = (url = "/forgot") => {
        router.push(url);
    };

    const handleChangeIdentity = (data) => setIdentity(data);

    const handleChangeMethod = (data) => setMethodIdentity(data);

    const handleChangeDataOTP = (data) => setDataOTP(data);

    return (
        <div className="flex-1 bg-white rounded-lg md:p-8 mt-5 md:mt-3 md:mx-auto md:w-[960px]">
            <h2 className="text-xl font-bold text-dark-300 mb-2">{title}</h2>
            <p className="text-dark-100 text-[15px]">{subtitle}</p>
            <div className="md:w-[376px] sm:w-full mx-auto mt-7">
                {contentWrapper}
            </div>
        </div>
    );
};

Lupa.propTypes = {
    pageID: propTypes.number,
};

Lupa.defaultProps = {
    pageID: 1,
};

export default Lupa;
