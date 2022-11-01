import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import propTypes from "prop-types";

import VerificationMethod from "components/Verification/VerificationMethod";
import OTPVerification from "components/Verification/OTPVerification";
import { useStateContext } from "context/StateContext";
import { getVerifySession } from "helpers/utils";
import { USER_INFO, VERIF_METHOD_IDENTITY } from "constants/enum";
import { formattedSubtitle, SUBTITLE_FORGOT, TITLE_FORGOT } from "views/Auth/utils";

const UbahNomor = ({ user, pageID }) => {
    const identity = getVerifySession(USER_INFO);
    const getMethodIdentity = getVerifySession(VERIF_METHOD_IDENTITY);

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [contentWrapper, setContentWrapper] = useState(null);
    const [methodIdentity, setMethodIdentity] = useState(getMethodIdentity);
    const router = useRouter();

    const { onSetBgColor } = useStateContext();
    
    useEffect(() => {
        onSetBgColor("md:bg-neutral-100");
        return () => onSetBgColor();
    }, []);

    useEffect(() => {
        switch (pageID) {
        case 1:
            if (!identity) return handleRedirect();
            setTitle(TITLE_FORGOT.VERIFICATION_METHOD);
            setSubtitle(SUBTITLE_FORGOT.VERIFICATION_METHOD);
            setContentWrapper(
                <VerificationMethod
                    isChangeNumber
                    onChangeMethod={handleChangeMethod}
                    identity={identity}
                    customerNo={user.customer_no}
                    nextPage="/akun/ubah-nomor/verifikasi?otp=true"
                />
            );
            break;
        case 2:
            if (!methodIdentity) return handleRedirect();
            setTitle(TITLE_FORGOT.VERIFICATION_CODE);
            setSubtitle(formattedSubtitle(SUBTITLE_FORGOT.VERIFICATION_CODE, methodIdentity.type, methodIdentity.identity));
            setContentWrapper(
                <OTPVerification
                    isLimit={methodIdentity.isLimit}
                    customerNo={user.customer_no}
                    nextPage="/akun/pengaturan"
                    isForgot={false}
                />
            );
            break;
        }
    }, [pageID, router]);

    const handleRedirect = (url = "/akun/pengaturan") => {
        router.push(url);
    };

    const handleChangeMethod = (data) => setMethodIdentity(data);

    return (
        <div className="flex-1 bg-white rounded-lg p-0 md:p-8 mt-5 md:mt-3 md:mx-auto md:w-[960px]">
            <h2 className="text-xl font-bold text-dark-300 mb-2">{title}</h2>
            <p className="text-dark-100 text-[15px]">{subtitle}</p>
            <div className="md:w-[376px] sm:w-full mx-auto mt-7">
                {contentWrapper}
            </div>
        </div>
    );
};

UbahNomor.propTypes = {
    pageID: propTypes.number,
    user: propTypes.shape({
        customer_no: propTypes.string,
    }),
};

UbahNomor.defaultProps = {
    pageID: 1,
    user: {
        customer_no: "",
    },
};

export default UbahNomor;
