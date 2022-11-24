import { useRouter } from "next/router";
import propTypes from "prop-types";

const CategoryCard = ({ name, icon, idCategory }) => {
    const router = useRouter();

    const goProduk = (id) => {
        router.push({
            pathname: '/produk',
            query: { kategori: id },
        })
    }

    return (
        <div className="relative pt-[100%] flex flex-col rounded-3xl shadow-[0px_4px_24px_rgba(39,38,65,0.06)] cursor-pointer" onClick={() => {goProduk(idCategory)}}>
            <div className="absolute flex flex-col justify-center items-center inset-0 gap-8">
                <div className="flex flex-row justify-center items-center inset-0">
                    <div className="text-base font-bold w-[74px] h-[48px] relative">
                        {icon}
                    </div>
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
    idCategory: propTypes.number,
};

CategoryCard.defaultProps = {
    name: "",
    idCategory: 0,
};

export default CategoryCard;
