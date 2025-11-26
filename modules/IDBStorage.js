export const indexedDB = 
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB ||
    (()=>{throw new Error("indexedDB not supported")})();



export default async function open(name,version,upgradeCallback) {
    const request = indexedDB.open("UserContent",1);

    request.onupgradeneeded = ()=>{upgradeCallback(request.result)}
    
    /* callback for sets
    (db)=>{
        const setsStore = db.createObjectStore("sets", {keyPath:"index"})
    };*/

    return new Promise((resolve,reject)=>{
        request.onsuccess=()=>{
            resolve(request.result)
        }
        request.onerror = (e)=>{
            console.error("Error opening indexedDB database");
            console.error(e);
            reject(e)
        };
    })
}
