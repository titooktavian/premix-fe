export const PAYMENT_PROVIDER = {
    GOPAY: {
        code: 15,
        name: "Gopay",
        logo: "gopay.png",
        paymentTypeDesktop: 6,
        paymentType: 13,
    },
    OVO: {
        code: 15,
        name: "OVO",
        logo: "ovo.png",
        paymentType: 13,
    },
    VA: {
        name: "Virtual Account",
        logo: "virtual_account.png",
        children: [
            {
                code: 18,
                logo: "bri-logo.png",
                name: "Bank BRI",
                paymentType: 99,
            },
            {
                code: 19,
                logo: "mandiri-logo.png",
                name: "Bank Mandiri",
                paymentType: 99,
            },
            {
                code: 20,
                logo: "bni-logo.png",
                name: "Bank BNI",
                paymentType: 99,
            },
            {
                code: 21,
                logo: "bca-logo.png",
                name: "Bank BCA",
                paymentType: 99,
            },
            {
                code: 22,
                logo: "permata-logo.png",
                name: "Bank Permata",
                paymentType: 99,
            },
            {
                code: 23,
                logo: "bss-logo.png",
                name: "Bank Sahabat Sampoerna (BSS)",
                paymentType: 99,
            },
        ]
    },
};