import { withOutletGSSP } from "helpers/OutletHOC";
import UbahNomor from "views/Akun/pages/UbahNomor";

export const getServerSideProps = withOutletGSSP(
    async function getServerSideProps({ req, res, query }) {
        const user = req.session.user;
        if (!user) {
            res.writeHead(302, { Location: "/masuk" });
            res.end();
        }
        const { otp } = query;
        return {
            props: {
                user,
                pageID: otp === "true" ? 2 : 1,
            }
        };
    }
);

export default UbahNomor;
