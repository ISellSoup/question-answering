function plainObjectToClass(object, className) {
    className ??= object.className
    if (!className) return;

    const newObject = new window[className]()
    return Object.assign(newObject,object)
}

function classObjectToPlain(object) {
    const output = Object.assign({},object)
    delete output.temp
    return output
}

function depthConvert(object, callback) {
        if (object.contents) object.contents.array.forEach(depthConvert);
        callback(object)
    }

export function dataToSet(data) {
    return depthConvert(data,plainObjectToClass);
}

export function setToData(set) {
    return depthConvert(data,classObjectToPlain);
}