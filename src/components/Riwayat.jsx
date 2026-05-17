import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/style.css';
import { getRiwayat, getAnalyticsSummary, getCheckDetail } from '../api/cekcokApi.js';

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
          <a href="hhttps://github.com/CekCok-Capstonus" target="_blank" rel="noopener noreferrer">GITHUB</a>
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
            <span className="stats-number">{summary.total_checks.toLocaleString('id-ID')} ANALISA</span>
          </div>
          <div className="stats-item">
            <span className="stats-number">{summary.total_hoax.toLocaleString('id-ID')} HOAKS</span>
          </div>
        </div>

        {/* HASIL PENCARIAN */}
        {searchQuery && !isLoading && (
          <div className="search-result-info">
            Menampilkan hasil untuk: <strong>"{searchQuery}"</strong>
            {riwayatData.length === 0 && " - Tidak ditemukan"}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="error-message-box">
            <p>⚠️ {error}</p>
            <button onClick={() => fetchRiwayat(currentPage)} className="retry-btn">Coba Lagi</button>
          </div>
        )}

        {/* LOADING STATE */}
        {isLoading && (
          <div className="loading-state">
            <p>Memuat riwayat...</p>
          </div>
        )}

        {/* DAFTAR RIWAYAT */}
        {!isLoading && !error && (
          <div className="riwayat-list">
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
                    className="riwayat-card clickable"
                    onClick={() => handleCardClick(item.id)}
                  >
                    <div className="card-row">
                      <span className={`jenis ${jenis === 'HOAKS' ? 'jenis-hoaks' : (jenis === 'FAKTA' ? 'jenis-fakta' : 'jenis-proses')}`}>
                        {jenis}
                      </span>
                      <span className="tanggal">{tanggal}</span>
                      {skor && (
                        <span className="skor">SKOR KEYAKINAN {skor}%</span>
                      )}
                    </div>
                    <div className="tipe">{tipe}</div>
                    <h3 className="konten">{cleanedContent.substring(0, 200)}...</h3>
                    <div className="card-detail-hint">Klik untuk detail lengkap →</div>
                  </div>
                );
              })
            ) : (
              <div className="no-results">
                <p>Tidak ada hasil yang ditemukan{searchQuery ? ` untuk "${searchQuery}"` : ''}</p>
              </div>
            )}
          </div>
        )}

        {/* PAGINATION */}
        {!isLoading && !error && pagination.total_pages > 1 && (
          <div className="pagination-container">
            <div className="pagination">
              <button
                className="pagination-prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &laquo; Sebelumnya
              </button>
              
              <div className="pagination-numbers">
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    className={`pagination-number ${page === currentPage ? 'active' : ''}`}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    disabled={page === '...'}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                className="pagination-next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.total_pages}
              >
                Selanjutnya &raquo;
              </button>
            </div>
            <div className="pagination-info">
              Menampilkan {(currentPage - 1) * pagination.limit + 1} - {Math.min(currentPage * pagination.limit, pagination.total)} dari {pagination.total} data
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* MODAL DETAIL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {isDetailLoading ? (
              <div className="modal-loading">
                <p>Memuat detail...</p>
              </div>
            ) : selectedItem?.error ? (
              <div className="modal-error-state">
                <p>⚠️ {selectedItem.message}</p>
                <button onClick={closeModal} className="retry-btn">Tutup</button>
              </div>
            ) : selectedItem && (
              <>
                <div className="modal-header">
                  <div className="modal-title-section">
                    <span className={`modal-jenis ${selectedItem.label === 'hoax' ? 'jenis-hoaks' : (selectedItem.label === 'valid' ? 'jenis-fakta' : 'jenis-proses')}`}>
                      {selectedItem.label === 'hoax' ? 'HOAKS' : (selectedItem.label === 'valid' ? 'FAKTA' : 'PROSES')}
                    </span>
                    <span className="modal-skor">SKOR KEYAKINAN {formatConfidence(selectedItem.confidence_score)}%</span>
                  </div>
                  <button className="modal-close" onClick={closeModal}>✕</button>
                </div>
                
                <div className="modal-body">
                  <div className="modal-meta">
                    <span className="modal-tipe">{selectedItem.input_type === 'text' ? 'INPUT TEKS' : 'TAUTAN BERITA'}</span>
                    <span className="modal-tanggal">{formatTanggalLengkap(selectedItem.created_at)}</span>
                  </div>
                  
                  {selectedItem.title && (
                    <div className="modal-field">
                      <h4 className="modal-field-title">Judul Berita</h4>
                      <p className="modal-field-content">{cleanContent(selectedItem.title)}</p>
                    </div>
                  )}
                  
                  <div className="modal-field">
                    <h4 className="modal-field-title">Isi Berita</h4>
                    <div className="modal-field-content modal-content-full">
                      {cleanContent(selectedItem.content)}
                    </div>
                  </div>
                  
                  {selectedItem.source_url && (
                    <div className="modal-field">
                      <h4 className="modal-field-title">Sumber URL</h4>
                      <a href={selectedItem.source_url} target="_blank" rel="noopener noreferrer" className="modal-source-url">
                        {selectedItem.source_url}
                      </a>
                    </div>
                  )}
                  
                  {selectedItem.explanation && (
                    <div className="modal-field">
                      <h4 className="modal-field-title">Penjelasan AI</h4>
                      <div 
                        className="modal-field-content modal-explanation"
                        dangerouslySetInnerHTML={{ __html: selectedItem.explanation }}
                      />
                    </div>
                  )}
                  
                  {selectedItem.error_message && (
                    <div className="modal-field">
                      <h4 className="modal-field-title">Error</h4>
                      <div className="modal-field-content modal-error">
                        {selectedItem.error_message}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="modal-footer">
                  <button className="modal-close-btn" onClick={closeModal}>Tutup</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}