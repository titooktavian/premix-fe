module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./views/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                white: "#FFFFFF",
                neutral: {
                    100: "#F6F8FD",
                    200: "#ECEFF1",
                    300: "#B0BEC5",
                    400: "#78909C",
                },
                dark: {
                    100: "#58788A",
                    200: "#476270",
                    300: "#263238",
                    400: "#0D1113",
                },
                turq: {
                    100: "#E6F8F9",
                    200: "#66D4D3",
                    300: "#00B7B5",
                    400: "#006E6D",
                },
                yellow: {
                    100: "#FEF6D5",
                    200: "#FDE480",
                    300: "#FBD22C",
                    400: "#977E1A",
                },
                green: {
                    100: "#DFF1D1",
                    200: "#BFE3A3",
                    300: "#94D166",
                    400: "#4A6933",
                },
                red: {
                    100: "#FFDDD6",
                    200: "#FF9A83",
                    300: "#FF5630",
                    400: "#99341D",
                },
                orange: {
                    100: "#FFEED9",
                    200: "#FCD49F",
                    300: "#FFA126",
                    400: "#A25B00",
                },
                blue: {
                    100: "#D7EAFC",
                    200: "#40A0FF",
                    300: "#0875E1",
                    400: "#004387"
                },
                purple: {
                    100: "#E4D8F7",
                    200: "#AF8BE8",
                    300: "#7A3DD8",
                    400: "#492582",
                }
            },
            zIndex: {
                alert: 153,
                modal: "151",
                loading: "152",
                "product-popup": "149",
                cart: "150",
            },
            height: {
                "screen-min-60": "calc(100vh - 60px)",
            },
            maxHeight: {
                "screen-min-60": "calc(100vh - 60px)",
                "screen-min-80": "calc(100vh - 80px)",
                "screen-min-210": "calc(100vh - 210px)",
                "screen-55-min-40": "calc(55vh - 40px)",
                "screen-55": "55vh",
                "screen-80": "80vh",
                "80%": "80%",
                "75%": "75%",

            },
            minHeight: {
                "screen-min-60": "calc(100vh - 60px)",
                "screen-80": "80vh",
            },
            minWidth:{
                "30%": "30%",
            },
            maxWidth: {
                "80%": "80%",
            },
            boxShadow: {
                "outlet": "0px 1px 4px rgb(0 0 0 / 10%)",
                "product": "0px 1px 1px rgba(0, 0, 0, 0.07), 0px 2px 4px rgba(0, 0, 0, 0.05), 0px 4px 10px rgba(0, 0, 0, 0.05)",
            },
            fontSize: {
                "2xs": "0.625rem",
            }
        }
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
    ]
};
