import { Component } from "react";
import { getOutletByDomain, getOutletInfo } from "./api";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";

export const coreGSSP = (gssp) =>
    withIronSessionSsr(async function (context) {
        const { req } = context;
        const user = req.session?.user || null;
        const gsspData = await gssp(context);

        return {
            props: {
                ...gsspData.props,
                user,
            }
        };
    }, sessionOptions);
