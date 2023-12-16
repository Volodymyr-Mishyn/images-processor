import fs, { Dirent } from 'fs';
import { ImagesProcessor } from 'src/images-processor';

jest.mock('fs');
jest.mock('path', () => ({
  join: (...paths: Array<string>) => paths.join('/'),
}));
jest.mock('sharp', () => {
  const sharpInstance: any = {
    ensureAlpha: jest.fn(() => sharpInstance),
    raw: jest.fn(() => sharpInstance),
    toBuffer: jest.fn(() =>
      Promise.resolve({ data: [255, 255, 255, 1, 200, 200, 200, 1, 5, 5, 5, 0], info: { width: 100, height: 100 } }),
    ),
    toFile: jest.fn(() => Promise.resolve()),
  };

  const sharpMock = jest.fn(() => sharpInstance);

  return sharpMock;
});

describe('ImagesProcessor', () => {
  const inputDirectory = 'input-directory';
  const outputDirectory = 'output-directory';
  const threshold = 100;

  describe('process', () => {
    beforeEach(() => {
      jest
        .spyOn(fs, 'readdirSync')
        .mockReturnValue(['image1.png' as unknown as Dirent, 'image2.png' as unknown as Dirent]);
    });
    it('should process all images in the input directory', async () => {
      const sharpMock = require('sharp');
      const imagesProcessor = new ImagesProcessor(inputDirectory, outputDirectory, threshold);
      await imagesProcessor.process();
      expect(sharpMock().ensureAlpha).toHaveBeenCalledTimes(2);
      expect(sharpMock().raw).toHaveBeenCalledTimes(2);
      expect(sharpMock().toBuffer).toHaveBeenCalledTimes(2);
      expect(sharpMock().toFile).toHaveBeenCalledTimes(2);
    });
    it('should change pixel to black or transparent', async () => {
      const sharpMock = require('sharp');
      const imagesProcessor = new ImagesProcessor(inputDirectory, outputDirectory, threshold);
      await imagesProcessor.process();
      expect(sharpMock).toHaveBeenCalledWith([255, 255, 255, 0, 200, 200, 200, 0, 0, 0, 0, 0], {
        raw: { channels: 4, height: 100, width: 100 },
      });
    });
  });
});
