import { NavLink } from 'react-router-dom';

// KOMPONEN NAVBAR
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

// KOMPONEN FOOTER
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

export default function Tentang() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="px-6 md:px-12 lg:px-16 py-12 md:py-16">
        {/* HERO SECTION */}
        <section className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Karena Fakta <span className="text-primary-600">Nggak Boleh Kalah.</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Berawal dari kepedulian terhadap ruang siber Indonesia, CekCok dikembangkan untuk memutus rantai hoaks. 
            Karena di tengah derasnya informasi, kamu berhak mendapatkan fakta.
          </p>
        </section>

        {/* MISI PROJEK */}
        <section className="mb-16 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Misi Projek</h2>
          <p className="text-gray-600 leading-relaxed">
            Membekali masyarakat dengan alat pendeteksi hoaks berbasis AI yang pintar, transparan, dan gampang dipakai oleh siapa saja.
          </p>
        </section>

        {/* URGENSI FAKTA */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">URGENSI FAKTA.</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-center mb-10">
            Data mencatat terdapat lebih dari <strong className="text-red-600">1.923 konten hoaks</strong> yang teridentifikasi sepanjang tahun 2024. 
            Dengan rata-rata 160 konten per bulan, misinformasi digital telah menjadi ancaman nyata bagi stabilitas opini publik 
            dan ketahanan komunitas di Indonesia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-md transition-all">
              <div className="text-4xl font-extrabold text-primary-600 mb-2">48.5%</div>
              <div className="text-sm font-semibold text-gray-700 mb-2">ANCAMAN POLITIK</div>
              <p className="text-gray-500 text-xs">kasus hoaks didominasi oleh topik politik, memicu polarisasi yang tidak sehat.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-md transition-all">
              <div className="text-4xl font-extrabold text-primary-600 mb-2">60-66%</div>
              <div className="text-sm font-semibold text-gray-700 mb-2">GAGAL VERIFIKASI</div>
              <p className="text-gray-500 text-xs">warganeg gagal mengenali klaim hoaks secara spesifik tanpa bantuan alat verifikasi.</p>
            </div>
          </div>
        </section>

        {/* INFRASTRUKTUR DETEKSI */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Infrastruktur Deteksi</h2>
          <p className="text-gray-500 italic text-center mb-10 max-w-2xl mx-auto">
            Membedah logika di balik setiap hasil verifikasi CekCok.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">MODEL NLP BINER</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Inti dari CekCok digerakkan oleh arsitektur Deep Learning yang dibangun melalui TensorFlow Functional API. 
                Model ini tidak dirancang generik, melainkan dilatih khusus untuk membedah kompleksitas konteks bahasa Indonesia.
              </p>
              <ul className="space-y-2">
                <li className="text-xs text-gray-500"><strong className="text-gray-700">TARGET AKURASI ≥ 85%</strong></li>
                <li className="text-xs text-gray-500"><strong className="text-gray-700">MARGIN ERROR (MAE): ≤ 0.02</strong></li>
                <li className="text-xs text-gray-500"><strong className="text-gray-700">ARSITEKTUR: CUSTOM LAYER &amp; LOSS FUNCTION</strong></li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">INTEGRASI GENERATIVE AI</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sistem kami tidak sekadar memberi label Hoaks atau fakta. Dengan mengintegrasikan Generative AI, 
                CekCok menyusun penjelasan naratif tentang mengapa sebuah klaim terindikasi salah, memberikan literasi 
                dan konteks tambahan bagi pengguna.
              </p>
            </div>
          </div>
        </section>

        {/* METODOLOGI BERBASIS BUKTI */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">METODOLOGI BERBASIS BUKTI.</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-center mb-8">
            Setiap hasil verifikasi tidak lahir dari sekadar tebakan algoritma. CekCok melakukan proses rujukan silang (cross-reference) 
            terhadap basis data yang kredibel, mencakup portal berita resmi, jurnal akademik, hingga publikasi pemerintah.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center max-w-3xl mx-auto mb-8">
            <h4 className="text-sm font-bold text-gray-700 mb-2">WORKFLOW SISTEM:</h4>
            <p className="text-primary-600 font-mono text-sm tracking-wide">
              INPUT → PREPROCESSING → DL INFERENCE → LLM EXPLANATION → VERDICT
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            <span className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">INTEGRITAS DATA</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">PEMROSESAN CERDAS</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">ZIP</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">ALGORITMA NETRAL</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">SINKRONISASI ARSIP</span>
          </div>
        </section>

        {/* ARSITEKTUR TEKNOLOGI */}
        <section className="mb-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Arsitektur Teknologi</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            <span className="px-6 py-3 bg-primary-50 text-primary-700 text-sm font-semibold rounded-xl border border-primary-200">
              TENSORFLOW API
            </span>
            <span className="px-6 py-3 bg-primary-50 text-primary-700 text-sm font-semibold rounded-xl border border-primary-200">
              POSTGRESQL
            </span>
            <span className="px-6 py-3 bg-primary-50 text-primary-700 text-sm font-semibold rounded-xl border border-primary-200">
              REACT.JS &amp; NODE.JS
            </span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}