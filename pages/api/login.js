import { withIronSessionApiRoute } from "iron-session/next";
import { authenticate } from "helpers/api";
import { sessionOptions } from "lib/session";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
    const data = await authenticate({
        email: req.body.email,
        password: req.body.password,
    });
    req.session.user = data?.data.user_data;
    req.session.token = data?.data.access_token;
    await req.session.save();
    res.send(data);
}, sessionOptions);
