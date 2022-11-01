import { Divider, Footer, PromoCard } from "components";
import { TYPE_PROMO } from "components/PromoCard/enum";
import { toRupiah } from "helpers/formatter";
import useResponsive from "hooks/useResponsive";
import Link from "next/link";
import PropTypes from "prop-types";

const PromoDetail = (props) => {
    const { 
        nama_promo, 
        deskripsi_promo, 
        onRequestClose, 
        tipe_bonus,
        kriteria_min,
        value_kriteria_min,
        kelipatan,
        tgl_mulai,
        tgl_selesai,
        tipe_bonus_item_nama,
        value_tipe_bonus,
    } = props;
    const { isMobile } = useResponsive();
    const minimum  = kriteria_min === 'quantity' ? `${value_kriteria_min} Produk` : toRupiah(value_kriteria_min);
    const start_date = new Date(tgl_mulai);
    const end_date = new Date(tgl_selesai);

    const str_start_date = start_date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    const str_end_date = end_date.toLocaleDateString('id-ID', { year: 'numeric', day: 'numeric', month: 'short'});
    const promo_time = `${str_start_date} - ${str_end_date}`;
    let free_products = [];
    if (tipe_bonus_item_nama.length > 0) {
        const free_product_names = tipe_bonus_item_nama.slice(0, 3);
        free_product_names.forEach(free_product => {
            free_products.push(free_product.nama_item)
        });
    }
    const renderSwitch = () => {
        switch(tipe_bonus.toUpperCase()) {
        case TYPE_PROMO.PRODUCT:
            return (
                <>
                    {free_products.length === 1 ? (
                        <>
                            Gratis Produk {free_products[0]}
                        </>
                    ):(
                        <>  
                            Gratis Produk
                            <ul>
                                {free_products.map((product, index) =>(
                                    <li key={`free-${product}-${index}`}>
                                        {product}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </>
            );
        case TYPE_PROMO.PERCENT:
            return value_tipe_bonus + "%";
        case TYPE_PROMO.NOMINAL:
            return toRupiah(value_tipe_bonus);
        default:
            return '-';
        }
    }
    const closePopup = () => {
        onRequestClose();
    };
    return (
        <div className="relative md:min-h-0">
            <div className="flex flex-col">
                <PromoCard
                    className="shadow-xl md:fixed md:top-0 md:left-0 md:w-full"
                    {...props}
                />
                <div className="mt-10 md:mt-20 md:px-4">
                    <div className="pb-2">
                        <h4 className="text-lg font-bold">{nama_promo}</h4>
                        <div className="flex flex-row justify-between py-3 text-sm text-neutral-400">
                            <div>Periode Promo</div>
                            <div>{promo_time}</div>
                        </div>
                    </div>
                    <Divider />
                    <div className="py-2">
                        <h4 className="py-2 text-lg font-bold">
                            Deskripsi Promo
                        </h4>
                        <div className="py-1 md:py-2 text-dark-400 font-normal">
                            {deskripsi_promo}
                        </div>
                    </div>
                    <Divider />
                    <div className="py-2">
                        <h4 className="py-2 text-lg font-bold">
                            Syarat Promo
                        </h4>
                        <div className="py-1 md:py-2 text-dark-400 font-normal">
                            <table>
                                <tr>
                                    <td className="py-1">Minimal Pembelian</td>
                                    <td className="px-2.5 align-middle">:</td>
                                    <td className="py-1">{minimum}</td>
                                </tr>
                                <tr>
                                    <td className="py-1">Nilai Potongan Produk</td>
                                    <td className="px-2.5 align-middle">:</td>
                                    <td className="py-1">
                                        {renderSwitch()}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-1" colSpan="3">{`${kelipatan ? '' : 'Tidak' } Berlaku Kelipatan`}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    {tipe_bonus.toUpperCase() === TYPE_PROMO.PRODUCT && (
                        <>
                            <Divider />
                            <div className="py-2">
                                <h4 className="py-2 text-lg font-bold">
                                    Informasi Produk Diskon
                                </h4>
                                <div className="py-1 text-dark-400 font-normal">
                                    Produk yang mendapatkan diskon adalah produk dengan badge khusus
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="my-10">
                    <Link href="/produk">
                        <a className="mx-auto flex items-center justify-center rounded-full bg-turq-300 p-4 md:w-fit md:px-20" onClick={closePopup}>
                            <p className="ptext-base font-bold text-white">
                                Pesan Sekarang
                            </p>
                        </a>
                    </Link>
                </div>
            </div>
            {isMobile && (
                <div className="fixed -left-4 bottom-0 w-[calc(100%+32px)]">
                    <Footer />
                </div>
            )}
        </div>
    );
};

PromoDetail.propTypes = {
    nama_promo: PropTypes.string,
    deskripsi_promo: PropTypes.string,
    onRequestClose: PropTypes.func.isRequired,
};

PromoDetail.defaultProps = {
    nama_promo: "",
    deskripsi_promo: "",
};
export default PromoDetail;
