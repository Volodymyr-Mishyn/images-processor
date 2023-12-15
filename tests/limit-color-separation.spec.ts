import { isOverLimitColor } from '../src/limit-color-separation';

describe('isOverLimitColor', () => {
  it('should return true if all color values are over the threshold', () => {
    const threshold = 12;
    const checkColor = isOverLimitColor(threshold);
    expect(checkColor(255, 255, 255)).toBe(true);
    expect(checkColor(245, 245, 245)).toBe(true);
  });

  it('should return false if any color value is below or equal to the threshold', () => {
    const threshold = 10;
    const checkColor = isOverLimitColor(threshold);
    expect(checkColor(255, 255, 245)).toBe(false);
    expect(checkColor(255, 245, 255)).toBe(false);
    expect(checkColor(245, 255, 255)).toBe(false);
    expect(checkColor(245, 245, 255)).toBe(false);
    expect(checkColor(245, 255, 245)).toBe(false);
    expect(checkColor(255, 245, 245)).toBe(false);
    expect(checkColor(245, 245, 245)).toBe(false);
  });
});
