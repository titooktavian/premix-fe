import KonfirmasiPesanan from "views/KonfirmasiPesanan";
import { coreGSSP } from "helpers/CoreHOC";

export const getServerSideProps = coreGSSP(async () => {
    return {
        props: {
            pageTitle: 'PremixStore',
        }
    };
});

export default KonfirmasiPesanan;
