import propTypes from "prop-types";
const RadioButton = (props) => {
    const { onChange, id, isSelected, label, value, readOnly, disabled } = props;
    return (
        <div className="RadioButton">
            <input
                id={id}
                onChange={onChange}
                value={value}
                type="radio"
                checked={isSelected}
                disabled={disabled || readOnly}
            />
            <label htmlFor={id} className="ml-1">{label}</label>
        </div>
    );
};

RadioButton.propTypes = {
    id: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
    isSelected: propTypes.bool.isRequired,
    value: propTypes.oneOfType([
        propTypes.string,
        propTypes.number,
        propTypes.bool,
    ]),
    readOnly: propTypes.bool,
    disabled: propTypes.bool,
    onChange: propTypes.func,
};

RadioButton.defaultProps = {
    readOnly: false,
    disabled: false,
    onChange: ()=> {},
}
export default RadioButton;