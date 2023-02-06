import CaraBayar from "views/CaraBayar";
import { coreGSSP } from "helpers/CoreHOC";

export const getServerSideProps = coreGSSP(async () => {
    return {
        props: {
            pageTitle: 'PremixStore',
        }
    };
});

export default CaraBayar;
