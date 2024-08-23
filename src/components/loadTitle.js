document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const welcomeText = document.querySelector('.welcome');
        welcomeText.classList.add('show');
    }, 1000);
});