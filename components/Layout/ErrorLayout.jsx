const LayoutError = ({ children }) => {
    return (
        <>
            <section className="grid h-screen w-screen place-content-center bg-[#F6FAF0]">
                {children}
            </section>
        </>
    );
};

export default LayoutError;
