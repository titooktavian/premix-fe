import { Button, Divider, OrderType } from "components";
import { ORDER_TYPE_DELIVERY } from "constants";
import { useStateContext } from "context/StateContext";
import { getCalculation, getPromoValidate } from "helpers/api";
import { catchError } from "helpers/formatter";
import { generaterandomCode } from "helpers/utils";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AlertService } from "services";
import ChoosePromo from "./components/ChoosePromo";
import CustomerInfo from "./components/CustomerInfo";
import DeliveryAddress from "./components/DeliveryAddress";
import DeliveryMethod from "./components/DeliveryMethod";
import OrderDetail from "./components/OrderDetail";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import PaymentSummary from "./components/PaymentSummary";

const Index = () => {
    const { 
        checkoutItems, 
        cartItems,
        onSetBgColor, 
        selectedOutlet, 
        outletCode, 
        selectedOrderType, 
        promoRequestId, 
        setPromoRequestId
    } = useStateContext();
    const [ringkasan, setRingkasan] = useState();
    const [product, setProduct] = useState([]);
    const [freeProduct, setFreeProduct] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [selectedPromo, setSelectedPromo] = useState([]);
    const [addressId, setAddressId] = useState(null);
    const [courier, setCourier] = useState(null);
    const didMountRef = useRef(false);
    const router = useRouter();
    const productCheckouts = cartItems.data.filter((x) => checkoutItems.includes(x.cart_id));
    const paymentMethodRef = useRef();

    const calculateOrder = async () => {
        if (!promoRequestId) {
            await setPromoRequestId(generaterandomCode(9));
        }
        const products = await productCheckouts.map((item) => {
            let add_on_detail = [];
            item.add_on.forEach((addOn) => {
                addOn.details.forEach((addOnDetail) => {
                    add_on_detail.push({
                        id: addOnDetail.id,
                        price: addOnDetail.price,
                    })
                })
            });
            return {
                id: item.id,
                price: item.price,
                promo_id: null,
                promo_nominal: 0,
                qty: item.quantity,
                add_on_detail,
            }
        })
        const payload = {
            product: products,
            order_type: selectedOrderType.orderType,
            sub_order_type: selectedOrderType.subOrderType || 0,
            promo_nominal: 0,
            shipment_cost: 0,
            additional_cost: 0,
            insurance_fee: 0,
            coupon: [],
            promo: selectedPromo.map((x)=> { return { id: x}}),
            promo_request_id: promoRequestId,
        }
        getCalculation(selectedOutlet || outletCode, payload).then(async (res) => {
            if (res.status_code >= 200 && res.status_code <= 299) {
                res.data.type_order = selectedOrderType.orderType;
                const tempProducts = res.data.products.filter(x => !x.is_bonus_product);
                await setProduct(productCheckouts.map((product, index) => {
                    return {
                        ...product,
                        total_price: tempProducts[index].total_price,
                        total_price_after_promo: tempProducts[index].total_price_after_promo,
                    }
                }));
                res.data.shipment_cost = 0;
                await setFreeProduct(res.data.products.filter(x => x.is_bonus_product));
                await setRingkasan({ data: res.data });
                return;
            }
            AlertService.error(catchError(res));
            return;
        })
    };
    
    const fetchPromo = async () => {
        const filter = await productCheckouts.map((item) => {
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
        })
        getPromoValidate(selectedOutlet || outletCode, {filter}).then(async (res)=>{
            if (res.status) {
                let tempPromo = [];
                await res.data.forEach(async (promo) => {
                    if (promo.is_available == 1 && promo.promo_is_auto) {
                        if (!tempPromo.includes(promo?.promo_id)) {
                            tempPromo.push(promo?.promo_id);
                        }
                    }
                })
                await setSelectedPromo(tempPromo);
            }
            else {
                AlertService.error(catchError(res));
            }
        })

    }

    const isBtnDisabled = () => {
        if (selectedOrderType.orderType != ORDER_TYPE_DELIVERY && !customerName) return true
        else if (selectedOrderType.orderType === ORDER_TYPE_DELIVERY && !addressId && !courier) return true
        return false;
    }

    useEffect(()=> {
        if (productCheckouts.length < 1 ) {
            router.push('/keranjang')
        }
        onSetBgColor("md:bg-neutral-100");
        fetchPromo();
        return () => onSetBgColor();
    }, []);

    useEffect(() => {
        if (didMountRef.current) {
            return calculateOrder();
        }
        didMountRef.current = true;
    }, [selectedPromo]);

    return (
        <>  
            <PaymentMethod ref={paymentMethodRef}/>
            <div className=" pt-3 md:mx-auto md:flex md:max-w-[960px]">
                <div className="flex flex-col bg-white md:bg-transparent md:col-span-2 md:w-7/12 md:gap-2">
                    <div className="md:md:rounded-lg md:bg-white md:p-4">
                        <OrderType />
                    </div>
                    <Divider className="my-4 md:hidden" />
                    <div className="md:md:rounded-lg md:bg-white md:p-4">
                        {selectedOrderType.orderType === ORDER_TYPE_DELIVERY ? (
                            <DeliveryAddress setAddress={(e) => setAddressId(e)}/>
                        ) : (
                            <CustomerInfo name={customerName} setName={(e) => setCustomerName(e)} />
                        ) }
                    </div>
                    <Divider className="my-4 md:hidden" />
                    <div className="md:md:rounded-lg md:bg-white md:p-4">
                        <OrderDetail products={product} freeProducts={freeProduct}/>
                    </div>
                    <Divider className="my-4 md:hidden" />
                </div>
                <div className="flex flex-col bg-white md:mt-0 md:ml-4 md:bg-transparent md:w-5/12 md:gap-2">
                    {selectedOrderType.orderType === ORDER_TYPE_DELIVERY && 
                        <>
                            <div className=" md:md:rounded-lg md:bg-white md:p-4">
                                <DeliveryMethod setCourier={(e) => setCourier(e)}/>
                            </div>
                            <Divider className="my-4 md:hidden" />
                        </>
                    }
                    <div className=" md:md:rounded-lg md:bg-white md:p-4">
                        <ChoosePromo selectedPromo={selectedPromo}/>
                    </div>
                    <Divider className="my-4 md:hidden" />
                    <div className="md:md:rounded-lg md:bg-white md:p-4">
                        <PaymentSummary {...ringkasan} />
                    </div>
                    <div className="bg-white p-2 sticky bottom-0 -mx-4 -my-1 md:p-4 md:mx-0 md:static">
                        <Button 
                            className=""
                            full
                            size="lg"
                            label="Bayar"
                            variant="primary"
                            disabled={isBtnDisabled()}
                            onClick={() => paymentMethodRef.current.openPaymentMethodPopup()}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;