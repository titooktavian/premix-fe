import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import propTypes from "prop-types";

import IdentitySection from "./components/Daftar/IdentitySection";
import PasswordSection from "./components/Daftar/PasswordSection";
import VerificationMethod from "components/Verification/VerificationMethod";
import OTPVerification from "components/Verification/OTPVerification";
import Success from "./components/Lupa/Success";
import { formattedSubtitle, REGISTER_STEPS, REGISTER_SUBTITLE, REGISTER_TITLE } from "./utils";
import { useStateContext } from "context/StateContext";
import { USER_INFO, VERIF_METHOD_IDENTITY } from "constants/enum";
import { getVerifySession } from "helpers/utils";

const Daftar = ({ pageID }) => {
    const userInfo = getVerifySession(USER_INFO);
    const methodIdentity = getVerifySession(VERIF_METHOD_IDENTITY);
    const router = useRouter();

    const [step, setStep] = useState(REGISTER_STEPS.IDENTITY);
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [contentWrapper, setContentWrapper] = useState(null);
    const [registerData, setRegisterData] = useState({
        identity: "",
        name: "",
        email: "",
    });

    const { onSetBgColor } = useStateContext();

    useEffect(() => {
        onSetBgColor("md:bg-neutral-100");
        return () => onSetBgColor();
    }, []);

    useEffect(() => {
        switch (pageID) {
        case 1:
            setTitle(REGISTER_TITLE.IDENTITY);
            setSubtitle(REGISTER_SUBTITLE.IDENTITY);
            if (step === REGISTER_STEPS.IDENTITY) {
                setContentWrapper(
                    <IdentitySection
                        registerData={registerData}
                        onNextStep={handleChangeStep}
                        onRegisterData={handleSetRegisterData}
                    />
                );
            } else if (step === REGISTER_STEPS.PASSWORD) {
                setContentWrapper(
                    <PasswordSection
                        registerData={registerData}
                        onChangeStep={handleChangeStep}
                    />
                );
            }
            break;
        case 2:
            if (!userInfo) return handleRedirect();
            setTitle(REGISTER_TITLE.VERIF_METHOD);
            setSubtitle(REGISTER_SUBTITLE.VERIF_METHOD);
            setContentWrapper(
                <VerificationMethod
                    identity={userInfo}
                    nextPage="/daftar/verifikasi?page=2"
                />
            );
            break;
        case 3:
            if (!methodIdentity) return handleRedirect();
            setTitle(REGISTER_TITLE.VERIF_CODE);
            setSubtitle(formattedSubtitle(REGISTER_SUBTITLE.VERIF_CODE, methodIdentity.type, methodIdentity.identity));
            setContentWrapper(
                <OTPVerification
                    isLimit={methodIdentity.isLimit}
                    customerNo={userInfo.customer_no}
                    nextPage="/daftar/sukses"
                    isForgot={false}
                />
            );
            break;
        case 4:
            setTitle("");
            setSubtitle("");
            setContentWrapper(<Success isForgot={false} />);
        }
    }, [pageID, step, registerData]);

    const handleSetRegisterData = (data) => setRegisterData(data);

    const handleChangeStep = (stepValue) => setStep(stepValue);

    const handleRedirect = (url = "/daftar") => router.push(url);

    return (
        <div className="flex-1 bg-white rounded-lg mt-5 md:mt-3 md:mx-auto md:w-[960px] md:p-8">
            <h2 className="text-xl font-bold text-dark-300 mb-2">{title}</h2>
            <p className="text-dark-100 text-[15px]">{subtitle}</p>
            <div className="md:w-[376px] sm:w-full mx-auto mt-7">
                {contentWrapper}
            </div>
        </div>
    );
};

Daftar.propTypes = {
    pageID: propTypes.number,
};

Daftar.defaultProps = {
    pageID: 1,
};

export default Daftar;
