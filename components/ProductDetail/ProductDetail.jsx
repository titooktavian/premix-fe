import { useEffect, useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Carousel, Divider, ImageProduct, Modal, PromoDetail } from "components";
import { getOutletProductDetail, getPromoDetail, getPromoProduct } from "helpers/api";
import { useStateContext } from "context/StateContext";
import { catchError, toRupiah } from "helpers/formatter";
import { TextArea } from "components";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import ReadMore from "./ReadMore";
import RadioButton from "components/RadioButton/RadioButton";
import { Button } from "components";
import { HEAD_PROMO } from "components/PromoCard/enum";
import { promoBadgeStyles } from "components/PromoCard/styles";
import { AlertService } from "services";
import propTypes from "prop-types";

const ProductDetail = ({ productID, onRequestClose, cartId }) => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState("");
    const [addOn, setAddOn] = useState([]);
    const [stock, setStock] = useState(0);
    const [isAvailable, setIsAvailable] = useState(true);
    const [promosProduct, setPromosProduct] = useState([]);
    const [detailPromo, setDetailPromo] = useState(null);
    const [isShowPromoDetailPopup, showPromoDetailPopup] = useState(false);

    const { onAddToCart, cartItems, outletCode, setLoading} = useStateContext();

    const incQty = () => {
        setQuantity((prevQty) => prevQty + 1);
    };

    const decQty = () => {
        setQuantity((prevQty) => {
            const limitMin = cartId ? 0 : 1
            if (prevQty - 1 < 1) return limitMin;
            return prevQty - 1;
        });
    };

    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };

    const updateCart = async () => {
        setLoading(true);
        product.cart_id = cartId;
        product.note = note;
        product.quantity = quantity;
        product.add_on_detail_id = addOn;
        await onAddToCart(product, onRequestClose);
        setLoading(false);
    };

    const handleAddOnChange = (parentId, addOnId) => {
        const tempData = {
            parentId,
            addOnId,
        }
        let tempArray = [...addOn];
        const index = tempArray.findIndex(dataEkstra => dataEkstra.parentId === parentId);
        if(index >= 0) tempArray[index] = tempData;
        else tempArray = [...tempArray, tempData];
        setAddOn(tempArray);
    };

    const isAddOnSelected = (parentId, addOnId) => {
        const findAddOn = addOn.find(dt => (dt.parentId === parentId && dt.addOnId === addOnId));
        if(findAddOn) return true;
        return false;
    };

    const openPromoDetail = (promo_id) => {
        const payload = {
            promo_id
        };
        setDetailPromo(null);
        setLoading(true);
        getPromoDetail(outletCode, payload)
            .then(async (res) => {
                if (res.status && res.data && res.data.length > 0) {
                    await setLoading(false);
                    setDetailPromo({ ...res.data[0], isModal: true });
                    showPromoDetailPopup(true);
                    return;
                }
                throw res;
            })
            .catch((err) => {
                setLoading(false);
                AlertService.error(catchError(err));
            });
    };

    const closePromoDetail = () => {
        showPromoDetailPopup(false);
    };

    const buttonLabel = () => {
        if(isAvailable) {
            const label = cartId ? 'Ubah Item' : 'Tambah ke Keranjang';
            const selectedAddOn = product.add_on.reduce(function(a, b){
                return a.concat(b.details);
            }, []).filter(x => addOn.find((add) => add.addOnId === x.id));
            const addOnPrice = selectedAddOn.reduce(function(a, b){
                return a + b.sell_price;
            },0)
            return `${label} | ${toRupiah((product.price + addOnPrice) * quantity)}`;
        } 
        return 'Stok Habis'
    };

    useEffect(() => {
        let isMounted = true;
        const itemOnCart = cartItems.data.find((item) => item.cart_id === cartId);
        const fetchData = async () => {
            const product = await getOutletProductDetail(outletCode, {
                id_product: productID
            });
            const promoProduct = await getPromoProduct(outletCode, {
                product_id: [productID],
            });
            const item = product.data;
            const availableStock = item.min_stock >  item.stock ? item.min_stock : item.stock;
            if(item.use_cogs) {
                setStock(availableStock);
                setIsAvailable(availableStock > 0);
            }
            setProduct(item);
            setPromosProduct(promoProduct?.data || []);
            if(itemOnCart) {
                setQuantity(itemOnCart.quantity);
                setNote(itemOnCart.note);
                setAddOn(itemOnCart.add_on_detail_id);
            }
        };
        if(isMounted) fetchData().catch(console.error);
        return () => { isMounted = false };
    }, []);

    if (!product) return <ProductDetailSkeleton />;

    return (
        <>  
            <Modal
                isPopup={isShowPromoDetailPopup}
                title="Detail Promo"
                type="fullscreen"
                onRequestClose={closePromoDetail}
            >
                <PromoDetail {...detailPromo} onRequestClose={closePromoDetail} />
            </Modal>
            <div className="h-full md:flex gap-5">
                <div className="w-full md:max-w-[250px]">
                    <ImageProduct 
                        className={`${!isAvailable && 'grayscale'} sticky top-2`}
                        images={product.img_path}/>
                </div>
                <div className="md:flex-1 md:px-0">
                    <div className="mt-4 md:mt-0">
                        <h2 className="text-base font-bold text-dark-400">
                            {product.name}
                        </h2>
                        <p className="my-4 text-base font-bold text-dark-400">
                            Rp {product.price}&nbsp;
                            {promosProduct.length > 0 && (
                                <span className="rounded-full bg-red-100 py-[2px] px-2 text-xs font-bold text-red-400">
                                    Promo
                                </span>
                            )}
                        </p>
                        {product.use_cogs === 1 && (
                            <p className="my-2 font-semibold text-xs text-dark-100">
                                Stok: {stock}
                            </p>
                        )}
                        <ReadMore description={product.desc} longDescription={product.long_desc}/>
                    </div>
                    {promosProduct.length > 0 && (
                        <div className=" my-8">
                            <p className="my-2 text-base font-bold text-dark-400">
                                Promo yang Bisa Dipakai
                            </p>
                            <Carousel>
                                {promosProduct?.map((promo) => (
                                    <div key={promo.promo_id} className="flex w-11/12 p-4 mr-4 border rounded-md justify-between">
                                        <div className="flex flex-col gap-2">
                                            <label className="font-bold text-ellipsis">{promo.nama_promo}</label>
                                            <span className=" text-xs font-bold text-neutral-300">
                                                Periode&nbsp;
                                                {new Date(promo.tgl_mulai).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) }&nbsp;
                                                -&nbsp;
                                                {new Date(promo.tgl_selesai).toLocaleDateString('id-ID', { year: 'numeric', day: 'numeric', month: 'short'}) }
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-4 items-end">
                                            <span className={`whitespace-nowrap rounded-full py-[3px] px-2 text-xs font-bold text-white ${promoBadgeStyles(promo.bonus_type.toUpperCase())}`}>
                                                {HEAD_PROMO[promo.bonus_type.toUpperCase()]}
                                            </span>
                                            <span className=" cursor-pointer text-xs font-bold text-turq-300" onClick={()=>openPromoDetail(promo.promo_id)}>Lihat Detail</span>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    )}
                    {product?.add_on && (
                        <div className="mt-4">
                            {product.add_on.map((addOns, indexAddOn) => (
                                <div key={`addOn${indexAddOn}`} className="mb-2.5">
                                    <div className="text-sm font-bold text-dark-400 mb-2.5">{addOns.name}</div>
                                    <div>
                                        {addOns.details.filter(extra => extra.active_status).map((extra, indexExtra) => (
                                            <div key={`ekstra${indexExtra}`} className="flex justify-between items-center text-sm">
                                                <RadioButton 
                                                    className="mb-1"
                                                    id={`topping-${addOns.id}-${extra.id}`}
                                                    isSelected={isAddOnSelected(addOns.id, extra.id)}
                                                    value={extra.sell_price}
                                                    label={extra.name}
                                                    onChange={() => handleAddOnChange(addOns.id, extra.id)}
                                                    disabled={!isAvailable}
                                                />
                                                <span>+ {toRupiah(extra.sell_price)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <Divider className="block md:hidden" />
                    <div className="mt-4">
                        <TextArea
                            className
                            label="Catatan (opsional)"
                            name="catatan"
                            id="catatan"
                            placeholder="Contoh: kurangi gula"
                            maxLength={200}
                            value={note}
                            onChange={handleNoteChange}
                            disabled={!isAvailable}
                        />
                    </div>
                    <div className="mt-8 flex justify-between pb-4">
                        <p className="font-bold text-sm">Jumlah</p>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="secondary"
                                iconOnly={(<AiFillMinusCircle className="text-3xl text-neutral-300"/>)}
                                size="sm"
                                onClick={decQty}
                                disabled={!isAvailable}
                            />
                            <input
                                type="number"
                                className="h-[32px] w-[50px] rounded-md border border-neutral-300 text-center text-sm  font-bold  text-dark-400 outline-none placeholder:font-light placeholder:text-dark-100"
                                min="1"
                                max="999"
                                value={quantity}
                                readOnly
                            />
                            <Button 
                                iconOnly={(<AiFillPlusCircle className="text-3xl"/>)}
                                size="sm"
                                onClick={incQty}
                                disabled={!isAvailable}
                            />
                        </div>
                    </div>
                    <div className="sticky bottom-0 right-0 left-0 border-t-2 bg-white py-4 shadow-lg md:-bottom-4 md:w-full md:border-none md:shadow-none">
                        {quantity ? (
                            <Button
                                label={buttonLabel()}
                                onClick={() => updateCart()}
                                full={true}
                                disabled={!isAvailable}
                            />
                        ) : (
                            <Button
                                full={true}
                                label="Hapus Produk"
                                onClick={() => updateCart()}
                                variant="secondary"
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

ProductDetail.propTypes = {
    cartId: propTypes.oneOfType([
        propTypes.string,
        propTypes.number,
    ]),
    productID: propTypes.string,
    onRequestClose: propTypes.func,
};

ProductDetail.defaultProps = {
    cartId: '',
    productID: '',
    onRequestClose: () => {},
};

export default ProductDetail;
