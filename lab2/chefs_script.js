document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".chef").forEach(card => {
        card.addEventListener("click", function () {
            this.classList.toggle("flipped");
        });
    });
});