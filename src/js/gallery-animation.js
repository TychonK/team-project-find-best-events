export default function () {
    const cards = document.querySelectorAll(".event__list");

    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                entry.target.classList.add("animated");
            } else {
                entry.target.classList.remove("animated")
            }
        })
    })

    cards.forEach(card => {
        observer.observe(card)
    })

    const paginator = document.querySelector(".paginator");

    observer.observe(paginator);
}
