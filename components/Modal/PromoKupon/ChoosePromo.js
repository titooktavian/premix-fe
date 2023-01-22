import { Button, Modal } from "components";
import { useStateContext } from "context/StateContext";
import { getPromoValidate } from "helpers/api";
import Image from "next/image";
import propTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { AlertService } from "services";
import { catchError, toRupiah } from "helpers/formatter";
import { PROMO_VIEW } from "./utils";
import ListPromo from "./ListPromo";
import Kupon from "./Kupon";
import useResponsive from "hooks/useResponsive";

const ChoosePromo = ({ 
    products, 
    selectedPromo, 
    invalidPromo, 
    onSelectPromo,
    totalDiskon,
    onSetCoupon,
    usedCoupon,
    onDeleteCoupon,
}) => {
    const [isOpenPromoPopup, setIsOpenPromoPopup] = useState(false);
    const [listPromo, setListPromo] = useState([]);
    const [view, setView] = useState();
    const { selectedOutlet, setLoading } = useStateContext();
    const { isMobile } = useResponsive();
    const closePromoPopup = () => {
        setIsOpenPromoPopup(false);
    }
    const mounted = useRef(false);
    const btnText = (usedCoupon.length > 0 && selectedPromo.length > 0) ? "Promo/Kupon" : selectedPromo.length > 0 ? "Promo" : "Kupon";

    const openPromoPopup = async() => {
        setView(PROMO_VIEW.PROMO);
        await getPromoList();
        setIsOpenPromoPopup(true);
    }

    const getPromoList = () => {
        const filter = products.map((item) => {
            let add_on_detail = [];
            item.add_on.forEach((addOn) => {
                addOn.details.forEach((addOnDetail) => {
                    add_on_detail.push({
                        id: addOnDetail.id,
                        price: addOnDetail.price,
                    })
                })
            });
            const add_on_price = add_on_detail.reduce((a, b) => a + (b.price || 0), 0);
            return {
                product_id: item.id,
                price: (item.price + add_on_price) * item.quantity,
                qty: item.quantity,
            }
        });
        getPromoValidate(selectedOutlet, { filter }).then(async (res) => {
            if (res.status) {
                const tempListPromo = res.data;
                invalidPromo.forEach(item => {
                    const idx = tempListPromo.indexOf(tempListPromo.find(e => e.promo_id === item));
                    tempListPromo[idx].is_available = 0;
                    tempListPromo[idx].promo_is_auto = 0;
                });
                setListPromo(tempListPromo);
                if (tempListPromo.length > 0) setView(PROMO_VIEW.PROMO);
                else setView(PROMO_VIEW.KUPON);
                return;
            }
            else {
                AlertService.error(catchError(res));
                return;
            }
        })
    };

    const handleReset = () => {
        setLoading(true);
        window.location.reload(true);
    };
    
    useEffect(()=>{
        if (invalidPromo.length) {
            getPromoList();
        }
    }, [invalidPromo])

    useEffect(() => {
        mounted.current = true;
        if (mounted.current) getPromoList();
        return () => {mounted.current = false;}
    }, [])

    return (
        <>
            <Modal
                closeOtherPopup
                show={isOpenPromoPopup}
                title={isMobile ? "" : "Pilih Promo"}
                withBottomSpace={false}
                onClosePopup={closePromoPopup}
            >
                <div className="sticky top-16 bg-white pb-3 pt-2 z-30 md:hidden">
                    <h3 className="font-bold text-dark-300">Pilih Promo</h3>
                    <p className="text-xs text-dark-100 font-medium mt-1">Kamu bisa gabungkan promo & kupon biar makin hemat!</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-2">
                        <Button 
                            className={view === PROMO_VIEW.PROMO ? 'bg-dark-200 hover:bg-dark-200' : ''} 
                            variant="secondary"
                            onClick={() => setView(PROMO_VIEW.PROMO)}
                            disabled={listPromo.length < 1}
                        >
                            <div className={view === PROMO_VIEW.PROMO ? 'text-white' : ''}>Promo</div>
                        </Button>
                        <Button 
                            className={view === PROMO_VIEW.KUPON ? 'bg-dark-200 hover:bg-dark-200' : ''} 
                            variant="secondary"
                            onClick={() => setView(PROMO_VIEW.KUPON)}
                        >
                            <div className={view === PROMO_VIEW.KUPON ? 'text-white' : ''}>Kupon</div>
                        </Button>
                    </div>
                    <span className="cursor-pointer text-sm font-bold text-turq-300" onClick={handleReset}>Reset Promo</span>
                </div>
                <div className="mt-5 md:mb-4 mb-24">
                    {view === PROMO_VIEW.PROMO ? (
                        <ListPromo promos={listPromo} setPromo={onSelectPromo} selectedPromo={selectedPromo}/>
                    ): (
                        <Kupon onSetCoupon={onSetCoupon} usedCoupon={usedCoupon} onDeleteCoupon={onDeleteCoupon}/>
                    )}
                </div>
                <div className="bg-white md:sticky fixed w-full right-0 bottom-0 md:py-4 md:px-0 p-4 z-30">
                    <Button 
                        full 
                        variant={(selectedPromo.length || usedCoupon.length) ? 'primary' : 'secondary'} 
                        size="lg"
                        onClick={closePromoPopup}
                    >
                        <>
                            {(selectedPromo.length || usedCoupon.length) ? (
                                <div className="flex justify-between items-center">
                                    <div className="flex items-start flex-col text-xs">
                                        <p>Kamu bisa hemat</p>
                                        <p>{toRupiah(totalDiskon)}</p>
                                    </div>
                                    <div>
                                        Pakai Promo ({selectedPromo.length + usedCoupon.length})
                                    </div>
                                </div>
                            ) : (
                                <div>Belanja Tanpa Promo</div>
                            )}
                        </>
                    </Button>
                </div>
            </Modal>
            <h2 className="my-4 text-base font-bold text-dark-300 md:px-2 md:my-0">
                Pilih Promo
            </h2>
            <div className="mt-2 md:mt-1">
                <Button className="flex justify-center items-center gap-2" size="lg" full variant={listPromo.length > 0 ? "promo" : "ghost"} onClick={openPromoPopup}>
                    <Image width={25} height={20} src={`/images/${listPromo.length > 0 ? "promo" : "promo-unavailable"}.png`} />
                    {(selectedPromo.length || usedCoupon.length) ? (
                        <>
                            {`${selectedPromo.length + usedCoupon.length} ${btnText} dipakai`}
                        </>
                    ) : listPromo.length > 0 ? "Makin hemat pakai promo" : "Tidak ada promo yang tersedia"}
                </Button>
            </div>
        </>
    )
};

ChoosePromo.propTypes = {
    selectedPromo: propTypes.array,
    products: propTypes.array,
    invalidPromo: propTypes.array,
    onSelectPromo: propTypes.func,
    totalDiskon: propTypes.number,
    onSetCoupon: propTypes.func,
    usedCoupon: propTypes.array,
    onDeleteCoupon: propTypes.func,
};

ChoosePromo.defaultProps = {
    selectedPromo: [],
    products:[],
    invalidPromo: [],
    onSelectPromo: () => {},
    totalDiskon: 0,
    onSetCoupon: () => {},
    usedCoupon: [],
    onDeleteCoupon: () => {},
};

export default ChoosePromo;