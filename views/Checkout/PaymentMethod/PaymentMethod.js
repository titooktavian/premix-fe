import { Accordion, Divider, Modal } from "components";
import useResponsive from "hooks/useResponsive";
import Image from "next/image";
import { forwardRef, useImperativeHandle, useState } from "react";
import { PAYMENT_PROVIDER } from "./utils";

const PaymentMethod = forwardRef((props, ref) => {
    const [isOpenPaymentMethod, setIsOpenPaymentMethod] = useState(false);
    const paymentProvider = Object.keys(PAYMENT_PROVIDER);
    const { isDesktop } = useResponsive();
    const closePaymentMethodPopup = () => {
        setIsOpenPaymentMethod(false);
    };
    useImperativeHandle(ref, () => ({
        openPaymentMethodPopup() {
            setIsOpenPaymentMethod(true);
        }
    }));
    return (
        <> 
            <Modal
                isPopup={isOpenPaymentMethod}
                title="Pilih Jenis Bayar"
                type="halfscreen"
                isDivider={false}
                isShowClose={false}
                onRequestClose={closePaymentMethodPopup}
            >
                <div className="flex flex-col gap-2">
                    {paymentProvider.map((provider) => (
                        <div key={provider}>
                            {!PAYMENT_PROVIDER[provider]?.children ? (
                                <div className="cursor-pointer flex gap-3 py-2 font-bold text-sm">
                                    <Image
                                        width={24}
                                        height={24}
                                        src={`/images/payment-icon/${PAYMENT_PROVIDER[provider].logo}`}
                                    />
                                    <div>
                                        {PAYMENT_PROVIDER[provider].name}
                                        {(isDesktop && PAYMENT_PROVIDER[provider].paymentTypeDesktop) && (
                                            <span className="ml-2">(QRIS)</span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <Accordion className="py-2" imgSrc={`/images/payment-icon/${PAYMENT_PROVIDER[provider].logo}`} title={PAYMENT_PROVIDER[provider].name}>
                                    {PAYMENT_PROVIDER[provider]?.children.map((child) => (
                                        <div key={child.name} className="cursor-pointer flex gap-3 p-3 font-bold text-sm">
                                            <Image
                                                width={55}
                                                height={20}
                                                src={`/images/payment-icon/${child.logo}`}
                                            />
                                            <div>
                                                {child.name}
                                            </div>
                                        </div>
                                    ))}
                                </Accordion>
                            )}
                            <Divider />
                        </div>
                    ) )}
                </div>
            </Modal>
        </>
    )
});
PaymentMethod.displayName = 'PaymentMethod';
export default PaymentMethod;