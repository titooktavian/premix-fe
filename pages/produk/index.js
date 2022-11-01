import {
    getListOutlet,
    getOutletProductCategories,
    getOutletPromos
} from "helpers/api";
import Produk from "views/Produk";
import { withOutletGSSP } from "helpers/OutletHOC";

export const getServerSideProps = withOutletGSSP(async ({req}) => {
    const merchantCode = req.session?.merchantCode;
    const selectedOutlet = req.session?.selectedOutlet;
    const outletCode = selectedOutlet && (selectedOutlet !== merchantCode) ? selectedOutlet : merchantCode;
    try {
        const [categories, promos, listOutlet] = await Promise.all([
            getOutletProductCategories(outletCode),
            getOutletPromos(outletCode),
            getListOutlet(merchantCode),
        ]);
        return {
            props: {
                categories: categories?.data || [],
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

export default Produk;
