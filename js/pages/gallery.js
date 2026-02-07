/* =============================================
   HBCU Crown GSO Outlet - Gallery Page
   Loads images from gallery-config.json,
   renders masonry grid, lightbox viewer
   ============================================= */

(function () {
  let galleryImages = [];
  let currentIndex = 0;

  document.addEventListener('DOMContentLoaded', function () {
    loadGallery();
    initLightbox();
  });

  function loadGallery() {
    fetch('gallery/gallery-config.json')
      .then(function (res) {
        if (!res.ok) throw new Error('Config not found');
        return res.json();
      })
      .then(function (data) {
        galleryImages = data.images || [];
        if (galleryImages.length > 0) {
          renderGallery();
        } else {
          renderEmpty();
        }
      })
      .catch(function () {
        // No config or error - show sample gallery with placeholders
        renderSampleGallery();
      });
  }

  function renderGallery() {
    var grid = document.getElementById('gallery-grid');

    grid.innerHTML = galleryImages.map(function (img, index) {
      return '<div class="gallery-item" data-index="' + index + '">' +
        '<img src="gallery/' + img.src + '" alt="' + (img.caption || 'Gallery image') + '" loading="lazy">' +
        '<div class="gallery-item-overlay">' +
          '<div>' +
            '<p class="gallery-item-caption">' + (img.caption || '') + '</p>' +
            (img.date ? '<p class="gallery-item-date">' + formatDate(img.date) + '</p>' : '') +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    // Click handlers
    grid.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        openLightbox(parseInt(item.dataset.index));
      });
    });
  }

  function renderSampleGallery() {
    // Show sample placeholder gallery to demonstrate the layout
    var sampleImages = [
      { caption: 'NC A&T Homecoming', color: '#003591', height: '300px' },
      { caption: 'Photoshoot', color: '#1a1a2e', height: '400px' },
      { caption: 'Spring Collection', color: '#F7A800', height: '250px' },
      { caption: 'Campus Life', color: '#003591', height: '350px' },
      { caption: 'Game Day', color: '#0A0A0A', height: '280px' },
      { caption: 'Events', color: '#D4A843', height: '320px' }
    ];

    galleryImages = sampleImages.map(function (s) {
      return { caption: s.caption, src: '', date: '' };
    });

    var grid = document.getElementById('gallery-grid');
    grid.innerHTML = sampleImages.map(function (img, index) {
      return '<div class="gallery-item" data-index="' + index + '">' +
        '<div class="gallery-placeholder" style="background-color: ' + img.color + '; height: ' + img.height + ';">' +
          img.caption +
        '</div>' +
        '<div class="gallery-item-overlay">' +
          '<div>' +
            '<p class="gallery-item-caption">' + img.caption + '</p>' +
            '<p class="gallery-item-date">Sample — Add your own images</p>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    // Add instructions below
    var instructions = document.createElement('div');
    instructions.className = 'gallery-instructions';
    instructions.innerHTML =
      '<h4>How to Add Your Own Images</h4>' +
      '<ol>' +
        '<li>Place your image files in the <code>gallery/images/</code> folder</li>' +
        '<li>Open <code>gallery/gallery-config.json</code> in a text editor</li>' +
        '<li>Add an entry for each image with <code>src</code>, <code>caption</code>, and <code>date</code></li>' +
        '<li>Save the file and refresh this page</li>' +
      '</ol>';
    grid.parentNode.appendChild(instructions);
  }

  function renderEmpty() {
    var grid = document.getElementById('gallery-grid');
    grid.innerHTML =
      '<div class="gallery-empty">' +
        '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
          '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>' +
          '<circle cx="8.5" cy="8.5" r="1.5"></circle>' +
          '<polyline points="21 15 16 10 5 21"></polyline>' +
        '</svg>' +
        '<h3>No Images Yet</h3>' +
        '<p>Gallery images will appear here once added.</p>' +
      '</div>';
  }

  /* ---- Lightbox ---- */
  function initLightbox() {
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', function () { navigate(-1); });
    document.getElementById('lightbox-next').addEventListener('click', function () { navigate(1); });

    // Click backdrop to close
    document.getElementById('lightbox').addEventListener('click', function (e) {
      if (e.target.id === 'lightbox') closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      var lightbox = document.getElementById('lightbox');
      if (!lightbox.classList.contains('open')) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.add('open');
    document.body.classList.add('no-scroll');
  }

  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  function navigate(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = galleryImages.length - 1;
    if (currentIndex >= galleryImages.length) currentIndex = 0;
    updateLightbox();
  }

  function updateLightbox() {
    var img = galleryImages[currentIndex];
    var lightboxImg = document.getElementById('lightbox-image');

    if (img.src) {
      lightboxImg.src = 'gallery/' + img.src;
      lightboxImg.style.display = 'block';
    } else {
      lightboxImg.style.display = 'none';
    }

    lightboxImg.alt = img.caption || 'Gallery image';
    document.getElementById('lightbox-caption-text').textContent = img.caption || '';
    document.getElementById('lightbox-caption-date').textContent = img.date ? formatDate(img.date) : '';
    document.getElementById('lightbox-counter').textContent = (currentIndex + 1) + ' / ' + galleryImages.length;
  }

  function formatDate(dateStr) {
    try {
      var date = new Date(dateStr + 'T00:00:00');
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  }
})();
