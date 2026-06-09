import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { verifyTextApi, verifyUrlApi, pollCheckResult, formatVerdict, getRiwayat } from '../api/cekcokApi.js';

function Navbar() {
  return (
    <nav 
      className="sticky top-0 z-50 bg-white w-full"
      style={{ fontFamily: "'Fraunces', 'Times New Roman', serif" }}
    >
      <div className="py-4">
        <div className="w-full flex justify-between items-center px-6 md:px-12 lg:px-16">
          <div className="logo">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              CEKCOK<span className="text-blue-500">.</span>
            </h2>
          </div>
          <div className="nav-links flex gap-6 font-bold"
          style={{ fontFamily: "'Public Sans', sans-serif"}}>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? 'text-blue-500 font-semibold border-b-2 border-blue-500 pb-1' 
                  : 'text-gray-600 hover:text-blue-500 transition-colors duration-200'
              }
            >
              BERANDA
            </NavLink>
            <NavLink 
              to="/riwayat" 
              className={({ isActive }) => 
                isActive 
                  ? 'text-blue-500 font-semibold border-b-2 border-blue-500 pb-1' 
                  : 'text-gray-600 hover:text-blue-500 transition-colors duration-200'
              }
            >
              RIWAYAT
            </NavLink>
            <NavLink 
              to="/tentang" 
              className={({ isActive }) => 
                isActive 
                  ? 'text-blue-500 font-semibold border-b-2 border-blue-500 pb-1' 
                  : 'text-gray-600 hover:text-blue-500 transition-colors duration-200'
              }
            >
              TENTANG PROJEK
            </NavLink>
          </div>
          <div className="github-badge">
            <a 
              href="https://github.com/CekCok-Capstonus" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 transition-all duration-200 hover:bg-black hover:text-white hover:border-black"
              style={{ borderRadius: '0px' }}
            >
              GITHUB
            </a>
          </div>
        </div>
      </div>
      <div className="w-full h-0.5 bg-gray-800"></div>
    </nav>
  );
}

