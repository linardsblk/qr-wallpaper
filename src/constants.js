import { InputQR, ChooseBackground, SetResolution } from './components/contents';

export const steps = [
  {
    label: 'QR content',
    component: InputQR,
  },
  {
    label: 'Resolution',
    component: SetResolution,
  },
  {
    label: 'Background',
    component: ChooseBackground,
    forwardLabel: 'Finish',
  },

  {
    label: 'Result',
    component: InputQR,
  },
];
