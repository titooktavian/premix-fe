import PropTypes from "prop-types";
import { FaWhatsapp } from "react-icons/fa";
import { REFERENCE_DAYS } from "../../constants";
import { IconContext } from "react-icons/lib";
import { ListOutlet } from "components";
import {
    GoogleMap,
    Marker,
    useLoadScript
} from "@react-google-maps/api";
import Skeleton from "react-loading-skeleton";
const Index = ({ contact, listOutlet }) => {
    const {
        address,
        active_day,
        sosial_media,
        email,
        phone_number,
        whatsapp_number,
        latitude,
        longitude,
    } = contact;
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });
    const selected = {
        lat: Number(latitude),
        lng: Number(longitude),
    };
    const containerStyle = {
        height: '100%',
        width: '100%',
    };

    return (
        <>
            <section className="md:mx-auto md:max-w-[960px]">
                <ListOutlet listOutlet={listOutlet} />
            </section>
            <div className="flex-1 md:mx-auto md:w-[960px]">
                <h4 className="py-2.5 text-xl font-bold">Hubungi Kami</h4>
                <div className="flex flex-col md:flex-row">
                    {(latitude && longitude) && (
                        <section className="w-full min-w-full h-[200px] md:min-w-[450px] md:h-[400px] md:px-4">
                            {isLoaded ? (
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={selected}
                                    zoom={17}
                                >
                                    <Marker
                                        position={selected}
                                    />
                                </GoogleMap>
                            ) : (
                                <Skeleton height={300} />
                            )}

                        </section>
                    )}
                    <div className="flex flex-col md:px-4">
                        <section className="py-2.5">
                            <span className="text-xs">Alamat:</span>
                            <h5 className="text-sm font-medium break-word">{address}</h5>
                        </section>
                        <section className="py-2.5">
                            <span className="text-xs">Jam Buka:</span>
                            <ul>
                                {active_day && active_day.map((day) => (
                                    <li
                                        key={day.day_of_week}
                                        className="flex justify-between pt-2 text-sm font-medium"
                                    >
                                        <label className="mb-1">
                                            {REFERENCE_DAYS[day.day_of_week]}
                                        </label>
                                        <span>
                                            {day.is_active ? 
                                                day.detail.map((time,index) => (
                                                    <p key={day+index}>
                                                        {time.start} - {time.end}
                                                    </p>
                                                ))
                                                : (
                                                    <span>Tutup</span>
                                                )}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section className="py-2.5">
                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                    <span className="py-1 text-xs">Telepon:</span>
                                    <a
                                        href={`tel:${phone_number}`}
                                        className="text-sm font-bold text-turq-300"
                                    >
                                        {phone_number}
                                    </a>
                                </div>
                                {whatsapp_number && (
                                    <a
                                        href={`https://api.whatsapp.com/send?phone=${whatsapp_number}}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="visible flex h-[40px] w-[140px] items-center rounded-[30px] bg-gradient-to-r from-green-300 to-turq-200 py-0 px-6 text-base text-white"
                                    >
                                        <IconContext.Provider
                                            value={{
                                                size: "2rem",
                                            }}
                                        >
                                            <FaWhatsapp />
                                        </IconContext.Provider>
                                    &nbsp;
                                        <span>Whatsapp</span>
                                    </a>
                                )}
                            </div>
                        </section>
                        <section className="flex flex-col py-2.5">
                            <span className="py-1 text-xs">Email:</span>
                            <a
                                href={`mailto:${email}`}
                                className="text-sm font-bold text-turq-300"
                            >
                                {email}
                            </a>
                        </section>
                        {(sosial_media && sosial_media.length) > 0 && (
                            <section className="py-2.5">
                                <span className="text-xs">Follow Social Media:</span>
                                <div className="flex">
                                    {sosial_media.map((media) => (
                                        <a
                                            key={media.sosial_name}
                                            href={media.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-1"
                                        >
                                            <img src={media.image_path} />
                                        </a>
                                    ))}
                                </div>
                            </section>

                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

Index.propTypes = {
    contact: PropTypes.shape({
        address: PropTypes.string,
        active_day: PropTypes.array,
        sosial_media: PropTypes.array,
        email: PropTypes.string,
        phone_number: PropTypes.string,
        whatsapp_number: PropTypes.string
    })
};

Index.defaultProps = {
    contact: {
        address: "",
        active_day: [],
        sosial_media: [],
        email: "",
        phone_number: "",
        whatsapp_number: ""
    }
};

export default Index;
