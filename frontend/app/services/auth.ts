import api from "@/services/api";

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });

  document.cookie = `token=${res.data.access_token}; path=/`;
};

export const logout = () => {
  document.cookie = "token=; Max-Age=0; path=/";
  window.location.href = "/login";
};
