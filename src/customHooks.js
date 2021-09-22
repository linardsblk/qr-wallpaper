import { useEffect, useState } from 'react';
import create from 'zustand';
import { getDeviceResolution } from './functions';

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

  selectedPhone: { name: '', slug: '' },
  setSelectedPhone: (selectedPhone) => set(() => ({ selectedPhone })),

  resolution: getDeviceResolution(),
  setResolution: (resolution) => set(() => ({ resolution })),
  setWidth: (width) => set((state) => ({ resolution: { width, height: state.resolution.height } })),
  setHeight: (height) => set((state) => ({ resolution: { height, width: state.resolution.width } })),
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
