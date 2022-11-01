import { getOutletProductDetail, getUserCart, updateUserCart } from "helpers/api";
import { generateRandomId } from "helpers/utils";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { catchError } from "rxjs";
import { AlertService } from "services";
import propTypes from "prop-types";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [cartItems, setCartItems] = useState({
        merchantCode: undefined,
        data: [],
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [outlet, setOutlet] = useState({
        logo_path: "",
        nama: ""
    });
    const [isLoading, setLoading] = useState(false);
    const [outletCode, setOutletCode] = useState(null);
    const [selectedOrderType, setOrderType] = useState({
        orderType: 0,
        subOrderType: 0
    });
    const [bgColor, setBgColor] = useState("bg-white");
    const [isConfirmLogin, setIsConfirmLogin] = useState(false);
    const [loginParam, setLoginParam] = useState('');
    const [userLogin, setUserLogin] = useState(null);
    const [selectedOutlet, setSelectedOutlet] = useState(null);
    const [transactionNumber, setTransactionNumber] = useState(null);
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [promoRequestId, setPromoRequestId] = useState(null);
    const router = useRouter();

    const onAddToCart = async (product, callback = undefined) => {
        let cartData = [...cartItems.data];
        const outlet = selectedOutlet || outletCode;
        const { cart_id, id_product, name, quantity, note, add_on_detail_id } = product;
        const getProductDetail = await getOutletProductDetail(outlet, { id_product});
        if(!getProductDetail.status) {
            AlertService.error(catchError(getProductDetail));
            return;
        }
        let isAdd = true;
        const isInCart = cartData.find((x)=> {
            if(cart_id){ 
                isAdd = false
                return (x.cart_id === cart_id);
            }
            else {
                return (x.id_product === id_product && x.note === note && JSON.stringify(x.add_on_detail_id) === JSON.stringify(add_on_detail_id));
            }
        });
        let all_add_on = getProductDetail.data.add_on.filter(parent => add_on_detail_id.find(x => x.parentId == parent.id)).map((dt) =>{
            return {
                ...dt,
                details: dt.details.filter(detail => add_on_detail_id.find(x => x.addOnId == detail.id)),
            }
        });
        const selectedAddOn = all_add_on.reduce(function(a, b){
            return a.concat(b.details);
        }, []);
        const addOnPrice = selectedAddOn.reduce(function(a, b){
            return a + b.sell_price;
        },0)
        const selectedItemPrice = getProductDetail.data.price + addOnPrice;
        const selectedProduct = {
            cart_id: !isInCart ? generateRandomId() : isInCart.cart_id,
            img_path: getProductDetail.data.img_path[0],
            note,
            id_product,
            name,
            price: selectedItemPrice,
            quantity: isAdd ? (isInCart?.quantity || 0) + quantity : quantity ? quantity : 0,
            add_on: all_add_on,
            add_on_detail_id: add_on_detail_id,
        }
        if (userLogin) {
            const payload = {
                ...selectedProduct,
                add_on_detail_id: selectedProduct.add_on_detail_id.map((x) => x.addOnId),
                product_id: selectedProduct.id_product,
                customer_no: userLogin.customer_no
            };
            const updateCart = await updateUserCart(outlet, userLogin.customer_no, payload);
            if(!updateCart.status) {
                AlertService.error(catchError(getProductDetail));
                return;
            }
            selectedProduct.cart_id = updateCart.data.cart_id;
            selectedProduct.quantity = updateCart.data.product_buy_quantity;
        }
        if (isInCart) {
            const indexItem = cartData.findIndex(x=> x === isInCart);
            if (!selectedProduct.quantity) cartData.splice(indexItem, 1);
            else cartData[indexItem] = selectedProduct;
        } else cartData = [...cartData, selectedProduct];
        const cart = {
            merchantCode: outlet,
            data: cartData,
        }
        setCartItems(cart);
        localStorage.setItem('cart_user', JSON.stringify(cart));
        if (callback && typeof callback === "function") {
            if (selectedProduct.quantity) {
                let message = `Berhasil menambahkan ${product.name} ke keranjang`
                if(cart_id) message = `Berhasil menrubah item ${product.name} di keranjang`
                AlertService.success(
                    message
                );
            }
            else {
                AlertService.success(
                    `Berhasil menghapus ${product.name} dari keranjang`
                );
            }
            callback();
        }
    };

    const onResetCart = async () => {
        if (userLogin) {
            cartItems.data.forEach((x) => {
                const payload = {
                    ...x,
                    quantity: 0,
                    add_on_detail_id: x.add_on_detail_id,
                    product_id: x.id_product,
                    customer_no: userLogin.customer_no
                };
                updateUserCart(cartItems.merchantCode, userLogin.customer_no, payload);
            })
        }
        const cart = {
            merchantCode: selectedOutlet || outletCode,
            data: []
        };
        localStorage.setItem('cart_user', JSON.stringify(cart));
        setCartItems(cart);
        return {
            success: true,
        }
    };

    const onUpdateProduct = (cartId, option) => {
        //Option is increasing & decreasing
        const updatedCartItems = cartItems.data.find(
            (cartProduct) => cartProduct.cart_id === cartId
        );
        if (updatedCartItems) {
            switch (option) {
            case "increase":
                updatedCartItems.quantity++
                onAddToCart(updatedCartItems);
                break;
            case "decrease":
                updatedCartItems.quantity--
                onAddToCart(updatedCartItems);
                break;
            }
        }
    };

    const setOutletInfo = (outletData) => {
        setOutlet(outletData);
    };

    const onSetBgColor = (className = "bg-white") => {
        setBgColor(className);
    };

    const handleLogout = async () => {
        await fetch("/api/logout");
        setUserLogin(null);
        onResetCart();
        AlertService.success("Logout Berhasil");
    };

    useEffect(() => {
        const totalPriceCart = cartItems.data.reduce((total, item) => {
            return (total += item.price * item.quantity);
        }, 0);
        const totalQuantitiesCart = cartItems.data.reduce((total, item) => {
            return (total += item.quantity);
        }, 0);
        setTotalPrice(totalPriceCart);
        setTotalQuantities(totalQuantitiesCart);
    }, [cartItems]);

    useEffect(() => {
        async function fetchData() {
            const cart = JSON.parse(localStorage.getItem('cart_user')) || { data: [] };
            let checkoutItemsId = JSON.parse(localStorage.getItem('checkoutItems'));
            if (checkoutItemsId) setCheckoutItems(checkoutItemsId);
            if (userLogin) {
                const outlet = outletCode;
                const getCart = await getUserCart(outlet, userLogin.customer_no);
                cart.data = getCart.data.map((item) => {
                    let add_on_detail_id = [];
                    item.add_on.forEach((addOn) => {
                        addOn.details.forEach((addOnDetail) => {
                            add_on_detail_id.push({
                                parentId: addOn.id,
                                addOnId: addOnDetail.id,
                            })
                        }) 
                    });
                    return {
                        ...item,
                        add_on_detail_id,
                        id_product: item.id,
                        img_path: item.image,
                    };
                });
            }
            if (cart) {
                setCartItems(cart);
                localStorage.setItem('cart_user', JSON.stringify(cart));
            }
        }
        fetchData();
    }, [router]);
    return (
        <Context.Provider
            value={{
                onAddToCart,
                onUpdateProduct,
                onResetCart,
                quantity,
                setQuantity,
                cartItems,
                setCartItems,
                totalPrice,
                totalQuantities,
                outlet,
                setOutlet,
                setOutletInfo,
                isLoading,
                setLoading,
                outletCode,
                setOutletCode,
                selectedOrderType,
                setOrderType,
                bgColor,
                onSetBgColor,
                isConfirmLogin,
                setIsConfirmLogin,
                userLogin,
                setUserLogin,
                handleLogout,
                selectedOutlet,
                setSelectedOutlet,
                transactionNumber,
                setTransactionNumber,
                loginParam,
                setLoginParam,
                checkoutItems,
                setCheckoutItems,
                promoRequestId,
                setPromoRequestId,
            }}
        >
            {children}
        </Context.Provider>
    );
};

StateContext.propTypes = {
    children: propTypes.any,
};

export const useStateContext = () => useContext(Context);
