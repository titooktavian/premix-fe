import { withOutletGSSP } from "helpers/OutletHOC";
import UbahAlamat from "views/Akun/pages/UbahAlamat";

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

export default UbahAlamat;
