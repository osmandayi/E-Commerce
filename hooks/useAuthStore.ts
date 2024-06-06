import { create } from 'zustand';

type AuthStore = {
    email: string;
    username: string;
    password: string;
    loader: boolean;
    setEmail: (email: string) => void;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
    setLoader: (loader: boolean) => void;
};


const useAuthStore = create<AuthStore>((set) => ({
    email: "",
    username: "",
    password: "",
    loader: false,
    setEmail: (email: string) => set({ email }),
    setUsername: (username: string) => set({ username }),
    setPassword: (password: string) => set({ password }),
    setLoader: (loader: boolean) => set({ loader }),
}))


export default useAuthStore;