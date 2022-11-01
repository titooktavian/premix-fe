import { withOutletGSSP } from "helpers/OutletHOC";
import TambahAlamat from "views/Akun/pages/TambahAlamat";

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

export default TambahAlamat;
