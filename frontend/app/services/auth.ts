import api from "@/services/api";

export const login = async (email: string, password: string) => {
  try {
    const res = await api.post("/auth/login", { email, password });

    document.cookie = `token=${res.data.access_token}; path=/; SameSite=Strict`;

    return res.data; 
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("Invalid credentials");
    }
    throw error;
  }
};

export const logout = () => {
  document.cookie = "token=; Max-Age=0; path=/";
  window.location.href = "/login";
};
