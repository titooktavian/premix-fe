import PeraturanAkunDesign from "views/PeraturanAkunDesign";
import { coreGSSP } from "helpers/CoreHOC";

export const getServerSideProps = coreGSSP(async ({ req }) => {
    return {
        props: {
            pageTitle: 'PremixStore',
        }
    };
});

export default PeraturanAkunDesign;