function LaporanTerbaru() {
  const [laporanData, setLaporanData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatRelativeTime = (isoDate) => {
    const now = new Date();
    const date = new Date(isoDate);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}j`;
    if (diffDays === 1) return 'Kemarin';
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return date.toLocaleDateString('id-ID');
  };

  const cleanContent = (text) => {
    if (!text) return '';
    let cleaned = text;
    cleaned = cleaned.replace(/^[>\*]\s*/gm, '');
    cleaned = cleaned.replace(/>\s*Ringkasan\s*Berita:\s*/gi, '');
    cleaned = cleaned.replace(/Ringkasan\s*Berita:\s*/gi, '');
    cleaned = cleaned.replace(/^\s+/gm, '');
    cleaned = cleaned.replace(/[ ]{2,}/g, ' ');
    cleaned = cleaned.trim();
    return cleaned;
  };

  const fetchLatestRiwayat = async () => {
    setIsLoading(true);
    try {
      const response = await getRiwayat({
        page: 1,
        limit: 3,
        search: '',
        label: '',
      });
      
      const formattedData = response.data.map((item) => {
        const jenis = item.label === 'hoax' ? 'HOAKS' : (item.label === 'valid' ? 'FAKTA' : 'PROSES');
        const skor = item.confidence_score ? Math.round(item.confidence_score * 100) : 0;
        const tipe = item.input_type === 'text' ? 'INPUT TEKS' : 'TAUTAN BERITA';
        const cleanedContent = cleanContent(item.content);
        
        return {
          id: item.id,
          confidence: skor,
          type: tipe,
          content: cleanedContent.length > 150 ? `${cleanedContent.substring(0, 150)}...` : cleanedContent,
          time: formatRelativeTime(item.created_at),
          verdict: jenis,
          rawDate: item.created_at,
        };
      });
      
      setLaporanData(formattedData);
    } catch (err) {
      console.error('Gagal mengambil laporan terbaru:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestRiwayat();
    const interval = setInterval(() => {
      fetchLatestRiwayat();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading && laporanData.length === 0) {
    return (
      <section 
        className="w-full"
        style={{ 
          fontFamily: "'Fraunces', serif",
          backgroundColor: '#fff3f3'
        }}
      >
        <div className="py-16 md:py-16 w-full">
          <div className="w-full px-6 md:px-12 lg:px-16">
            <div className="flex justify-between items-center mb-3 w-full">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined" style={{ color: '#2563eb', fontSize: '28px' }}>
                  history
                </span>
                <h2 className="text-2xl font-bold text-black" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}>
                  Laporan Terbaru
                </h2>
              </div>
              <NavLink 
                to="/riwayat" 
                className="text-sm font-medium hover:underline"
                style={{ fontFamily: "'Fraunces', serif", color: '#000' }}
              >
                Lihat Semua →
              </NavLink>
            </div>
            <div className="border-b-2 border-black w-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8 px-6 md:px-12 lg:px-16">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="bg-white border-2 border-black relative flex flex-col w-full animate-pulse" style={{ borderRadius: '0px' }}>
                <div className="p-6 pt-14">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="w-full"
      style={{ 
        fontFamily: "'Fraunces', serif",
        backgroundColor: '#fff3f3'
      }}
    >
      <div className="py-16 md:py-16 w-full">
        <div className="w-full px-6 md:px-12 lg:px-16">
          <div className="flex justify-between items-center mb-3 w-full">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined" style={{ color: '#2563eb', fontSize: '28px' }}>
                history
              </span>
              <h2 className="text-2xl font-bold text-black" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}>
                Laporan Terbaru
              </h2>
            </div>
            <NavLink 
              to="/riwayat" 
              className="text-sm font-medium hover:underline"
              style={{ fontFamily: "'Fraunces', serif", color: '#000' }}
            >
              Lihat Semua →
            </NavLink>
          </div>
          <div className="border-b-2 border-black w-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8 px-6 md:px-12 lg:px-16">
          {laporanData.map((item, idx) => (
            <div 
              key={item.id || idx} 
              className="bg-white border-2 border-black relative flex flex-col w-full"
              style={{ borderRadius: '0px' }}
            >
              <div 
                className="absolute -top-4 right-0 px-4 py-1.5 text-sm font-bold"
                style={{ 
                  fontFamily: "'Fraunces', serif",
                  backgroundColor: item.verdict === 'HOAKS' ? '#dc2626' : '#16a34a',
                  color: 'white'
                }}
              >
                {item.confidence}% CONFIDENCE
              </div>
              <div className="p-6 pt-14 flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    {item.type === 'INPUT TEKS' ? (
                      <span className="material-symbols-outlined" style={{ color: '#000', fontSize: '16px' }}>
                        create
                      </span>
                    ) : (
                      <span 
                        className="material-symbols-outlined" 
                        style={{ 
                          color: '#000', 
                          fontSize: '16px',
                          transform: 'rotate(-30deg)',
                          display: 'inline-block'
                        }}
                      >
                        link
                      </span>
                    )}
                    <span className="text-sm font-medium" style={{ fontFamily: "'Fraunces', serif", color: '#000', fontWeight: 600 }}>
                      {item.type}
                    </span>
                  </div>
                  
                  <div 
                    className="px-4 py-1.5 text-sm font-bold"
                    style={{ 
                      fontFamily: "'Fraunces', serif",
                      backgroundColor: item.verdict === 'HOAKS' ? '#dc2626' : '#16a34a',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0px'
                    }}
                  >
                    {item.verdict}
                  </div>
                </div>
                <p className="text-black mb-4 leading-relaxed font-bold flex-grow" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: '18px' }}>
                  {item.content}
                </p>
                <div className="border-t border-gray-200 my-3"></div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined" style={{ color: '#999', fontSize: '16px' }}>
                      schedule
                    </span>
                    <span className="text-sm text-gray-400" style={{ fontFamily: "'Fraunces', serif" }}>
                      {item.time}
                    </span>
                  </div>
                  <button 
                    className="text-sm font-medium hover:underline"
                    style={{ fontFamily: "'Fraunces', serif", color: '#000' }}
                    onClick={() => console.log('Baca detail:', item)}
                  >
                    BACA DETAIL →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metodologi() {
  const steps = [
    { num: '01', title: 'Pengumpulan Data', desc: 'Kami mengambil data dari url atau uplikan yang Anda masukkan lalu menyiapkannya untuk dianalisis lebih dalam.' },
    { num: '02', title: 'Mesin Inferensi AI', desc: 'Model kami menganalisis pola dan kredibilitas sumber melalui ribuan dataset berita Indonesia.' },
    { num: '03', title: 'Keputusan', desc: 'Dapatkan hasil klasifikasi instan (hoaks/fakta) lengkap dengan skor kepercayaan dan alasan pendukung.' }
  ];

  return (
    <div className="w-full"
    style={{ fontFamily: "'Fraunces', serif"}}>
      <div className="bg-black py-24 px-6 md:px-12 lg:px-16 w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-6xl font-bold text-center text-white mb-12" style={{ fontFamily: "'Fraunces', serif" }}>
            Metodologi Investigasi Kami
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 md:p-8 h-auto md:h-[280px] flex flex-col">
                <div className="bg-blue-600 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl md:text-2xl">{step.num}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 ">{step.title}</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-grow italic">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white py-16 px-6 md:px-12 lg:px-16 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 text-center border border-gray-200">
              <div className="text-7xl md:text-8xl font-bold text-black-600" style={{ fontFamily: "'Fraunces', serif" }}>
                25K+
              </div>
              <div className="text-gray-500 text-sm mt-2" style={{ fontFamily: "'Public Sans', Sans-serif" }}>
                Total Verifikasi
              </div>
            </div>
            <div className="bg-gray-50 p-6 text-center border border-gray-200">
              <div className="text-7xl md:text-8xl font-bold text-blue-600" style={{ fontFamily: "'Fraunces', serif" }}>
                45K
              </div>
              <div className="text-gray-500 text-sm mt-2" style={{ fontFamily: "'Public sans', Sans-serif" }}>
                Hoaks Terungkap
              </div>  
            </div>
            <div className="bg-gray-50 p-6 text-center border border-gray-200">
              <div className="text-7xl md:text-8xl font-bold text-black-600" style={{ fontFamily: "'Fraunces', serif" }}>
                125K+
              </div>
              <div className="text-gray-500 text-sm mt-2" style={{ fontFamily: "'Public Sans', Sans-serif" }}>
                Total Dataset
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Manifesto() {
  return (
    <section className="mb-12 px-6 md:px-12 lg:px-16">
      <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm border border-gray-100 max-w-6xl mx-auto">
        <h3 
          className="text-3xl md:text-3xl text-gray-900 mb-6" 
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Manifesto Waras
        </h3>
        <div className="flex justify-center">
          <div className="w-3/4 h-px bg-gray-300 mb-6"></div>
        </div>
        <p className="text-gray-700 italic max-w-5xl mx-auto leading-relaxed text-base md:text-lg mb-6"
        style={{ fontFamily: "'Fraunces', serif"}}>
          "Senja menyapa membawa sejuta warna, secangkir kopi menemani linimasa yang penuh huru-hara. 
          Berita simpang siur datang silih berganti, membawa kepanikan yang tak terperi. 
          Wahai kawan, berhentilah menerka-nerka dalam gulita. Tenangkan jiwamu, seruput kopimu, 
          dan biarkan sistem kami yang bekerja memisahkan mana yang berita, dan mana yang cuma karangan belaka."
        </p>
        <div className="flex justify-center">
          <div className="w-3/4 h-0.5 bg-black mb-6"></div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "CekCok ini sebenarnya aplikasi apa sih?", a: "Singkatnya, ini asisten digital buat bantu kamu ngecek apakah sebuah teks berita atau artikel itu punya indikasi hoaks atau fakta. Biar kamu nggak buru-buru emosi terus nge-share info yang salah." },
    { q: "Terus, cara pakainya gimana? Ribet nggak?", a: "Tinggal copy-paste aja teks berita atau tautan yang bikin kamu ragu ke kolom yang disediakan, terus klik tombol cek. Sistem kami bakal menganalisis teks tersebut dan ngasih persentase serta alasannya." },
    { q: "Dibalik layarnya, ini pakai sihir apa?", a: "Nggak pakai sihir kok! Kami menggunakan kecerdasan buatan (Artificial Intelligence), spesifiknya Deep Learning dan pemrosesan bahasa alami (NLP). Model ini sudah 'belajar' dari ribuan dataset berita asli dan hoaks untuk mengenali pola-pola bahasa yang mencurigakan." },
    { q: "Hasil dari CekCok ini 100% akurat pasti bener, kan?", a: "Nah, ini penting. Meskipun model kami dilatih dengan canggih, AI tetaplah AI yang bisa keliru (false positive atau false negative). Hasil dari CekCok sebaiknya dijadikan sebagai referensi awal atau peringatan dini, bukan kebenaran absolut. Tetap budayakan cross-check ke portal berita resmi, ya!" },
    { q: "Bisa ngecek gambar atau video editan (deepfake) nggak?", a: "Tentu tidak, CekCok hanya bisa menganalisis dan mendeteksi kebohongan lewat teks saja. Jadi kalau ada video orang yang janjiin 19 Juta lapangan pekerjaan, itu pakai insting aja ya!" },
    { q: "Berita yang aku masukin bakal disimpan sama kalian nggak?", a: "Tenang, teks yang kamu masukkan hanya akan disimpan secara anonim sebagai riwayat. Nantinya, kumpulan teks ini akan kami jadikan dataset tambahan untuk melatih ulang (retrain) model AI kami supaya deteksinya makin akurat." }
  ];

  return (
    <section className="py-4 px-6 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-12" 
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Biar Nggak CekCok
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <div className="bg-white border-2 border-black rounded-none p-5" style={{ boxShadow: '6px 6px 0px 0px #000000' }}>
                <div 
                  className="font-bold text-gray-900 text-lg md:text-xl mb-4 pb-2 border-b-2 border-black"
                  
                >
                  {faq.q}
                </div>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed"
                style={{ fontFamily: "'Fraunces', serif" }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer 
      className="py-12 mt-0" 
      style={{ 
        backgroundColor: '#fff3f3',
        fontFamily: "'Fraunces', 'Times New Roman', serif"
      }}
    >
      <div className="px-6 md:px-12 lg:px-16">
        <div className="px-20 mx-20">
          <h3 className="text-3xl font-black tracking-tight text-gray-900 mb-4">
            CEKCOK.
          </h3>
          
          <div className="flex justify-between items-center">
            <p className="text-gray-600 italic text-sm mb-4 leading-relaxed" style={{ fontFamily: "'Fraunces', serif" }}>
              "Çek dulu supaya cocok. Membangun ketahanan masyarakat terhadap misinformasi digital."
            </p>
            <span className="text-gray-500 text-xs tracking-wide uppercase hover:text-gray-700 cursor-pointer transition font-medium">
              TENTANG KAMI
            </span>
          </div>
        </div>    
        <div className="h-0.5 bg-gray-400 mb-8 w-4/5 mx-auto"></div>
        <div className="flex justify-center items-center gap-8 mb-8">
          <div className="flex justify-center">
            <img 
              src="/images/dicoding.png"
              alt="Dicoding"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>
          <div className="flex justify-center">
            <img 
              src="/images/codingCamp.png"
              alt="DBS Foundation"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm tracking-wide">
          <p>
            © 2026 ÇekCok by Capstomus. Distributed by DBS Foundation & Dicoding.
          </p>
        </div>
      </div>
    </footer>
  );
}

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
        if (!urlInput) {
          throw new Error('URL tidak boleh kosong');
        }
        initialResponse = await verifyUrlApi(urlInput);
      } else {
        if (!isiBerita) {
          throw new Error('Isi berita tidak boleh kosong');
        }
        initialResponse = await verifyTextApi(judulBerita, isiBerita);
      }
      
      const checkId = initialResponse.data.id;
      const finalCheck = await pollCheckResult(checkId);
      
      if (finalCheck.status === 'fail') {
        throw new Error(finalCheck.error_message || 'Verifikasi gagal. Silakan coba lagi.');
      }
      
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
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="px-0 pt-12 pb-12 md:pb-16">
        <section className="text-center mb-16 max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <h1 
            className="text-8xl md:text-10xl lg:text-8xl font-bold text-gray-900 tracking-tight leading-tight flex flex-wrap justify-center"
            style={{ fontFamily: "'Fraunces', 'Times New Roman', serif" }}
          >
            <span className="whitespace-nowrap">
              Lawan{' '}
              <span className="text-blue-500 underline underline-offset-8 decoration-2 italic">
                Miss Informasi
              </span>
            </span>
            <br />
            <span>Dengan Presisi.</span>
          </h1>
        </section>

        <section className="mb-16 max-w-4xl mx-auto px-6 md:px-12 lg:px-16" style={{ fontFamily: "'Fraunces', serif" }}>
          <div className="border-4 border-black bg-white" style={{ borderRadius: '0px' }}>
            
            <div className="grid grid-cols-2 border-b-4 border-black">
              <button
                className={`py-5 text-center font-bold text-xl transition-all duration-200 ${
                  activeTab === 'tautan'
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
                style={{ fontFamily: "'Fraunces', serif" }}
                onClick={() => setActiveTab('tautan')}
              >
                TEMPEL TAUTAN
              </button>
              <button
                className={`py-5 text-center font-bold text-xl transition-all duration-200 border-l-4 border-black ${
                  activeTab === 'teks'
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
                style={{ fontFamily: "'Fraunces', serif" }}
                onClick={() => setActiveTab('teks')}
              >
                TULIS TEKS
              </button>
            </div>
            
            <div className="p-8 md:p-10">
              {activeTab === 'tautan' ? (
                <div className="space-y-4">
                  <label className="block text-base md:text-lg font-semibold text-gray-700" style={{ fontFamily: "'Fraunces', serif" }}>
                    Tautan Berita
                  </label>
                  <input 
                    type="url" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-none text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    style={{ fontFamily: "'Fraunces', serif", fontSize: '16px' }}
                    placeholder="https://bukan-hoax.icu/berita-hari-sabtu" 
                    value={urlInput} 
                    onChange={(e) => setUrlInput(e.target.value)} 
                  />
                  <p className="text-gray-500 text-sm md:text-base italic" style={{ fontFamily: "'Fraunces', serif", fontSize: '14px' }}>
                    *Proses pengecekan membutuhkan waktu, pastikan tautan <br />
                      valid dan dapat di akses.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-base md:text-lg font-semibold text-gray-700" style={{ fontFamily: "'Fraunces', serif" }}>
                      Judul Berita
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-none text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      style={{ fontFamily: "'Fraunces', serif", fontSize: '16px' }}
                      placeholder="Pria dari solo memiliki banyak hutang" 
                      value={judulBerita} 
                      onChange={(e) => setJudulBerita(e.target.value)} 
                    />
                    <p className="text-gray-500 text-sm md:text-base italic" style={{ fontFamily: "'Fraunces', serif" }}>
                      *Kolom judul opsional, dan pastikan anda mengisi kolom berita dengan tepat dan lengkap.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-base md:text-lg font-semibold text-gray-700" style={{ fontFamily: "'Fraunces', serif" }}>
                      Isi Berita
                    </label>
                    <textarea 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-none text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black resize-y"
                      style={{ fontFamily: "'Fraunces', serif", fontSize: '16px' }}
                      rows="5" 
                      placeholder="Seorang pria asal Solo tinggalkan utang ribuan triliun sebelum pensiun. Saat ditanya warga bagaimana cara melunasinya, ia cuma bagi-bagi sepeda lalu menjawab santai, 'Yo ndak tau, kok tanya saya?" 
                      value={isiBerita} 
                      onChange={(e) => setIsiBerita(e.target.value)} 
                    />
                  </div>
                </div>
              )}
              
              <button 
                className="w-full mt-8 bg-black hover:bg-gray-800 text-white font-semibold py-3 text-base md:text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, borderRadius: '0px' }}
                onClick={handleVerify} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memverifikasi...
                  </span>
                ) : 'Mulai Verifikasi'}
              </button>
              
              {error && (
                <div className="mt-6 p-5 bg-red-50 border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-800 mb-2 text-base md:text-lg" style={{ fontFamily: "'Fraunces', serif" }}>Terjadi Kesalahan</h4>
                  <p className="text-red-600 text-sm md:text-base" style={{ fontFamily: "'Fraunces', serif" }}>{error}</p>
                </div>
              )}
              
              {result && !error && (
                <div className={`mt-6 p-5 ${
                  result.success 
                    ? result.verdict === 'INDIKASI HOAKS' 
                      ? 'bg-red-50 border-l-4 border-red-500' 
                      : 'bg-green-50 border-l-4 border-green-500'
                    : 'bg-red-50 border-l-4 border-red-500'
                }`}>
                  <h4 className="font-semibold text-gray-900 mb-3 text-base md:text-lg" style={{ fontFamily: "'Fraunces', serif" }}>Hasil Verifikasi</h4>
                  {result.confidence ? (
                    <>
                      <div className="inline-block bg-gray-100 text-black text-xs font-bold px-3 py-1 mb-3">
                        {result.confidence}% CONFIDENCE
                      </div>
                      <p className={`font-bold text-lg md:text-xl mb-2 ${
                        result.verdict === 'INDIKASI HOAKS' ? 'text-red-600' : 'text-green-600'
                      }`} style={{ fontFamily: "'Fraunces', serif" }}>
                        {result.verdict}
                      </p>
                      <div 
                        className="text-gray-700 text-sm md:text-base leading-relaxed"
                        style={{ fontFamily: "'Fraunces', serif" }}
                        dangerouslySetInnerHTML={{ __html: result.reason }}
                      />
                    </>
                  ) : (
                    <p className="text-red-600 text-sm md:text-base" style={{ fontFamily: "'Fraunces', serif" }}>{result.message}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <LaporanTerbaru />
        <Metodologi />
        <Manifesto />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}