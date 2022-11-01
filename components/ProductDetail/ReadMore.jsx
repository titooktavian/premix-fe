import { useState } from "react";
import propTypes from "prop-types";

const ReadMore = ({ description, longDescription }) => {
    const [isReadMore, setIsReadMore] = useState(false);
    const desc = description + longDescription;
    return (
        <>  
            {isReadMore ? (
                <>
                    <div className="text-dark-100" dangerouslySetInnerHTML={{ __html: desc }}/>
                </>
            ) : (
                <div className="text-xs text-dark-100 break-all line-clamp-2">{desc.replace(/(<([^>]+)>)/gi, " ")}</div>
            )}
            {longDescription.length > 100 && (
                <span className="text-2xs text-turq-300 cursor-pointer" onClick={()=> setIsReadMore(!isReadMore)}>
                    {isReadMore ? (
                        'Lihat Lebih Sedikit'
                    ): (
                        'Lihat Selengkapnya'
                    )}
                </span>
            )}
        </>
    )
};

ReadMore.propTypes = {
    description: propTypes.string,
    longDescription: propTypes.string,
};

ReadMore.defaultProps = {
    description: '',
    longDescription: '',
};


export default ReadMore