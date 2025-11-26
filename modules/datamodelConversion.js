function plainObjectToClass(object, className) {
    className ??= object.className;
    if (!className) return;

    const newObject = new window[className]();
    return Object.assign(newObject,object);
}

function classObjectToPlain(object) {
    const output = Object.assign({},object);
    output.className = object.constructor.name;

    delete output.temp; // Delete temporary data
    for (const Key in output) { // Delete class methods
        if (typeof output.Key == "function") delete output.Key;
    };

    return output;
}

function depthConvert(object, callback) {
    if (object.contents) {
        const contents = [];
        object.contents.array.forEach((item)=>{contents.push(depthConvert(item,callback));});
        object.contents = contents;
    };
    return callback(object);
}

export function dataToSet(data) {
    return depthConvert(data,plainObjectToClass);
}

export function setToData(set) {
    return depthConvert(data,classObjectToPlain);
}