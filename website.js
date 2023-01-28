// Get all of the links in the navigation menu
const links = document.querySelectorAll('nav a');

// Add a click event listener to each link
links.forEach(link => {
    link.addEventListener('click', e => {
        // Prevent the default behavior of the link (redirecting to a new page)
        e.preventDefault();

        // Get the section that the link points to
        const section = document.querySelector(link.getAttribute('href'));

        // Scroll to the section
        section.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
