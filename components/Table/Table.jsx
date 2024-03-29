import propTypes from "prop-types";

const Table = ({ header, content }) => {
    return (
        <>
            <table className="w-full text-sm text-left">
                <thead className="text-base text-[#272541] bg-white">
                    <tr>
                        {header.map((head, i) => (
                            <th key={`header-${i}`} scope="col" className="py-5 px-6">
                                {head.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {content.length > 0 ? content.map((items, i) => (
                        <tr key={`${items.id_product}-${items.id_product_duration}-${i}`} className="bg-white border-b hover:bg-gray-50">
                            {header.map((headToItem, i) => (
                                <td key={`item-column-${i}`} className="py-4 px-6">
                                    {headToItem.customComponent ? (
                                        headToItem.customComponent(items)
                                    ) : (
                                        items[headToItem.selector]
                                    )}
                                </td>
                            ))}
                        </tr>
                    )) : (
                        <tr className="bg-white border-b hover:bg-gray-50">
                            <td colSpan={header.length} className="py-4 px-6 text-center">
                                Tidak ada data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

Table.propTypes = {
    title: propTypes.string,
    icon: propTypes.string,
};

Table.defaultProps = {
    title: "",
    icon: "",
};

export default Table;
