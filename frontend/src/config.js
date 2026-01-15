export const GOOGLE_CLIENT_ID = "Your_Google_Client_ID_Here";

let url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Remove trailing slash if present
if (url.endsWith('/')) {
    url = url.slice(0, -1);
}
// Append /api if not present
if (!url.endsWith('/api')) {
    url += '/api';
}

export const API_BASE_URL = url;
