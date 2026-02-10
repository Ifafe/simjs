const API_BASE_URL = "http://localhost:3000/api";

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

      const headers = {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            ...options.headers,
      };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
      });

      if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
      }

      return response.json();
}

export const api = {
      getHero: () => fetchApi("/homepage/hero"),
      saveHero: (data: any) => fetchApi("/homepage/hero", { method: "POST", body: JSON.stringify(data) }),
      getTimeline: () => fetchApi("/homepage/timeline"),
      addTimeline: (data: any) => fetchApi("/homepage/timeline", { method: "POST", body: JSON.stringify(data) }),
      deleteTimeline: (id: number) => fetchApi(`/homepage/timeline/${id}`, { method: "DELETE" }),
      getServices: () => fetchApi("/homepage/services"),
      addService: (data: any) => fetchApi("/homepage/services", { method: "POST", body: JSON.stringify(data) }),
      deleteService: (id: number) => fetchApi(`/homepage/services/${id}`, { method: "DELETE" }),

      getCompanies: () => fetchApi("/group/companies"),
      addCompany: (data: any) => fetchApi("/group/companies", { method: "POST", body: JSON.stringify(data) }),
      deleteCompany: (id: number) => fetchApi(`/group/companies/${id}`, { method: "DELETE" }),

      getTestimonials: () => fetchApi("/testimonials"),
      addTestimonial: (data: any) => fetchApi("/testimonials", { method: "POST", body: JSON.stringify(data) }),
      deleteTestimonial: (id: number) => fetchApi(`/testimonials/${id}`, { method: "DELETE" }),

      getContact: () => fetchApi("/contact"),
      saveContact: (data: any) => fetchApi("/contact", { method: "POST", body: JSON.stringify(data) }),
};
