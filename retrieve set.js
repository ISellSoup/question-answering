let success;

const urlParams = new URLSearchParams(window.location.search);
const setName = toString(urlParams.get("setName"));
const setType = urlParams.get("setType");

async function loadBuiltInSet() {
    
}

const setTypeMap = new Map();

setTypeMap.set("built-in", async function() {
    const response = await fetch(`Built in sets/${encodeURIComponent(setName)}.json`);
    if (!response.ok) {throw `Failed to fetch built-in set ${setName}: ${response.status}`};
    return await response.json();
});


try {
    if (typeof(setName) != "string") {throw "Set name missing or invalid"}
    const set = setTypeMap.get(setType)()

    success = true;
    console.log(set)
} catch(err) {
    console.warn(err);
    success = false;
}