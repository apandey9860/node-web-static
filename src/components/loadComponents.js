document.addEventListener('DOMContentLoaded', function() {
    // Detect if on the home page
    const currentPage = window.location.pathname;

    // Function to handle smooth scroll or redirection
    function handleNavClick(event) {
        event.preventDefault();

        const targetId = event.target.getAttribute('href');
        
        if (targetId.startsWith('#')) { // Handle internal section links
            if (currentPage === '/' || currentPage.endsWith('index.html')) {
                // If on home.html, perform smooth scrolling
                console.log(targetId);
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                // If on a different page, redirect to home.html with the target hash
                window.location.href = `/${targetId}`;
            }
        } else {
            // Handle external links (e.g., /products or /services)
            window.location.href = targetId;
        }
    }

     // Attach click event listeners to all links
        document.addEventListener('click', function(event) {
            if (event.target.matches('#homeRedirect')) {
                handleNavClick(event);
            }
            if (event.target.matches('#featureRedirect')) {
                handleNavClick(event);
            }
            if (event.target.matches('#aboutRedirect')) {
                handleNavClick(event);
            }
            if (event.target.matches('#contactRedirect')) {
                handleNavClick(event);
            }
        });


            if ((currentPage === '/' || currentPage.endsWith('index.html')) && window.location.hash) {
                const hash = window.location.hash;
                console.log(hash);
                setTimeout(() => {
                    console.log(document);

                    if (hash.includes("home")) {
                        const targetElement = document.getElementById('homeIndex');
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });  
                    }
                    if (hash.includes("feature")) {
                        const targetElement = document.getElementById('featureIndex');
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });  
                    }
                    if (hash.includes("about")) {
                        const targetElement = document.getElementById('aboutIndex');
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });  
                    }
                    if (hash.includes("contact")) {
                        const targetElement = document.getElementById('contactIndex');
                        console.log(targetElement);
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });  
                    }          
                }, 1000); // Delay scrolling to ensure the page is fully loaded
            }
    // Check for hash in URL after redirect and scroll to section
    

    // Load content from header, footer, and sections
    const sections = ['header', 'home', 'feature', 'about', 'contact', 'footer'];
    sections.forEach(section => {
        fetch(`views/${section}.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById(`${section}Index`).innerHTML = data;
            })
            .catch(error => console.error(`Error loading ${section}:`, error));
    });

});
