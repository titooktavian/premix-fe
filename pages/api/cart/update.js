import { updateUserCart } from "helpers/api";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";

export default withIronSessionApiRoute(async function updateCart(req, res) {
    const host = req?.headers?.host || "";
    const subdomain = host.split(".")[0];
    const user = req.session.user;
    const { product } = req.body;
    let cart = req.session.cart || [];
    const indexProduct = cart.findIndex(
        (item) => item.id_product === product.id_product
    );
    product.img_path = Array.isArray(product.img_path)
        ? product.img_path[0] || ""
        : product.img_path;

    if (product?.quantity > 0) {
        if (indexProduct > -1) cart[indexProduct] = product;
        else cart.push(product);
    } else {
        cart = cart.filter((item) => item.id_product != product.id_product);
    }
    if (user) {
        const payload = {
            ...product,
            product_id: product.id_product,
            customer_no: user.customer_no
        };
        await updateUserCart(subdomain, user.customer_no, payload);
    }
    req.session.cart = cart;
    await req.session.save();
    res.send({ cart });
}, sessionOptions);
