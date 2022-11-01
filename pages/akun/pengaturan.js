import { withOutletGSSP } from "helpers/OutletHOC";
import Akun from 'views/Akun';

export const getServerSideProps = withOutletGSSP(
    async function getServerSideProps({ req, res }) {
        const user = req.session.user;
        if (!user) {
            res.writeHead(302, { Location: "/masuk" });
            res.end();
        }

        return {
            props: {
                user
            }
        };
    }
);

export default Akun;
