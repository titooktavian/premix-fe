import { useEffect } from "react";
import propTypes from "prop-types";

import useCountdown from "hooks/useCountdown";

const CountDownTimer = ({ expiredDate, onCountdownFinish }) => {
    const { hours, minutes, seconds, isCountdownFinish } = useCountdown(expiredDate);

    useEffect(() => {
        if (isCountdownFinish) onCountdownFinish();
    }, [isCountdownFinish]);

    if (isCountdownFinish) {
        return (
            <div className="p-3 bg-red-100 rounded-lg mt-2 mb-3">
                <p className="text-sm text-center text-dark-300 font-bold">Batas waktu pembayaran telah habis</p>
            </div>
        )
    }

    return (
        <div className="p-3 bg-red-100 rounded-lg mt-2 mb-3">
            <p className="text-sm text-center text-dark-300 font-bold">Batas Akhir Pembayaran {hours}:{minutes}:{seconds}</p>
        </div>
    )
};

CountDownTimer.propTypes = {
    expiredDate: propTypes.string.isRequired,
    onCountdownFinish: propTypes.func,
};

CountDownTimer.defaultProps = {
    onCountdownFinish: () => {},
};

export default CountDownTimer;
