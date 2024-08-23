document.addEventListener('DOMContentLoaded', function() {
    // Detect if on the home page
    const currentPage = window.location.pathname;

    // Function to handle smooth scroll or redirection
    function handleNavClick(event) {
        event.preventDefault();

        const targetId = event.target.getAttribute('href');
        console.log(targetId);
        if(targetId.includes("tab")){
            return;
        }
        
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

    function handleTabClick(event) {
        // Implement Tab Click logic here
        event.preventDefault();
        const presentation = document.querySelectorAll('.nav-tabs li');
        const tabs = document.querySelectorAll('.nav-tabs a');
        const tabPanes = document.querySelectorAll('.tab-pane');
        // Deactivate all tabs and tab panes
        tabs.forEach((tab, index) => {
            tab.setAttribute('aria-selected', 'false');
            presentation[index].removeAttribute("class");
            tabPanes[index].setAttribute("class", "tab-pane")
        });

        // Activate clicked tab and corresponding tab pane
        event.target.setAttribute('aria-selected', 'true');
        presentation[event.target.getAttribute("tabIndex")].setAttribute("class", "active");
        tabPanes[event.target.getAttribute("tabIndex")].setAttribute("class", "tab-pane active")

        // Determine the image source based on the active tab
        let imageSrc = ''; // Default image source
        switch(event.target.getAttribute("tabIndex")) {
            case '0':
                imageSrc = 'images/products/placeholderProducts-1.jpg';
                break;
            case '1':
                imageSrc = 'images/products/placeholderProducts-2.jpg';
                break;
            case '2':
                imageSrc = 'images/services/placeholderServices-1.jpg';
                break;
            case '3':
                imageSrc = 'images/services/placeholderServices-2.jpg';
                break;
            default:
                imageSrc = 'images/products/placeholderProducts-1.jpg';
        }

        // Update the src attribute of the feature image
        const featureImage = document.getElementById('feature-image');
        featureImage.setAttribute('src', imageSrc);
    }
    
     // Attach click event listeners to all links
    document.addEventListener('click', function(event) {
        if (event.target.matches('#homeRedirect')) {
            handleNavClick(event);
        }
        else if (event.target.matches('#featureRedirect')) {
            handleNavClick(event);
        }
        else if (event.target.matches('#aboutRedirect')) {
            handleNavClick(event);
        }
        else if (event.target.matches('#contactRedirect')) {
            handleNavClick(event);
        }
        else if (event.target.hash) {
            handleTabClick(event);
            return;
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

    // // Load content from header, footer, and sections
    // const sections = ['header', 'home', 'feature', 'about', 'contact', 'footer'];
    // sections.forEach(section => {
    //     fetch(`views/${section}.html`)
    //         .then(response => response.text())
    //         .then(data => {
    //             document.getElementById(`${section}Index`).innerHTML = data;
    //         })
    //         .catch(error => console.error(`Error loading ${section}:`, error));
    // });

});
