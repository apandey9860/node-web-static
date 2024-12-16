function repaircall(event) {
    event.preventDefault(); 

    const clickedButton = event.target;
    const parentContainer = clickedButton.closest(".services-content-icon");

    if (parentContainer) {
        const valueElement = parentContainer.querySelector(".value");
        const value = valueElement ? valueElement.textContent : null;

        if (value) {
            const redirectUrl = `${clickedButton.href}?value=${encodeURIComponent(value)}`;
            window.location.href = redirectUrl;
        } else {
            console.error("Value element not found!");
        }
    } else {
        console.error("Parent container not found!");
    }
}


