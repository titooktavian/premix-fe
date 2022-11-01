import { withOutletGSSP } from "helpers/OutletHOC";
import Daftar from "views/Auth/Daftar";

export const getServerSideProps = withOutletGSSP(
    async function getServerSideProps({ req, res, query }) {
        const user = req.session.user;
        if (user) {
            res.writeHead(302, { Location: "/akun" });
            res.end();
        }
        const { page } = query;
        return {
            props: {
                pageID: page === "1" ? 2 : 3,
            }
        };
    }
);

export default Daftar;
