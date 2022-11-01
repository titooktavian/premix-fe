import Head from "next/head";
import PropTypes from "prop-types";

const WebtreeLayout = ({ children, webtree: data }) => {
    return (
        <>
            <div className="flex min-h-screen w-full flex-col">
                <Head>
                    <link
                        rel="shortcut icon"
                        href={data.image_path || "/images/item-default.png"}
                    />
                    <title>{`Webtree - ${data.nama_outlet}`}</title>
                </Head>
                <main className="flex items-center place-content-center bg-[#FFFFFF] my-6">
                    {children}
                </main>
            </div>
        </>
    );
};

WebtreeLayout.propTypes = {
    webtree: PropTypes.shape().isRequired,
    children: PropTypes.node.isRequired,
};

export default WebtreeLayout;
