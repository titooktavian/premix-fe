import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";

export default withIronSessionApiRoute(async function setOutlet(req, res) {
    const { outletCode } = req.query;
    if(outletCode) {
        req.session.selectedOutlet = outletCode;
        await req.session.save();
    }
    res.send({ outletCode: req.session.selectedOutlet });
}, sessionOptions);
