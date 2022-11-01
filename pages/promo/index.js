import { getListOutlet, getOutletPromos } from "helpers/api";
import { withOutletGSSP } from "helpers/OutletHOC";
import Promo from "views/Promo";

export const getServerSideProps = withOutletGSSP(async ({ req }) => {
    const merchantCode = req.session.merchantCode;
    const selectedOutlet = req.session?.selectedOutlet;
    const outletCode = selectedOutlet && (selectedOutlet !== merchantCode) ? selectedOutlet : merchantCode;
    try {
        const [promos, listOutlet] = await Promise.all([
            getOutletPromos(outletCode),
            getListOutlet(merchantCode),
        ]);
        return {
            props: {
                promos: promos?.data || [],
                listOutlet: listOutlet?.data || [],
                selectedOutlet: outletCode,
            }
        };
    } catch (error) {
        console.error(error);
        return {
            notFound: true
        };
    }
});

export default Promo;
