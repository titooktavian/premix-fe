import "styles/globals.css";
import { StateContext } from "context/StateContext";
import { DefaultLayout, ErrorLayout, Alert, Loading } from "components/index";

function MyApp({ Component, pageProps }) {
    let Layout = DefaultLayout;
    switch (Component.layout) {
    case 'ERR':
        Layout = ErrorLayout;
        break;
    }

    return (
        <StateContext>
            <Alert />
            <Loading />
            <Layout {...pageProps}>
                <Component {...pageProps} />
            </Layout>
        </StateContext>
    );
}

export default MyApp;
