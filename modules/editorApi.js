export function evalPathInstruction(originObject,instruction) {
    if (typeof originObject != "object" || originObject===null) throw new Error("No originObject passed to evalPathInstruction function");
    if (typeof instruction != "object" || instruction===null) throw new Error("No instruction passed to evalPathInstruction function");

    const index = (typeof instruction.index == "number")&&instruction.index||undefined
    const parent = (typeof instruction.parent == "boolean")&&instruction.parent||false // Should the object's parent be used?

    if (parent) originObject = originObject.temp.parent;
    if (typeof originObject != "object" || originObject===null) return;

    if (index===undefined) return originObject; // Intended for situations where parent is true (to get the originObject's parent)

    let content = originObject.contents;
    if (typeof content != "object" || content===null) throw new Error(`Origin object's contents is not an object`);

    return content[index]
}

export function findObjectByPath(path,originObject) {
    let output = originObject ?? window.activeSet;

    for (let index = 0; index < path.length; index++) {
        try {
            if (typeof output != "object" || output===null) break;
            output = evalPathInstruction(output,path[index])
        } catch(err) {
            throw new Error(`Error following path instruction at path index ${index}: ${err}`)
        }
    }
    
    return output;
}

export function getAbsolutePath(object) {
    let path = [];

    while (true) {
        if (object.temp.parent===null) return path;

        const parent = object.temp.parent;
        path.unshift(parent.contents.indexOf(object));
        object = parent;
    }
}

export function getRelativePath(fromObject,toObject) {
    const fromPath = getAbsolutePath(fromObject);
    const toPath = getAbsolutePath(toObject);
    const path = [];

    const fromDepth = fromPath.length-1;
    const toDepth = toPath.length-1;
    const maxDepth = Math.max(fromDepth,toDepth);
    
    let divergenceObject = null;

    for (let depth = 0; depth <= maxDepth; depth++) {
        const fromIndex = fromPath[depth].index;
        const toIndex = toPath[depth].index;

        if (depth==fromDepth && depth==toDepth && divergenceObject===null) { // Objects have the same parent
            path.push({index:toIndex,parent:true});
            break;
        }

        if (divergenceObject) {
            if (depth<=fromDepth) {
                path.unshift({parent:true});
            }

            if (depth<=toDepth) {
                path.push({index:toIndex});
            }
        } else {
            if (fromIndex!=toIndex && depth<=Math.min(fromDepth,toDepth)) {
                divergenceObject = findObjectByPath(fromPath.slice(0,depth));
                break;
            }

            if (depth>toDepth) {
                path.push({parent:true});
            }

            if (depth>fromDepth) {
                path.push({index:toIndex});
            }
        }
    }
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