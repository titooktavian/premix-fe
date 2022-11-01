import { withOutletGSSP } from "helpers/OutletHOC";
import Masuk from "views/Auth/Masuk";

export const getServerSideProps = withOutletGSSP(
    async function getServerSideProps({ req, res }) {
        const user = req.session.user;
        if (user) {
            res.writeHead(302, { Location: "/akun" });
            res.end();
        }
        return {
            props: {}
        };
    }
);

export default Masuk;
