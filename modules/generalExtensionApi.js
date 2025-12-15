export function getRescourceURL(saveName,rescourcePath) {
    var extensionRoot = window.extensionList[saveName].hrefURL
    return URL(rescourcePath,extensionRoot)
}

