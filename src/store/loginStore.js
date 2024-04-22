import { create } from "zustand";

const useLogin = create((set) => ({
	isLogin: false,
	setIsLogin: () => set((state) => ({ isLogin: true })),
	setIsLogout: () => set((state) => ({ isLogin: false })),
}));

export default useLogin;
