import Akun from "views/Akun";
import { coreGSSP } from "helpers/CoreHOC";

export const getServerSideProps = coreGSSP(async ({ req }) => {
    return {
        props: {
            pageTitle: 'PremixStore',
        }
    };
});

export default Akun;
