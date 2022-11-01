// import {
//     getOutletProducts,
//     getOutletProductCategories,
//     getOutletHome,
//     getOutletPromos,
//     getListOutlet
// } from "helpers/api";
import Beranda from "views/Beranda";
import { coreGSSP } from "helpers/CoreHOC";

// eslint-disable-next-line no-unused-vars
export const getServerSideProps = coreGSSP(async ({ req }) => {
    // try {
        // const [
        //     products,
        //     categories,
        //     home,
        //     promos,
        //     recomendedProducts,
        //     listOutlet,
        // ] = await Promise.all([
        //     getOutletProducts(outletCode, {
        //         per_page: 4,
        //         page: 1,
        //         sort_type: "desc",
        //         sort_by: "best_seller"
        //     }),
        //     getOutletProductCategories(outletCode),
        //     getOutletHome(outletCode),
        //     getOutletPromos(outletCode),
        //     getOutletProducts(outletCode, {
        //         per_page: 8,
        //         page: 1,
        //         'filter[is_favorite]': 1,
        //         sort_by: "name"
        //     }),
        //     getListOutlet(merchantCode),
        // ]);
        return {
            props: {
                // products: products?.data || [],
                // categories: categories?.data || [],
                // home: home?.data || null,
                // promos: promos?.data || [],
                // recomendedProducts: recomendedProducts?.data || [],
                // listOutlet: listOutlet?.data || [],
                // selectedOutlet: outletCode,
                pageTitle: 'PremixStore',
            }
        };
    // } catch (error) {
    //     return {
    //         notFound: true
    //     };
    // }
});

export default Beranda;