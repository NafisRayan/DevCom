import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const auth = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: { name: string; email: string; password: string }) =>
    api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: any) => api.patch('/auth/profile', data),
};

// Leads endpoints
export const leads = {
  getAll: () => api.get('/leads'),
  getById: (id: string) => api.get(`/leads/${id}`),
  create: (data: any) => api.post('/leads', data),
  update: (id: string, data: any) => api.put(`/leads/${id}`, data),
  delete: (id: string) => api.delete(`/leads/${id}`),
};

// Campaigns endpoints
export const campaigns = {
  getAll: () => api.get('/campaigns'),
  getById: (id: string) => api.get(`/campaigns/${id}`),
  create: (data: any) => api.post('/campaigns', data),
  update: (id: string, data: any) => api.put(`/campaigns/${id}`, data),
  delete: (id: string) => api.delete(`/campaigns/${id}`),
};

// Landing pages endpoints
export const landingPages = {
  getAll: () => api.get('/landing-pages'),
  getById: (id: string) => api.get(`/landing-pages/${id}`),
  create: (data: any) => api.post('/landing-pages', data),
  update: (id: string, data: any) => api.put(`/landing-pages/${id}`, data),
  delete: (id: string) => api.delete(`/landing-pages/${id}`),
};

// AI content generation endpoints
export const ai = {
  generateContent: (prompt: string) => api.post('/ai/generate', { prompt }),
  generateImage: (prompt: string) => api.post('/ai/generate-image', { prompt }),
};

export default api; 