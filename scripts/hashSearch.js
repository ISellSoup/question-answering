window.addEventListener("hashchange", ()=>{
    const hash = location.hash;
    let hashMatch = false;
    const selectedElements = [];

    document.querySelectorAll("h1").forEach((element)=>{
        let name = element.innerText

        if (element.dataset.hash!==undefined) {
            if (!hashMatch) {
                hashMatch = true;
                selectedElements.length = 0;
            }
        } else if (hashMatch) {
            return
        }

        if (name.toLowerCase() == hash.replace("#","").toLowerCase()) {
            selectedElements.push(element);
        }
    })

    // Stuff
})