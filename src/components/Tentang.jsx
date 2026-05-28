import { NavLink } from 'react-router-dom';

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
    <div className="min-h-screen" style={{ backgroundColor: 'rgba(252, 250, 247, 1)' }}>
      <Navbar />

      <main className="w-full" style={{ backgroundColor: 'rgba(252, 250, 247, 1)' }}>
        <section className="w-full" style={{ backgroundColor: 'rgba(252, 250, 247, 1)', fontFamily: "'Fraunces', serif" }}>
          <div className="px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              <div className="flex flex-col justify-between">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6">
                  Karena{' '}
                  <span className="text-blue-600 italic">Fakta</span>{' '}
                  <br />
                  Nggak Boleh Kalah.
                </h1>
                
                <p className="text-gray-900 text-base md:text-lg leading-relaxed max-w-xl">
                  Berawal dari kepedulian terhadap ruang siber Indonesia, CekCok dikembangkan untuk memutus rantai hoaks. 
                  Karena di tengah derasnya informasi, kamu berhak mendapatkan fakta.
                </p>
              </div>
              
              <div className="flex items-end justify-end">
                <div 
                  className="bg-white border-2 border-black w-full max-w-lg"
                  style={{ 
                    borderRadius: '0px', 
                    boxShadow: '8px 8px 0px 0px #0a0a0a'
                  }}
                >
                  <div className="p-6 md:p-8">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      Misi Projek
                    </h2>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                      Membekali masyarakat dengan alat pendeteksi hoaks berbasis AI yang pintar, transparan, dan gampang dipakai oleh siapa saja.
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
            
            <div className="w-full border-t-2 border-black mt-12 md:mt-16"></div>
            
          </div>
        </section>
        <section className="px-6 md:px-12 lg:px-16 mb-16" style={{ fontFamily: "'Fraunces', serif" }}> 
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8">
            
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                URGENSI <br />
                <span className="text-blue-600">FAKTA.</span>
              </h2>
            </div>
            
            <div className="pl-4">
              
              <p className="text-gray-700 text-base md:text-2xl leading-relaxed mb-8">
                Data mencatat terdapat lebih dari{' '}
                <strong className="bg-black text-white italic px-1">
                  1.923 konten hoaks
                </strong>{' '}
                yang teridentifikasi sepanjang tahun 2024. 
                Dengan rata-rata 160 konten per bulan, misinformasi digital telah menjadi ancaman nyata bagi stabilitas opini publik 
                dan ketahanan komunitas di Indonesia.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div 
                  className="bg-white border-2 border-black p-6 text-left"
                  style={{ boxShadow: '6px 6px 0px 0px #0a0a0a', borderRadius: '0px' }}
                >
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    ANCAMAN POLITIK
                  </h3>
                  <p className="text-gray-600 text-sm md:text-xl italic leading-relaxed">
                    48.5% kasus hoaks didominasi oleh topik politik, memicu polarisasi yang tidak sehat.
                  </p>
                </div>
                
                <div 
                  className="bg-white border-2 border-black p-6 text-left"
                  style={{ boxShadow: '6px 6px 0px 0px #0a0a0a', borderRadius: '0px' }}
                >
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    GAGAL VERIFIKASI
                  </h3>
                  <p className="text-gray-600 text-sm md:text-xl italic leading-relaxed">
                    60-66% warganeg gagal mengenali klaim hoaks secara spesifik tanpa bantuan alat verifikasi.
                  </p>
                </div>
                
              </div>
            </div>
            
          </div>
        </section>
        <section 
          className="px-6 md:px-12 lg:px-16" 
          style={{ 
            backgroundColor: 'rgba(16, 24, 34, 1)', 
            fontFamily: "'Fraunces', serif",
            paddingTop: '80px',
            paddingBottom: '80px'
          }}
        >
          
          <h2 className="text-7xl font-bold text-white mb-3 text-center">
            Infrastruktur Deteksi
          </h2>
          <p className="text-xl text-white italic text-center mb-10 max-w-2xl mx-auto">
            Membedah logika di balik setiap hasil verifikasi CekCok.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            
            <div className="bg-white border-2 border-white p-6 h-full flex flex-col" style={{ borderRadius: '0px', backgroundColor: 'rgba(16, 24, 34, 1)' }}>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "sans-serif" }}>
                  MODEL NLP BINER
                </h3>
                <div className="h-0.5 bg-blue-500" style={{ width: '50%' }}></div>
              </div>
              <p className="text-gray-300 text-md leading-relaxed mb-4 flex-grow" style={{ fontFamily: "'Fraunces', serif" }}>
                Inti dari CekCok digerakkan oleh arsitektur Deep Learning yang dibangun melalui TensorFlow Functional API. 
                Model ini tidak dirancang generik, melainkan dilatih khusus untuk membedah kompleksitas konteks bahasa Indonesia.
              </p>
              <ul className="space-y-2">
                <li className="text-md text-gray-400 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500" style={{ borderRadius: '0px' }}></div>
                  <strong className="text-gray-300">TARGET AKURASI ≥ 85%</strong>
                </li>
                <li className="text-md text-gray-400 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500" style={{ borderRadius: '0px' }}></div>
                  <strong className="text-gray-300">MARGIN ERROR (MAE): ≤ 0.02</strong>
                </li>
                <li className="text-md text-gray-400 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500" style={{ borderRadius: '0px' }}></div>
                  <strong className="text-gray-300">ARSITEKTUR: CUSTOM LAYER &amp; LOSS FUNCTION</strong>
                </li>
              </ul>
            </div>

            <div className="flex flex-col justify-between gap-6">
              
              <div className="bg-white border-2 border-white p-6" style={{ borderRadius: '0px', backgroundColor: 'rgba(16, 24, 34, 1)' }}>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "sans-serif" }}>
                    INTEGRASI GENERATIVE AI
                  </h3>
                  <div className="h-0.5 bg-blue-500" style={{ width: '50%' }}></div>
                </div>
                <p className="text-gray-300 text-md leading-relaxed" style={{ fontFamily: "'Fraunces', serif" }}>
                  Sistem kami tidak sekadar memberi label Hoaks atau fakta. Dengan mengintegrasikan Generative AI, 
                  CekCok menyusun penjelasan naratif tentang mengapa sebuah klaim terindikasi salah, memberikan literasi 
                  dan konteks tambahan bagi pengguna.
                </p>
              </div>
              
              <div className="border-2 border-white p-6 text-center" style={{ borderRadius: '0px', backgroundColor: 'rgba(16, 24, 34, 1)' }}>
                <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Fraunces', serif" }}>WORKFLOW SISTEM:</h4>
                <p className="text-white font-bold text-xs italic tracking-wide">
                  INPUT → PREPROCESSING → DL INFERENCE → LLM EXPLANATION → VERDICT
                </p>
              </div>
              
            </div>
            
          </div>
          
        </section>

        <section 
          className="px-6 md:px-12 lg:px-16" 
          style={{ 
            fontFamily: "'Fraunces', serif",
            paddingTop: '80px',
            paddingBottom: '80px'
          }}
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                  METODOLOGI <br />
                  BERBASIS{' '}
                  <span className="text-blue-600 italic">BUKTI.</span>
                </h2>
              </div>
              <div className="mt-8">
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Setiap hasil verifikasi tidak lahir dari sekadar tebakan algoritma. 
                  CekCok melakukan proses rujukan silang (cross-reference) 
                  terhadap basis data yang kredibel, mencakup portal berita resmi, 
                  jurnal akademik, hingga publikasi pemerintah.
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                
                <div className="bg-white border border-black p-6 text-center flex flex-col items-center justify-center gap-3 h-full" style={{ borderRadius: '0px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="text-blue-500">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="currentColor" d="M3 5.75A.75.75 0 0 1 3.75 5c2.663 0 5.258-.943 7.8-2.85a.75.75 0 0 1 .9 0C14.992 4.057 17.587 5 20.25 5a.75.75 0 0 1 .75.75V11q0 .507-.04.996a6.5 6.5 0 0 0-1.465-.684q.005-.155.005-.312V6.478c-2.577-.152-5.08-1.09-7.5-2.8c-2.42 1.71-4.923 2.648-7.5 2.8V11c0 4.149 2.332 7.221 7.125 9.285a6.5 6.5 0 0 0 1.005 1.52l-.355.143a.75.75 0 0 1-.55 0C5.958 19.676 3 16 3 11zM23 17.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0m-2.146-2.354a.5.5 0 0 0-.708 0L16.5 18.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708" />
                  </svg>
                  <span className="text-gray-700 text-sm font-bold" style={{ fontFamily: 'Public Sans, sans-serif' }}>INTEGRITAS DATA</span>
                </div>
                
                <div className="bg-black border border-black p-6 text-center flex flex-col items-center justify-center gap-3 h-full" style={{ borderRadius: '0px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="text-white">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
                      <path strokeLinejoin="round" d="M12.698 3.5h-1.395c-.715 0-1.072 0-1.392.112a2 2 0 0 0-.545.292c-.271.204-.47.501-.866 1.096h0c-.203.305-.502.753-.621.879a2 2 0 0 1-1.106.591c-.17.03-.353.03-.72.03c-.98 0-1.47 0-1.87.113a3 3 0 0 0-2.07 2.07C2 9.083 2 9.573 2 10.553V14.5c0 2.828 0 4.243.879 5.121S5.172 20.5 8 20.5h8c2.829 0 4.243 0 5.122-.879C22 18.743 22 17.328 22 14.5v-3.946c0-.98 0-1.47-.113-1.871a3 3 0 0 0-2.07-2.07c-.4-.113-.89-.113-1.87-.113c-.366 0-.55 0-.72-.03a2 2 0 0 1-1.105-.591c-.12-.126-.419-.574-.622-.879c-.396-.595-.594-.892-.865-1.096a2 2 0 0 0-.545-.292c-.32-.112-.678-.112-1.392-.112" />
                      <path strokeLinejoin="round" d="M8.5 14.5c.798 1.214 2.069 2 3.5 2s2.702-.786 3.5-2" />
                      <path d="M9.125 10.5H9m.25 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0Zm5.875 0H15m.25 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0Z" />
                    </g>
                  </svg>
                  <span className="text-white text-sm font-bold" style={{ fontFamily: 'Public Sans, sans-serif' }}>PEMROSESAN CERDAS</span>
                </div>
                
                <div className="bg-black border border-black p-6 text-center flex flex-col items-center justify-center gap-3 h-full" style={{ borderRadius: '0px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="text-white">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <g fill="none" fillRule="evenodd">
                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                      <path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v1h.764a2 2 0 0 1 .894.211L16.236 6H20a1 1 0 1 1 0 2h-.382l2.276 4.553c.07.139.106.292.106.447a4 4 0 0 1-8 0c0-.155.036-.308.106-.447L16.382 8h-.146a2 2 0 0 1-.894-.211L13.764 7H13v12h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3V7h-.764l-1.578.789A2 2 0 0 1 7.764 8h-.146l2.276 4.553A1 1 0 0 1 10 13a4 4 0 0 1-8 0a1 1 0 0 1 .106-.447L4.382 8H4a1 1 0 0 1 0-2h3.764l1.578-.789A2 2 0 0 1 10.236 5H11V4a1 1 0 0 1 1-1M6 9.236l-1.989 3.977a2 2 0 0 0 3.978 0zm12 0l-1.989 3.977a2 2 0 0 0 3.955.157l.023-.156z" />
                    </g>
                  </svg>
                  <span className="text-white text-sm font-bold" style={{ fontFamily: 'Public Sans, sans-serif' }}>ALGORITMA NETRAL</span>
                </div>
                
                <div className="bg-white border border-black p-6 text-center flex flex-col items-center justify-center gap-3 h-full" style={{ borderRadius: '0px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="text-blue-500">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13v-2.343c0-.818 0-1.226-.152-1.594c-.152-.367-.441-.657-1.02-1.235l-4.736-4.736c-.499-.499-.748-.748-1.058-.896a2 2 0 0 0-.197-.082C12.514 2 12.161 2 11.456 2c-3.245 0-4.868 0-5.967.886a4 4 0 0 0-.603.603C4 4.59 4 6.211 4 9.456V13m9-10.5V3c0 2.828 0 4.243.879 5.121C14.757 9 16.172 9 19 9h.5M11 16h1m0 0h1m-1 0v6m0 0h-1m1 0h1m2.5 0v-6h1.862c.706 0 1.436.352 1.587 1.04c.064.29.062.564 0 .852c-.155.722-.91 1.108-1.648 1.108H16M5 16h3.2a.3.3 0 0 1 .3.3v.105a.3.3 0 0 1-.054.172l-3.377 4.825A.38.38 0 0 0 5.38 22h2.943" />
                  </svg>
                  <span className="text-gray-700 text-sm font-bold" style={{ fontFamily: 'Public Sans, sans-serif' }}>SINKRONISASI ARSIP</span>
                </div>
                
              </div>
            </div>
            
          </div>
          
        </section>

        <section className="px-6 md:px-12 lg:px-16 mb-16" style={{ backgroundColor: 'rgba(16, 24, 34, 1)' }}>
          
          <div style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-16 text-center" style={{ fontFamily: "'Fraunces', serif" }}>
              Arsitektur Teknologi
            </h2>
            
            <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
              
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white border-2 border-black flex items-center justify-center" style={{ borderRadius: '0px', width: '140px', height: '160px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" className="text-blue-500">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m8 6l-6 6l6 6m8 0l6-6l-6-6" />
                  </svg>
                </div>
                <span className="text-white text-base md:text-lg font-bold text-center" style={{ fontFamily: 'Public Sans, sans-serif' }}>TENSORFLOW API</span>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white border-2 border-black flex items-center justify-center" style={{ borderRadius: '0px', width: '140px', height: '160px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 15 15" className="text-blue-500">
                    <path d="M0 0h15v15H0z" fill="none" />
                    <path fill="none" stroke="currentColor" strokeLinecap="square" d="M14.5 2.499c0 1.103-3.134 1.998-7 1.998S.5 3.602.5 2.5m14 0c0-1.105-3.134-2-7-2s-7 .895-7 1.999m14 0v9.993c0 1.103-3.134 1.999-7 1.999s-7-.895-7-1.999V2.5m14 4.996c0 1.104-3.134 2-7 2s-7-.896-7-2" />
                  </svg>
                </div>
                <span className="text-white text-base md:text-lg font-bold text-center" style={{ fontFamily: 'Public Sans, sans-serif' }}>POSTGRESQL</span>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white border-2 border-black flex items-center justify-center" style={{ borderRadius: '0px', width: '140px', height: '160px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 16 16" className="text-blue-500">
                    <path d="M0 0h16v16H0z" fill="none" />
                    <path fill="currentColor" d="M3.5 10a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-3 0V13a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 1 0v-3a.5.5 0 0 1 .5-.5m3.06 0c.414 0 .811.164 1.104.457l.19.19a.5.5 0 1 1-.708.707l-.189-.19A.56.56 0 0 0 6.561 11h-.134a.427.427 0 0 0-.19.809l.974.488A1.427 1.427 0 0 1 6.573 15H6.44a1.56 1.56 0 0 1-1.103-.457l-.19-.19a.5.5 0 1 1 .708-.707l.189.19A.56.56 0 0 0 6.44 14h.134a.427.427 0 0 0 .19-.809l-.974-.488A1.427 1.427 0 0 1 6.427 10zm2.03-9c.397.002.778.16 1.06.44l2.91 2.91c.28.282.438.663.44 1.06V13a2.006 2.006 0 0 1-2 2H8.54c.216-.296.36-.639.42-1H11a1 1 0 0 0 1-1V6H9.5A1.5 1.5 0 0 1 8 4.5V2H5a1 1 0 0 0-1 1v6.09a1.43 1.43 0 0 0-1 0V3a2.005 2.005 0 0 1 2-2zM9 4.5a.5.5 0 0 0 .5.5h2.29L9 2.21z" />
                  </svg>
                </div>
                <span className="text-white text-base md:text-lg font-bold text-center" style={{ fontFamily: 'Public Sans, sans-serif' }}>REACT.JS & NODE.JS</span>
              </div>
              
            </div>
          </div>
          
        </section>
      </main>

      <Footer />
    </div>
  );
}