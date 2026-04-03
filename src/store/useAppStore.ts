import { create } from 'zustand';

interface AppState {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  // Mouse position globally
  mouseX: number;
  mouseY: number;
  setMousePos: (x: number, y: number) => void;
  // WebGL Hover status
  isHovering: boolean;
  setIsHovering: (val: boolean) => void;
  // Scrolling
  scrollProgress: number;
  setScrollProgress: (prog: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  menuOpen: false,
  setMenuOpen: (open) => set({ menuOpen: open }),
  mouseX: 0,
  mouseY: 0,
  setMousePos: (mouseX, mouseY) => set({ mouseX, mouseY }),
  isHovering: false,
  setIsHovering: (isHovering) => set({ isHovering }),
  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
}));
