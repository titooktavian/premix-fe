import propTypes from "prop-types";

const CategoryCard = ({ name, icon, color }) => {
    return (
        <div className="relative pt-[100%] flex flex-col rounded-3xl shadow-[0px_4px_24px_rgba(39,38,65,0.06)] cursor-pointer">
            <div className="absolute flex flex-col justify-center items-center inset-0 gap-8">
                <div className="flex flex-row justify-center items-center inset-0">
                    <div className="text-base font-bold text-[#272541]">
                        {icon}
                    </div>
                    <div className={`w-12 h-12 rounded-full bg-[${color}] ml-[-20px] z-[-1]`} style={{ background: color }}></div>
                </div>
                <div className="text-base text-[#272541] font-bold text-center">
                    {name}
                </div>
            </div>
        </div>
    );
};

CategoryCard.propTypes = {
    name: propTypes.string,
    icon: propTypes.node.isRequired,
    color: propTypes.string,
};

CategoryCard.defaultProps = {
    name: "",
    color: "",
};

export default CategoryCard;
