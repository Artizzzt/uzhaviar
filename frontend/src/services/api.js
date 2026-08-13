const API_BASE_URL = 'http://localhost:8080/api';

// Helper function for fetch calls with JSON response handling
async function fetchJson(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    if (response.status === 204) return null; // No Content
    return await response.json();
  } catch (error)  {
    console.warn(`API Error at ${endpoint}:`, error.message);
    throw error;
  }
}

// Farmers API
export const getFarmers = () => fetchJson('/farmers');
export const getFarmerById = (id) => fetchJson(`/farmers/${id}`);
export const createFarmer = (farmerData) => fetchJson('/farmers', {
  method: 'POST',
  body: JSON.stringify(farmerData),
});
export const updateFarmer = (id, farmerData) => fetchJson(`/farmers/${id}`, {
  method: 'PUT',
  body: JSON.stringify(farmerData),
});
export const deleteFarmer = (id) => fetchJson(`/farmers/${id}`, {
  method: 'DELETE',
});

// Diseases API
export const getDiseases = () => fetchJson('/diseases');
export const getDiseasesByFarmer = (farmerId) => fetchJson(`/diseases/farmer/${farmerId}`);
export const createDisease = (diseaseData) => fetchJson('/diseases', {
  method: 'POST',
  body: JSON.stringify(diseaseData),
});
export const updateDisease = (id, diseaseData) => fetchJson(`/diseases/${id}`, {
  method: 'PUT',
  body: JSON.stringify(diseaseData),
});

// Pesticides API
export const getPesticides = () => fetchJson('/pesticides');
export const getPesticidesByFarmer = (farmerId) => fetchJson(`/pesticides/farmer/${farmerId}`);
export const createPesticide = (pesticideData) => fetchJson('/pesticides', {
  method: 'POST',
  body: JSON.stringify(pesticideData),
});
export const updatePesticide = (id, pesticideData) => fetchJson(`/pesticides/${id}`, {
  method: 'PUT',
  body: JSON.stringify(pesticideData),
});

// Notifications API
export const getNotifications = () => fetchJson('/notifications');
export const markNotificationRead = (id) => fetchJson(`/notifications/${id}/read`, {
  method: 'PUT',
});

// Analytics API
export const getAnalytics = () => fetchJson('/analytics');

// FAQs & Testimonials API
export const getFaqs = () => fetchJson('/faqs');
export const getTestimonials = () => fetchJson('/testimonials');

// Auth API
export const loginApi = (email, password) => fetchJson('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
});
export const registerApi = (userData) => fetchJson('/auth/register', {
  method: 'POST',
  body: JSON.stringify(userData),
});
