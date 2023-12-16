const minimist = require('minimist');
import { ImagesProcessor } from './images-processor';

const defaultInputPath = './input'; // Replace with your input file path
const defaultOutputPath = './output'; // Replace with your desired output file path

const defaultThreshold = 120;

const cliArgs = minimist(process.argv.slice(2));

const inputPath = cliArgs.input || defaultInputPath;
const outputPath = cliArgs.output || defaultOutputPath;
const threshold = cliArgs.threshold || defaultThreshold;

const imageProcessorApp = new ImagesProcessor(inputPath, outputPath, threshold);
imageProcessorApp.process();
