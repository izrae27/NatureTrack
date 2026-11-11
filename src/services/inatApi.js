
const API_BASE_URL = (
  import.meta.env.VITE_INATURALIST_API_URL ||
  'https://api.inaturalist.org/v1'
).replace(/\/$/, '');

// Reusable function for sending API requests
async function apiRequest(endpoint, params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, String(value));
    }
  });

  const queryString = query.toString();
  const url = `${API_BASE_URL}${endpoint}${
    queryString ? `?${queryString}` : ''
  }`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `iNaturalist API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

// Get observations with pagination and optional filters
export async function fetchObservations({
  page = 1,
  perPage = 12,
  taxonId = '',
  iconicTaxon = '',
} = {}) {
  const params = {
    page,
    per_page: perPage,
    order_by: 'created_at',
    order: 'desc',
  };

  if (taxonId) {
    params.taxon_id = taxonId;
  }

  if (iconicTaxon) {
    params['iconic_taxa[]'] = iconicTaxon;
  }

  return apiRequest('/observations', params);
}

// Search for species and other taxa by name
export async function searchTaxa(searchTerm) {
  if (!searchTerm.trim()) {
    return [];
  }

  const data = await apiRequest('/taxa/autocomplete', {
    q: searchTerm,
    per_page: 10,
  });

  return data.results || [];
}

// Get the details of one observation
export async function fetchObservationById(observationId) {
  if (!observationId) {
    throw new Error('Observation ID is required.');
  }

  return apiRequest(`/observations/${observationId}`);
}
