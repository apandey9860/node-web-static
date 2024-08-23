document.addEventListener('DOMContentLoaded', (event) => {
    // Select all cards
    const cards = document.querySelectorAll('.card');
    const currentPage = window.location.pathname

    // Add click event listener to each card
    cards.forEach(card => {
        card.addEventListener('click', () => {
            //Add code to redirect to product

            // Find the 'Product Name' button within the card
            const cardTitle = card.querySelector('.card-title').textContent.trim(); // Ensure no extra spaces
            const formattedTitle = encodeURIComponent(cardTitle); 
            console.log(formattedTitle)
            
            window.location.href = `/products/${formattedTitle}`;
        });
    });
});