import { Component } from "react";
import { getOutletByDomain, getOutletInfo } from "./api";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";

export default function withOutlet(ComposedComponent) {
    return class WithOutlet extends Component {
        render() {
            return <ComposedComponent {...this.props} />;
        }
    };
}
export const withOutletGSSP = (gssp) =>
    withIronSessionSsr(async function (context) {
        const { req } = context;
        const host = req?.headers?.host || "";
        const user = req.session?.user || null;
        const envHost = process.env.NEXT_PUBLIC_ENV_URL;
        let subdomain = host.split(".")[0];
        let merchantCode = subdomain;
        let fetchOutletInfo;
        try {
            if (host.includes(envHost)) {
                const { data: outlet_code } = await getOutletByDomain(host);
                subdomain = outlet_code || subdomain;
            }
            fetchOutletInfo = await getOutletInfo(subdomain);
            if (!fetchOutletInfo?.data) {
                throw fetchOutletInfo;
            }
            req.session.merchantCode = await fetchOutletInfo.data.outlet_primary_code;
            req.session.enable_website = await fetchOutletInfo.data.enable_website;
            await req.session.save();
            merchantCode = req.session.merchantCode;
        } catch (error) {
            console.log(error);
            const status = error?.status_code || 500;
            return {
                redirect: {
                    destination: `/${status}`
                }
            };
        }
        const gsspData = await gssp(context);
        return {
            props: {
                ...gsspData.props,
                outletInfo: fetchOutletInfo.data || undefined,
                user,
                merchantCode
            }
        };
    }, sessionOptions);
