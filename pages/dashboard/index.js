import Dashboard from "views/Dashboard";
import { coreGSSP } from "helpers/CoreHOC";

export const getServerSideProps = coreGSSP(
    async function getServerSideProps({ req, res }) {
        const { user } = req.session;
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
    }
);

export default Dashboard;
