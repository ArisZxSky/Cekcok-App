import { NavLink } from 'react-router-dom';
import '../styles/style.css';

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
          <a href="https://github.com/CekCok-Capstonus" target="_blank" rel="noopener noreferrer">GITHUB</a>
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

export default function Tentang() {
  return (
    <div className="tentang-page">
      <Navbar />

      <main className="tentang-main">
        {/* HERO SECTION - Karena Fakta Nggak Boleh Kalah */}
        <section className="tentang-hero">
          <h1 className="tentang-hero-title">Karena Fakta <span className="highlight">Nggak Boleh Kalah.</span></h1>
          <p className="tentang-hero-subtitle">
            Berawal dari kepedulian terhadap ruang siber Indonesia, CekCok dikembangkan untuk memutus rantai hoaks. 
            Karena di tengah derasnya informasi, kamu berhak mendapatkan fakta.
          </p>
        </section>

        {/* MISI PROJEK */}
        <section className="misi-section">
          <h2 className="section-title">Misi Projek</h2>
          <p className="misi-text">
            Membekali masyarakat dengan alat pendeteksi hoaks berbasis AI yang pintar, transparan, dan gampang dipakai oleh siapa saja.
          </p>
        </section>

        {/* URGENSI FAKTA */}
        <section className="urgensi-section">
          <h2 className="section-title">URGENSI FAKTA.</h2>
          <p className="urgensi-text">
            Data mencatat terdapat lebih dari <strong>1.923 konten hoaks</strong> yang teridentifikasi sepanjang tahun 2024. 
            Dengan rata-rata 160 konten per bulan, misinformasi digital telah menjadi ancaman nyata bagi stabilitas opini publik 
            dan ketahanan komunitas di Indonesia.
          </p>

          <div className="stats-grid">
            <div className="stat-card-tentang">
              <div className="stat-number-tentang">48.5%</div>
              <div className="stat-label-tentang">ANCAMAN POLITIK</div>
              <p className="stat-desc">kasus hoaks didominasi oleh topik politik, memicu polarisasi yang tidak sehat.</p>
            </div>
            <div className="stat-card-tentang">
              <div className="stat-number-tentang">60-66%</div>
              <div className="stat-label-tentang">GAGAL VERIFIKASI</div>
              <p className="stat-desc">warganeg gagal mengenali klaim hoaks secara spesifik tanpa bantuan alat verifikasi.</p>
            </div>
          </div>
        </section>

        {/* INFRASTRUKTUR DETEKSI */}
        <section className="infrastruktur-section">
          <h2 className="section-title">Infrastruktur Deteksi</h2>
          <p className="infrastruktur-subtitle"><em>Membedah logika di balik setiap hasil verifikasi CekCok.</em></p>

          <div className="model-grid">
            <div className="model-card">
              <h3 className="model-title">MODEL NLP BINER</h3>
              <p className="model-text">
                Inti dari CekCok digerakkan oleh arsitektur Deep Learning yang dibangun melalui TensorFlow Functional API. 
                Model ini tidak dirancang generik, melainkan dilatih khusus untuk membedah kompleksitas konteks bahasa Indonesia.
              </p>
              <ul className="model-list">
                <li><strong>TARGET AKURASI ≥ 85%</strong></li>
                <li><strong>MARGIN ERROR (MAE): ≤ 0.02</strong></li>
                <li><strong>ARSITEKTUR: CUSTOM LAYER &amp; LOSS FUNCTION</strong></li>
              </ul>
            </div>

            <div className="model-card">
              <h3 className="model-title">INTEGRASI GENERATIVE AI</h3>
              <p className="model-text">
                Sistem kami tidak sekadar memberi label Hoaks atau fakta. Dengan mengintegrasikan Generative AI, 
                CekCok menyusun penjelasan naratif tentang mengapa sebuah klaim terindikasi salah, memberikan literasi 
                dan konteks tambahan bagi pengguna.
              </p>
            </div>
          </div>
        </section>

        {/* METODOLOGI BERBASIS BUKTI */}
        <section className="bukti-section">
          <h2 className="section-title">METODOLOGI BERBASIS BUKTI.</h2>
          <p className="bukti-text">
            Setiap hasil verifikasi tidak lahir dari sekadar tebakan algoritma. CekCok melakukan proses rujukan silang (cross-reference) 
            terhadap basis data yang kredibel, mencakup portal berita resmi, jurnal akademik, hingga publikasi pemerintah.
          </p>

          <div className="workflow-box">
            <h4 className="workflow-title">WORKFLOW SISTEM:</h4>
            <p className="workflow-text">INPUT → PREPROCESSING → DL INFERENCE → LLM EXPLANATION → VERDICT</p>
          </div>

          <div className="icons-grid">
            <span className="icon-tag">INTEGRITAS DATA</span>
            <span className="icon-tag">PEMROSESAN CERDAS</span>
            <span className="icon-tag">ZIP</span>
            <span className="icon-tag">ALGORITMA NETRAL</span>
            <span className="icon-tag">SINKRONISASI ARSIP</span>
          </div>
        </section>

        {/* ARSITEKTUR TEKNOLOGI */}
        <section className="arsitektur-section">
          <h2 className="section-title">Arsitektur Teknologi</h2>
          <div className="tech-grid">
            <span className="tech-tag">TENSORFLOW API</span>
            <span className="tech-tag">POSTGRESQL</span>
            <span className="tech-tag">REACT.JS &amp; NODE.JS</span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}