import propTypes from "prop-types";

const Table = ({ header, content }) => {
    console.log(header)
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
                    {content.length > 0 ? content.map((items) => (
                        <tr key={`${items.id_product}-${items.id_product_duration}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td colSpan="4" className="py-4 px-6 text-center">
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
    children: propTypes.node.isRequired,
};

Table.defaultProps = {
    title: "",
    icon: "",
};

export default Table;
