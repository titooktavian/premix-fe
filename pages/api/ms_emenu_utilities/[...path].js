import fetchApi from "helpers/config";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session"

export default withIronSessionApiRoute(async function localProxy (req, res) {
    const url = process.env.SERVICE_URL + req.url.replace(/^\/api\/ms_emenu_utilities/, "");
    const data = await fetchApi(url, req.body || {}, req.method.toLowerCase());
    if (data) res.status(data.status_code).send(data);
    else res.status(404).send({ message: "URL Not Found"});
}, sessionOptions);