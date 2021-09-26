import {getImageDataFromFile, getImageDataFromImageData} from './imageLoad.js';
import {getEnergyMap} from './seamCarving.js';

getImageDataFromFile('./sample.jpeg').then(imageData => {
    let processedImageData = getEnergyMap(imageData);
    getImageDataFromImageData(processedImageData);
});