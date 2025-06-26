document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const icon = themeToggle?.querySelector('i');
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (themeToggle && icon) {
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      html.classList.add('dark');
      icon.classList.replace('fa-moon', 'fa-sun');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#000000');
    } else {
      html.classList.remove('dark');
      icon.classList.replace('fa-sun', 'fa-moon');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#0070f3');
    }

    themeToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      const isDark = html.classList.contains('dark');

      icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#000000' : '#0070f3');
    });
  }



  const terminal = document.getElementById('terminalOutput');

    const lines = [
      { text: '$ npm run dev', class: 'text-blue-500' },
      { text: '> portfolio@1.0.0 dev', class: 'text-gray-500' },
      { text: '> vite', class: 'text-gray-500' },
      { text: '✓ VITE v4.5.0 ready in 500ms', class: 'text-emerald-500' },
      { text: 'Local:   http://localhost:5173', class: 'text-sky-600 underline' },
      { text: 'Network: http://192.168.1.4:5173', class: 'text-sky-600 underline' },
      { text: 'Waiting for file changes...', class: 'text-yellow-500' }
    ];

    let delay = 0;

    lines.forEach((line, index) => {
      setTimeout(() => {
        const lineEl = document.createElement('div');
        lineEl.className = line.class;
        lineEl.textContent = line.text;

        // Add blinking cursor to the last line
        if (index === lines.length - 1) {
          const cursor = document.createElement('span');
          cursor.className = 'cursor inline-block w-[1ch] bg-current ml-1';
          lineEl.appendChild(cursor);
        }

        terminal.appendChild(lineEl);
        terminal.scrollTop = terminal.scrollHeight;
      }, delay);

      delay += 800; // delay between each line
    });
    

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();

      const targetId = anchor.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        const headHeight = document.querySelector('header')?.offsetHeight || 0;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu after click
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // Filter Button Functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      // Implement actual filtering here if needed
    });
  });

  // Project Card Animation on Page Load
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 200 * index);
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();
      const subject = document.getElementById('subject')?.value.trim();

      if (name && email && message && subject) {
        alert(`Message sent successfully! I'll get back to you as soon as possible.`);
        contactForm.reset();
      } else {
        alert(`Please fill out all required fields.`);
      }
    });
  }
});
