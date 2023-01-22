import propTypes from "prop-types";
import PromoCardCheckout from "./PromoCardCheckout";

const ListPromo = ({ promos, setPromo, selectedPromo }) => {
    const promosAuto = promos.filter((x) => (x.promo_is_auto && x.is_available));
    const promosAvailable = promos.filter((x) => (!x.promo_is_auto && x.is_available));
    const promosUnavailable = promos.filter((x) => (!x.is_available));
    return (
        <>  
            {promosAuto.length > 0 && (
                <>
                    <h2 className="mb-2 font-bold text-dark-300">Promo Otomatis Aktif</h2>
                    {promosAuto.map((promo) => (
                        <PromoCardCheckout key={promo.promo_id} {...promo} isActive/>
                    ))}
                </>
            )}
            {promosAvailable.length > 0 && (
                <>
                    <h2 className="mb-2 font-bold text-dark-300">Promo untuk Kamu</h2>
                    {promosAvailable.map((promo) => (
                        <PromoCardCheckout key={promo.promo_id} {...promo} isActive={!!selectedPromo.find(x => x.promo_id === promo.promo_id)} onSelectPromo={() => setPromo(promo)}/>
                    ))}
                </>
            )}
            {promosUnavailable.length > 0 && (
                <>
                    <h2 className="mb-2 font-bold text-dark-300">Promo yang belum bisa dipakai</h2>
                    {promosUnavailable.map((promo) => (
                        <PromoCardCheckout key={promo.promo_id} {...promo} isDisabled/>
                    ))}
                </>
            )}
        </>
    )
};

ListPromo.propTypes = {
    promos: propTypes.array,
    setPromo: propTypes.func,
    selectedPromo: propTypes.array,
};

ListPromo.defaultProps = {
    promos: [],
    setPromo: () => {},
    selectedPromo: [],
}
export default ListPromo;