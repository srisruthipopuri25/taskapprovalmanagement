import api from "@/services/api";

export const login = async (email: string, password: string) => {
  try {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.access_token);

    return res.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("Invalid credentials");
    }
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
