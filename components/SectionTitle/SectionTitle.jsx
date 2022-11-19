import propTypes from "prop-types";

const SectionTitle = ({ title, subtitle, rightButton }) => {
    return (
        <div className="flex">
            <div className={`flex flex-col ${rightButton ? 'w-1/2' : 'w-full'} gap-1`}>
                <div className="text-xl text-[#272541] font-bold">{title}</div>
                <div className="text-base text-[#6E6C85] font-normal">{subtitle}</div>
            </div>
            {rightButton && (
                <div className="flex flex-col w-1/2 justify-end text-right">
                    <div className="text-base text-[#8581B7] font-bold">Lihat Semua</div>
                </div>
            )}
        </div>
    );
};

SectionTitle.propTypes = {
    title: propTypes.string,
    subtitle: propTypes.string,
    rightButton: propTypes.bool,
};

SectionTitle.defaultProps = {
    text: "",
    subtitle: "",
    rightButton: false,
};

export default SectionTitle;
