export async function fetchBuiltInSet(setName) {
    try {
        const url = `built-in content/sets/${encodeURIComponent(setName)}.json`
        console.log(url)
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch built-in set ${setName}: ${response.status}`);
        const set = await response.json();

        return {success:true, set:set}
    } catch(err) {
        console.warn(err)
        return {success:false, err:err}
    }
}