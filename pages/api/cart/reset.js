import { updateUserCart } from "helpers/api";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";

export default withIronSessionApiRoute(async function resetCart(req, res) {
    const host = req?.headers?.host || "";
    const subdomain = host.split(".")[0];
    const user = req.session.user;
    let cart = req.session.cart || [];

    if (user) {
        cart.forEach((product) => {
            const payload = {
                ...product,
                product_id: product.id_product,
                customer_no: user.customer_no
            };
            updateUserCart(subdomain, user.customer_no, payload);
        });
    }

    req.session.cart = [];
    await req.session.save();
    res.send({ cart });
}, sessionOptions);
