import RadioButton from "components/RadioButton/RadioButton";
import Image from "next/image";
import { forwardRef, useImperativeHandle, useState } from "react";
import propTypes from "prop-types";

const { Button, AlertDialog, Modal } = require("components");
const { default: useResponsive } = require("hooks/useResponsive");

const ChooseFreeProducts = forwardRef(({handleSelectFreeProducts}, ref) => {
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [bonus, setBonus] = useState(null);
    const [products, setProducts] = useState([]);
    const [promo, setPromo] = useState();
    const [alertPromo, setAlertPromo] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const title = "Pilih Gratis Produk";
    const sub = "Pilih produk dari hadiah promo yang kamu pilih!";
    const { isMobile } = useResponsive();

    const handleOpenPopup = (dataPromo) => {
        if (Array.isArray(dataPromo.bonus_products) && dataPromo?.bonus_products.length) setBonus(dataPromo?.bonus_products[0].product_id);
        else setBonus(null);
        setProducts(dataPromo?.tipe_bonus_item_nama || []);
        setPromo(dataPromo);
        setIsShowPopup(true);
    };

    const submitFreeProduct = () => {
        handleSelectFreeProducts(promo, bonus);
        setIsShowPopup(false);
    }

    const handleSelectBonus = (item_id) => {
        setBonus(item_id)
    };

    const openAlertPromo = (msg) => {
        setAlertMessage(msg || "Kamu belum memilih gratis produk dari pembelianmu, pilih terlebih dahulu untuk melanjutkan pembayaran.")
        setAlertPromo(true);
    }

    useImperativeHandle(ref, () => {
        return {
            handleOpenPopup,
            openAlertPromo,
        }
    });

    return (
        <>
            <Modal
                title={isMobile ? "" : title}
                show={isShowPopup}
                onClosePopup={() => setIsShowPopup(false)}
            >
                <>
                    {isMobile && (<p className="font-bold text-xl">{title}</p>)}
                    <p className="text-sm font-medium mt-4 md:mt-0 text-dark-200">{sub}</p>
                    <div className="my-4 flex flex-col gap-4">
                        {products.map((product, index) => (
                            <div 
                                className=" p-4 flex justify-between items-center cursor-pointer shadow-lg" 
                                key={`free_product_${index}`}
                                onClick={() => handleSelectBonus(product.item_id)}
                            >
                                <div className="flex gap-2 items-center">
                                    <Image 
                                        src={product.image_path_item}
                                        width={60}
                                        height={60}
                                        objectFit="contain"
                                    />
                                    <p className="font-bold">{product.nama_item}</p>
                                </div>
                                <RadioButton 
                                    id={`free-${product.item_id}`}
                                    isSelected={bonus === product.item_id}
                                    label="&nbsp;"
                                    value={product.item_id}
                                />              
                            </div>
                        ))}
                    </div>
                    <div className="absolute w-full p-4 right-0 bottom-0 md:relative md:p-0">
                        <Button full label="Pilih Produk" disabled={!bonus} onClick={submitFreeProduct}/>
                    </div>
                </>
            </Modal>
            <AlertDialog
                popupClassName="md:w-[420px]"
                show={alertPromo}
                title="Info"
                description= {alertMessage}
                labelCancel="Tutup"
                onCancel={() => setAlertPromo(false)}
                onClose={() => setAlertPromo(false)}
            />
        </>
        
    )
});
ChooseFreeProducts.displayName = "ChooseFreeProducts";

ChooseFreeProducts.propTypes = {
    handleSelectFreeProducts: propTypes.func,
};

ChooseFreeProducts.defaultProps = {
    handleSelectFreeProducts: () => {},
};

export default ChooseFreeProducts;