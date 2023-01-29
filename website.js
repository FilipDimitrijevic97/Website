// Get all of the links in the navigation menu
const links = document.querySelectorAll('nav a');

// Add a click event listener to each link
links.forEach(link => {
    link.addEventListener('click', e => {
        // Prevent the default behavior of the link (redirecting to a new page)
        e.preventDefault();

        // Get the section that the link points to
        const section = document.querySelector(link.getAttribute('href'));

        // Scroll to the section with smooth animation
        section.scrollIntoView({
            behavior: 'smooth'
        });

        // Add class active to the current link
        links.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
    });
});

// Add active class to the current section when user scrolls
const sections = document.querySelectorAll('main section');
window.addEventListener('scroll', e => {
    const currentPosition = window.scrollY + (window.innerHeight / 2);
    sections.forEach(section => {
        if (currentPosition > section.offsetTop && currentPosition < (section.offsetTop + section.offsetHeight)) {
            links.forEach(link => {
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });
});

// Implement lazy loading of images
const images = document.querySelectorAll('img[data-src]');
const options = {
    rootMargin: '0px 0px 50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.setAttribute('src', img.getAttribute('data-src'));
            observer.unobserve(img);
        }
    });
}, options);

images.forEach(img => {
    observer.observe(img);
});