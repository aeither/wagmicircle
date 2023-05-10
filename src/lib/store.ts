import { create } from "zustand";

interface LoginState {
  item: string;
  setItem: (item: string) => void;
}

const useStore = create<LoginState>((set) => ({
  item: "overview",
  setItem: (item) =>
    set((state) => ({
      ...state,
      item: item,
    })),
}));

export default useStore;
