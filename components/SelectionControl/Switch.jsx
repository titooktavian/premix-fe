import classNames from "classnames";
import propTypes from "prop-types";

const Switch = ({ label, disabled, topSpace, checked, onChange }) => {
    const handleChange = (event) => {
        if (disabled) return;
        const { checked } = event.target;
        onChange(checked || false);
    }
    return (
        <div className={classNames("majooshop-switch-button flex flex-row items-center justify-between", { "mt-3": topSpace })}>
            <span className="text-sm font-medium text-dark-300">{label}</span>
            <label className="switch">
                <input type="checkbox" checked={checked} onChange={handleChange} />
                <span className={classNames("weborder-slider round", { "cursor-not-allowed": disabled }, { "cursor-pointer": !disabled })} />
            </label>
        </div>
    )
};

Switch.propTypes = {
    label: propTypes.string,
    disabled: propTypes.bool,
    topSpace: propTypes.bool,
    checked: propTypes.bool,
    onChange: () => {},
};

Switch.defaultProps = {
    label: "",
    disabled: false,
    topSpace: true,
    checked: false,
    onChange: () => {},
};

export default Switch;
