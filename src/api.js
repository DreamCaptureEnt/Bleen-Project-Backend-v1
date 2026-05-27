function defaultApiBase() {
  return 'https://api.dreamcapture.in/api';
}
// https://api.dreamcapture.in/api
const API_BASE = process.env.REACT_APP_API_BASE || defaultApiBase();
const AUTH_TOKEN_KEY = 'bleen_admin_token';

function getAuthToken() {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.localStorage.getItem(AUTH_TOKEN_KEY) || '';
}

function setAuthToken(token) {
  if (typeof window !== 'undefined' && token) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
}

function clearAuthToken() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

function buildUrl(path, params = {}) {
  const url = new URL(`${API_BASE}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
}

export async function apiRequest(path, options = {}) {
  const { params, body, ...fetchOptions } = options;
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const authToken = getAuthToken();
  const response = await fetch(buildUrl(path, params), {
    credentials: 'include',
    headers: isFormData
      ? {
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          ...(fetchOptions.headers || {}),
        }
      : {
          'Content-Type': 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          ...(fetchOptions.headers || {}),
        },
    ...fetchOptions,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
}

export const api = {
  login: async (body) => {
    const data = await apiRequest('/auth/login/', { method: 'POST', body });
    setAuthToken(data.token);
    return data;
  },
  logout: async () => {
    try {
      return await apiRequest('/auth/logout/', { method: 'POST' });
    } finally {
      clearAuthToken();
    }
  },
  currentUser: () => apiRequest('/auth/user/'),
  divisions: (params) => apiRequest('/divisions/', { params }),
  categories: (params) => apiRequest('/product-categories/', { params }),
  chemicalCategories: (params) => apiRequest('/product-chemical-categories/', { params }),
  products: (params) => apiRequest('/products/', { params }),
  product: (id) => apiRequest(`/products/${id}/`),
  adminDivisions: (params) => apiRequest('/admin/divisions/', { params }),
  adminCategories: (params) => apiRequest('/admin/product-categories/', { params }),
  adminChemicalCategories: (params) => apiRequest('/admin/product-chemical-categories/', { params }),
  adminProducts: (params) => apiRequest('/admin/products/', { params }),
  createDivision: (body) => apiRequest('/admin/divisions/', { method: 'POST', body }),
  updateDivision: (id, body) => apiRequest(`/admin/divisions/${id}/`, { method: 'PUT', body }),
  deleteDivision: (id) => apiRequest(`/admin/divisions/${id}/`, { method: 'DELETE' }),
  createCategory: (body) => apiRequest('/admin/product-categories/', { method: 'POST', body }),
  updateCategory: (id, body) => apiRequest(`/admin/product-categories/${id}/`, { method: 'PUT', body }),
  deleteCategory: (id) => apiRequest(`/admin/product-categories/${id}/`, { method: 'DELETE' }),
  createChemicalCategory: (body) => apiRequest('/admin/product-chemical-categories/', { method: 'POST', body }),
  updateChemicalCategory: (id, body) => apiRequest(`/admin/product-chemical-categories/${id}/`, { method: 'PUT', body }),
  deleteChemicalCategory: (id) => apiRequest(`/admin/product-chemical-categories/${id}/`, { method: 'DELETE' }),
  createProduct: (body) => apiRequest('/admin/products/', { method: 'POST', body }),
  updateProduct: (id, body) => apiRequest(`/admin/products/${id}/`, { method: 'PUT', body }),
  deleteProduct: (id) => apiRequest(`/admin/products/${id}/`, { method: 'DELETE' }),
  productImages: (productId) => apiRequest(`/admin/products/${productId}/images/`),
  uploadProductImages: (productId, files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('images', file));
    return apiRequest(`/admin/products/${productId}/images/`, { method: 'POST', body: formData });
  },
  reorderProductImages: (productId, imageIds) => apiRequest(`/admin/products/${productId}/images/reorder/`, {
    method: 'POST',
    body: { image_ids: imageIds },
  }),
  deleteProductImage: (imageId) => apiRequest(`/admin/product-images/${imageId}/`, { method: 'DELETE' }),
};
