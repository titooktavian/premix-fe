import Checkout from "views/Checkout";
import { withOutletGSSP } from "helpers/OutletHOC";

export const getServerSideProps = withOutletGSSP(() => {
    return {
        props: {}
    };
});

export default Checkout;
