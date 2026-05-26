import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getRiwayat, getAnalyticsSummary, getCheckDetail } from '../api/cekcokApi.js';

// KOMPONEN NAVBAR
function Navbar() {
  return (
    <nav 
      className="sticky top-0 z-50 bg-white"
      style={{ fontFamily: "'Fraunces', 'Times New Roman', serif" }}
    >
      <div className="px-6 md:px-12 lg:px-16 py-4">
        <div className="w-full flex justify-between items-center">
          <div className="logo">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              CEKCOK<span className="text-blue-500">.</span>
            </h2>
          </div>
          <div className="nav-links flex gap-6">
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
              className="inline-block px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-blue-500 hover:text-white hover:border-black-500 transition-all duration-200"
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

// KOMPONEN FOOTER
function Footer() {
  return (
    <footer 
      className="py-12 mt-12" 
      style={{ 
        backgroundColor: '#fff3f3',
        fontFamily: "'Fraunces', 'Times New Roman', serif"
      }}
    >
      <div className="px-6 md:px-12 lg:px-16">
        <div className="flex justify-between items-start mb-4 px-20 mx-20">
          <h3 className="text-3xl font-black tracking-tight text-gray-900">
            CEKCOK.
          </h3>
          <span className="text-gray-500 text-xs tracking-wide uppercase hover:text-gray-700 cursor-pointer transition font-medium">
            TENTANG KAMI
          </span>
        </div>
        
        <p className="text-gray-600 italic text-sm mb-8 max-w-xl leading-relaxed ml-40">
          "Çek dulu supaya cocok. Membangun ketahanan masyarakat terhadap misinformasi digital."
        </p>
        
        <div className="w-full h-1 bg-gray-400 mb-8"></div>
        
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

// Helper: format tanggal dari ISO ke format "DD MONTH YYYY"
function formatTanggal(isoDate) {
  const date = new Date(isoDate);
  const days = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];
  const day = date.getDate();
  const month = days[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

// Helper: format tanggal lengkap dengan waktu
function formatTanggalLengkap(isoDate) {
  const date = new Date(isoDate);
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${dayName}, ${day} ${month} ${year} ${hours}:${minutes}`;
}

// Helper: format skor confidence (0-1 ke persen)
function formatConfidence(score) {
  if (!score && score !== 0) return null;
  return Math.round(score * 100);
}

// Helper: Bersihkan teks dari marker aneh
function cleanContent(text) {
  if (!text) return '';
  
  let cleaned = text;
  
  cleaned = cleaned.replace(/^[>\*]\s*/gm, '');
  cleaned = cleaned.replace(/>\s*Ringkasan\s*Berita:\s*/gi, '');
  cleaned = cleaned.replace(/Ringkasan\s*Berita:\s*/gi, '');
  cleaned = cleaned.replace(/^\s+/gm, '');
  cleaned = cleaned.replace(/[ ]{2,}/g, ' ');
  cleaned = cleaned.trim();
  
  return cleaned;
}

export default function Riwayat() {
  const [activeFilter, setActiveFilter] = useState('SEMUA');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [riwayatData, setRiwayatData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({ total_checks: 0, total_hoax: 0 });
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, total_pages: 1 });
  
  // State untuk modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  // Ambil data riwayat dari backend
  const fetchRiwayat = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getRiwayat({
        page,
        limit: 10,
        search: searchQuery,
        label: activeFilter,
      });
      
      setRiwayatData(response.data);
      setPagination({
        page: response.pagination.page,
        limit: response.pagination.limit,
        total: response.pagination.total,
        total_pages: response.pagination.total_pages,
      });
      setCurrentPage(response.pagination.page);
    } catch (err) {
      setError(err.message);
      setRiwayatData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Ambil ringkasan statistik
  const fetchSummary = async () => {
    try {
      const response = await getAnalyticsSummary();
      setSummary({
        total_checks: response.data.total_checks,
        total_hoax: response.data.total_hoax,
      });
    } catch (err) {
      console.error('Gagal mengambil summary:', err);
    }
  };

  // Ambil detail untuk modal
  const handleCardClick = async (id) => {
    setIsDetailLoading(true);
    setSelectedItem(null);
    setIsModalOpen(true);
    
    try {
      const response = await getCheckDetail(id);
      setSelectedItem(response.data);
    } catch (err) {
      console.error('Gagal mengambil detail:', err);
      setSelectedItem({ error: true, message: err.message });
    } finally {
      setIsDetailLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Load data saat komponen mount, filter berubah, search berubah
  useEffect(() => {
    fetchRiwayat(1);
  }, [activeFilter, searchQuery]);

  // Load summary sekali saat mount
  useEffect(() => {
    fetchSummary();
  }, []);

  // Handle halaman berganti
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.total_pages && newPage !== currentPage) {
      fetchRiwayat(newPage);
    }
  };

  // Generate nomor halaman yang ditampilkan
  const getPageNumbers = () => {
    const totalPages = pagination.total_pages;
    const current = currentPage;
    const pages = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (current >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* MAIN - tanpa padding horizontal dan padding top agar background mentok */}
      <main className="px-0 pt-0 pb-12 md:pb-16">
        
        {/* HEADER - Full width, mentok ke navbar dan pinggir layar */}
        <div className="w-full" style={{ backgroundColor: '#fff3f3', paddingTop: '0', paddingBottom: '2rem', marginTop: '0', marginBottom: '0' }}>
          {/* Container dalam untuk padding konten - ini yang memberikan jarak pada TEKS, bukan background */}
          <div className="px-6 md:px-12 lg:px-16">
            <div className="flex flex-wrap items-start justify-between gap-6">
              {/* Kiri: Teks */}
              <div className="flex-1 min-w-[200px]">
                <h2 className="text-2xl font-semibold" style={{ fontFamily: "'Fraunces', serif", color: '#2d2d2d', marginBottom: '0.5rem' }}>
                  Riwayat Analisis
                </h2>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: '0.95rem', color: '#5e5e5e', margin: 0 }}>
                  Telusuri kembali analisis yang telah diproses oleh mesin inferensi kami.
                </p>
              </div>

              {/* Kanan: Search bar */}
              <div className="flex-1 min-w-[260px] flex justify-end">
                <div className="relative w-full max-w-md" style={{ position: 'relative' }}>
                  {/* Bayangan hitam pekat grafiti - sudut siku */}
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: '-8px',
                      right: '-8px',
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#0a0a0a',
                      borderRadius: '0px',
                      zIndex: 0,
                    }}
                  />
                  
                  <div className="relative" style={{ zIndex: 2 }}>
                    <div className="relative">
                      {/* Ikon search background biru - kotak persegi */}
                      <div 
                        className="absolute left-0 top-0 bottom-0 flex items-center justify-center"
                        style={{
                          backgroundColor: '#3b82f6',
                          width: '44px',
                        }}
                      >
                        <span className="text-white text-lg">🔍</span>
                      </div>
                      
                      <input
                        type="text"
                        className="w-full text-gray-900 focus:outline-none transition-all"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          backgroundColor: 'white',
                          border: '1px solid #e2dcdc',
                          borderRadius: '0px',
                          paddingTop: '0.75rem',
                          paddingBottom: '0.75rem',
                          paddingLeft: '56px',
                          paddingRight: '2.5rem',
                          width: '100%',
                        }}
                        placeholder="Cari berdasarkan kata kunci..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {searchQuery && (
                        <button 
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setSearchQuery('')}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KONTEN LAINNYA - tetap dalam container dengan padding */}
        <div className="px-6 md:px-12 lg:px-16">
          {/* FILTER TABS */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === 'SEMUA' 
                    ? 'bg-primary-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveFilter('SEMUA')}
              >
                SEMUA
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === 'FAKTA' 
                    ? 'bg-primary-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveFilter('FAKTA')}
              >
                FAKTA
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === 'HOAKS' 
                    ? 'bg-primary-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveFilter('HOAKS')}
              >
                HOAKS
              </button>
            </div>
          </div>

          {/* STATISTIK CARD - Full width */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
              <span className="text-3xl font-extrabold text-primary-600">{summary.total_checks.toLocaleString('id-ID')} ANALISA</span>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
              <span className="text-3xl font-extrabold text-red-500">{summary.total_hoax.toLocaleString('id-ID')} HOAKS</span>
            </div>
          </div>

          {/* HASIL PENCARIAN */}
          {searchQuery && !isLoading && (
            <div className="text-center text-gray-500 text-sm mb-6">
              Menampilkan hasil untuk: <strong className="text-gray-700">"{searchQuery}"</strong>
              {riwayatData.length === 0 && " - Tidak ditemukan"}
            </div>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-600 mb-3">⚠️ {error}</p>
              <button 
                onClick={() => fetchRiwayat(currentPage)} 
                className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* LOADING STATE */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 text-gray-500">
                <svg className="animate-spin h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memuat riwayat...
              </div>
            </div>
          )}

          {/* DAFTAR RIWAYAT - Grid layout full width */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {riwayatData.length > 0 ? (
                riwayatData.map((item) => {
                  const jenis = item.label === 'hoax' ? 'HOAKS' : (item.label === 'valid' ? 'FAKTA' : 'PROSES');
                  const skor = formatConfidence(item.confidence_score);
                  const tipe = item.input_type === 'text' ? 'INPUT TEKS' : 'TAUTAN BERITA';
                  const tanggal = formatTanggal(item.created_at);
                  const cleanedContent = cleanContent(item.content);
                  
                  return (
                    <div 
                      key={item.id} 
                      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
                      onClick={() => handleCardClick(item.id)}
                    >
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          jenis === 'HOAKS' 
                            ? 'bg-red-100 text-red-600' 
                            : jenis === 'FAKTA' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {jenis}
                        </span>
                        <span className="text-gray-400 text-xs">{tanggal}</span>
                        {skor && (
                          <span className="text-primary-600 text-xs font-bold">{skor}%</span>
                        )}
                      </div>
                      <div className="text-gray-400 text-xs mb-2">{tipe}</div>
                      <h3 className="text-gray-800 text-sm leading-relaxed line-clamp-3 mb-3">
                        {cleanedContent.substring(0, 200)}...
                      </h3>
                      <div className="text-primary-600 text-xs font-medium mt-2">
                        Klik untuk detail lengkap →
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <p>Tidak ada hasil yang ditemukan{searchQuery ? ` untuk "${searchQuery}"` : ''}</p>
                </div>
              )}
            </div>
          )}

          {/* PAGINATION */}
          {!isLoading && !error && pagination.total_pages > 1 && (
            <div className="flex flex-col items-center gap-4 mt-8">
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &laquo; Sebelumnya
                </button>
                
                <div className="flex gap-1">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                        page === currentPage 
                          ? 'bg-primary-600 text-white' 
                          : page === '...' 
                            ? 'bg-transparent cursor-default text-gray-400' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      onClick={() => typeof page === 'number' && handlePageChange(page)}
                      disabled={page === '...'}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.total_pages}
                >
                  Selanjutnya &raquo;
                </button>
              </div>
              <div className="text-gray-400 text-sm">
                Menampilkan {(currentPage - 1) * pagination.limit + 1} - {Math.min(currentPage * pagination.limit, pagination.total)} dari {pagination.total} data
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* MODAL DETAIL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {isDetailLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="inline-flex items-center gap-2 text-gray-500">
                  <svg className="animate-spin h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memuat detail...
                </div>
              </div>
            ) : selectedItem?.error ? (
              <div className="p-8 text-center">
                <p className="text-red-600 mb-4">⚠️ {selectedItem.message}</p>
                <button onClick={closeModal} className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg">Tutup</button>
              </div>
            ) : selectedItem && (
              <>
                <div className="flex justify-between items-start p-6 border-b border-gray-100">
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedItem.label === 'hoax' 
                        ? 'bg-red-100 text-red-600' 
                        : selectedItem.label === 'valid' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {selectedItem.label === 'hoax' ? 'HOAKS' : (selectedItem.label === 'valid' ? 'FAKTA' : 'PROSES')}
                    </span>
                    <span className="text-primary-600 font-bold text-sm">
                      SKOR KEYAKINAN {formatConfidence(selectedItem.confidence_score)}%
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 text-2xl leading-none" onClick={closeModal}>✕</button>
                </div>
                
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  <div className="flex flex-wrap justify-between text-sm mb-6 pb-3 border-b border-gray-100">
                    <span className="text-gray-400">{selectedItem.input_type === 'text' ? 'INPUT TEKS' : 'TAUTAN BERITA'}</span>
                    <span className="text-gray-400">{formatTanggalLengkap(selectedItem.created_at)}</span>
                  </div>
                  
                  {selectedItem.title && (
                    <div className="mb-5">
                      <h4 className="font-semibold text-gray-700 mb-2">Judul Berita</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{cleanContent(selectedItem.title)}</p>
                    </div>
                  )}
                  
                  <div className="mb-5">
                    <h4 className="font-semibold text-gray-700 mb-2">Isi Berita</h4>
                    <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                      {cleanContent(selectedItem.content)}
                    </div>
                  </div>
                  
                  {selectedItem.source_url && (
                    <div className="mb-5">
                      <h4 className="font-semibold text-gray-700 mb-2">Sumber URL</h4>
                      <a href={selectedItem.source_url} target="_blank" rel="noopener noreferrer" className="text-primary-600 text-sm break-all hover:underline">
                        {selectedItem.source_url}
                      </a>
                    </div>
                  )}
                  
                  {selectedItem.explanation && (
                    <div className="mb-5">
                      <h4 className="font-semibold text-gray-700 mb-2">Penjelasan AI</h4>
                      <div 
                        className="text-gray-600 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: selectedItem.explanation }}
                      />
                    </div>
                  )}
                  
                  {selectedItem.error_message && (
                    <div className="mb-5 p-4 bg-red-50 rounded-xl">
                      <h4 className="font-semibold text-red-700 mb-2">Error</h4>
                      <p className="text-red-600 text-sm">{selectedItem.error_message}</p>
                    </div>
                  )}
                </div>
                
                <div className="p-6 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={closeModal} 
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-2 rounded-lg transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}