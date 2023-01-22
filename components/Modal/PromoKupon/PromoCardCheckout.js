import { Divider, PromoCard, PromoDetail } from "components";
import { HEAD_PROMO, TEXT_PROMO } from "components/PromoCard/enum";
import { promoBadgeStyles } from "components/PromoCard/styles";
import useResponsive from "hooks/useResponsive";
import Image from "next/image";
import propTypes from "prop-types";
import { useState } from "react";
import { promoTime } from "./utils";

const PromoCardCheckout = (props) => {
    const { tgl_mulai, tgl_selesai, tipe_bonus, value_tipe_bonus, isDisabled, isActive, onSelectPromo, promo_id, nama_promo, } = props
    const { isMobile } = useResponsive();
    const promoType = tipe_bonus.toUpperCase();
    const discountText = TEXT_PROMO[promoType](value_tipe_bonus);
    const discountHead = HEAD_PROMO[promoType];
    const [promoID, setPromoID] = useState(null);
    return (
        <div className="cursor-pointer relative mb-4 border border-dark-200 rounded-md" onClick={onSelectPromo}>
            <PromoDetail promoID={promoID} onSetPromoID={setPromoID} />
            {isActive && (
                <div className="absolute w-full h-full bg-turq-200/40 z-10">
                </div>
            )}
            <>
                {!isMobile ? (
                    <PromoCard {...props} bonusType={promoType} promoName={nama_promo} bonusValue={value_tipe_bonus} isModal isDisabled={isDisabled} isCheckout/>
                ) : (
                    <div className={`flex justify-between items-center px-4 py-2 ${isDisabled ? 'bg-neutral-100' : ''}`}>
                        <h3 className={`mt-[10px] text-xl font-bold text-dark-300`}>
                            {discountText}
                        </h3>
                        <span className={`rounded-full px-2 py-1 text-xs font-bold text-white ${isDisabled ? 'bg-neutral-300' : promoBadgeStyles(promoType)}`}>
                            {discountHead}
                        </span>
                    </div>
                )}
                {!isMobile && (<Divider />)}
                <div className={`flex items-center px-4 py-2 gap-2 ${isDisabled && isMobile ? 'bg-neutral-100' : ''}`}>
                    <Image width={14} height={14} src="/images/stopwatch.png"/>
                    <div className="w-full flex justify-between items-center ">
                        <div className="text-sm">
                            <p className="font-bold text-dark-200">Periode Promo</p>
                            <p className="text-dark-300 text-xs">{promoTime(tgl_mulai, tgl_selesai)}</p>
                        </div>
                        <div 
                            className="font-bold text-sm text-turq-300 cursor-pointer z-20"
                            onClick={() => setPromoID(promo_id)}
                        >
                            Lihat Detail
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
};

PromoCardCheckout.propTypes = {
    promo_id: propTypes.number.isRequired,
    nama_promo: propTypes.string,
    tgl_mulai: propTypes.string,
    tgl_selesai: propTypes.string,
    tipe_bonus: propTypes.string,
    value_tipe_bonus: propTypes.number,
    isDisabled: propTypes.bool,
    isActive: propTypes.bool,
    onSelectPromo: propTypes.func,
};

PromoCardCheckout.defaultProps = {
    nama_promo: '',
    tgl_mulai: '',
    tgl_selesai: '',
    tipe_bonus: '',
    value_tipe_bonus: 0,
    isDisabled: false,
    isActive: false,
    onSelectPromo: () => {},
}
export default PromoCardCheckout;