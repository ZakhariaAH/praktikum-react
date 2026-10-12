import { useState } from "react";

function ItemTugas({ item, onToggle, onHapus }) {
  return (
    <li className={item.selesai ? "selesai" : ""}>
      <span>{item.judul}</span>
      <button type="button" onClick={() => onToggle(item.id)}>
        {item.selesai ? "Batalkan" : "Selesai"}
      </button>
      <button type="button" onClick={() => onHapus(item.id)}>
        Hapus
      </button>
    </li>
  );
}
function Identitas({ nama, nim }) {
  return (
    <div>
      <h3>Identitas Mahasiswa</h3>
      <p>Nama: {nama}</p>
      <p>NIM: {nim}</p>
    </div>
  );
}

function DetailAkademik({ prodi }) {
  return (
    <div>
      <p>Program Studi: {prodi}</p>
    </div>
  );
}
function KartuMatkul({ nama, sks, dosen }) {
  return (
    <article>
      <h4>{nama}</h4>
      <p>Jumlah SKS: {sks}</p>
      <p>Dosen Pengampu: {dosen}</p>
    </article>
  );
}
export default function App() {
  
  const [judul, setJudul] = useState("");
  const [error, setError] = useState("");
  const [tugas, setTugas] = useState([
    { id: "awal", judul: "Pelajari JSX", selesai: false },
  ]);
  const [mahasiswa, setMahasiswa] = useState([
    { nim: "255314052", nama: "Zakha", prodi: "Teknik Informatika" },
    { nim: "255314053", nama: "Rizki", prodi: "Sistem Informasi" },
  ]);
  const [mataKuliah, setMatakul] = useState([
    { id: "mk1", nama: "Pemrograman Web", sks: 3, dosen: "Dr. Puspaningtyas" },
    { id: "mk2", nama: "Basis Data", sks: 3, dosen: "Tim Basis Data" },
    { id: "mk3", nama: "Jaringan Komputer", sks: 2, dosen: "Tim Jaringan" },
    { id: "mk4", nama: "Struktur Data", sks: 4, dosen: "Tim Algoritma" },
  ]);
  const [jumlah, setJumlah] = useState(0);
  const [filter, setFilter] = useState("semua");

  function tambah(event) {
    event.preventDefault();
    const teks = judul.trim();
    if (!teks) {
      setError("Judul tugas wajib diisi.");
      return;
    }
    const item = {
      id: crypto.randomUUID(),
      judul: teks,
      selesai: false,
    };
    setTugas((lama) => [...lama, item]);
    setJudul("");
    setError("");
  }
  function toggle(id) {
    setTugas((lama) =>
      lama.map((item) =>
        item.id === id ? { ...item, selesai: !item.selesai } : item,
      ),
    );
  }
  function hapus(id) {
    setTugas((lama) => lama.filter((item) => item.id !== id));
  }

  {
    /*Bagian 2 */
  }
  const jumlahSelesai = tugas.filter((item) => item.selesai).length;
  const tugasTampil = tugas.filter((item) => {
    if (filter === "aktif") return !item.selesai;
    if (filter === "selesai") return item.selesai;
    return true; //untuk pilihan "semua"
  });
  {
    /*Tugas pokok*/
  }

  return (
    <main>
      <h1>Daftar Tugas Kuliah</h1>
      <form onSubmit={tambah}>
        <label htmlFor="judul">Judul tugas</label>
        <div className="baris-form">
          <input
            id="judul"
            value={judul}
            onChange={(event) => setJudul(event.target.value)}
          />
          <button type="submit">Tambah</button>
        </div>
      </form>
      {error && <p role="alert">{error}</p>}

      <p>
        Selesai {jumlahSelesai} dari {tugas.length} tugas
      </p>
      
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <button
          onClick={() => setFilter("semua")}
          style={{
            background: filter === "semua" ? "#b97d00" : "#17243b",
          }}
        >
          Semua
        </button>
        <button
          onClick={() => setFilter("aktif")}
          style={{
            background: filter === "aktif" ? "#b97d00" : "#17243b",
          }}
        >
          Aktif
        </button>
        <button
          onClick={() => setFilter("selesai")}
          style={{
            background: filter === "selesai" ? "#b97d00" : "#17243b",
          }}
        >
          Selesai
        </button>
      </div>

      {tugas.length === 0 ? (
        <p>Belum ada tugas.</p>
      ) : (
        <ul>
          {tugasTampil.map((item) => (
            <ItemTugas
              key={item.id}
              item={item}
              onToggle={toggle}
              onHapus={hapus}
            />
          ))}
        </ul>
      )}

      <div className="mahasiswa">
        <h1>Profil Mahasiswa</h1>
        <ul>
          {mahasiswa.map((mhs) => (
            <li key={mhs.nim}>
              <Identitas nama={mhs.nama} nim={mhs.nim} />
              <DetailAkademik prodi={mhs.prodi} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mata-kuliah">
        <h1>Daftar Mata Kuliah</h1>
        <ul>
          {mataKuliah.map((mk) => (
            <li key={mk.id}>
              <KartuMatkul nama={mk.nama} sks={mk.sks} dosen={mk.dosen} />
            </li>
          ))}
        </ul>
      </div>
      
      <div className="jumlah-hadir">
        <h1>Jumlah Hadir</h1>
        <p>Jumlah Hadir: {jumlah}</p>
        <button
          type="button"
          onClick={() => setJumlah(Math.min(30, jumlah + 1))}
          disabled={jumlah >= 30}
        >
          Tambah Hadir
        </button>
        <br />
        <br />
        <button
          type="button"
          onClick={() => setJumlah(Math.max(0, jumlah - 1))}
          disabled={jumlah <= 0}
        >
          Kurangi Hadir
        </button>
        <br />
        <br />
        <button
          type="button"
          onClick={() => setJumlah(0)}
          disabled={jumlah === 0}
        >
          Reset Hadir
        </button>
        <p>{jumlah === 0 ? "Belum ada mahasiswa" : "Ada mahasiswa"}</p>
      </div>
    </main>
  );
}
