document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelectorAll("a.link").forEach((element)=>{
        element.href = "#" + element.innerText;
    })
});
