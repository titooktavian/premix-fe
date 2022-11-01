import propTypes from "prop-types";

import { SIZE, VARIANT } from "./enum";
import {
    defaultStyles,
    iconSizeStyles,
    imageSizeStyles,
    sizeStyles,
    variantStyles,
} from "./styles";

const Button = ({
    label,
    className,
    type,
    variant,
    size,
    full,
    disabled,
    iconOnly,
    leftIcon,
    rightIcon,
    leftImage,
    rightImage,
    onClick,
    children,
}) => {
    const classes = [
        defaultStyles,
        variantStyles(variant),
        sizeStyles(size),
        className,
    ];

    if (full) classes.push("w-full");
    if (iconOnly) classes.push("!p-0");

    return (
        <button
            type={type}
            disabled={disabled}
            className={classes.join(",").replace(/,/g, ' ')}
            onClick={onClick}
        >
            { children ? (
                <>{children}</>
            ) : iconOnly || (
                <>
                    {leftIcon && <span className={iconSizeStyles(size, true)}>{leftIcon}</span>}
                    {leftImage && <img className={imageSizeStyles(size, true)} src={leftImage?.src} alt={label} />}
                    {label}
                    {rightIcon && <span className={iconSizeStyles(size)}>{rightIcon}</span>}
                    {rightImage && <img className={imageSizeStyles(size)} src={rightImage?.src} alt={label} />}
                </>
            )
            }
        </button>
    )
};

Button.propTypes = {
    label: propTypes.string,
    className: propTypes.string,
    type: propTypes.string,
    variant: propTypes.string,
    size: propTypes.string,
    full: propTypes.bool,
    disabled: propTypes.bool,
    iconOnly: propTypes.node,
    leftIcon: propTypes.node,
    rightIcon: propTypes.node,
    onClick: propTypes.func,
    leftImage: propTypes.shape({
        type: propTypes.oneOf(["img", "svg"]),
        src: propTypes.string,
    }),
    rightImage: propTypes.shape({
        type: propTypes.oneOf(["img", "svg"]),
        src: propTypes.string,
    }),
    children: propTypes.any,
};

Button.defaultProps = {
    label: "",
    className: "",
    type: "button",
    variant: VARIANT.PRIMARY,
    size: SIZE.MEDIUM,
    full: false,
    disabled: false,
    iconOnly: null,
    leftIcon: null,
    rightIcon: null,
    leftImage: null,
    rightImage: null,
    onClick: () => {},
    children: null,
};

export default Button;
