import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/style.css';
import { verifyTextApi, verifyUrlApi, pollCheckResult, formatVerdict } from '../api/cekcokApi.js';

// KOMPONEN NAVBAR (sama seperti sebelumnya)
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

// KOMPONEN LAPORAN TERBARU (sementara masih dummy, nanti bisa diintegrasikan juga)
function LaporanTerbaru() {
  const laporanData = [
    { confidence: 98, type: 'INPUT TEKS', content: '"Vaksin COVID-19 Memicu Mpox Karena Kandungan Virus Verocell."', time: '5m', verdict: 'HOAKS' },
    { confidence: 92, type: 'TAUTAN BERITA', content: 'Pemerintah Resmi Mengumumkan Kebijakan Baru Terkait Privasi Data Digital.', time: '1j', verdict: 'FAKTA' },
    { confidence: 87, type: 'INPUT TEKS', content: '"Pesan berantai WhatsApp tentang hadiah gratis saldo digital dari bank BUMN adalah upaya phishing..."', time: 'KEMARIN', verdict: 'HOAKS' },
  ];

  return (
    <section className="laporan-section">
      <h2 className="section-title">Laporan Terbaru</h2>
      <div className="laporan-list">
        {laporanData.map((item, idx) => (
          <div key={idx} className="laporan-card">
            <div className="confidence-badge">{item.confidence}% CONFIDENCE</div>
            <div className="laporan-type">{item.type}</div>
            <p className="laporan-content">{item.content}</p>
            <div className="laporan-footer">
              <span className="laporan-time">{item.time}</span>
              <span className={`verdict-badge ${item.verdict === 'HOAKS' ? 'hoaks' : 'fakta'}`}>{item.verdict}</span>
              <button className="detail-btn">BACA DETAIL &rarr;</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// KOMPONEN METODOLOGI (sama)
function Metodologi() {
  const steps = [
    { num: '01', title: 'Pengumpulan Data', desc: 'Kami mengambil data dari url atau uplikan yang Anda masukkan lalu menyiapkannya untuk dianalisis lebih dalam.' },
    { num: '02', title: 'Mesin Inferensi AI', desc: 'Model kami menganalisis pola dan kredibilitas sumber melalui ribuan dataset berita Indonesia.' },
    { num: '03', title: 'Keputusan', desc: 'Dapatkan hasil klasifikasi instan (hoaks/fakta) lengkap dengan skor kepercayaan dan alasan pendukung.' }
  ];

  return (
    <section className="metodologi-section">
      <h2 className="section-title">Metodologi Investigasi Kami</h2>
      <div className="steps-container">
        {steps.map((step, idx) => (
          <div key={idx} className="step-card">
            <div className="step-number">{step.num}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
      <div className="stats-container">
        <div className="stat-item"><div className="stat-number">25K+</div><div className="stat-label">Total Verifikasi</div></div>
        <div className="stat-item"><div className="stat-number">45K</div><div className="stat-label">Hoaks Terungkap</div></div>
        <div className="stat-item"><div className="stat-number">125K+</div><div className="stat-label">Total Dataset</div></div>
      </div>
    </section>
  );
}

// KOMPONEN MANIFESTO (sama)
function Manifesto() {
  return (
    <section className="manifesto-section">
      <div className="manifesto-card">
        <h3 className="manifesto-title">Manifesto Waras</h3>
        <p className="manifesto-text">
          Senja menyapa membawa sejuta warna, secangkir kopi menemani linimasa yang penuh huru-hara. 
          Berita simpang siur datang silih berganti, membawa kepanikan yang tak terperi. 
          Wahai kawan, berhentilah menerka-nerka dalam gulita. Tenangkan jiwamu, seruput kopimu, 
          dan biarkan sistem kami yang bekerja memisahkan mana yang berita, dan mana yang cuma karangan belaka.
        </p>
      </div>
    </section>
  );
}

// KOMPONEN FAQ (sama)
function FAQ() {
  const faqs = [
    { q: "CekCok ini sebenarnya aplikasi apa sih?", a: "Singkatnya, ini asisten digital buat bantu kamu ngecek apakah sebuah teks berita atau artikel itu punya indikasi hoaks atau fakta. Biar kamu nggak buru-buru emosi terus nge-share info yang salah." },
    { q: "Terus, cara pakainya gimana? Ribet nggak?", a: "Tinggal copy-paste aja teks berita atau tautan yang bikin kamu ragu ke kolom yang disediakan, terus klik tombol cek. Sistem kami bakal menganalisis teks tersebut dan ngasih persentase serta alasannya." },
    { q: "Dibalik layarnya, ini pakai sihir apa?", a: "Nggak pakai sihir kok! Kami menggunakan kecerdasan buatan (Artificial Intelligence) untuk membantu kita menciptakan produk baru yang lebih baik. hoaks untuk mengenali pola-pola bahasa yang mencurigakan." },
    { q: "Bisa ngecek gambar atau video editan (deepfake) nggak?", a: "Tentu tidak, CekCok hanya bisa menganalisis dan mendeteksi kebohongan lewat teks saja. Jadi kalau ada video orang yang janjiin 19 Juta lapangan pekerjaan, itu pakai insting aja ya!" },
    { q: "Berita yang aku masukin bakal disimpan sama kalian nggak?", a: "Tenang, teks yang kamu masukkan hanya akan disimpan secara anonim sebagai riwayat. Nantinya, kumpulan teks ini akan kami jadikan dataset tambahan untuk melatih ulang (retrain) model AI kami supaya deteksinya makin akurat." }
  ];

  return (
    <section className="faq-section">
      <h2 className="section-title">Biar Nggak CekCok</h2>
      <div className="faq-container">
        {faqs.map((faq, idx) => (
          <div key={idx} className="faq-item">
            <h3 className="faq-question">{faq.q}</h3>
            <p className="faq-answer">{faq.a}</p>
          </div>
        ))}
      </div>
      <p className="disclaimer">bukan kebenaran absolut. Tetap budayakan cross-check ke portal berita resmi, ya!</p>
    </section>
  );
}

// KOMPONEN FOOTER (sama)
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-tagline">
          <h3>CEKCOK.</h3>
          <p>"Cek dulu supaya cocok. Membangun ketahanan masyarakat terhadap miss informasi digital."</p>
        </div>
        <div className="footer-about">
          <h4>TENTANG KAMI</h4>
          <p>© 2026 CekCok by Capstonus. Distributed by DBS Foundation & Dicoding.</p>
        </div>
      </div>
    </footer>
  );
}

// MAIN DASHBOARD COMPONENT (DIUBAH)
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('tautan');
  const [urlInput, setUrlInput] = useState('');
  const [judulBerita, setJudulBerita] = useState('');
  const [isiBerita, setIsiBerita] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleVerify = async () => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    
    try {
      let initialResponse;
      
      if (activeTab === 'tautan') {
        // Validasi URL tidak boleh kosong
        if (!urlInput) {
          throw new Error('URL tidak boleh kosong');
        }
        initialResponse = await verifyUrlApi(urlInput);
      } else {
        // Validasi isi berita tidak boleh kosong
        if (!isiBerita) {
          throw new Error('Isi berita tidak boleh kosong');
        }
        initialResponse = await verifyTextApi(judulBerita, isiBerita);
      }
      
      // Ambil ID dari response
      const checkId = initialResponse.data.id;
      
      // Polling sampai hasil selesai
      const finalCheck = await pollCheckResult(checkId);
      
      // Cek apakah status success atau fail
      if (finalCheck.status === 'fail') {
        throw new Error(finalCheck.error_message || 'Verifikasi gagal. Silakan coba lagi.');
      }
      
      // Format hasil dari backend
      const { verdict, confidence } = formatVerdict(finalCheck.label, finalCheck.confidence_score);
      
      setResult({
        success: true,
        confidence: confidence,
        verdict: verdict,
        reason: finalCheck.explanation || (verdict === 'INDIKASI HOAKS' 
          ? 'Konten terdeteksi memiliki indikasi hoaks berdasarkan analisis AI.' 
          : 'Konten terverifikasi sebagai informasi yang kredibel.'),
      });
      
    } catch (err) {
      setError(err.message);
      setResult({ success: false, message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      <main className="main-content">
        {/* HERO */}
        <section className="hero">
          <h1 className="hero-title">Lawan Miss Informasi <span className="highlight">Dengan Presisi.</span></h1>
          <p className="hero-subtitle">CekCok menggunakan mesin inferensi AI untuk memverifikasi klaim di tengah ketidakpastian informasi digital.</p>
        </section>

        {/* VERIFIKASI */}
        <section className="verification-section">
          <div className="verification-tabs">
            <button className={`tab-btn ${activeTab === 'tautan' ? 'active' : ''}`} onClick={() => setActiveTab('tautan')}>TEMPEL TAUTAN</button>
            <button className={`tab-btn ${activeTab === 'teks' ? 'active' : ''}`} onClick={() => setActiveTab('teks')}>TULIS TEKS</button>
          </div>
          <div className="verification-card">
            {activeTab === 'tautan' ? (
              <div className="input-group">
                <label className="input-label">Tautan Berita</label>
                <input type="url" className="text-input" placeholder="https://bukan-hoax.icu/berita-hari-sabtu" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} />
                <p className="input-note">Proses pengecekan membutuhkan waktu, pastikan tautan valid dan dapat di akses.</p>
              </div>
            ) : (
              <>
                <div className="input-group">
                  <label className="input-label">Judul Berita</label>
                  <input type="text" className="text-input" placeholder="Pria dari solo memiliki banyak hutang" value={judulBerita} onChange={(e) => setJudulBerita(e.target.value)} />
                  <p className="input-note">Kolom judul opsional, dan pastikan anda mengisi kolom berita dengan tepat dan lengkap.</p>
                </div>
                <div className="input-group">
                  <label className="input-label">Isi Berita</label>
                  <textarea className="textarea-input" rows="5" placeholder="Seorang pria asal Solo tinggalkan utang ribuan triliun sebelum pensiun..." value={isiBerita} onChange={(e) => setIsiBerita(e.target.value)} />
                </div>
              </>
            )}
            <button className="verify-btn" onClick={handleVerify} disabled={isLoading}>
              {isLoading ? 'Memverifikasi...' : 'Mulai Verifikasi'}
            </button>
            
            {error && (
              <div className="result-card error">
                <h4>Terjadi Kesalahan</h4>
                <p className="error-message">{error}</p>
              </div>
            )}
            
            {result && !error && (
              <div className={`result-card ${result.success ? 'success' : 'error'}`}>
                <h4>Hasil Verifikasi</h4>
                {result.confidence ? (
                  <>
                    <div className="confidence-badge">{result.confidence}% CONFIDENCE</div>
                    <p className="result-verdict">{result.verdict}</p>
                    <div 
                      className="result-reason"
                      dangerouslySetInnerHTML={{ __html: result.reason }}
                    />
                  </>
                ) : (
                  <p className="error-message">{result.message}</p>
                )}
              </div>
            )}
          </div>
        </section>

        <LaporanTerbaru />
        <Metodologi />
        <Manifesto />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}