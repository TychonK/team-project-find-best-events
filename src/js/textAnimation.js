export default function () {
    const text = document.querySelector(".hero__title");
    const strText = text.textContent;
    const splitText = strText.split("");
    text.textContent = "";
    for (let i = 0; i < splitText.length; i++) {
        text.innerHTML += "<span>" + splitText[i] + "</span>";
    }

    let char = 0;
    let timer = setInterval(onTick, 50);

    function onTick() {
        const span = text.querySelectorAll("span")[char];
        span.classList.add("fade");
        char++;
        if (char == splitText.length) {
            complete();
            return;
        }
    }
    function complete() {
        clearInterval(timer);
        timer = null;
    }

    let inputTimer = setInterval(onInput, 50);

    function onInput() {
        for (let i = 0; i < document.querySelectorAll(".input-cont").length; i++) {
            document.querySelectorAll(".input-cont")[i].classList.add("input-animate")
        }
    }
}

