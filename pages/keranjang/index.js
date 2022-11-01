import Keranjang from "views/Keranjang";
import { withOutletGSSP } from "helpers/OutletHOC";

export const getServerSideProps = withOutletGSSP(() => {
    return {
        props: {}
    };
});

export default Keranjang;
