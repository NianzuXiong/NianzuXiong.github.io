(function () {
  // Top bar gains a hairline once the page is scrolled
  var bar = document.getElementById('bar');
  function onScroll() { if (bar) bar.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Scroll reveal for photos and their text
  var targets = document.querySelectorAll('.reveal, .event__text');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('is-in'); });
  }

  // Lightbox for event photos
  var box = document.getElementById('lightbox');
  if (box && typeof box.showModal === 'function') {
    var img = box.querySelector('img');
    var cap = box.querySelector('.lightbox__cap');
    document.querySelectorAll('.shot').forEach(function (btn) {
      btn.addEventListener('click', function () {
        img.src = btn.getAttribute('data-full');
        img.alt = btn.getAttribute('data-cap') || '';
        cap.textContent = btn.getAttribute('data-cap') || '';
        box.showModal();
      });
    });
    box.addEventListener('click', function (ev) { if (ev.target === box || ev.target === img) box.close(); });
  } else {
    document.querySelectorAll('.shot').forEach(function (btn) {
      btn.addEventListener('click', function () { window.open(btn.getAttribute('data-full'), '_blank'); });
    });
  }

  // Speech language switch (small screens)
  var par = document.querySelector('.parallel');
  document.querySelectorAll('.speech__switch button').forEach(function (b, _, all) {
    b.addEventListener('click', function () {
      par.setAttribute('data-show', b.getAttribute('data-show'));
      all.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    });
  });
})();
