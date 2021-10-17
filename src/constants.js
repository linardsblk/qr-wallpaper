import { InputQR, ChooseBackground, SetResolution, Result } from './components/contents';
import { useStore } from './customHooks';

const navigation = (step) => {
  const { setActiveStep } = useStore.getState();
  setActiveStep(step);
};

export const steps = [
  {
    label: 'QR content',
    component: InputQR,
    validation: () => {
      const { qrContent } = useStore.getState();
      return qrContent?.length !== 0;
    },
    forwardAction: () => navigation(1),
    icon: 'qr.svg',
  },
  {
    label: 'Resolution',
    component: SetResolution,
    validation: () => {
      const {
        resolution: { width, height },
      } = useStore.getState();
      return width > 0 && height > 0;
    },
    forwardAction: () => navigation(2),
    backAction: () => navigation(0),
    icon: 'resolution.svg',
  },
  {
    label: 'Background',
    component: ChooseBackground,
    validation: () => {
      const { backgroundColor, backgroundImage } = useStore.getState();
      return backgroundColor || backgroundImage.raw;
    },
    forwardLabel: 'Finish',
    forwardAction: () => navigation(3),
    backAction: () => navigation(1),
    icon: 'wallpaper.svg',
    hideIcon: () => {
      const { backgroundImage } = useStore.getState();
      return !!backgroundImage.preview;
    },
  },

  {
    label: 'Result',
    component: Result,
    backAction: () => navigation(2),
  },
];
