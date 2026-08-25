document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const themeButton = document.querySelector('.theme-button');
  const sections = document.querySelectorAll('section[id]');
  const header = document.querySelector('header');
  const projectButtons = document.querySelectorAll('[data-project-target]');
  const projectModals = document.querySelectorAll('[data-project-modal]');
  const projectCloseButtons = document.querySelectorAll('[data-project-close]');

  const showMenu = () => {
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('nav__menu--visible');
      });
    }
  };

  const hideMenuOnLinkClick = () => {
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu) {
          navMenu.classList.remove('nav__menu--visible');
        }
      });
    });
  };

  const setActiveSection = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 80;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav__menu a[href*='${sectionId}']`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navLink) navLink.classList.add('active-link');
      } else {
        if (navLink) navLink.classList.remove('active-link');
      }
    });
  };

  const changeHeaderOnScroll = () => {
    if (window.scrollY >= 80) {
      header.classList.add('scroll-header');
    } else {
      header.classList.remove('scroll-header');
    }
  };

  const openProjectModal = () => {
    projectButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const modalId = button.dataset.projectTarget;
        const targetModal = document.querySelector(`[data-project-modal='${modalId}']`);

        if (targetModal) {
          targetModal.classList.add('modal--active');
        }
      });
    });
  };

  const closeProjectModal = () => {
    projectCloseButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const modal = button.closest('[data-project-modal]');
        if (modal) {
          modal.classList.remove('modal--active');
        }
      });
    });

    projectModals.forEach((modal) => {
      modal.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.classList.remove('modal--active');
        }
      });
    });
  };

  const setTheme = () => {
    const darkTheme = 'dark-theme';
    const iconTheme = 'ri-sun-line';
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    if (!themeButton) return;

    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

    if (selectedTheme) {
      document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
      themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
    }

    themeButton.addEventListener('click', () => {
      document.body.classList.toggle(darkTheme);
      themeButton.classList.toggle(iconTheme);
      localStorage.setItem('selected-theme', getCurrentTheme());
      localStorage.setItem('selected-icon', getCurrentIcon());
    });
  };

  const smoothScrollLinks = () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            event.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  };

  const revealOnScroll = () => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((element) => observer.observe(element));
  };

  showMenu();
  hideMenuOnLinkClick();
  openProjectModal();
  closeProjectModal();
  setTheme();
  smoothScrollLinks();
  revealOnScroll();

  window.addEventListener('scroll', () => {
    changeHeaderOnScroll();
    setActiveSection();
  });
});
