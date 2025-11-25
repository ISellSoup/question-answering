window.addEventListener("hashchange", ()=>{
    const hash = location.hash;
    let hashMatch = false;
    const selectedElements = [];

    document.querySelectorAll("h2").forEach((element)=>{
        let name = element.innerText

        if (element.dataset.hash!==undefined) {
            name = element.dataset.hash;

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

    if (selectedElements.length > 0) {
        selectedElements[0].scrollIntoView();
    }
})