export function evalPathInstruction(originObject,instruction) {
    if (typeof originObject != "object" || originObject===null) throw new Error("No originObject passed to evalPathInstruction function");
    if (typeof instruction != "object" || instruction===null) throw new Error("No instruction passed to evalPathInstruction function");

    const origin = (typeof instruction.origin == "string")&&instruction.origin||"content" // Property of originObject that contains the array
    const index = (typeof instruction.index == "number")&&instruction.index||undefined
    const parent = (typeof instruction.parent == "boolean")&&instruction.parent||false // Should the object's parent be used?

    if (parent) originObject = originObject.temp.parent;
    if (typeof originObject != "object" || originObject===null) return;

    if (index===undefined) return originObject; // Intended for situations where parent is true (to get the originObject's parent)

    let content = originObject[origin]
    if (typeof content != "object" || content===null) throw new Error(`Origin "${origin}" doesn't exist on this object`);

    return content[index]
}

export function findObjectByPath(originObject,path) {
    let output;
    
    for (let index = 0; index < path.length; index++) {
        try {
            if (typeof originObject != "object" || originObject===null) break;
            originObject = evalPathInstruction(originObject,path[index])
        } catch(err) {
            throw new Error(`Error following path instruction at path index ${index}: ${err}`)
        }
    }
    
    return output;
}

export function getObjectPath(object) {
    let path = [];
    object.temp.parent.content.indexof(object)
}

export function updateDescendents(object) {
    function depthUpdateChildren(child, parent) { //Child is operated on, parent is not always defined
        child.temp.parent = parent ?? null
        if (child.contents) child.contents.array.forEach((item)=>{depthUpdateChildren(item,child)});
    }

    depthUpdateChildren(object)
}

export function deleteTreeObject(path) {

}