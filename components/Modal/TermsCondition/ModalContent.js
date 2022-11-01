const Title = ({ children }) => {
    return <h4 className="text-sm text-dark-300 font-semibold mb-1 mt-3">{children}</h4>;
};

const Content = ({ children }) => {
    return <p className="text-sm text-dark-100">{children}</p>
};

const List = ({ data }) => {
    return (
        <table className="text-sm text-dark-100 ml-2">
            <tbody>
                {
                    data.map(item => (
                        <tr key={item.id}>
                            <td className="pr-3 align-top">{item.id}</td>
                            <td>{item.content}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
};

const ModalContent = () => {
    return (
        <>
            <Title>Pengakuan dan Persetujuan Anda</Title>
            <Content>Syarat dan Ketentuan Penggunaan Layanan Web Order (“Syarat dan Ketentuan”) ini adalah perjanjian antara pengguna (“Anda”) dengan PT Majoo Teknologi Indonesia (“Kami”), sebuah perseroan terbatas yang didirikan dan beroperasi secara sah berdasarkan hukum negara Republik Indonesia dan berdomisili di DKI Jakarta, Indonesia. Anda dan Kami masing-masing disebut sebagai “Pihak” dan secara bersama-sama disebut sebagai “Para Pihak”. Syarat & Ketentuan yang ditetapkan di bawah ini mengatur akses dan penggunaan Layanan Web Order yang ditawarkan oleh Kami. Syarat dan Ketentuan ini merupakan bagian yang tidak terpisahkan dari . Dengan demikian, hal-hal yang telah diatur dalam , sebagaimana relevan untuk penggunaan Layanan Web Order, juga akan berlaku bagi Anda dalam menggunakan Layanan Web Order. Dengan mendaftar dan/atau menggunakan Layanan Web Order, maka Anda dianggap telah membaca, mengerti, memahami dan menyetujui semua isi dalam Syarat & Ketentuan ini. Jika Anda tidak menyetujui salah satu, sebagian, atau seluruh isi Syarat & ketentuan ini, maka Anda dipersilahkan untuk meninggalkan penggunaan Layanan Web Order.</Content>
            <Title>Penggunaan Layanan</Title>
            <List data={[
                {
                    id: 1,
                    content: "Akses dan penggunaan Layanan Web Order oleh Anda akan tunduk pada ketentuan dalam Syarat dan Ketentuan ini serta Kebijakan Privasi Majoo. Anda mempunyai kebebasan penuh untuk memilih menggunakan atau tidak menggunakan Layanan Web Order atau untuk melanjutkan dan/atau berhenti menggunakan Layanan Web Order.",
                },
                {
                    id: 2,
                    content: "Dalam hal ini Kami hanya memfasilitasi Anda untuk menemukan berbagai Barang yang Anda perlukan melalui penyediaan Layanan Web Order. Semua Barang disediakan secara langsung oleh Penjual.",
                },
                {
                    id: 3,
                    content: "Anda memahami bahwa Penjual memiliki hak untuk membuat syarat dan ketentuan dan/atau deskripsi mengenai Barang di dalam Layanan Web Order. Jika terdapat pertentangan antara syarat dan ketentuan dan/atau deskripsi Barang yang dibuat oleh Penjual dengan ketentuan yang terdapat di dalam Syarat dan Ketentuan ini, maka yang berlaku adalah Syarat dan Ketentuan ini.",
                },
            ]} />
            <Title>Akses Layanan Web Order</Title>
            <List data={[
                {
                    id: 1,
                    content: "Anda dapat melihat katalog Barang yang dijual oleh Penjual secara langsung dengan mengakses Layanan Web Order masing-masing Penjual.",
                },
                {
                    id: 2,
                    content: "Anda wajib untuk memiliki akun Web Order untuk melakukan checkout barang, sehingga akun yang anda daftarkan otomatis akan menjadi customer pada masing-masing merchant yang terdaftar pada layanan Web Order kami.",
                },
                {
                    id: 3,
                    content: "Anda dengan ini menyatakan bahwa Kami tidak bertanggung jawab atas kerugian ataupun kendala yang timbul atas penyalahgunaan akun Anda yang diakibatkan oleh kelalaian Anda, termasuk namun tidak terbatas pada meminjamkan atau memberikan akses akun kepada pihak lain yang tidak terotorisasi oleh Anda, mengakses link atau tautan yang diberikan oleh pihak lain, memberikan atau memperlihatkan password atau email kepada pihak lain, maupun kelalaian Anda lainnya yang mengakibatkan kerugian ataupun kendala pada akun Anda.",
                },
                {
                    id: 4,
                    content: "Pengaksesan dan penggunaan Layanan Web Order adalah bebas biaya. Namun, Kami dapat mengenakan biaya untuk penggunaan fitur tertentu pada Layanan Web Order di kemudian hari melalui pemberitahuan kepada Anda.",
                },
            ]} />
            <Title>Harga Barang</Title>
            <List data={[
                {
                    id: 1,
                    content: "Harga Barang yang terdapat di dalam Layanan Web Order adalah harga yang ditetapkan oleh Penjual.",
                },
                {
                    id: 2,
                    content: "Anda memahami dan menyetujui bahwa setiap masalah dan/atau perselisihan yang terjadi sebagai akibat dari ketidaksepahaman antara Anda dan Penjual tentang harga bukanlah merupakan tanggung jawab Kami.",
                },
                {
                    id: 3,
                    content: "Dengan melakukan Transaksi di dalam Layanan Web Order, Anda menyetujui untuk membayar total biaya yang harus dibayarkan sebagaimana tertera dalam halaman pembayaran, yang terdiri dari harga Barang, ongkos kirim dan biaya-biaya lain yang mungkin timbul dan akan diuraikan secara tegas dalam halaman pembayaran. Anda setuju untuk melakukan pembayaran hanya melalui metode pembayaran yang disediakan di dalam Layanan Web Order.",
                },
                {
                    id: 4,
                    content: "Layanan Web Order untuk saat ini hanya melayani Transaksi jual beli Barang dalam mata uang Rupiah.",
                },
            ]} />
            <Title>Transaksi Pembelian Barang</Title>
            <List data={[
                {
                    id: 1,
                    content: "Anda wajib melakukan pembayaran dalam jangka waktu yang tercantum di dalam halaman pembayaran. Jika dalam batas waktu tersebut Anda tidak melakukan pembayaran, maka Kami memiliki kewenangan untuk membatalkan Transaksi dimaksud. Anda tidak berhak mengajukan klaim atau tuntutan kepada Kami atas pembatalan Transaksi tersebut.",
                },
                {
                    id: 2,
                    content: "Anda memahami bahwa dana yang Anda bayarkan untuk setiap Transaksi akan terlebih dahulu ditransfer ke rekening digital milik Kami. Anda wajib melakukan Transaksi dengan mengikuti prosedur Transaksi yang telah ditetapkan oleh Kami dan Penjual di dalam Layanan Web Order, dan dengan menggunakan metode pembayaran yang sebelumnya telah Anda pilih. Kami akan meneruskan dana ke pihak Penjual apabila tahapan Transaksi telah dinyatakan selesai di dalam Layanan Web Order.",
                },
                {
                    id: 3,
                    content: "Dalam hal Anda membeli suatu Barang dari Penjual yang membutuhkan proses dan/atau atau dokumen khusus sebagaimana dipersyaratkan oleh hukum dan peraturan perundang-undangan yang berlaku, maka Anda wajib untuk memenuhi seluruh proses dan/atau dokumen khusus sebagaimana yang dipersyaratkan tersebut serta melepaskan Kami dari segala kerugian dan/atau tanggung jawab sehubungan dengan tidak dipenuhinya proses dan/atau dokumen khusus sebagaimana dimaksud.",
                },
                {
                    id: 4,
                    content: "Anda memahami dan menyetujui bahwa masalah keterlambatan proses pembayaran dan biaya tambahan yang disebabkan oleh perbedaan bank yang Anda pergunakan dengan bank yang Kami pergunakan adalah tanggung jawab Anda secara pribadi.",
                },
                {
                    id: 5,
                    content: "Anda memahami sepenuhnya dan menyetujui bahwa segala Transaksi yang dilakukan antara Anda dan Penjual selain melalui metode pembayaran resmi Kami dan/atau tanpa sepengetahuan Kami (melalui fasilitas/jaringan pribadi, pengiriman pesan, pengaturan transaksi khusus diluar Layanan Web Order atau upaya lainnya) adalah merupakan tanggung jawab pribadi dari Anda dan Penjual.",
                },
            ]} />
            <Title>Pengiriman Barang</Title>
            <List data={[
                {
                    id: 1,
                    content: "Anda tidak memiliki akses untuk melakukan pemilihan kurir. Pemilihan kurir otomatis dilakukan oleh penjual tanpa sepengetahuan anda melalui pengiriman internal (Kurir Penjual) atau eksternal diluar tanggung jawab kami.",
                },
                {
                    id: 2,
                    content: "Setiap ketentuan yang terkait dengan proses pengiriman Barang adalah sepenuhnya ditentukan oleh Mitra Pihak Penjual. Anda wajib memenuhi ketentuan yang ditetapkan oleh Penjual.",
                },
                {
                    id: 3,
                    content: "Anda memahami dan mengerti bahwa Kami tidak terlibat dalam harga ongkos kirim yang ditetapkan oleh penjual melalui layanan kami. Sehingga anda diberikan hak untuk menolak atau menerima jumlah ongkos kirim yang ditetapkan oleh penjual.",
                },
                {
                    id: 4,
                    content: "Anda wajib untuk mengisi alamat dan detail pengiriman dengan benar dan lengkap sesuai dengan lokasi pengiriman yang Anda kehendaki. Anda memahami sepenuhnya bahwa kesalahan dalam pengisian alamat dan detail pengiriman Barang yang menyebabkan Barang menjadi gagal kirim adalah sepenuhnya tanggung jawab Anda dan Anda melepaskan Kami dari seluruh kerugian dan/atau tanggung jawab sehubungan dengan pengiriman yang gagal karena kesalahan Anda tersebut.",
                },
            ]} />
            <Title>Pembatalan</Title>
            <List data={[
                {
                    id: 1,
                    content: "Kami memiliki hak untuk melakukan pembatalan pemesanan secara otomatis apabila Penjual tidak memberikan konfirmasi penerimaan pesanan dan/atau tidak memproses pesanan dalam jangka waktu 3 jam sejak Anda melakukan pembayaran.",
                },
                {
                    id: 2,
                    content: "Kami juga dapat melakukan pembatalan pemesanan apabila Anda tidak melakukan pembayaran dalam jangka waktu yang ditetapkan di dalam halaman pembayaran.",
                },
                {
                    id: 3,
                    content: "Kami juga akan melakukan pembatalan pemesanan secara otomatis apabila Anda tidak melakukan pembayaran dalam kurun waktu 3 jam setelah pesanan anda di verifikasi oleh kasir.",
                },
            ]} />
            <Title>Ketentuan Lain</Title>
            <List data={[
                {
                    id: 1,
                    content: "Syarat dan Ketentuan ini diatur berdasarkan dan dibuat sesuai dengan hukum dan ketentuan Negara Republik Indonesia.",
                },
                {
                    id: 2,
                    content: "Kami berhak untuk membatasi, memblokir, memperlambat, menghapus dan/atau mengakhiri akses Anda terhadap Layanan Web Order dan mengambil langkah-langkah hukum yang diperlukan apabila Anda dinilai telah melakukan pelanggaran baik berdasarkan Syarat dan Ketentuan ini, Kebijakan Privasi Majoo maupun hukum lainnya yang berlaku.",
                },
                {
                    id: 3,
                    content: "Kami memiliki hak untuk mengalihkan sebagian maupun seluruh hak dan kewajiban Kami kepada Afiliasi Kami tanpa perlu persetujuan tertulis terlebih dahulu dari Anda. Anda tidak memiliki hak untuk mengalihkan hak dan kewajiban Anda, baik sebagian maupun keseluruhan berdasarkan Layanan Web Order ini, tanpa persetujuan terlebih dahulu dari Kami.",
                },
                {
                    id: 4,
                    content: "Anda setuju dan sepakat bahwa segala perubahan, amandemen atas Syarat dan Ketentuan ini dapat dilakukan oleh Kami atas dasar pertimbangannya sendiri, dapat dibuat secara elektronik salah satunya dalam bentuk Kontrak Elektronik. Perubahan atas Syarat dan Ketentuan ini akan berlaku setelah Kami mengumumkan perubahan atas ketentuan Syarat dan Ketentuan tersebut baik melalui Situs ataupun melalui media lainnya yang dipilih oleh Kami (termasuk dengan mengirimkan pemberitahuan tertulis secara langsung kepada Anda).",
                },
                {
                    id: 5,
                    content: "Anda setuju dan sepakat bahwa Syarat dan Ketentuan ini dibuat dalam bentuk Kontrak Elektronik dan tindakan Anda menekan tombol “Setuju” merupakan bentuk pernyataan persetujuan aktif Anda untuk mengikatkan diri dalam perjanjian dengan Kami, sehingga keberlakuan Syarat dan Ketentuan ini adalah sah dan mengikat secara hukum dan terus berlaku sepanjangan penggunaan Layanan Web Order oleh Anda.",
                },
                {
                    id: 6,
                    content: "Anda setuju bahwa Anda tidak akan memulai atau melakukan tuntutan atau keberatan apapun sehubungan dibuatnya maupun keabsahan Syarat dan Ketentuan ini berikut amandemen atau perubahannya dalam bentuk Kontrak Elektronik.",
                },
                {
                    id: 7,
                    content: "Syarat dan Ketentuan ini dibuat dan diberikan persetujuan secara elektronik oleh Kami dan Anda dalam keadaan sadar dan tanpa ada paksaan dari pihak manapun juga. Setelah tindakan mengklik persetujuan secara elektronik atas Syarat dan Ketentuan ini, maka Anda setuju untuk dianggap bahwa Anda telah membaca, mengerti serta menyetujui setiap dan keseluruhan pasal dalam Syarat dan Ketentuan ini dan akan mematuhi dan melaksanakan setiap pasal dalam Syarat dan Ketentuan dengan penuh tanggung jawab.",
                },
                {
                    id: 8,
                    content: "Syarat dan Ketentuan lainnya yang belum tercantum akan diatur ulang atau diperbaharui sewaktu-waktu",
                },
            ]} />
        </>
    )
};

export default ModalContent;
