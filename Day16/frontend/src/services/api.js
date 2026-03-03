const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("skillswap_token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  getSkills: () => request("/skills"),
  createSkill: (payload) => request("/skills", { method: "POST", body: JSON.stringify(payload) }),
  updateSkill: (id, payload) => request(`/skills/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteSkill: (id) => request(`/skills/${id}`, { method: "DELETE" }),
  createRequest: (payload) => request("/requests", { method: "POST", body: JSON.stringify(payload) }),
  updateRequestStatus: (id, payload) =>
    request(`/requests/${id}/status`, { method: "PATCH", body: JSON.stringify(payload) }),
  myRequests: () => request("/requests/me"),
  updateProfile: (payload) => request("/auth/profile", { method: "PATCH", body: JSON.stringify(payload) }),
  getStats: () => request("/stats"),
  getActivity: () => request("/stats/activity"),
  getMyStats: () => request("/stats/me"),
};
