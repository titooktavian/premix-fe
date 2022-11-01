import Image from "next/image";
import propTypes from "prop-types";

import { Button, Modal } from "components";
import LoadingSkeleton from "./LoadingSkeleton";

const PaymentCompleteStatus = ({
    isLoading,
    isSuccess,
    paymentIcon,
    paymentHeight,
    title,
    description,
    primaryLabel,
    secondaryLabel,
    primaryClick,
    secondaryClick,
    primaryDisabled,
    secondaryDisabled,
    onClosePopup,
}) => (
    <Modal
        mediumWidth
        staticBackdrop
        isPopup
        isDivider={false}
        type="fullscreen"
        title=""
        onRequestClose={onClosePopup}
    >
        {isLoading ? <LoadingSkeleton /> : (
            <>
                <div className="flex flex-col items-center">
                    <Image
                        src={`/images/${isSuccess ? "success" : "failed"}-circle.png`}
                        alt="failed circle"
                        width={80}
                        height={80}
                    />
                    <img
                        src={`/images/payment-icon/${paymentIcon}`}
                        alt="payment type"
                        className={`h-[${paymentHeight}] mt-6`}
                    />
                    <h3 className="text-dark-300 font-bold text-base mt-6 text-center">
                        {title}
                    </h3>
                    <p className="text-dark-100 font-medium text-sm mt-4 text-center">
                        {description}
                    </p>
                </div>
                <div className="flex md:flex-row flex-col md:gap-4 gap-2 w-full bg-white mt-16">
                    <Button
                        full
                        label={secondaryLabel}
                        variant="secondary"
                        size="lg"
                        disabled={secondaryDisabled}
                        onClick={secondaryClick}
                    />
                    <Button
                        full
                        label={primaryLabel}
                        size="lg"
                        disabled={primaryDisabled}
                        onClick={primaryClick}
                    />
                </div>
            </>
        )}
    </Modal>
);

PaymentCompleteStatus.propTypes = {
    isLoading: propTypes.bool,
    isSuccess: propTypes.bool,
    paymentIcon: propTypes.string,
    paymentHeight: propTypes.string,
    title: propTypes.string,
    description: propTypes.string,
    primaryLabel: propTypes.string,
    secondaryLabel: propTypes.string,
    primaryClick: propTypes.func,
    secondaryClick: propTypes.func,
    primaryDisabled: propTypes.bool,
    secondaryDisabled: propTypes.bool,
    onClosePopup: propTypes.func,
};

PaymentCompleteStatus.defaultProps = {
    isLoading: false,
    isSuccess: false,
    paymentIcon: "",
    paymentHeight: "60px",
    title: "",
    description: "",
    primaryLabel: "",
    secondaryLabel: "",
    primaryClick: () => {},
    secondaryClick: () => {},
    primaryDisabled: false,
    secondaryDisabled: false,
    onClosePopup: () => {},
};

export default PaymentCompleteStatus;
