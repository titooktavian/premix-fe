import { getOutletAbout } from "../../helpers/api";
import Tentang from "views/Tentang";
import { withOutletGSSP } from "helpers/OutletHOC";

export const getServerSideProps = withOutletGSSP(async ({ req, res }) => {
    const outletCode = req.session.merchantCode;
    try {
        const [aboutRes] = await Promise.all([
            getOutletAbout(outletCode)
        ]);
        if (!req.session.enable_website) {
            res.writeHead(200, { Location: "/produk" });
            res.end();
        }
        return {
            props: {
                about: aboutRes.data,
            }
        };
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: "/404"
            }
        };
    }
});

export default Tentang;
