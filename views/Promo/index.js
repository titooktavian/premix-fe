import { ListOutlet, PromoCard } from "components";
import PropTypes from "prop-types";

const Index = ({ promos, listOutlet }) => {
    return (
        <>
            <section className="md:mx-auto md:max-w-[960px]">
                <ListOutlet listOutlet={listOutlet} />
            </section>
            <div className="md:mx-auto md:w-[960px]">
                <h4 className="text-lg font-bold">Promo</h4>
                {promos.length > 0 ? (
                    <div className="mt-2 grid gap-4 md:grid-cols-2">
                        {promos?.map((promo) => (
                            <PromoCard
                                key={promo.promo_id}
                                className="w-full cursor-pointer"
                                {...promo}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-4">
                        Saat ini tidak ada promo yang tersedia
                    </div>
                )}
            </div>
        </>
    );
};

Index.propTypes = {
    promos: PropTypes.array
};

Index.defaultProps = {
    promos: []
};

export default Index;
