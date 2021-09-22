export const getDeviceResolution = () => ({
  width: window.screen.width * window.devicePixelRatio,
  height: window.screen.height * window.devicePixelRatio,
});
