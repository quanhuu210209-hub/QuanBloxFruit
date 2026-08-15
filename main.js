/**
 * Blox Fruits Wiki & Shop - Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const overlay = document.querySelector('.nav-overlay');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      if (overlay) overlay.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    if (overlay) {
      overlay.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close menu when clicking links
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. FAQ Accordion for Q&A section
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all other FAQs
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        // Toggle current FAQ
        item.classList.toggle('active', !isActive);
      });
    }
  });

  // 3. Category Filter Tabs (Fruit, Weapon, GamePass)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterCards = document.querySelectorAll('[data-category]');

  if (filterButtons.length > 0 && filterCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        filterCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (filterValue === 'all' || cardCategory === filterValue || cardCategory.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // 4. Modal Preview for Cards
  const modal = document.getElementById('item-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalImg = document.getElementById('modal-img');
  const modalDesc = document.getElementById('modal-desc');
  const modalBadge = document.getElementById('modal-badge');
  const modalStats = document.getElementById('modal-stats');

  document.querySelectorAll('.btn-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.fruit-card, .weapon-card, .gamepass-card');
      if (!card || !modal) return;

      const title = card.querySelector('h3')?.innerText || 'Chi tiết vật phẩm';
      const img = card.querySelector('img')?.getAttribute('src') || '';
      const desc = card.querySelector('p')?.innerText || '';
      const badge = card.querySelector('.badge-tag, .fruit-rarity, .weapon-type, .gamepass-price')?.cloneNode(true);
      const extraStats = card.getAttribute('data-stats') || '';

      if (modalTitle) modalTitle.innerText = title;
      if (modalImg) modalImg.src = img;
      if (modalDesc) modalDesc.innerText = desc;
      if (modalBadge) {
        modalBadge.innerHTML = '';
        if (badge) modalBadge.appendChild(badge);
      }
      if (modalStats) {
        modalStats.innerHTML = extraStats ? `<div class="modal-stats-content">${extraStats}</div>` : '';
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
