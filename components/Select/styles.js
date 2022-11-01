const turqColor = "#00B7B5";

const customStyles = (readOnly) => ({
    control: (styles, { isFocused, isDisabled }) => {
        let borderColor = "#B0BEC5";
        if (isDisabled && !readOnly) borderColor = "#ECEFF1";
        else if (isFocused && !readOnly) borderColor = turqColor;
        return {
            ...styles,
            backgroundColor: isDisabled || readOnly ? "#F6F8FD" : "white",
            borderWidth: "1px",
            borderColor,
            borderRadius: "4px",
            boxShadow: "none",
            boxSizing: "border-box",
            cursor: "pointer",
            height: 48,
            padding: "0 12px",
            ':hover': {
                borderColor: turqColor,
            }   
        }
    },
    indicatorSeparator: () => ({
        display: "none",
    }),
    dropdownIndicator: (styles) => ({
        ...styles,
        padding: 0,
    }),
    placeholder: (styles, { isDisabled }) => ({
        ...styles,
        color: isDisabled && !readOnly ? "#78909C" : "#263238",
        fontSize: 14,
        fontWeight: 500,
    }),
    valueContainer: (styles) => ({
        ...styles,
        padding: 0,
    }),
    noOptionsMessage: () => ({
        alignItems: "center",
        color: "#A5ABAB",
        display: "flex",
        fontSize: 14,
        fontWeight: 400,
        padding: "8px 16px",
    }),
    menu: () => ({
        backgroundColor: "white",
        borderRadius: 4,
        boxShadow: "0px 0px 8px rgba(131, 131, 131, 0.16)",
        position: "absolute",
        width: "100%",
        zIndex: 9,
    }),
    option: (_, state) => {
        return {
            borderBottom: "1px solid #ECEFF1",
            color: state.isSelected ? turqColor : "##263238",
            fontSize: 14,
            fontWeight: 500,
            margin: "0 16px",
            padding: "14px 0",
            cursor: "pointer",
            transition: "0.2s",
            ':hover': {
                backgroundColor: "#F6F8FD"
            }
        }
    },
    singleValue: (styles) => ({
        ...styles,
        fontSize: 15,
    }),
});

export default customStyles;
