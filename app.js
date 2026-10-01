console.log("Praktikum Dimulai");

//Aktvitas 1 : DOM Selection Seleksi DOM
// DOM selection kita harus  "Menangkap Elemen" sebelum kita memanipulasi html
// ambil elemen -> simpan di dalam variabel javascript

// 1. ambil elemen judul  berdasarkan id
// document.getElementById("...") -> ambil elemem htmlspesifik berdasarkan id
const judulUtama = document.getElementById("judul-utama");

// 1.1 querySelector("#...") mengambil id berdasarkam atribut id
// tanda (#) artinya menargetkan id (.) menargetkan class
// ambil elemen sub judul berdasarkan id
const subJudul = document.querySelector("#sub-judul");

// 2. Mengambil elemen pada kartu 1 (kartu manipulasi teks $ style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");

// 3. mengambil tombol tombol aksi pada kartu 1
const btnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

// 4. mengambil elemen pada kartu 2 (fitur catatan dinamis / todolist)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");

// Aktivitas 2 : Manipulasi Teks & Style (Pada Kartu 1)
// addEventListener("click", function() {...}) -> artinya tolong dengarkan dan tunggu
// setelah di "click" oleh user jalakan perintah di dalam function
btnUbahTeks.addEventListener("click", function () {
  // .innerText = mengisi/menimpa tulisan teks yang ada di html
  teksPreview.innerText = "Hebat! Teks ini berhasil diubah melalui DOM";

  // .style.color = mengubah warna teks secara langsung melalui javascript (inline)
  teksPreview.style.color = "rgb(255, 197, 231)";

  // console.log = mencetak pesan di console
  console.log("DOM Teks Preview telah diperbaharui");
});

// B. Mengubah warna background box preview
btnToggleWarna.addEventListener("click", function () {
  // .classList.toggle("nama-class") -> menambahkan class jika belum ada, menghapus class jika sudah ada
  // jika class tersebut belum ada pada elemen , maka class tersebut akan ditambahkan.
  // jika class tersebut sudah ada pada elemen, maka class tersebut akan dihapus.
  boxPreview.classList.toggle("active-mode");
  cardManipulasi.classList.toggle("highlight");

  console.log("DOM Box Preview telah diperbaharui");
});

// C. Mengembalikan Teks & Warna Teks Preview ke Default (reset)
btnReset.addEventListener("click", function () {
  // mengembalikan teks preview ke default
  teksPreview.innerText = "Halo! Teks ini siap diubah oleh javascript";

  // kosongkan warna agar warna kembali ke default (inherit)
  teksPreview.style.color = "";

  // Hapus class khusus menggunakan .classList.remove("nama-class")
  boxPreview.classList.remove("active-mode");
  cardManipulasi.classList.remove("highlight");

  console.log("DOM Box Preview telah dikembalikan ke default");
});

// Aktivitas 3 & 4: Membuat Catatan Dinamis (ToDoList) dan Menghitung Jumlah Catatan (Pada Kartu 2)
// Dibagian ini kita belajar embuat elemen html baru (<li>) secara dinamis menggunakan javascript, menambahkan elemen tersebut ke dalam daftar catatan (<ul>), dan menghitung jumlah catatan yang ada di dalam daftar catatan.
// Lalu mengisi teksnya, memberi tombol hapus, lalu menempelnya ke dalam layar

// Langkah 1 : Membuat Variabel untuk menampung jumlah catatan
// 'let' digunakan karena nilainya akan berubah-ubah (mutable)
let totalCatatan = 0;

// Langkah 2 : Membuat fungsi untuk menambahkan catatan baru
// fungsi ini adalah kumpulan perintah yang diberi nama. Kita bisa memanggilnya kapanpun kita mau
function perbaruiJumlah() {
  // Masukkan angka totalCatatan ke dalam elemen html jumlahCatatan
  jumlahCatatan.innerText = totalCatatan;

  // Percabangan kondisi: apakah catatannya 0?
  if (totalCatatan === 0) {
    // jika 0 : hapus class "hidden" agar pesan "Tidak ada catatan" muncul
    pesanKosong.classList.remove("hidden");
  } else {
    // jika > 0 : Tambahkan class "hidden" agar pesan "Tidak ada catatan" hilang
    pesanKosong.classList.add("hidden");
  }
}

// Langkah 3 : Membuat fungsi untuk menambahkan catatan baru
function tambahCatatan() {
  // 3.1 inputCatatan.value -> mengambil teks yang diketik user di input
  // .trim() -> Menghapus spasi kosong di awal dan akhir teks
  const isiTeks = inputCatatan.value.trim();

  // 3.2 Validasi Input: Jika variabel isiTeks kosong (""), maka tampilkan alert
  if (isiTeks === "") {
    alert("Catatan tidak boleh kosong!");
    return; //hentikan fungsi jika input kosong
  }

  // 3.3 createElement("li") -> membuat elemen html baru <li> hanya di memori javascript
  const liBaru = document.createElement("li");
  liBaru.className = "note-item"; // memberi class agar tampilannya sesuai style css

  // 3.4 Mengisi teks catatan baru dengan cara innerHTML mengisi <li> dengan teks dan tombol hapus
  // tanda backtick (`) digunakan agar kita bisa menulis teks multibaris dan menyisipkan variabel di dalamnya menggunakan ${namaVariabel}
  liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-hapus">Hapus</button>`;

  // 3.5 Menambahkan event listener pada tombol hapus pada item <li>
  // querySelector(".btn-hapus") -> mengambil tombol hapus yang baru di dalam <li>
  const btnHapus = liBaru.querySelector(".btn-hapus");
  btnHapus.addEventListener("click", function () {
    // menghapus <li> dari daftarCatatan (<ul)
    liBaru.remove(); // menghapus elemen <li> dari DOM .remove()
    totalCatatan--; // mengurangi jumlah catatan
    perbaruiJumlah(); // memperbarui tampilan jumlah catatan
    console.log('DOM Catatan "${isiTeks}" telah dihapus');

});

// 3.6 appendChild(liBaru) -> menempelkan <li> baru ke dalam <ul> daftarCatatan
    daftarCatatan.appendChild(liBaru);


 // 3.7 Mengosongkan input agar siap untuk catatan baru
    inputCatatan.value = "";

 // 3.8 Menambahkan jumlah catatan dan memperbarui tampilan jumlah catatan
    totalCatatan++;
    perbaruiJumlah();

    console.log('DOM Catatan Baru ditambahkan: "${isiTeks}"');

}


// Langkah 4 : Menambahkan event listener pada tombol tambah catatan
// ketika tombol tambah diklik, jalankan fungsi tambahCatatan
btnTambah.addEventListener("click", function () {
    tambahCatatan();
});

// Langkah 5 : event listener untuk menambahkan catatan ketika user menekan tombol "Enter" di keyboard
inputCatatan.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        tambahCatatan();
    }
});