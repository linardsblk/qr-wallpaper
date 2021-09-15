import { InputQR, ChooseBackground, SetResolution } from './components/contents';

export const steps = [
  {
    label: 'Set QR content',
    component: InputQR,
  },
  {
    label: 'Choose background',
    component: ChooseBackground,
  },
  {
    label: 'Set resolution',
    component: SetResolution,
  },
  {
    label: 'Result',
    component: InputQR,
  },
];
