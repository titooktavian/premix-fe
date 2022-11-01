import { useState, useEffect } from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox"
import "@reach/combobox/styles.css";

import { searchInputStyle, setResultData } from "./utils";

const SearchCombobox = ({ customValue, setSelected, onFitBounds, onResult }) => {
    const [isSuggestion, setIsSuggestion] = useState(true);

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    useEffect(() => {
        setIsSuggestion(false);
        setValue(customValue);
    }, [customValue]);

    const handleSelect = async (address) => {
        setIsSuggestion(true);
        setValue(address, false);
        clearSuggestions();
    
        const bounds = new window.google.maps.LatLngBounds();

        const results = await getGeocode({ address });

        results.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }

            const resultData = setResultData(place.formatted_address, place.geometry.location);
            onResult(resultData)

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

            const { lat, lng } = getLatLng(place);
            setSelected({ lat, lng });
            onFitBounds(bounds);
        })
    };

    const handleChangeInput = (event) => {
        const { value } = event.target;
        setIsSuggestion(true);
        setValue(value);
    }

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                style={searchInputStyle}
                value={value}
                onChange={handleChangeInput}
                disabled={!ready}
                className="combobox-input"
                placeholder="Search google maps"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" && isSuggestion && data.map(({ place_id, description }) => (
                        <ComboboxOption key={place_id} value={description} />
                    ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    )
}

export default SearchCombobox;
