import Image from "next/image";
import { useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Button, Checkbox, Modal, ProductDetail } from "../../../../components";
import { toRupiah } from "helpers/formatter";
import { useStateContext } from "context/StateContext";
import propTypes from "prop-types";

const ProductListCart = ({
    cart_id,
    name,
    price,
    imgUrl,
    productID,
    note,
    quantity,
    add_on,
    onDeleteItem,
    checkItems,
    handleSelectItem,
}) => {
    const [showProductDetailPopup, setShowProductDetailPopup] = useState(false);
    const { onUpdateProduct } = useStateContext();

    const closeProductDetailPopup = () => {
        setShowProductDetailPopup(!showProductDetailPopup);
    };

    const onIncProdList = () => {
        onUpdateProduct(cart_id, "increase");
    };

    const onDecProdList = () => {
        if (quantity > 1) onUpdateProduct(cart_id, "decrease");
        else {
            onDeleteItem();
        }
    };

    const handleClick = () => {
        setShowProductDetailPopup(true);
    };

    return (
        <>
            <Modal
                isPopup={showProductDetailPopup}
                title="Detail Produk"
                type="fullscreen"
                onRequestClose={closeProductDetailPopup}
            >
                <ProductDetail
                    cartId={cart_id}
                    productID={productID}
                    onRequestClose={closeProductDetailPopup}
                />
            </Modal>
            <div className="my-4 flex items-start gap-2 space-x-1">
                <Checkbox
                    id={cart_id}
                    type="checkbox"
                    name="check-all"
                    handleClick={() => {handleSelectItem(cart_id)}}
                    isChecked={checkItems.includes(cart_id)}
                />
                <div className="flex-1">
                    <div className="flex items-start space-x-2">
                        <div className="h-[50px] w-[50px] ">
                            <Image
                                src={imgUrl || "/images/item-default-new.png"}
                                width={30}
                                height={30}
                                layout="responsive"
                                className="rounded-lg object-cover"
                            />
                        </div>
                        <div className="w-full">
                            <p className="text-xs font-bold text-dark-300">
                                {name}
                            </p>
                            <p className="my-2 text-sm font-bold text-dark-300">
                                {toRupiah(price)}
                            </p>
                            {add_on.map((ekstra) => (
                                ekstra.details.map((ekstraDetail) => (
                                    <div key={`${cart_id}ekstra${ekstraDetail.id}`} className="text-xs my-2">
                                        <span className="font-bold">{ekstra.name} : </span><span>{ekstraDetail.name}</span>
                                    </div>
                                ))
                            ))}
                            {note && note.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-xs font-bold text-dark-100">
                                        {note}
                                    </p>
                                </div>
                            )}
                            <div className="mt-4 flex items-center justify-between">
                                <Button
                                    variant="ghost-"
                                    size="sm"
                                    label={`${note?.length > 0 ? 'Ubah' : 'Tambah'} Catatan`}
                                    onClick={handleClick}
                                />
                                <div className="flex items-center space-x-2">
                                    <button onClick={onDecProdList}>
                                        <AiFillMinusCircle className="text-3xl text-neutral-300" />
                                    </button>
                                    <input
                                        type="number"
                                        className="h-[32px] w-[50px] rounded-md border border-neutral-300 text-center text-sm  font-bold  text-dark-400 outline-none placeholder:font-light placeholder:text-dark-100"
                                        min="0"
                                        max="999"
                                        value={quantity}
                                        readOnly
                                    />
                                    <button onClick={onIncProdList}>
                                        <AiFillPlusCircle className="text-3xl text-turq-300" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

ProductListCart.propTypes = {
    cart_id: propTypes.oneOfType([
        propTypes.string,
        propTypes.number,
    ]),
    name: propTypes.string,
    price: propTypes.number,
    imgUrl: propTypes.string,
    productID: propTypes.string,
    note: propTypes.string,
    quantity: propTypes.number,
    add_on: propTypes.array,
    onDeleteItem: propTypes.func,
    checkItems: propTypes.array,
    handleSelectItem: propTypes.func,
};

ProductListCart.defaultProps = {
    cart_id: '',
    name: '',
    price: 0,
    productID: '',
    note: '',
    quantity:  0,
    add_on: [],
    onDeleteItem: () => {},
    checkItems:[],
    handleSelectItem: () => {},
};
export default ProductListCart;
