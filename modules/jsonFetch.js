export async function fetchJSON(url) {
    try {
        console.log(url)
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch JSON at ${url}: ${response.status}`);

        return {success:true, response:(await response.json())}
    } catch(err) {
        console.warn(err)
        return {success:false, err:err}
    }
}

export async function fetchBuiltInSet(setName) {
    const output = await fetchJSON(`built-in content/sets/${encodeURIComponent(setName)}.json`)
    return {success:output.success, set:output.response}
}