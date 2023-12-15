export function isOverLimitColor(threshold: number) {
  return function (r: number, g: number, b: number) {
    return r > 255 - threshold && g > 255 - threshold && b > 255 - threshold;
  };
}
