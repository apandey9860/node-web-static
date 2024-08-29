window.addEventListener('scroll', function() {
    const topHeader = document.querySelector('.topheader');
    const bottomHeader = document.querySelector('.bottomheader');
    const stickyHeader = document.querySelector('.sticky-header');
    const mainImgBg = document.querySelector('#home');

    // Calculate the scroll threshold
    const scrollThreshold = mainImgBg.offsetHeight / 2;

    if (window.scrollY > scrollThreshold) {
        // Hide the original headers and show the sticky header
        topHeader.style.display = 'none';
        bottomHeader.style.display = 'none';
        stickyHeader.style.display = 'flex'; // Match the CSS display property
        // stickyHeader.style.gridTemplateColumns = 'auto auto auto auto auto auto auto';
        // stickyHeader.style.justifyItems = 'end';
        // stickyHeader.style.alignContent = 'center';
    } else {
        // Show the original headers and hide the sticky header
        topHeader.style.display = 'flex'; // Match the CSS display property
        bottomHeader.style.display = 'grid'; // Match the CSS display property
        stickyHeader.style.display = 'none';
    }
});