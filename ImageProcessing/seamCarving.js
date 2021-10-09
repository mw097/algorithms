const resizeImageWidth = (image, width) => {
    const ImageSize = calculateImageSize(image);
    const pxToRemove = image.width - width;
    if ( pxToRemove < 0 ) {
        throw new Error('Upsizing no supported.');
    }
    
    let energyMap = [];
    let seam = [];

    for (let i = 0; i < pxToRemove; i+=1) {
        energyMap = calculateEnergyMap(image, ImageSize);
        seam = findLowEnergySeam(image, ImageSize);
        deleteSeam(seam, image, ImageSize);

        ImageSize.width -= 1;
    }

    return {image, ImageSize}
};

const getPixelEnergy = (leftPixel, middlePixel, rightPixel) => {
    const [mR, mG, mB] = middlePixel;

    let lEnergy = 0;
    if (leftPixel) {
        const [lR, lG, lB] = leftPixel;
        lEnergy = (lR-mR) ** 2 + (lG-mG) ** 2 + (lB-mB) ** 2;
    }

    let rEnergy = 0;
    if (rightPixel) {
        const [rR, rG, rB] = rightPixel;
        lEnergy = (rR-rR) ** 2 + (rG-rG) ** 2 + (rB-rB) ** 2;
    }

    return Math.sqrt(lEnergy + rEnergy);
};

const getPixel = (image, coordinate) => {
    const RGBACellSize = 4;
    const index = coordinate.y * image.width + coordinate.x;

    return image.data.subarray( index * RGBACellSize, index * RGBACellSize + RGBACellSize );
};

const setPixel = (image, coordinate, color) => {
    const RGBACellSize = 4;
    const index = coordinate.y * image.width + coordinate.x;

    image.data.set(color, index * RGBACellSize);
};

const createMatrix = (width, height, value) => {
    return new Array(height)
        .fill(null)
        .map(() => {
            return new Array(width)
                .fill(value);
        });
};

const calculateEnergyMap = (image, imageSize) => {
    const {width, height} = imageSize;

    const energyMap = createMatrix(width, height, Infinity);
    for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
            const leftPixel = (x-1) >= 0 ? getPixel(image, {x: x-1, y}) : null;
            const middlePixel = getPixel(image, {x, y});
            const rigthPixel = (x+1) < w ? getPixel(image, {x: x+1, y}) : null;

            energyMap[y][x] = getPixelEnergy(leftPixel, middlePixel, rigthPixel);
        }
    }

    return energyMap;
};