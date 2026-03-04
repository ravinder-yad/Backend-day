const API_URL = "http://localhost:5000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
};

const request = async (url, method = "GET", data = null, params = {}) => {
  try {
    // Construct URL with query params for fetch
    let fullUrl = `${API_URL}${url}`;
    const query = new URLSearchParams(params).toString();
    if (query) {
      fullUrl += `?${query}`;
    }

    const options = {
      method,
      headers: {
        ...getAuthHeader(),
        "Content-Type": "application/json",
      },
    };

    if (data && (method === "POST" || method === "PUT")) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(fullUrl, options);
    const result = await response.json();

    if (!response.ok) {
      throw result || { message: "Request failed" };
    }

    return result;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const api = {
  // Auth
  login: (data) => request("/auth/login", "POST", data),
  register: (data) => request("/auth/register", "POST", data),
  updateProfile: (data) => request("/auth/profile", "PUT", data),

  // Skills
  getSkills: (params) => request("/skills", "GET", null, params),
  createSkill: (data) => request("/skills", "POST", data),
  updateSkill: (id, data) => request(`/skills/${id}`, "PUT", data),
  deleteSkill: (id) => request(`/skills/${id}`, "DELETE"),

  // Requests
  createRequest: (data) => request("/requests", "POST", data),
  myRequests: () => request("/requests/my"),
  updateRequestStatus: (id, data) => request(`/requests/${id}`, "PUT", data),

  // Stats & Activity
  getStats: () => request("/stats"),
  getActivity: () => request("/stats/activity"),
  getMyStats: () => request("/stats/me"),
};
