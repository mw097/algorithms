const CANVAS_ID = 'image-canvas';

const getCanvas = (canvasID) => {
    return document.getElementById(canvasID);
};

const getCanvasContext2D = (canvas) => {
    return canvas.getContext('2d');
};

const setCanvasSize = (canvas, width, height) => { 
    canvas.width = width;
    canvas.height = height;

    return canvas;
};

const loadImage = (imagePath) => {
    let image = new Image();
    
    return new Promise((reslove, reject) => {
        image.onload = () => reslove(image);
        image.onerror = () => reject('Image loading failed');
        image.src = imagePath;
    });
};

const setImageOnCanvas = async (canvas, imagePath) => {
    let context = getCanvasContext2D(canvas);
    let image = await loadImage(imagePath).then(image => image);
    canvas = setCanvasSize(canvas, image.width, image.height);
    context.drawImage(image, 0, 0);

    return image;
};

const setImageDataOnCanvas = async (canvas, imageData) => {
    let context = getCanvasContext2D(canvas);
    canvas = setCanvasSize(canvas, imageData.width, imageData.height);

    console.log(imageData);
    context.putImageData( imageData, 0, 0);

    return imageData;
};

const getImageData = (canvas, width, height) => {
    return getCanvasContext2D(canvas).getImageData(0, 0, width, height);
};

const getImageDataFromFile = async (imagePath) => {
    const canvas = getCanvas(CANVAS_ID);
    const image =  await setImageOnCanvas(canvas, imagePath);
    return getImageData(canvas, image.width, image.height);
};

const getImageDataFromImageData = async (imageData) => {
    let imageData2 = await imageData;
    const canvas = getCanvas(CANVAS_ID);
    await setImageDataOnCanvas(canvas, imageData2);
};

export {getImageDataFromFile, getImageDataFromImageData};