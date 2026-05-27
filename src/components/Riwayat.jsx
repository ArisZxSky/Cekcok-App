import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getRiwayat, getAnalyticsSummary, getCheckDetail } from '../api/cekcokApi.js';

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

function formatTanggal(isoDate) {
  const date = new Date(isoDate);
  const days = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];
  const day = date.getDate();
  const month = days[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

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

function formatConfidence(score) {
  if (!score && score !== 0) return null;
  return Math.round(score * 100);
}

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
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

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

  useEffect(() => {
    fetchRiwayat(1);
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    fetchSummary();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.total_pages && newPage !== currentPage) {
      fetchRiwayat(newPage);
    }
  };

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
      <main className="w-full pt-0 pb-0 md:pb-0">
        
        <div className="w-full" style={{ backgroundColor: 'rgba(252, 250, 247, 1)', paddingTop: '2rem', paddingBottom: '2rem', marginTop: '0', marginBottom: '0', borderBottom: '2px solid #0a0a0a' }}>
          <div className="px-6 md:px-12 lg:px-16" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex-1 min-w-[200px]">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#2d2d2d', marginBottom: '0.75rem' }}>
                  Riwayat Analisis.
                </h2>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: '1.1rem', color: '#000000', margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>
                  Telusuri kembali analisis yang telah diproses oleh mesin <br />
                  inferensi kami.
                </p>
              </div>
              <div className="flex-1 min-w-[260px] flex justify-end">
                <div className="relative w-full max-w-md" style={{ position: 'relative' }}>
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
                      <div 
                        className="absolute left-0 top-0 bottom-0 flex items-center justify-center"
                        style={{
                          backgroundColor: '#3b82f6',
                          width: '44px',
                        }}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          strokeWidth={1.5} 
                          stroke="currentColor" 
                          style={{ width: '20px', height: '20px', color: '#ffffff' }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                      </div>
                      
                      <input
                        type="text"
                        className="w-full text-gray-900 focus:outline-none transition-all"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          backgroundColor: 'white',
                          border: '2px solid #0a0a0a',
                          borderRadius: '0px',
                          paddingTop: '0.85rem',
                          paddingBottom: '0.85rem',
                          paddingLeft: '52px',
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

        <div className="w-full border-t-2 border-b-4 border-black bg-white">
          <div className="flex flex-wrap items-center justify-between py-8 px-6 md:px-12 lg:px-16 gap-4">
            <div className="flex gap-3">
              <button
                className={`px-6 py-2 text-sm font-medium transition-all duration-200 border border-black ${
                  activeFilter === 'SEMUA' 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
                style={{ borderRadius: '0px' }}
                onClick={() => setActiveFilter('SEMUA')}
              >
                SEMUA
              </button>
              
              <button
                className={`px-6 py-2 text-sm font-medium transition-all duration-200 border border-black ${
                  activeFilter === 'FAKTA' 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
                style={{ borderRadius: '0px' }}
                onClick={() => setActiveFilter('FAKTA')}
              >
                FAKTA
              </button>
              
              <button
                className={`px-6 py-2 text-sm font-medium transition-all duration-200 border border-black ${
                  activeFilter === 'HOAKS' 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
                style={{ borderRadius: '0px' }}
                onClick={() => setActiveFilter('HOAKS')}
              >
                HOAKS
              </button>
            </div>
            
            <div className="flex gap-6 md:gap-8">
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: '#3b82f6' }}
                ></div>
                <span className="text-sm md:text-base text-gray-400" style={{ fontFamily: " serif" }}>
                  {summary.total_checks.toLocaleString('id-ID')} ANALISA
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: '#dc2626' }}
                ></div>
                <span className="text-sm md:text-base text-gray-400" style={{ fontFamily: " serif" }}>
                  {summary.total_hoax.toLocaleString('id-ID')} HOAKS
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-12 lg:px-16 pt-20" style={{background :'rgba(252, 250, 247, 1)'}}>
          {searchQuery && !isLoading && (
            <div className="text-center text-gray-500 text-sm mb-6">
              Menampilkan hasil untuk: <strong className="text-gray-900">"{searchQuery}"</strong>
              {riwayatData.length === 0 && " - Tidak ditemukan"}
            </div>
          )}

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

          {!isLoading && !error && (
            <div className="flex flex-col gap-14">
              {riwayatData.length > 0 ? (
                riwayatData.map((item) => {
                  const jenis = item.label === 'hoax' ? 'HOAKS' : (item.label === 'valid' ? 'FAKTA' : 'PROSES');
                  const skor = formatConfidence(item.confidence_score);
                  const tipe = item.input_type === 'text' ? 'INPUT TEKS' : 'TAUTAN BERITA';
                  const tanggal = formatTanggal(item.created_at);
                  const cleanedContent = cleanContent(item.content);
                  
                  const isHoax = jenis === 'HOAKS';
                  const bgColor = isHoax ? '#dc2626' : '#16a34a';
                  const scoreColor = isHoax ? '#dc2626' : '#16a34a';
                  
                  return (
                    <div 
                      key={item.id} 
                      className="relative bg-white border-2 border-black max-w-7xl mx-auto w-full"
                      style={{ borderRadius: '0px', boxShadow: '6px 6px 0px 0px #0a0a0a' }}
                    >
                      <div className="p-2 flex flex-col justify-center relative" style={{ paddingLeft: '48px', minHeight: '250px' }}>
                        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-6 gap-y-2">
                          <div className="md:row-start-1 md:col-start-1">
                            <div className="flex items-center gap-3">
                              <div 
                                className="px-4 py-1.5 text-sm font-bold text-white inline-block"
                                style={{ 
                                  backgroundColor: bgColor,
                                  borderRadius: '0px'
                                }}
                              >
                                {jenis}
                              </div>
                              <span className="text-gray-400 text-sm" style={{ fontFamily: "'Fraunces', serif" }}>
                                {tanggal}
                              </span>
                            </div>
                          </div>
                          
                          <div className="md:row-start-1 md:col-start-2">
                            <div className="flex items-center gap-2">
                              {tipe === 'TAUTAN BERITA' ? (
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  strokeWidth={1.5} 
                                  stroke="currentColor" 
                                  style={{ width: '16px', height: '16px', color: '#000000' }}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                </svg>
                              ) : (
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  strokeWidth={1.5} 
                                  stroke="currentColor" 
                                  style={{ width: '16px', height: '16px', color: '#000000' }}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                              )}
                              <p className="text-black text-xs" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>
                                {tipe}
                              </p>
                            </div>
                          </div>
                          
                          <div className="md:row-start-2 md:col-start-1">
                            <div 
                              className="p-3"
                              style={{ 
                                backgroundColor: 'rgba(252, 250, 247, 1)',
                                border: '1px solid #e5e5e5',
                                borderRadius: '0px',
                                minWidth: '200px'
                              }}
                            >
                              <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'Fraunces', serif" }}>SKOR KEYAKINAN</p>
                              <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: scoreColor }}>
                                {skor ? `${skor}%` : '0%'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="md:row-start-2 md:col-start-2">
                            <p className="text-gray-800 text-base leading-relaxed font-bold" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}>
                              {cleanedContent.length > 300 ? `${cleanedContent.substring(0, 300)}...` : cleanedContent}
                            </p>
                          </div>
                          
                        </div>
                        
                        <div className="absolute bottom-4 right-4">
                          <button 
                            className="p-2 hover:opacity-80 transition-all"
                            style={{ 
                              backgroundColor: '#0a0a0a',
                              borderRadius: '0px'
                            }}
                            onClick={() => handleCardClick(item.id)}
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              strokeWidth={2} 
                              stroke="white" 
                              style={{ width: '20px', height: '20px' }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Tidak ada hasil yang ditemukan{searchQuery ? ` untuk "${searchQuery}"` : ''}</p>
                </div>
              )}
            </div>
          )}

          {!isLoading && !error && pagination.total_pages > 1 && (
            <div className="flex justify-center pt-14 pb-14">
              <div 
                className="flex items-center bg-white border-2 border-black"
                style={{ borderRadius: '0px', boxShadow: '6px 6px 0px 0px #0a0a0a' }}
              >
                <button
                  className="px-5 py-3 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderRadius: '0px' }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '22px', height: '22px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>
                
                <div className="w-px h-10 bg-black"></div>
                
                <div 
                  className="px-8 py-3 bg-white text-base md:text-lg font-medium"
                  style={{ fontFamily: "'Fraunces', serif", borderRadius: '0px' }}
                >
                  Halaman {currentPage} / {pagination.total_pages}
                </div>
                
                <div className="w-px h-10 bg-black"></div>
                
                <button
                  className="px-5 py-3 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderRadius: '0px' }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.total_pages}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '22px', height: '22px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          {!isLoading && !error && pagination.total_pages <= 1 && riwayatData.length > 0 && (
            <div className="pb-14"></div>
          )}
          

        </div>
      </main>
      <div className="w-full border-t-2 border-black"></div>

      <Footer />

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