module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/:outlet_code/home',
                destination: '/', 
            },
            {
                source: '/:outlet_code/produk',
                destination: '/produk', 
            },
            {
                source: '/:outlet_code/promo',
                destination: '/promo', 
            },
            {
                source: '/:outlet_code/kontak',
                destination: '/kontak',
            },
        ]
    },
    images: {
        domains: [
            "via.placeholder.com",
            "api.nusahabbat.com",
        ]
    }
};
