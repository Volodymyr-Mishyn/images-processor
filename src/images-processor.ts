import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { isOverLimitColor } from './limit-color-separation';

export class ImagesProcessor {
  private _isOverLimitColor: (r: number, g: number, b: number) => boolean;
  constructor(
    private _inputDirectory: string,
    private _outputDirectory: string,
    private _threshold: number,
  ) {
    this._isOverLimitColor = isOverLimitColor(this._threshold);
  }

  private _checkIfOutputDirectoryExists() {
    if (!fs.existsSync(this._outputDirectory)) {
      fs.mkdirSync(this._outputDirectory, { recursive: true });
    }
  }

  private async _processSingleImage(file: string): Promise<void> {
    const inputFile = path.join(this._inputDirectory, file);
    const outputFile = path.join(this._outputDirectory, file);

    if (file.match(/\.(png)$/i)) {
      const { data, info } = await sharp(inputFile, { unlimited: true })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (this._isOverLimitColor(r, g, b)) {
          data[i + 3] = 0;
        } else {
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
        }
      }
      await sharp(data, {
        raw: {
          width: info.width,
          height: info.height,
          channels: 4,
        },
      }).toFile(outputFile);
    }
  }

  public async process(): Promise<void> {
    try {
      this._checkIfOutputDirectoryExists();
      const files = fs.readdirSync(this._inputDirectory);
      for (const file of files) {
        this._processSingleImage(file);
      }
      console.log(`Processed ${files.length} images`);
    } catch (error) {
      console.error(error);
    }
  }
}
