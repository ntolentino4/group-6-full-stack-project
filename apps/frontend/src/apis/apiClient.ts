const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit,
  token: string,
) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Error ${response.status}`);
  }
  if (response.status === 204) return null;
  return await response.json();
};
