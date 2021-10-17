import { useEffect, useState } from 'react';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { getDeviceResolution } from './functions';

export const useStore = create(
  devtools((set) => ({
    activeStep: 0,
    setActiveStep: (activeStep) => set((state) => ({ activeStep, prevActiveStep: state.activeStep })),

    qrContent: '',
    setQrContent: (qrContent) => set(() => ({ qrContent })),

    backgroundImage: { preview: '', raw: '' },
    setBackgroundImage: (backgroundImage) => set((state) => ({ backgroundImage, backgroundColor: '' })),

    backgroundColor: '',
    setBackgroundColor: (backgroundColor) =>
      set(() => ({ backgroundColor, backgroundImage: { preview: '', raw: '' } })),

    selectedPhone: { name: '', slug: '' },
    setSelectedPhone: (selectedPhone) => set(() => ({ selectedPhone })),

    resolution: getDeviceResolution(),
    setResolution: (resolution) => set(() => ({ resolution })),
    setWidth: (width) => set((state) => ({ resolution: { width: parseInt(width), height: state.resolution.height } })),
    setHeight: (height) =>
      set((state) => ({ resolution: { height: parseInt(height), width: state.resolution.width } })),

    croppedAreaPixels: { width: 0, height: 0, x: 0, y: 0 },
    setCroppedAreaPixels: (croppedAreaPixels) => set(() => ({ croppedAreaPixels })),
  }))
);

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
