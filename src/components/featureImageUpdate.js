document.addEventListener('DOMContentLoaded', function() {
    // Get all tab links
    const tabs = document.querySelectorAll('.nav-tabs a');

    // Function to handle tab clicks
    function handleTabClick(event) {
        event.preventDefault(); // Prevent default action

        const tabId = this.getAttribute('href'); // Get the href of the clicked tab
        let imageSrc = ''; // Default image source

        // Determine the image source based on the active tab
        switch(tabId) {
            case '#tab01':
                imageSrc = 'images/products/placeholderProducts-1.jpg';
                break;
            case '#tab02':
                imageSrc = 'images/products/placeholderProducts-2.jpg';
                break;
            case '#tab03':
                imageSrc = 'images/services/placeholderServices-1.jpg';
                break;
            case '#tab04':
                imageSrc = 'images/services/placeholderServices-2.jpg';
                break;
            default:
                imageSrc = 'images/products/placeholderProducts-1.jpg';
        }

        // Update the src attribute of the feature image
        const featureImage = document.getElementById('feature-image');
        featureImage.setAttribute('src', imageSrc);

        // Restart the water-flow animation
        const waterFlowEffect = document.querySelector('.water-flow-effect');
        waterFlowEffect.classList.remove('water-flow-effect'); // Remove the class to reset the animation
        void waterFlowEffect.offsetWidth; // Trigger a reflow to restart the animation
        waterFlowEffect.classList.add('water-flow-effect'); // Reapply the class to restart the animation
    }

    // Add click event listener to each tab link
    tabs.forEach(tab => {
        tab.addEventListener('click', handleTabClick);
    });
});
