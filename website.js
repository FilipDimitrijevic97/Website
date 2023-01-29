import React, { useState, useEffect } from 'react';

const Navigation = ({ links }) => {
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const section = window.document.querySelector(link.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
        setActiveLink(link.getAttribute('href'));
      });
    });

    const sections = window.document.querySelectorAll('main section');
    window.addEventListener('scroll', e => {
      const currentPosition = window.scrollY + (window.innerHeight / 2);
      sections.forEach(section => {
        if (
          currentPosition > section.offsetTop &&
          currentPosition < (section.offsetTop + section.offsetHeight)
        ) {
          setActiveLink(`#${section.id}`);
        }
      });
    });
  }, []);

  return (
    <nav>
      {links.map(link => {
        const href = link.getAttribute('href');
        return (
          <a
            key={href}
            href={href}
            className={href === activeLink ? 'active' : ''}
          >
            {link.textContent}
          </a>
        );
      })}
    </nav>
  );
};

const Image = ({ dataSrc }) => {
  const [src, setSrc] = useState(null);
  const options = { rootMargin: '0px 0px 50px 0px' };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSrc(dataSrc);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const image = window.document.querySelector(`img[data-src="${dataSrc}"]`);
    if (image) {
      observer.observe(image);
    }
  }, [dataSrc]);

  return <div><img src={src} data-src
    ={dataSrc} alt=""/></div>;
};