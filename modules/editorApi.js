export function findObjectByPath(originObject,path,originContent) {
    if (!originContent) {
        originContent = originObject.content;
        if (originContent===undefined) throw new Error("findObjectByPath: no content found for this object");
    };

    if (originObject.values().indexof(originContent)==-1) throw new Error("findObjectByPath: originContent is not a value of originObject");
    let output;
    
    for (let index = 0; index < path.length; index++) {
        if (originContent===undefined) break; // Previous object had no content

        const pathLocation = path[index];
        let pathValue; // Where the path leads to in this originContent

        if (pathLocation==-1) {
            pathValue = originObject.temp.parent
        } else {
            pathValue = originContent[path[index]]
        }

        if (pathValue??0==0) break; // Checks if pathValue if undefined or null
        if (index==originContent.length-1) {output = pathValue; break;};

        originContent = pathValue.content
        originObject = pathValue
    }
    
    return output;
}

export function getObjectPath(object) {
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