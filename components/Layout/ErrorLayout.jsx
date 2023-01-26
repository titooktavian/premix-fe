const LayoutError = ({ children }) => {
    return (
        <>
            <section className="grid h-screen w-screen place-content-center bg-white bg-[url('/background.jpeg')] bg-contain bg-no-repeat">
                {children}
            </section>
        </>
    );
};

export default LayoutError;
