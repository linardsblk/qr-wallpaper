import { useEffect, useState } from 'react';
import create from 'zustand';

export const useStore = create((set) => ({
  activeStep: 0,
  increaseActiveStep: () => set((state) => ({ activeStep: state.activeStep + 1, prevActiveStep: state.activeStep })),
  decreaseActiveStep: () => set((state) => ({ activeStep: state.activeStep - 1, prevActiveStep: state.activeStep })),

  qrContent: '',
  setQrContent: (qrContent) => set(() => ({ qrContent })),

  backgroundImage: { preview: '', raw: '' },
  setBackgroundImage: (backgroundImage) => set((state) => ({ backgroundImage, backgroundColor: '' })),

  backgroundColor: '',
  setBackgroundColor: (backgroundColor) => set(() => ({ backgroundColor, backgroundImage: { preview: '', raw: '' } })),

  selectedPhone: { name: '', detail: '' },
  setSelectedPhone: (selectedPhone) => set(() => ({ selectedPhone })),
}));

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
