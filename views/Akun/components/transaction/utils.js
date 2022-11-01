import { TRANSACTION_STATUS } from "constants/enum";

export const ORDER_TYPE = {
    DINE_IN: 1,
    DELIVERY: 2,
};

export const SUB_ORDER_TYPE = {
    TIDAK_ADA: 0,
    AMBIL_DI_KASIR: 1,
    ANTAR_KE_MEJA: 2,
    BAWA_PULANG: 3,    
};

export const subOrderTypeLabel = (type) => {
    switch (type) {
    case 1:
        return 'Ambil di Kasir';
    case 2:
        return 'Antar ke Meja';
    case 3:
        return 'Bawa Pulang';
    default:
        return 'Kirim dengan Kurir';
    }
};

export const statusDownloadEreceipt = [
    TRANSACTION_STATUS.PEMBAYARAN_BERHASIL,
    TRANSACTION_STATUS.PESANAN_DIPROSES,
    TRANSACTION_STATUS.PROSES_PENGIRIMAN,
    TRANSACTION_STATUS.PESANAN_SELESAI,
];
