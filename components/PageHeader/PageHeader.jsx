import propTypes from "prop-types";

const PaheHeader = ({ title, subtitle }) => {
    return (
        <section className="-mx-4 mb-4 p-4 md:mx-0">
            <div className="md:mx-auto md:max-w-[1110px] px-4">
                <div
                    className="flex flex-col w-full h-[150px] md:h-[220px] bg-contain md:bg-fill bg-right bg-[#272541] bg-no-repeat rounded-3xl text-white justify-center p-3 md:p-10"
                    style={{
                        backgroundImage: `url('/images/carousel/bg.png')`,
                    }}
                >
                    <div className="font-bold text-base md:text-3xl">{title}</div>
                    <div className="font-normal text-xs md:text-base">{subtitle}</div>
                </div>
            </div>
        </section>
    );
};

PaheHeader.propTypes = {
    title: propTypes.string,
    subtitle: propTypes.string,
};

PaheHeader.defaultProps = {
    title: "",
    subtitle: "",
};

export default PaheHeader;
