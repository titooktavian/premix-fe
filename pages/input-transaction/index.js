import InputTransaction from "views/InputTransaction";
import { coreGSSP } from "helpers/CoreHOC";

export const getServerSideProps = coreGSSP(async ({ req, res }) => {
    const user = req.session.user;
    if (!user) {
        res.setHeader("location", "/login");
        res.statusCode = 302;
        res.end();

        return {
            props: {},
        };
    }

    return {
        props: {
            pageTitle: 'PremixStore',
        }
    };
});

export default InputTransaction;
