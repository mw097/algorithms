import {getImageDataFromFile, getImageDataFromImageData} from './imageLoad.js';
import {getEnergyMap} from './seamCarving.js';

getImageDataFromFile('./sample.jpeg').then(imageData => {
    getEnergyMap(imageData, 'red');
    // getImageDataFromImageData(processedImageData);
});