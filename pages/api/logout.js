import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";

export default withIronSessionApiRoute(async function logoutRoute(req, res) {
    req.session.user = null;
    req.session.cart = [];
    await req.session.save();
    res.send({ ok: true });
}, sessionOptions);
