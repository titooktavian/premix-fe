import PeraturanMultiHosting from "views/PeraturanMultiHosting";
import { coreGSSP } from "helpers/CoreHOC";

export const getServerSideProps = coreGSSP(async ({ req }) => {
    return {
        props: {
            pageTitle: 'PremixStore',
        }
    };
});

export default PeraturanMultiHosting;
