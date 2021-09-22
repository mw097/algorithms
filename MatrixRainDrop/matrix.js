/**
 * Matrix Rain Drop Algorithm 
 */

const Settings = {
    canvasID: 'matrix-canvas',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    fontSize: 16, //px
    font: 'monospace',
    fontColor: '#0F0',
    fontFadeColor: 'rgba(0, 0, 0, 0.05)',
    canvasWidth: window.innerWidth,
    canvasHeight: window.innerHeight,
    speed: 60,
};

const getRandomAlpha = (alphabet) => {
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
};

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

const getRainDrops = (canvas, fontSize) => {
    const columns = Math.floor(canvas.width / fontSize);
    
    return new Array(columns).fill(1);
};

const setCanvasStyles = (context, fontColor, fontSize, font) => {
    context.fillStyle = fontColor;
    context.font = `${fontSize}px ${font}`;
};

const fadeDrownDrops = (context, canvas, fontFadeColor) => {
    context.fillStyle = fontFadeColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
};

const drawRainDrops = (context, canvas, rainDrops, alphabet, fontSize) => {
    rainDrops.map((value, index) => {
        const letter = getRandomAlpha(alphabet);
        context.fillText(letter, index * fontSize, value * fontSize );

        if (value * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[index] = 0;
        }

        rainDrops[index]++;
    });
};

// SETUP && RUN

const setupMatrixRainDrop = () => {
    const canvas = getCanvas(Settings.canvasID);
    setCanvasSize(canvas, Settings.canvasWidth, Settings.canvasHeight);
    const context = getCanvasContext2D(canvas);
    const rainDrop = getRainDrops(canvas, Settings.fontSize);

    return {canvas, context, rainDrop};
};

let {canvas, context, rainDrop} = setupMatrixRainDrop();

const runMatrixDropLoop = () => {
    fadeDrownDrops(context, canvas, Settings.fontFadeColor);
    setCanvasStyles(context, Settings.fontColor, Settings.fontSize, Settings.font);
    drawRainDrops(context, canvas, rainDrop, Settings.alphabet, Settings.fontSize);
};

setInterval(runMatrixDropLoop, Settings.speed);