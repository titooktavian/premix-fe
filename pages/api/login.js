import { withIronSessionApiRoute } from "iron-session/next";
import { login } from "helpers/api";
import { sessionOptions } from "lib/session";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
    const { merchantCode } = req.session;
    const data = await login({
        phone_no: req.body.phone_no,
        password: req.body.password,
        outlet_code: merchantCode,
    });
    req.session.user = data?.data;
    await req.session.save();
    res.status(data.status_code).send(data);
}, sessionOptions);
