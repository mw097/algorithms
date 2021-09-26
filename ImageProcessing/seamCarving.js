const STEP_RGBA = 4;
const RGBAIndexes = {
    red: 0,
    green: 1,
    blue: 2,
    alpha: 3,
};

const getChannelMatrixMap = async (imageData, channel) => {
    if (!(channel in RGBAIndexes)) return Error('Wrong channel');
    
    const {data, width: columns} = imageData;
    let channelMatrixMap = [];
    let columnArr = [];

    for (let i = RGBAIndexes[channel]; i < data.length; i += STEP_RGBA) {
        columnArr.push(data[i]);
        if (columnArr.length === columns) {
            channelMatrixMap.push(columnArr);
            columnArr = [];
        }
    }

    return channelMatrixMap;
};

const getChannelMap = async (imageData, channelSettings) => {
    const {red, green, blue, alpha} = channelSettings;
    
    imageData.data.forEach((value, index, data) => {
        data[STEP_RGBA*index + RGBAIndexes.red] = red ?? data[STEP_RGBA*index + RGBAIndexes.red];
        data[STEP_RGBA*index + RGBAIndexes.green] = green ?? data[STEP_RGBA*index + RGBAIndexes.green];
        data[STEP_RGBA*index + RGBAIndexes.blue] = blue ?? data[STEP_RGBA*index + RGBAIndexes.blue];
        data[STEP_RGBA*index + RGBAIndexes.alpha] = alpha ?? data[STEP_RGBA*index + RGBAIndexes.alpha];
    });

    return imageData;
};

const getChannelEnergyMap = async (imageData, channel) => {
    // let channelSettings = {
    //     red: 0,
    //     green: 0,
    //     blue: 0,
    //     alpha: 0
    // };
    // let redChannelMap = await getChannelMatrixMap(imageData, channelSettings);


    return energyMap;
};

const getEnergyMap = async (imageData, channel) => {
    let channelSettings = {
        // red: 0,
        // green: 0,
        // blue: 0,
        // alpha: 0
    };
    return await getChannelMap(imageData, channelSettings);
};

export {getEnergyMap};