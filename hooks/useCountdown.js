import { useEffect, useState } from "react";

let timer;

const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate.replace(/\s/, 'T')).getTime();

    const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

    useEffect(() => {
        timer = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime())
        }, 1000);

        return () => clearInterval(timer);
    }, [countDownDate]);

    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    const hoursFix = String(hours).length === 1 ? `0${hours}` : hours;
    const minutesFix = String(minutes).length === 1 ? `0${minutes}` : minutes;
    const secondsFix = String(seconds).length === 1 ? `0${seconds}` : seconds;

    const isCountdownFinish = hours + minutes + seconds <= 0;

    if (isCountdownFinish) clearInterval(timer);
  
    return {
        hours: hoursFix,
        minutes: minutesFix,
        seconds: secondsFix,
        isCountdownFinish,
    };
};

export default useCountdown;
