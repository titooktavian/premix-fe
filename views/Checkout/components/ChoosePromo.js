import { Button } from "components";
import Image from "next/image";
import propTypes from "prop-types";

const ChoosePromo = ({selectedPromo}) => {
    return (
        <>
            <h2 className="my-4 text-base font-bold text-dark-300 md:px-2 md:my-0">
                Pilih Promo
            </h2>
            <div>
                <Button size="lg" full variant="promo">
                    {selectedPromo.length > 0 ? (
                        <>
                            <Image width={25} height={20} src="/images/promo.png"/>
                            {selectedPromo.length} Promo dipakai
                        </>
                    ) : 'Makin hemat pakai promo'}
                </Button>
            </div>
        </>
    )
};

ChoosePromo.propTypes = {
    selectedPromo: propTypes.array,
};

ChoosePromo.defaultProps = {
    selectedPromo: [],
}

export default ChoosePromo;