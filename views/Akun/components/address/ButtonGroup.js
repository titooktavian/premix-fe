import { useRouter } from "next/router";
import propTypes from "prop-types";

import { Button } from "components";

const ButtonGroup = ({
    formErrors,
    values: {
        label, name, phone, address, province, city, district, postalCode,
    },
}) => {
    const router = useRouter();

    const disabledButton = label === "" ||name === "" || phone === "" || address === "" || province === "" || city === "" || district === "" || postalCode === "" || JSON.stringify(formErrors) !== "{}";

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-5 items-center mt-6">
            <Button
                full
                label="Kembali"
                size="lg"
                variant="secondary"
                onClick={() => router.back()}
            />
            <Button
                full
                label="Simpan"
                size="lg"
                type="submit"
                disabled={disabledButton}
            />
        </div>
    )
};

ButtonGroup.propTypes = {
    formErrors: propTypes.shape({}),
    values: propTypes.shape({}),
};

ButtonGroup.defaultProps = {
    formErrors: {},
    values: {},
};

export default ButtonGroup;
