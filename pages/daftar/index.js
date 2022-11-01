import { withOutletGSSP } from "helpers/OutletHOC";
import Daftar from "views/Auth/Daftar";

export const getServerSideProps = withOutletGSSP(
    async function getServerSideProps({ req, res }) {
        const user = req.session.user;
        if (user) {
            res.writeHead(302, { Location: "/akun" });
            res.end();
        }
        return {
            props: {
                pageID: 1,
            }
        };
    }
);

export default Daftar;
