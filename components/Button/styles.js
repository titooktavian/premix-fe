import classNames from "classnames";
import { SIZE, TEXT_LIGHT, VARIANT } from "./enum";

export const defaultStyles = "rounded-full justify-center flex items-center box-border font-bold transition duration-200 disabled:text-neutral-400 disabled:bg-neutral-200 disabled:cursor-not-allowed focus:outline focus:outline-1 focus:outline-[#D7EAFC]";

export const variantStyles = (variant) => classNames(
    { "text-white" : TEXT_LIGHT.includes(variant) },
    { "text-dark-300" : variant === VARIANT.SECONDARY || variant === VARIANT.GHOST },
    { "text-red-300" : variant === VARIANT.SECONDARY_NEGATIVE },
    { "text-dark-100" : variant === VARIANT.GHOST_NEGATIVE },
    { "bg-turq-300 hover:bg-[#009B9A] active:bg-turq-400" : variant === VARIANT.PRIMARY },
    { "bg-neutral-100 hover:bg-[#EEFFFF] active:bg-[#DAFFFF]" : variant === VARIANT.SECONDARY },
    { "bg-white border border-neutral-300" : variant === VARIANT.GHOST || variant === VARIANT.GHOST_NEGATIVE },
    { "bg-red-300 hover:bg-[#E64C2A] active:bg-[#B83C21] " : variant === VARIANT.PRIMARY_NEGATIVE },
    { "bg-neutral-100 hover:bg-[#FFE4DE] active:bg-[#FFBBAC]" : variant === VARIANT.SECONDARY_NEGATIVE },
    { "border border-orange-300 text-orange-300": variant === VARIANT.PROMO },
);

export const sizeStyles = (size) => classNames(
    { "text-xs h-6 px-4" : size === SIZE.XS },
    { "text-xs h-[31px] px-4" : size === SIZE.SMALL },
    { "text-sm h-[42px] px-4" : size === SIZE.MEDIUM },
    { "text-base h-12 px-6" : size === SIZE.LARGE },
);

export const iconSizeStyles = (size, isLeft) => classNames(
    { "text-xs" : size === SIZE.XS },
    { "text-sm" : size === SIZE.SMALL },
    { "text-base" : size === SIZE.MEDIUM },
    { "text-xl" : size === SIZE.LARGE },
    { "mr-1" : isLeft && (size === SIZE.XS) },
    { "mr-2" : isLeft && (size === SIZE.SMALL || size === SIZE.MEDIUM) },
    { "mr-3" : isLeft && (size === SIZE.LARGE) },
    { "ml-1" : !isLeft && (size === SIZE.XS) },
    { "ml-2" : !isLeft && (size === SIZE.SMALL || size === SIZE.MEDIUM) },
    { "ml-3" : !isLeft && (size === SIZE.LARGE) },
);

export const imageSizeStyles = (size, isLeft) => classNames(
    { "mr-1" : isLeft && size === SIZE.XS },
    { "mr-2" : isLeft && (size === SIZE.SMALL || size === SIZE.MEDIUM) },
    { "mr-3" : isLeft && size === SIZE.LARGE },
    { "ml-1" : !isLeft && size === SIZE.XS },
    { "ml-2" : !isLeft && (size === SIZE.SMALL || size === SIZE.MEDIUM) },
    { "ml-3" : !isLeft && size === SIZE.LARGE },
);
