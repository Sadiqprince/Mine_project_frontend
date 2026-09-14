
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

async function request(path) {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json();
}

export const api = {
  health: () => request("/api/health"),
  dashboard: () => request("/api/dashboard"),
  sensors: () => request("/api/sensors"),
  zones: () => request("/api/zones"),
  alerts: () => request("/api/alerts"),
  predictions: () => request("/api/predictions"),
};
