import { Button, Modal } from "components";
import { useStateContext } from "context/StateContext";
import Image from "next/image";
import { useRouter } from "next/router";
import PropType from "prop-types";
import { useEffect, useState } from "react";

const ListOutlet = ({listOutlet}) => {
    const [outlet, setOutlet] = useState({});
    const [isListOutletPopup, setIsListOutletPopup] = useState(false);
    const { selectedOutlet, outletCode, setSelectedOutlet } = useStateContext();
    const [outletTemp, setOutletTemp] = useState({});
    const router = useRouter();

    const closeListOutletPopup = () => {
        setIsListOutletPopup(false);
    };

    const openListOutletPopup = () => {
        setOutletTemp(selectedOutlet || outletCode);
        setIsListOutletPopup(true);
    };

    const goToOutlet = async () => {
        closeListOutletPopup();
        await fetch(`/api/set_outlet?outletCode=${outletTemp}`);
        setSelectedOutlet(outletTemp);
        const locationNow = router.pathname;
        const outletRoute = outletTemp === outletCode ? '' : outletTemp;
        let path = outletTemp === outletCode ? '' : 'home';
        if(locationNow.includes('produk')) path = 'produk';
        else if(locationNow.includes('promo')) path = 'promo';
        else if(locationNow.includes('kontak')) path = 'kontak';
        if(outletRoute) router.push(`/${outletRoute}/${path}`);
        else router.push(`/${path}`);
    }

    useEffect(()=>{
        let selected;
        if(selectedOutlet) selected = listOutlet.find(v => v.outlet_code === selectedOutlet); 
        else selected = listOutlet.find(v => v.outlet_code === outletCode);
        setOutlet(selected);
    },[selectedOutlet])
    return (
        <>  
            <Modal
                isPopup={isListOutletPopup}
                title="Pilih Outlet"
                type="halfscreen"
                onRequestClose={closeListOutletPopup}
            >   
                <div className="relative py-2">
                    {listOutlet.map(dataOutlet => (
                        <div key={dataOutlet.outlet_code} 
                            className={`
                            cursor-pointer 
                            font-semibold 
                            grid 
                            border
                            mb-4
                            gap-2 
                            py-2 
                            px-4 
                            rounded-lg 
                            h-max 
                            items-center 
                            ${dataOutlet?.outlet_code === outletTemp ? 'border-turq-300' : ''}`}
                            onClick={() => setOutletTemp(dataOutlet?.outlet_code)}
                        >
                            <label className="cursor-pointer">{dataOutlet?.outlet_name}</label>
                            <label className="cursor-pointer text-dark-100 break-word text-sm inline-block max-w-full">{ dataOutlet?.outlet_address || "-" }</label>
                        </div>
                    ))}
                    <div className="sticky -bottom-2.5 left-0 p-4 bg-white border-0">
                        <Button
                            full
                            size="lg"
                            label="Pilih Outlet"
                            onClick={() => goToOutlet()}
                        /> 
                    </div>           
                </div>
            </Modal>
            <div className="my-6 md:shadow-outlet rounded-lg md:p-4">
                <label className="font-bold text-base text-dark-300">Pilih Outlet</label>
                <div className="cursor-pointer flex gap-5 border mt-3 px-5 rounded-full items-center h-16" onClick={openListOutletPopup}>
                    <Image
                        src="/icons/pin-point.svg"
                        alt="pin point"
                        width={20}
                        height={25}
                    />
                    <div className="flex flex-col justify-center">
                        <p className="text-sm font-bold text-dark-300">{outlet?.outlet_name}</p>
                        <p className=" text-dark-100 break-all text-xs line-clamp-1 mt-0.5">{ outlet?.outlet_address || "-" }</p>
                    </div>
                </div>
            </div>
        </>
    );
};

ListOutlet.propTypes = {
    listOutlet: PropType.array,
    selectedOutlet: PropType.string,

};

ListOutlet.defaultProps = {
    listOutlet: [],
    selectedOutlet: '',
}

export default ListOutlet;
