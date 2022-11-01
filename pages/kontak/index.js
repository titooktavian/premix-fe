import { getListOutlet, getOutletContact } from "helpers/api";
import Kontak from "views/Kontak";
import { withOutletGSSP } from "helpers/OutletHOC";

export const getServerSideProps = withOutletGSSP(async ({req, res}) => {
    const merchantCode = req.session.merchantCode;
    const selectedOutlet = req.session?.selectedOutlet;
    const outletCode = selectedOutlet && (selectedOutlet !== merchantCode) ? selectedOutlet : merchantCode;
    try {
        const [contactRes, listOutlet] = await Promise.all([
            getOutletContact(outletCode),
            getListOutlet(merchantCode),
        ]);
        if (!req.session.enable_website) {
            res.writeHead(200, { Location: "/produk" });
            res.end();
        }
        return {
            props: {
                contact: contactRes.data,
                listOutlet: listOutlet?.data || [],
                selectedOutlet: outletCode,
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

export default Kontak;
