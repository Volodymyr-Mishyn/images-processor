const minimist = require('minimist');
import { ImageProcessor } from './image-processor';

const defaultInputPath = './input'; // Replace with your input file path
const defaultOutputPath = './output'; // Replace with your desired output file path

const defaultThreshold = 20;

const cliArgs = minimist(process.argv.slice(2));
console.log(cliArgs);
const inputPath = cliArgs.input || defaultInputPath;
const outputPath = cliArgs.output || defaultOutputPath;
const threshold = cliArgs.threshold || defaultThreshold;

const imageProcessorApp = new ImageProcessor(inputPath, outputPath, threshold);
imageProcessorApp.process();
