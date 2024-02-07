import { create } from "zustand";

type UseOpenSideBar = {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
};

type UseOpenSearch = {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
};

export const useOpenSideBar = create<UseOpenSideBar>((set) => ({
  isOpen: false,
  setOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setClose: () => set(() => ({ isOpen: false })),
}));

export const useOpenSearch = create<UseOpenSearch>((set) => ({
  isOpen: false,
  setOpen: () => set(() => ({ isOpen: true })),
  setClose: () => set(() => ({ isOpen: false })),
}));
