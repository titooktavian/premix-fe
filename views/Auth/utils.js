export const TITLE_FORGOT = {
    RESET: "Atur Ulang Kata Sandi",
    VERIFICATION_METHOD: "Pilih Metode verifikasi",
    VERIFICATION_CODE: "Verifikasi Akun",
    NEW_PASSWORD: "Buat Kata Sandi Baru",
};

export const SUBTITLE_FORGOT = {
    RESET: "Masukkan nomor ponsel terdaftar untuk menerima kode pengaturan ulang kata sandi",
    VERIFICATION_METHOD: "Pilih salah satu metode di bawah ini untuk mendapatkan verifikasi",
    VERIFICATION_CODE: "Kode verifikasi telah dikirimkan melalui &_TYPE_& ke &_IDENTITY_&",
    NEW_PASSWORD: "Pastikan kombinasi kata sandi baru kamu kuat & mudah diingat",
};

export const REGISTER_STEPS = {
    IDENTITY: "IDENTITY",
    PASSWORD: "PASSWORD",
};

export const REGISTER_TITLE = {
    IDENTITY: "Daftar Akun Web Store",
    VERIF_METHOD: "Pilih Metode verifikasi",
    VERIF_CODE: "Verifikasi Akun",
};

export const REGISTER_SUBTITLE = {
    IDENTITY: "",
    VERIF_METHOD: "Pilih salah satu metode di bawah ini untuk mendapatkan verifikasi ",
    VERIF_CODE: "Kode verifikasi telah dikirimkan melalui &_TYPE_& ke &_IDENTITY_&",
};

export const formattedSubtitle = (subtitle, type, identity) => {
    return subtitle.replace("&_TYPE_&", type).replace("&_IDENTITY_&", identity);
};
