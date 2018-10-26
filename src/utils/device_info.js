/**
 * Get window width and height
 */
export const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;

  return {
    width: innerWidth,
    height: innerHeight,
  };
};

/**
 * Get device type and sizes
 */
export const getDeviceInfo = () => {
  const { width, height } = getWindowSize();
  let type = 'desktop';

  if (width <= 1024 && width > 763) {
    type = 'tablet';
  } else if (width <= 763) {
    type = 'mobile';
  }

  return {
    width,
    height,
    type,
  };
};
