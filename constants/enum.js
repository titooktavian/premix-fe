export const REFERENCE_DAYS = {
    0: "Minggu",
    1: "Senin",
    2: "Selasa",
    3: "Rabu",
    4: "Kamis",
    5: "Jumat",
    6: "Sabtu",
};
export const ORDER_TYPE = {
    1: "Dine In",
    2: "Kirim Dengan Kurir",
};
export const ORDER_TYPE_DELIVERY = 2;
export const ORDER_TYPE_DINE_IN = 1;
export const ORDER_TYPE_IMAGE = {
    2: "/images/kirim.png",
};
export const SUB_ORDER_TYPE = {
    0: "Kirim Dengan Kurir",
    1: "Ambil di Kasir",
    2: "Antar ke Meja",
    3: "Bawa Pulang"
};
export const SUB_ORDER_TYPE_IMAGE = {
    3: "/images/bungkus.png",
};
export const SUB_ORDER_EXCEPTION = [1,2,4];
export const PRODUCT_VIEW = {
    GRID: "grid",
    LIST: "list",
    DESKTOP: "desktop",
}
export const PRODUCT_VIEW_CLASS = {
    GRID: "grid grid-cols-2 gap-4 md:grid-cols-3 md:pb-2",
    LIST: "grid grid-cols-1 gap-4",
    DESKTOP: "grid grid-cols-1 gap-4",
}
export const SORT_PRODUCT = {
    NAME_ASC: {
        label: "A - Z",
        sort_type: "asc",
        sort_by: "name"
    },
    NAME_DESC: {
        label: "Z - A",
        sort_type: "desc",
        sort_by: "name"
    },
    PRICE_ASC: {
        label: "Harga Termurah",
        sort_type: "asc",
        sort_by: "price"
    },
    PRICE_DESC: {
        label: "Harga Termahal",
        sort_type: "desc",
        sort_by: "price"
    }, 
    BEST_SELLER: {
        label: "Terlaris",
        sort_type: "desc",
        sort_by: "best_seller"
    }, 
    POPULAR: {
        label: "Terpopuler",
        sort_type: "desc",
        sort_by: "popular"
    },
    RECOMMENDED: {
        label: "Rekomendasi",
        sort_type: "desc",
        sort_by: "recommended"
    },
}
export const USER_INFO = "USER_INFO";
export const VERIF_METHOD_IDENTITY = "VERIF_METHOD_IDENTITY";
export const VALID_OTP_DATA = "VALID_OTP_DATA";
export const ERROR_MESSAGE_VERIFY_LIMIT = "Anda sudah melebihi limit 3 kali untuk kirim kode verifikasi hari ini silahkan ulangi pada besok hari";
export const NAVIGATIONS = [
    { name: "Home", link: "/", isActive: true },
    { name: "Product", link: "/produk", isActive: false },
    { name: "Information", link: "/information", isActive: false },
    { name: "Contact", link: "/contact", isActive: false },
];

export const USER_NAVIGATIONS = [
    { name: "Dashboard", link: "/dashboard", isActive: false },
    { name: "Order", link: "/", isActive: false },
    { name: "Bantuan", link: "/", isActive: false },
    { name: "Akun", link: "/", isActive: false },
]

export const USER_SIDEBAR = [
    { name: "Dashboard", link: "/dashboard", isActive: true },
    { name: "Order", link: "/order", isActive: false },
    { name: "Bantuan", link: "/bantuan", isActive: false },
    { name: "Akun", link: "/akun", isActive: false },
    { name: "Logout", link: "/logout", isActive: false },
]

export const POPUP_BACKGROUND = {
    light: {
        bgClass: "bg-white",
        textClass: "text-dark-300",
        iconColor: "black",
    },
    dark: {
        bgClass: "bg-dark-300",
        textClass: "text-white",
        iconColor: "white",
    }
}

export const POPUP_TYPE = {
    half: 'halfscreen',
    full: 'fullscreen'
}

export const ACCOUNT_MENU = {
    DATA_DIRI: 'DATA_DIRI',
    ALAMAT: 'ALAMAT',
    PESANAN: 'PESANAN',
    HISTORI: 'HISTORI',
};

export const API_TARGET = {
    E_MENU: 'E_MENU',
    PREMIX: 'PREMIX',
};

export const API_TARGET_VALUE = {
    E_MENU: '/api/ms_emenu_utilities/',
    PREMIX: '/api/',
}

export const VERIF_METHOD_TYPE = {
    SMS: 1,
    WHATSAPP: 2,
    EMAIL: 3,
};

export const TRANSACTION_STATUS = {
    UNPROCESSED: 0,
    MENUNGGU_PEMBAYARAN: 1,
    PEMBAYARAN_BERHASIL: 2,
    PESANAN_DIPROSES: 3,
    PROSES_PENGIRIMAN: 4,
    PESANAN_SELESAI: 5,
    PESANAN_DIBATALKAN: 6,
    PESANAN_DITOLAK: 7,
    FAILED_SHIPMENT: 8,
    FAILED_BILLER: 9,
    FAILED_AGGREGATOR: 10,
    MENUNGGU_KASIR: 11,
};

export const TRANSACTION_STATUS_LABEL = {
    0: "Unprocessed",
    1: "Menunggu Pembayaran",
    2: "Pembayaran Berhasil",
    3: "Pesanan Diproses",
    4: "Dalam Proses Pengiriman",
    5: "Pesanan Selesai",
    6: "Pesanan Dibatalkan",
    7: "Pesanan Ditolak",
    8: "Failed on Shipment",
    9: "Failed on Biller Payment",
    10: "Failed on Aggregator",
    11: "Failed",
};

export const BANK_LIST = [
    {
        id: 1,
        bankName: 'Bank BCA',
        logo: '/images/bank-icon/bca.png',
        rekening: '12345678',
        receiverName: 'Aku',
    },
    {
        id: 2,
        bankName: 'Bank Mandiri',
        logo: '/images/bank-icon/mandiri.png',
        rekening: '12345678',
        receiverName: 'Aku',
    },
    {
        id: 3,
        bankName: 'Bank Negara Indonesia',
        logo: '/images/bank-icon/bni.png',
        rekening: '12345678',
        receiverName: 'Aku',
    },
    {
        id: 4,
        bankName: 'Bank Rakyat Indonesia',
        logo: '/images/bank-icon/bri.png',
        rekening: '12345678',
        receiverName: 'Aku',
    },
]
