// components/Riwayat.jsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/style.css';

// Data riwayat hardcode sesuai gambar
const riwayatData = [
  {
    id: 1,
    jenis: 'HOAKS',
    tanggal: '26 APRIL 2026',
    skor: 98,
    tipe: 'INPUT TEKS',
    konten: '"Vaksin COVID-19 Memicu Mpox Karena Kandungan Virus Verocell."',
  },
  {
    id: 2,
    jenis: 'FAKTA',
    tanggal: '25 APRIL 2026',
    skor: 94,
    tipe: 'TAUTAN BERITA',
    konten: 'Pemerintah Resmi Mengumumkan Kebijakan Baru Terkait Privasi Data Digital dan Keamanan Siber Nasional.',
  },
  {
    id: 3,
    jenis: 'HOAKS',
    tanggal: '24 APRIL 2026',
    skor: 87,
    tipe: 'INPUT TEKS',
    konten: '"Pesan berantai WhatsApp tentang hadiah gratis saldo digital dari bank BUMN adalah upaya phishing..."',
  },
  {
    id: 4,
    jenis: 'HOAKS',
    tanggal: '23 APRIL 2026',
    skor: 92,
    tipe: 'TAUTAN BERITA',
    konten: 'Penipuan mengatasnamakan DANA memberikan saldo gratis Rp500.000, klik link ini...',
  },
  {
    id: 5,
    jenis: 'FAKTA',
    tanggal: '22 APRIL 2026',
    skor: 96,
    tipe: 'INPUT TEKS',
    konten: 'Bank Indonesia resmi meluncurkan QRIS Tap untuk pembayaran cepat.',
  },
];

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <h2>CEKCOK.</h2>
        </div>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>BERANDA</NavLink>
          <NavLink to="/riwayat" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>RIWAYAT</NavLink>
          <NavLink to="/tentang" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>TENTANG PROJEK</NavLink>
        </div>
        <div className="github-badge">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GITHUB</a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-tagline">
          <h3>CEKCOK.</h3>
          <p>"Cek dulu supaya cocok. Membangun ketahanan masyarakat terhadap misinformasi digital."</p>
        </div>
        <div className="footer-about">
          <h4>TENTANG KAMI</h4>
          <p>© 2026 CekCok by Capstonus. Distributed by DBS Foundation & Dicoding.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Riwayat() {
  const [activeFilter, setActiveFilter] = useState('SEMUA');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data berdasarkan jenis dan search query
  const filteredData = riwayatData.filter((item) => {
    if (activeFilter !== 'SEMUA' && item.jenis !== activeFilter) {
      return false;
    }
    if (searchQuery && !item.konten.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const totalAnalisa = 19101;
  const totalHoaks = 8716;

  return (
    <div className="riwayat-page">
      <Navbar />

      <main className="riwayat-main">
        {/* HEADER */}
        <div className="riwayat-header">
          <h1 className="riwayat-title">Riwayat Analisis.</h1>
          <p className="riwayat-subtitle">
            <em>Telusuri kembali analisis yang telah diproses oleh mesin inferensi kami.</em>
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="search-section">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Cari berdasarkan kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>
                ✕
              </button>
            )}
          </div>
        </div>

        {/* FILTER TABS */}
        <div className="filter-section">
          <div className="filter-tabs">
            <button
              className={`filter-btn ${activeFilter === 'SEMUA' ? 'active' : ''}`}
              onClick={() => setActiveFilter('SEMUA')}
            >
              SEMUA
            </button>
            <button
              className={`filter-btn ${activeFilter === 'FAKTA' ? 'active' : ''}`}
              onClick={() => setActiveFilter('FAKTA')}
            >
              FAKTA
            </button>
            <button
              className={`filter-btn ${activeFilter === 'HOAKS' ? 'active' : ''}`}
              onClick={() => setActiveFilter('HOAKS')}
            >
              HOAKS
            </button>
          </div>
        </div>

        {/* STATISTIK CARD */}
        <div className="stats-card">
          <div className="stats-item">
            <span className="stats-number">{totalAnalisa.toLocaleString('id-ID')} ANALISA</span>
          </div>
          <div className="stats-item">
            <span className="stats-number">{totalHoaks.toLocaleString('id-ID')} HOAKS</span>
          </div>
        </div>

        {/* HASIL PENCARIAN */}
        {searchQuery && (
          <div className="search-result-info">
            Menampilkan hasil untuk: <strong>"{searchQuery}"</strong>
          </div>
        )}

        {/* DAFTAR RIWAYAT */}
        <div className="riwayat-list">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="riwayat-card">
                <div className="card-row">
                  <span className={`jenis ${item.jenis === 'HOAKS' ? 'jenis-hoaks' : 'jenis-fakta'}`}>
                    {item.jenis}
                  </span>
                  <span className="tanggal">{item.tanggal}</span>
                  <span className="skor">SKOR KEYAKINAN {item.skor}%</span>
                </div>
                <div className="tipe">{item.tipe}</div>
                <h3 className="konten">{item.konten}</h3>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>Tidak ada hasil yang ditemukan untuk "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <span className="page-info">Halaman 1/5</span>
        </div>
      </main>

      <Footer />
    </div>
  );
}