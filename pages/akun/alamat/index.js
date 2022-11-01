import { withOutletGSSP } from "helpers/OutletHOC";
import Alamat from "views/Akun/Alamat";

export const getServerSideProps = withOutletGSSP(
    async function getServerSideProps({ req, res }) {
        const user = req.session.user;
        if (!user) {
            res.writeHead(302, { Location: "/masuk" });
            res.end();
        }

        return {
            props: {
                user,
            }
        };
    }
);

export default Alamat;
