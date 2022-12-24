import PeraturanAkunHosting from "views/PeraturanAkunHosting";
import { coreGSSP } from "helpers/CoreHOC";

export const getServerSideProps = coreGSSP(async ({ req }) => {
    return {
        props: {
            pageTitle: 'PremixStore',
        }
    };
});

export default PeraturanAkunHosting;
