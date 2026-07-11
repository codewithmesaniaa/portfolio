// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveLink();
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinksEl.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===== ACTIVE LINK ON SCROLL =====
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ===== FADE IN ON SCROLL =====
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = entry.target.parentElement.querySelectorAll('.fade-in:not(.visible)');
      let delay = 0;
      siblings.forEach(sib => {
        if (!sib.classList.contains('visible')) {
          setTimeout(() => sib.classList.add('visible'), delay);
          delay += 100;
        }
      });
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ===== CONTACT FORM (Formspree) =====
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('.btn-send');
  const btnText = btn.querySelector('.btn-send-text');
  const originalText = btnText.textContent;
  const originalBg = btn.style.background;

  btn.disabled = true;
  btnText.textContent = 'Sending...';
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      btnText.textContent = 'Message Sent ✓';
      btn.style.background = '#22c55e';
      btn.style.boxShadow = '0 6px 28px rgba(34,197,94,0.4)';
      formStatus.textContent = "Thanks! I'll get back to you soon.";
      formStatus.classList.add('form-status-success');
      form.reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    btnText.textContent = 'Failed — Try Again';
    btn.style.background = '#ef4444';
    btn.style.boxShadow = '0 6px 28px rgba(239,68,68,0.4)';
    formStatus.textContent = 'Something went wrong. Please email me directly.';
    formStatus.classList.add('form-status-error');
  }

  setTimeout(() => {
    btn.disabled = false;
    btnText.textContent = originalText;
    btn.style.background = originalBg;
    btn.style.boxShadow = '';
  }, 3500);
});

// ===== SMOOTH SCROLL for buttons =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== TECH STACK MODALS =====
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});

// ===== INTRO SPLASH: TYPEWRITER + CLEANUP =====
document.body.style.overflow = 'hidden';
window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('introSplash');
  const textEl = document.getElementById('typewriterText');

  if (textEl) {
    const fullText = "HI, I'M SANIA THABASSUM";
    let i = 0;
    const typeSpeed = 90; // ms per letter

    function typeLetter() {
      if (i < fullText.length) {
        textEl.textContent += fullText.charAt(i);
        i++;
        setTimeout(typeLetter, typeSpeed);
      }
    }
    // Start typing right after the badge pop-in finishes
    setTimeout(typeLetter, 500);
  }

  if (splash) {
    setTimeout(() => {
      document.body.style.overflow = '';
      splash.remove();
    }, 3800);
  }
});

// ===== SKILLS PROGRESS BAR ANIMATION =====

const skillSection = document.querySelector('.skills-area');

if (skillSection) {

    const skillObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                document.querySelectorAll('.progress-fill').forEach(bar => {
                    bar.style.width = bar.dataset.width + "%";
                });

                skillObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.3
    });

    skillObserver.observe(skillSection);

}