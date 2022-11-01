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
            "mayang.klopos.com",
            "beta-mayang.mangkujagat.com",
            "majoo.id",
            "alpha-beta-master-data.sgp1.digitaloceanspaces.com",
            "mayang-staging.sgp1.digitaloceanspaces.com",
            "ecs7.tokopedia.net",
            "api.sandbox.midtrans.com",
            "majoo-space.sgp1.digitaloceanspaces.com",
        ]
    }
};
