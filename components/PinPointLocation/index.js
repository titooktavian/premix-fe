import { useState } from "react";
import propTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import {
    GoogleMap,
    Marker,
    useLoadScript
} from "@react-google-maps/api";
import 'react-loading-skeleton/dist/skeleton.css';

import {
    containerStyle,
    defaultPosition,
    libraries,
    setResultData,
} from "./utils";
import { AlertService } from "services";
import SearchCombobox from "./SearchCombobox";

const PinPointLocation = ({ defaultLatLng, defaultSearchValue, onResult }) => {
    const [map, setMap] = useState(null);
    const [selected, setSelected] = useState(defaultLatLng);
    const [inputValue, setInputValue] = useState(defaultSearchValue);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const handleDraggable = (event) => {
        const { latLng } = event;
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
                const address = results[0]?.formatted_address;
                const resultData = setResultData(address, latLng);
                onResult(resultData)
                setInputValue(address);
            } else {
                AlertService.error(status)
            }
        })
    };

    if (!isLoaded) return <Skeleton height={300} />

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultLatLng}
            zoom={14}
            onLoad={(map) => setMap(map)}
        >
            <Marker
                draggable
                position={selected}
                onDragEnd={handleDraggable}
            />
            <SearchCombobox
                customValue={inputValue}
                setSelected={setSelected}
                onResult={onResult}
                onFitBounds={(val) => map.fitBounds(val)}
            />
        </GoogleMap>
    )
};

PinPointLocation.propTypes = {
    defaultSearchValue: propTypes.string,
    onResult: propTypes.func,
    defaultLatLng: propTypes.shape({
        lat: propTypes.number,
        lng: propTypes.number,
    }),
};

PinPointLocation.defaultProps = {
    defaultSearchValue: "",
    onResult: () => {},
    defaultLatLng: defaultPosition,
};

export default PinPointLocation;
