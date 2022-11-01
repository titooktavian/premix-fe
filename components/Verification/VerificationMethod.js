import propTypes from "prop-types";
import { useRouter } from "next/router";

import MethodItem from "./MethodItem";
import { icons } from "constants";
import { useStateContext } from "context/StateContext";
import { AlertService } from "services";
import { catchError } from "helpers/formatter";
import { changeNumber, sendVerification } from "helpers/api";
import {
    ERROR_MESSAGE_VERIFY_LIMIT,
    VERIF_METHOD_IDENTITY,
    VERIF_METHOD_TYPE,
} from "constants/enum";

const VerificationMethod = ({ onChangeMethod, identity, nextPage, isChangeNumber, customerNo }) => {
    const router = useRouter();
    const { setLoading, outletCode } = useStateContext();

    const handleMethodType = (type) => {
        let methodType;
        switch (type) {
        case VERIF_METHOD_TYPE.SMS:
            methodType = "SMS";
            break;
        case VERIF_METHOD_TYPE.WHATSAPP:
            methodType = "WhatsApp";
            break;
        case VERIF_METHOD_TYPE.EMAIL:
            methodType = "Email";
            break;
        }
        return methodType;
    }

    const handleSendVerification = async (type) => {
        setLoading(true);

        const identityData = type === VERIF_METHOD_TYPE.EMAIL ? identity.email : identity.phone_no;

        let payload = {};

        if (isChangeNumber) {
            payload = {
                method: type,
                phone_no: identity.phone_no,
                customer_no: customerNo,
            };
        } else {
            payload = {
                method: type,
                identity: identityData,
                outlet_code: outletCode,
            };
        }

        try {
            const res = isChangeNumber ? await changeNumber(payload) : await sendVerification(payload);
            const resposeMessage = isChangeNumber ? res.message : res.msg;
            const messageLimit = resposeMessage === ERROR_MESSAGE_VERIFY_LIMIT;
            if (!res.status && !messageLimit) throw new Error(resposeMessage);
            const methodType = handleMethodType(type);
            const data = {
                typeId: type,
                type: methodType,
                identity: identityData,
                isLimit: messageLimit,
            };
            onChangeMethod(data);
            sessionStorage.setItem(VERIF_METHOD_IDENTITY, JSON.stringify(data));
            router.push(nextPage);
        } catch (error) {
            setLoading(false);
            AlertService.error(catchError(error));
        }
    };

    return (
        <>
            <MethodItem
                text={`Melalui SMS ke ${identity.phone_no}`}
                icon={icons.messageIcon}
                onClick={() => handleSendVerification(VERIF_METHOD_TYPE.SMS)}
            />
            <MethodItem
                text={`Melalui WhatsApp ke ${identity.phone_no}`}
                icon={icons.whatsappIcon}
                onClick={() => handleSendVerification(VERIF_METHOD_TYPE.WHATSAPP)}
            />
        </>
    );
};

VerificationMethod.propTypes = {
    nextPage: propTypes.string,
    customerNo: propTypes.string,
    isChangeNumber: propTypes.bool,
    onChangeMethod: propTypes.func,
    identity: propTypes.shape({
        phone_no: propTypes.string,
        email: propTypes.string,
    }),
};

VerificationMethod.defaultProps = {
    nextPage: "",
    customerNo: "",
    isChangeNumber: false,
    onChangeMethod: () => {},
    identity: {
        phone_no: "",
        email: "",
    },
};

export default VerificationMethod;
