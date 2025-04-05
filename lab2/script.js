document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".ingridients-button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const ingredientsContainer = this.parentElement;

            if (!ingredientsContainer.classList.contains("visible")) {
                ingredientsContainer.classList.add("visible");
                this.textContent = "Сховати інгридієнти";
            } else {
                ingredientsContainer.classList.remove("visible");
                this.textContent = "Показати інгридієнти";
            }
        });
    });

    const menuSections = document.querySelectorAll("tr");

    const observer = new IntersectionObserver ((entries) => {
        for (let i = 0; i < entries.length; i++) {
            entries[i].target.classList.toggle("show", entries[i].isIntersecting);
        }
    },
    {
        threshold: 0.5
    });

    for (let i = 0; i < menuSections.length; i++) {
        observer.observe(menuSections[i]);
    }
});
