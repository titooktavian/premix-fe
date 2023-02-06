import Checkout from "views/Checkout";
import { coreGSSP } from "helpers/CoreHOC";

export const getServerSideProps = coreGSSP(async () => {
    return {
        props: {
            pageTitle: 'PremixStore',
        }
    };
});

export default Checkout;
