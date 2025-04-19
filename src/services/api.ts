
const API_BASE_URL = 'https://api.drbooking.com/api'; // À remplacer par l'URL réelle de l'API Symfony

// Headers de base pour toutes les requêtes
let headers: HeadersInit = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Méthode pour configurer le token d'authentification
export const setAuthToken = (token: string | null) => {
  if (token) {
    headers = {
      ...headers,
      'Authorization': `Bearer ${token}`
    };
  } else {
    // Créer un nouvel objet d'en-têtes sans la clé Authorization
    const newHeaders: HeadersInit = {};
    Object.entries(headers).forEach(([key, value]) => {
      if (key !== 'Authorization') {
        newHeaders[key] = value;
      }
    });
    headers = newHeaders;
  }
};

// Méthode GET générique
export const get = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Méthode POST générique
export const post = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Méthode PUT générique
export const put = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Méthode DELETE générique
export const del = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Initialize auth token from localStorage on load
const storedToken = localStorage.getItem('auth_token');
if (storedToken) {
  setAuthToken(storedToken);
}

const api = { get, post, put, del, setAuthToken };
export default api;
