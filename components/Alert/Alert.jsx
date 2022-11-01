import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { AlertService, AlertType } from "services";
import { BsExclamationOctagonFill } from "react-icons/bs";

Alert.propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

Alert.defaultProps = {
    id: "default-alert",
    fade: true
};

export default function Alert({ id, fade }) {
    const mounted = useRef(false);
    const router = useRouter();
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        mounted.current = true;

        // subscribe to new alert notifications
        const subscription = AlertService.onAlert(id).subscribe((alert) => {
            // clear alerts when an empty alert is received
            if (!alert.message) {
                setAlerts((alerts) => {
                    // filter out alerts without 'keepAfterRouteChange' flag
                    const filteredAlerts = alerts.filter(
                        (x) => x.keepAfterRouteChange
                    );

                    // remove 'keepAfterRouteChange' flag on the rest
                    return omit(filteredAlerts, "keepAfterRouteChange");
                });
            } else {
                // add alert to array with unique id
                alert.itemId = Math.random();
                setAlerts((alerts) => [...alerts, alert]);

                // auto close alert if required
                if (alert.autoClose) {
                    setTimeout(() => removeAlert(alert), 2000);
                }
            }
        });

        // clear alerts on location change
        const clearAlerts = () => AlertService.clear(id);
        router.events.on("routeChangeStart", clearAlerts);

        // clean up function that runs when the component unmounts
        return () => {
            mounted.current = false;

            // unsubscribe to avoid memory leaks
            subscription.unsubscribe();
            router.events.off("routeChangeStart", clearAlerts);
        };
    }, []);

    function omit(arr, key) {
        return arr.map((obj) => {
            // eslint-disable-next-line no-unused-vars
            const { [key]: omitted, ...rest } = obj;
            return rest;
        });
    }

    function removeAlert(alert) {
        if (!mounted.current) return;

        if (fade) {
            // fade out alert
            setAlerts((alerts) =>
                alerts.map((x) =>
                    x.itemId === alert.itemId ? { ...x, fade: true } : x
                )
            );

            // remove alert after faded out
            setTimeout(() => {
                setAlerts((alerts) =>
                    alerts.filter((x) => x.itemId !== alert.itemId)
                );
            }, 250);
        } else {
            // remove alert
            setAlerts((alerts) =>
                alerts.filter((x) => x.itemId !== alert.itemId)
            );
        }
    }

    function cssClasses(alert) {
        if (!alert) return;

        const classes = ["alert", "alert-dismissable"];

        const alertTypeClass = {
            [AlertType.Success]:
                "bg-green-100  border-green-400 text-green-700",
            [AlertType.Error]: "bg-red-100  border-red-400 text-red-700",
            [AlertType.Info]: "bg-turq-100  border-turq-400 text-turq-700",
            [AlertType.Warning]:
                "bg-neutral-100  border-neutral-400 text-neutral-700"
        };

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push("fade");
        }

        return classes.join(" ");
    }

    if (!alerts.length) return null;

    return (
        <div className="fixed top-20 left-1/2 z-alert min-w-fit -translate-x-1/2 transform">
            {alerts.map((alert, index) => (
                <div key={index} role="alert">
                    <div
                        className={`relative mx-4 flex rounded border py-2 px-4 ${cssClasses(
                            alert
                        )}`}
                    >   
                        <BsExclamationOctagonFill className="m-auto text-base" />
                        <span
                            className="mx-2 sm:inline font-semibold"
                            dangerouslySetInnerHTML={{ __html: alert.message }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
