import { getDetailProduct, getOutletProductDetail, getUserCart, updateUserCart } from "helpers/api";
import { generateRandomId } from "helpers/utils";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { catchError } from "rxjs";
import { AlertService } from "services";
import propTypes from "prop-types";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [cartItems, setCartItems] = useState({
        id_user: null,
        price: 0,
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
        let cartData = {...cartItems};
        const { idProduct, quantity, variant, name } = product;
        
        const getProductDetail = await getDetailProduct(idProduct);
        // if(!getProductDetail.status) {
        //     AlertService.error(catchError(getProductDetail));
        //     return;
        // }

        const selectedVariant = getProductDetail.product_durations.filter(obj => {
            return obj.id_product_duration === variant
        })

        if(selectedVariant < 1) {
            AlertService.error(catchError('Variant yang anda pilih tidak tersedia'));
            return;
        }

        const selectedItemPrice = selectedVariant[0].price * quantity;
        const selectedProduct = {
            id_product: idProduct,
            id_product_duration: selectedVariant[0].id_product_duration,
            qty: quantity,
            subtotal: selectedItemPrice,
            name: name,
            price: selectedVariant[0].price,
            variant: selectedVariant[0].duration_value,
            imgURL: getProductDetail.img_url[0], 
        };

        let newItem = [];
        let isOnCart = false
        if (cartData.data.length > 0) {
            const arrIndex = cartData.data.findIndex(x => x.id_product === idProduct && x.id_product_duration === variant);
            let clonedCart = [...cartData.data];
            
            if (arrIndex >= 0) {
                isOnCart = true;
                if (quantity > 0) {
                    clonedCart[arrIndex] = {...selectedProduct};
                } else {
                    clonedCart.splice(arrIndex, 1);
                }
            } else {
                clonedCart.push(selectedProduct);
            }

            newItem = [...clonedCart];
        } else {
            newItem.push(selectedProduct)
        };

        const totalPriceCart = newItem.reduce((total, item) => {
            return (total += item.subtotal);
        }, 0);

        cartData = {
            id_user: cartData.id_user,
            price: totalPriceCart,
            data: [...newItem],
        };

        // if (userLogin) {
        //     const payload = {
        //         ...selectedProduct,
        //         add_on_detail_id: selectedProduct.add_on_detail_id.map((x) => x.addOnId),
        //         product_id: selectedProduct.id_product,
        //         customer_no: userLogin.customer_no
        //     };
        //     const updateCart = await updateUserCart(outlet, userLogin.customer_no, payload);
        //     if(!updateCart.status) {
        //         AlertService.error(catchError(getProductDetail));
        //         return;
        //     }
        //     selectedProduct.cart_id = updateCart.data.cart_id;
        //     selectedProduct.quantity = updateCart.data.product_buy_quantity;
        // }
        setCartItems(cartData);
        localStorage.setItem('cart_user', JSON.stringify(cartData));
        if (quantity > 0) {
            let message = `Berhasil menambahkan ${name} ke keranjang`
            if(isOnCart) message = `Berhasil mengubah item ${name} di keranjang`
            AlertService.success(
                message
            );
        } else {
            AlertService.success(
                `Berhasil menghapus ${product.name} dari keranjang`
            );
        }
    };

    const onResetCart = async () => {
        // if (userLogin) {
        //     cartItems.data.forEach((x) => {
        //         const payload = {
        //             ...x,
        //             quantity: 0,
        //             add_on_detail_id: x.add_on_detail_id,
        //             product_id: x.id_product,
        //             customer_no: userLogin.customer_no
        //         };
        //         updateUserCart(cartItems.merchantCode, userLogin.customer_no, payload);
        //     })
        // }
        const cartData = {
            id_user: null,
            price: 0,
            data: [],
        };
        localStorage.setItem('cart_user', JSON.stringify(cartData));
        setCartItems(cartData);
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
            // const cart = JSON.parse(localStorage.getItem('cart_user')) || { data: [] };
            // let checkoutItemsId = JSON.parse(localStorage.getItem('checkoutItems'));
            // if (checkoutItemsId) setCheckoutItems(checkoutItemsId);
            // if (userLogin) {
            //     // const outlet = outletCode;
            //     // const getCart = await getUserCart(outlet, userLogin.customer_no);
            //     // cart.data = getCart.data.map((item) => {
            //     //     let add_on_detail_id = [];
            //     //     item.add_on.forEach((addOn) => {
            //     //         addOn.details.forEach((addOnDetail) => {
            //     //             add_on_detail_id.push({
            //     //                 parentId: addOn.id,
            //     //                 addOnId: addOnDetail.id,
            //     //             })
            //     //         }) 
            //     //     });
            //     //     return {
            //     //         ...item,
            //     //         add_on_detail_id,
            //     //         id_product: item.id,
            //     //         img_path: item.image,
            //     //     };
            //     // });
            // }
            // if (cart) {
            //     setCartItems(cart);
            //     localStorage.setItem('cart_user', JSON.stringify(cart));
            // }
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
