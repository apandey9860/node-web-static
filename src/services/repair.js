function repairCall(event) {
    event.preventDefault(); 

    const clickedButton = event.target;
    const parentContainer = clickedButton.closest(".services-content-icon");
    console.log(parentContainer);

    if (parentContainer) {
        const valueElement = parentContainer.querySelector(".value");
        const value = valueElement ? valueElement.textContent : null;
        console.log(valueElement);
        if (value) {
            const redirectUrl = window.location.origin + '/repairForm' + `${clickedButton.href}?value=${encodeURIComponent(value)}`;
            console.log(redirectUrl);
            window.location.href = redirectUrl;
        } else {
            console.error("Value element not found!");
        }
    } else {
        console.error("Parent container not found!");
    }
}


