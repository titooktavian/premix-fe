export const libraries = ["places"];

export const containerStyle = {
    height: '300px',
    position: "relative",
    width: '100%',
};

export const defaultPosition = {
    lat: -6.175733730429912,
    lng: 106.82715280000001,
};

export const searchInputStyle = {
    backgroundColor: "white",
    borderRadius: 4,
    border: "1px solid #ddd",
    bottom: 10,
    boxShadow: "1px 2px 12px rgba(0, 0, 0, 0.2)",
    boxSizing: "border-box",
    fontSize: 14,
    left: 10,
    outline: "none",
    padding: "10px 15px",
    position: "absolute",
    width: "calc(100% - 100px)",
};

export const setResultData = (address, latLng) => {
    return {
        address,
        latitude: latLng.lat(),
        longitude: latLng.lng(), 
    };
};
