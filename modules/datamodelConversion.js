function plainObjectToClass(object, className) {
    if (!object.className || !className) return;
    if (object.className) className = object.className;

    const output = new window[className]
    Object.assign(output,object)
}

export function dataToDatamodel(data) {
    const output = {};



    return output;
}

export function datamodelToData(datamodel) {
    const output = {};



    return output;
}