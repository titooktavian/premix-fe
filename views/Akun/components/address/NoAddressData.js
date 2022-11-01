import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "components";

const NoAddressData = () => {
    const router = useRouter();

    return (
        <>
            <p className="text-dark-100 text-base font-medium">Kamu belum memasukkan alamat pengiriman. Silakan klik<br />&quot;Tambah Alamat&quot; untuk menambah alamat pengiriman<br />(maks. 10 alamat)</p>
            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-5 items-center mt-8">
                <Button
                    full
                    label="Kembali"
                    variant="secondary"
                    size="lg"
                    onClick={() => router.back()}
                />
                <Link href="/akun/alamat/tambah">
                    <a className="w-full">
                        <Button
                            full
                            label="Tambah Alamat"
                            size="lg"
                        />
                    </a>
                </Link>
            </div>
        </>
    )
};

export default NoAddressData;
