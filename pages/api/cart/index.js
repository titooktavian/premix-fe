import {
    getUserCart,
    updateUserCart,
    getOutletProductDetail
} from "helpers/api";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";

export default withIronSessionApiRoute(async function getCart(req, res) {
    const host = req?.headers?.host || "";
    const subdomain = host.split(".")[0];
    const user = req.session.user;
    let cart = req.session.cart || [];

    if (user) {
        const userCart =
            (await fetchUserCart(subdomain, user.customer_no)) || [];
        let difference = cart.filter(
            (x) => !userCart.some((y) => y.id === x.id_product)
        );
        await difference.forEach(async (item) => {
            const status = await getOutletProductDetail(subdomain, {
                id_product: item.id_product
            });
            if (status) {
                const payload = {
                    ...item,
                    product_id: item.id_product,
                    customer_no: user.customer_no
                };
                updateUserCart(subdomain, user.customer_no, payload);
            }
        });
        const newCart = await fetchUserCart(subdomain, user.customer_no) || [];
        cart = newCart.map((item) => {
            return {
                ...item,
                id_product: item.id,
                img_path: item.image
            };
        });
    }
    req.session.cart = cart;
    await req.session.save();
    res.send({ data: { cart: req.session.cart } });
}, sessionOptions);

async function fetchUserCart(subdomain, customer_no) {
    const fetch = await getUserCart(subdomain, customer_no);
    return fetch.data;
}
