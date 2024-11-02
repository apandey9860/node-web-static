document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners only once when the DOM is loaded
    attachCancelLogic();
    attachCrossIconLogic();
});

function deleteProductBtnClick(event) {
    const button = event.target.closest('button');
    const productId = button.getAttribute('data-id');
    const prodID = parseInt(productId, 10); // Explicitly specify the base for parseInt
    const productData = {
        product_id: prodID
    };

    const modal = document.getElementById('deleteProductModal');
    if (modal) {
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
    }

    const form = document.querySelector('#deleteProductForm');
    // Use a named function to ensure it's only added once
    function handleSubmit(event) {
        event.preventDefault();
        form.removeEventListener('submit', handleSubmit); // Remove listener after it runs once

        fetch(`/trade/deleteProduct`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
        .then(response => {
            if (modal) {
                hideModal(modal);
            }
            fetchProductData();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    form.addEventListener('submit', handleSubmit);
}

// Function to attach logic for the cancel button
function attachCancelLogic() {
    const cancelButton = document.querySelector('#deleteProductModal .btn-default');
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            resetAndHideModal();
        });
    }
}

// Function to attach logic for the cross icon
function attachCrossIconLogic() {
    const crossIcon = document.querySelector('#deleteProductModal .close');
    if (crossIcon) {
        crossIcon.addEventListener('click', () => {
            resetAndHideModal();
        });
    }
}

// Reusable function to reset and hide the modal
function resetAndHideModal() {
    const form = document.getElementById('deleteProductForm');
    form.reset(); // Reset form fields
    const modal = document.getElementById('deleteProductModal');
    if (modal) {
        hideModal(modal);
    }
}

// Function to hide the modal
function hideModal(modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();
}
