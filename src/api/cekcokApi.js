const BASE_URL = 'https://cekcok-backend.vercel.app';

async function fetchApi(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return data;
}

export async function verifyTextApi(title, content) {
  return fetchApi('/api/checks', {
    method: 'POST',
    body: JSON.stringify({ title: title || '', content }),
  });
}

export async function verifyUrlApi(url) {
  return fetchApi('/api/checks/url', {
    method: 'POST',
    body: JSON.stringify({ url }),
  });
}

export async function getCheckDetail(id) {
  return fetchApi(`/api/checks/${id}`);
}

export async function pollCheckResult(id, interval = 2000, maxAttempts = 60) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const response = await getCheckDetail(id);
    const check = response.data;
    
    if (check.status === 'success' || check.status === 'fail') {
      return check;
    }
    
    if (attempt < maxAttempts - 1) {
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  }
  
  throw new Error('Waktu verifikasi habis. Silakan cek kembali di halaman Riwayat.');
}

export async function getRiwayat({ page = 1, limit = 10, search = '', label = '' }) {
  const params = new URLSearchParams();
  params.append('page', page);
  params.append('limit', limit);
  if (search) params.append('search', search);
  if (label && label !== 'SEMUA') {
    const backendLabel = label === 'FAKTA' ? 'valid' : 'hoax';
    params.append('label', backendLabel);
  }
  
  return fetchApi(`/api/checks?${params.toString()}`);
}

export async function getAnalyticsSummary() {
  return fetchApi('/api/analytics/summary');
}

export function formatVerdict(label, confidenceScore) {
  if (label === 'hoax') {
    return {
      verdict: 'INDIKASI HOAKS',
      confidence: Math.round(confidenceScore * 100),
    };
  } else if (label === 'valid') {
    return {
      verdict: 'INFORMASI KREDIBEL',
      confidence: Math.round(confidenceScore * 100),
    };
  }
  return {
    verdict: 'BELUM DAPAT DIPASTIKAN',
    confidence: 0,
  };
}