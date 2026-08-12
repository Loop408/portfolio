// JavaScript functionality for S Poorna Chandu's Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // Custom Cursor Glow Tracker
  const cursorGlow = document.getElementById('cursor-glow');
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  });

  // Typewriter Animation
  const words = ['Full-Stack Web Apps', 'Machine Learning Models', 'Deep Learning Systems', 'Generative AI Pipelines'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterElement = document.getElementById('typewriter');
  
  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typewriterElement.textContent = currentWord.substring(0, charIndex);

    let typeSpeed = 100;
    if (isDeleting) {
      typeSpeed /= 2;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  }
  
  type();

  // Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const isOpened = mobileMenu.classList.contains('active');
    mobileToggle.innerHTML = isOpened ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
      lucide.createIcons();
    });
  });

  // Projects Filter Logic
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      // Simulate API post request
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        formFeedback.textContent = "Message sent successfully! I'll get back to you soon.";
        formFeedback.className = "form-feedback success";
        
        contactForm.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
          formFeedback.textContent = "";
          formFeedback.className = "form-feedback";
        }, 5000);
      }, 1500);
    });
  }

  // Scrollspy to highlight active nav link
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - varHeightNav())) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  function varHeightNav() {
    return header.classList.contains('scrolled') ? 70 : 80;
  }
});

// Project Data for Modals
const projectsData = {
  hackvibe: {
    title: "HackVibe",
    date: "Jul 2025 - Oct 2025",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "MySQL", "PHP", "SendGrid", "Hostinger"],
    role: "Backend Architect & Frontend Collaborator",
    bullets: [
      "Architected and built a national-level hackathon platform serving 500+ registrations and improving user engagement by 20%.",
      "Led integration of secure OTP-based email verification via SendGrid backend (PHP + MySQL + Supabase).",
      "Engineered an automated unique participant code generation algorithm to prevent duplicate registrations.",
      "Optimized query performance and database indexing for MySQL deployment on Hostinger."
    ]
  },
  dermascan: {
    title: "DermaScan — CNN Skin Disease Classifier",
    date: "Apr 2025 - May 2025",
    tags: ["TensorFlow", "Keras", "Convolutional Neural Network", "Streamlit", "Python", "Scikit-learn"],
    role: "Machine Learning Engineer Intern",
    bullets: [
      "Trained and tested a deep learning CNN classification architecture on a dataset of 5,000+ skin condition images.",
      "Improved baseline classification metrics by 15% through iterative hyperparameter tuning, achieving an 87% accuracy rate.",
      "Serialized and deployed the model using Streamlit, serving inference predictions under 3 seconds.",
      "Documented performance curves, loss graphs, and domain boundaries for IBM & Microsoft program reviews."
    ]
  },
  heart: {
    title: "Heart Disease Prediction App",
    date: "2025",
    tags: ["Python", "Scikit-learn", "Streamlit", "Logistic Regression", "Pickle"],
    role: "Sole Creator",
    bullets: [
      "Independently designed a binary classification model using Logistic Regression on the 303-record UCI Heart Disease dataset.",
      "Achieved 85%+ validation accuracy using features like age, cholesterol, maximum heart rate, and ST depression.",
      "Built a clinical risk calculator UI with Streamlit allowing doctors to input feature coordinates for real-time predictions.",
      "Successfully serialized the model pipeline with Pickle for rapid execution."
    ]
  },
  routemate: {
    title: "RouteMate — Delivery Route Optimizer",
    date: "2025",
    tags: ["Python", "OpenRouteService API", "Folium", "Geopy", "Tkinter"],
    role: "Sole Developer",
    bullets: [
      "Created a desktop app using Tkinter that solves multi-stop shortest path delivery sequences.",
      "Implemented a greedy shortest path heuristic algorithm which cuts estimated travel distance by ~30%.",
      "Utilized the OpenRouteService API to fetch real road-network routing distance rather than Euclidean lines.",
      "Mapped paths using Folium to construct interactive map views embedded in local HTML wrappers."
    ]
  },
  finance: {
    title: "Finance Anomaly Detection Dashboard",
    date: "2025",
    tags: ["Python", "Pandas", "Matplotlib", "Streamlit", "EDA"],
    role: "Data Analyst",
    bullets: [
      "Engineered exploratory data analysis (EDA) pipelines using Pandas to identify anomalies and potential fraud signals in financial transactions.",
      "Designed clean visualizations using Matplotlib to highlight transaction volumes and categorical distributions.",
      "Built a dynamic dashboard with Streamlit containing interactive date-range, amount thresholds, and category filters."
    ]
  }
};

// Modal Control Functions
function openProjectModal(projectId) {
  const modal = document.getElementById('project-modal');
  const detailsContainer = document.getElementById('modal-project-details');
  const data = projectsData[projectId];

  if (!data) return;

  const tagsHTML = data.tags.map(tag => `<span>${tag}</span>`).join('');
  const bulletsHTML = data.bullets.map(bullet => `<li>${bullet}</li>`).join('');

  detailsContainer.innerHTML = `
    <div class="modal-header">
      <span class="category-tag">${data.date}</span>
      <h2>${data.title}</h2>
      <p><strong>Role:</strong> ${data.role}</p>
      <div class="modal-tech">
        ${tagsHTML}
      </div>
    </div>
    <div class="modal-body">
      <h4>Key Contributions & Features:</h4>
      <ul>
        ${bulletsHTML}
      </ul>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Stop scrolling background
  lucide.createIcons();
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Restore scrolling
}
