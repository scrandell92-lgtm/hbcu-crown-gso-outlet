/* =============================================
   HBCU Crown GSO Outlet - Catalog Page
   Filtering, sorting, product grid, product modal
   ============================================= */

(function () {
  var currentSchool = null;
  var currentCategory = null;
  var currentSort = 'name-asc';
  var modalQuantity = 1;

  document.addEventListener('DOMContentLoaded', function () {
    var params = new URLSearchParams(window.location.search);
    var schoolParam = params.get('school');
    var categoryParam = params.get('category');
    var productParam = params.get('product');

    if (schoolParam) {
      currentSchool = schoolParam;
      document.querySelectorAll('[data-type="all"]').forEach(function (pill) {
        pill.classList.remove('active');
      });
      document.querySelectorAll('[data-type="school"]').forEach(function (pill) {
        pill.classList.remove('active');
        if (pill.dataset.filter === schoolParam) pill.classList.add('active');
      });
    }

    if (categoryParam) {
      currentCategory = categoryParam;
      document.querySelectorAll('[data-type="all"]').forEach(function (pill) {
        pill.classList.remove('active');
      });
      document.querySelectorAll('[data-type="category"]').forEach(function (pill) {
        pill.classList.remove('active');
        if (pill.dataset.filter === categoryParam) pill.classList.add('active');
      });
    }

    initFilters();
    initSort();
    renderProducts();

    if (productParam) {
      var product = getProductById(productParam);
      if (product) openProductModal(product);
    }
  });

  function initFilters() {
    var filterBar = document.getElementById('filter-bar');
    filterBar.addEventListener('click', function (e) {
      var pill = e.target.closest('.filter-pill');
      if (!pill) return;

      var type = pill.dataset.type;
      var value = pill.dataset.filter;

      // Remove active from all pills
      filterBar.querySelectorAll('.filter-pill').forEach(function (p) {
        p.classList.remove('active');
      });
      pill.classList.add('active');

      if (type === 'all') {
        currentSchool = null;
        currentCategory = null;
      } else if (type === 'school') {
        currentSchool = value;
        currentCategory = null;
      } else if (type === 'category') {
        currentCategory = value;
        currentSchool = null;
      }

      renderProducts();
    });
  }

  function initSort() {
    document.getElementById('sort-select').addEventListener('change', function (e) {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  function renderProducts() {
    var grid = document.getElementById('product-grid');

    var filtered = PRODUCTS.filter(function (p) {
      if (currentSchool && p.school !== currentSchool) return false;
      if (currentCategory && p.category !== currentCategory) return false;
      return true;
    });

    filtered = sortProducts(filtered, currentSort);

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="no-products"><h3>No products found</h3><p>Try adjusting your filters to find what you\'re looking for.</p></div>';
      return;
    }

    grid.innerHTML = filtered.map(function (product) {
      var priceHtml = '';
      if (product.originalPrice && product.originalPrice > product.price) {
        priceHtml = '<span class="product-card-price">$' + product.price.toFixed(2) + '</span>' +
          '<span class="product-card-original-price">$' + product.originalPrice.toFixed(2) + '</span>';
      } else {
        priceHtml = '<span class="product-card-price">$' + product.price.toFixed(2) + '</span>';
      }

      var categoryIcon = getCategoryIcon(product.category);
      var soldOut = !product.inStock;
      var cardClass = 'product-card' + (soldOut ? ' sold-out' : '');
      var soldOutBadge = soldOut ? '<span class="sold-out-badge">Sold Out</span>' : '';
      var buttonHtml = soldOut
        ? '<button class="btn btn-sm btn-sold-out" disabled>Sold Out</button>'
        : '<button class="btn btn-primary btn-sm catalog-add-btn" data-id="' + product.id + '">Add to Cart</button>';

      return '<div class="' + cardClass + '" data-product-id="' + product.id + '" data-category="' + product.category + '">' +
        '<div class="product-card-image">' +
          '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">' +
          '<div class="product-card-placeholder" style="display:none;">' + categoryIcon + '</div>' +
          soldOutBadge +
        '</div>' +
        '<div class="product-card-info">' +
          '<p class="product-card-school">' + product.school + '</p>' +
          '<h4 class="product-card-name">' + product.name + '</h4>' +
          '<p>' + priceHtml + '</p>' +
          buttonHtml +
        '</div>' +
      '</div>';
    }).join('');

    // Attach click events
    grid.querySelectorAll('.product-card').forEach(function (card) {
      var productId = card.dataset.productId;
      var product = getProductById(productId);

      card.querySelector('.product-card-image').addEventListener('click', function () {
        openProductModal(product);
      });

      card.querySelector('.product-card-name').addEventListener('click', function () {
        openProductModal(product);
      });
    });

    // Quick add buttons
    grid.querySelectorAll('.catalog-add-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var product = getProductById(btn.dataset.id);
        if (!product) return;

        if (!product.inStock) {
          showToast('Sorry, ' + product.name + ' is currently sold out.');
          return;
        }

        var availableSize = getFirstAvailableSize(product);
        if (!availableSize) {
          showToast('Sorry, ' + product.name + ' is currently sold out in all sizes.');
          return;
        }

        CartStore.addItem({
          productId: product.id,
          name: product.name,
          price: product.price,
          size: availableSize,
          quantity: 1,
          image: product.image
        });

        showToast(product.name + ' (' + availableSize + ') added to cart!');
        openCartDrawer();
      });
    });
  }

  function getCategoryIcon(category) {
    switch (category) {
      case 'Jackets': return '&#x1F9E5;';
      case 'Hoodies': return '&#x1F9E5;';
      case 'Bottoms': return '&#x1F456;';
      case 'T-Shirts': return '&#x1F455;';
      case 'Sweatshirts': return '&#x1F9E5;';
      case 'Hats': return '&#x1F9E2;';
      default: return '&#x1F451;';
    }
  }

  /* ---- Product Modal ---- */
  function openProductModal(product) {
    var modal = document.getElementById('product-modal');
    var content = document.getElementById('product-modal-content');
    modalQuantity = 1;

    var allSoldOut = !product.inStock;
    var firstAvailable = getFirstAvailableSize(product);

    var priceDisplay = '$' + product.price.toFixed(2);
    var originalPriceHtml = '';
    if (product.originalPrice && product.originalPrice > product.price) {
      originalPriceHtml = '<span class="product-modal-original-price">$' + product.originalPrice.toFixed(2) + '</span>';
    }

    // Build image list for carousel
    var modalImages = [{ src: product.image, alt: product.name }];
    if (product.backImage) modalImages.push({ src: product.backImage, alt: product.name + ' - Back' });
    if (product.sizeChart) modalImages.push({ src: product.sizeChart, alt: product.name + ' - Size Chart' });

    var carouselHtml = '';
    if (modalImages.length > 1) {
      var slidesHtml = modalImages.map(function (img, i) {
        return '<div class="carousel-slide' + (i === 0 ? ' active' : '') + '">' +
          '<img src="' + img.src + '" alt="' + img.alt + '">' +
        '</div>';
      }).join('');
      var dotsHtml = modalImages.map(function (_, i) {
        return '<button class="carousel-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '" aria-label="Image ' + (i + 1) + '"></button>';
      }).join('');
      carouselHtml =
        '<div class="product-modal-image product-modal-carousel" id="modal-carousel">' +
          '<div class="carousel-track">' + slidesHtml + '</div>' +
          '<button class="carousel-arrow carousel-prev" id="carousel-prev" aria-label="Previous image">&lsaquo;</button>' +
          '<button class="carousel-arrow carousel-next" id="carousel-next" aria-label="Next image">&rsaquo;</button>' +
          '<div class="carousel-dots">' + dotsHtml + '</div>' +
        '</div>';
    } else {
      carouselHtml =
        '<div class="product-modal-image">' +
          '<img src="' + product.image + '" alt="' + product.name + '" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">' +
          '<span class="product-modal-image-placeholder" style="display:none;">' + getCategoryIcon(product.category) + '</span>' +
        '</div>';
    }

    // Build size options with per-size stock status
    var sizeOptionsHtml = product.sizes.map(function (s) {
      var sizeStock = getStockForSize(product, s);
      var isSoldOut = sizeStock <= 0;
      var label = isSoldOut ? s + ' - Sold Out' : s + ' (' + sizeStock + ' left)';
      var selected = (!allSoldOut && firstAvailable === s) ? ' selected' : '';
      var disabled = isSoldOut ? ' disabled' : '';
      return '<option value="' + s + '"' + selected + disabled + '>' + label + '</option>';
    }).join('');

    // Determine initial button state
    var initialSizeAvailable = !allSoldOut && firstAvailable;

    content.innerHTML =
      '<button class="product-modal-close" id="modal-close-btn" aria-label="Close">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
      '</button>' +
      carouselHtml +
      '<div class="product-modal-details">' +
        '<p class="product-modal-school">' + product.school + '</p>' +
        '<h2 class="product-modal-name">' + product.name + '</h2>' +
        '<p class="product-modal-price">' + priceDisplay + ' ' + originalPriceHtml + '</p>' +
        '<p class="product-modal-description">' + product.description + '</p>' +
        (allSoldOut ? '<div class="product-modal-sold-out-notice">This item is completely sold out in all sizes.</div>' : '') +
        '<div class="product-option">' +
          '<label for="modal-size">Size</label>' +
          '<select id="modal-size">' + sizeOptionsHtml + '</select>' +
        '</div>' +
        '<div id="size-stock-msg" class="size-stock-msg"></div>' +
        '<div class="product-modal-qty" id="modal-qty-wrap">' +
          '<label>Quantity</label>' +
          '<div class="qty-control">' +
            '<button class="qty-btn" id="modal-qty-minus">-</button>' +
            '<span class="qty-value" id="modal-qty-value">1</span>' +
            '<button class="qty-btn" id="modal-qty-plus">+</button>' +
          '</div>' +
        '</div>' +
        '<button class="btn btn-lg product-modal-add-btn" id="modal-add-btn">' +
          (initialSizeAvailable ? 'Add to Cart &mdash; $' + product.price.toFixed(2) : 'Sold Out') +
        '</button>' +
        '<div class="product-tags">' +
          product.tags.map(function (tag) { return '<span class="product-tag">' + tag + '</span>'; }).join('') +
        '</div>' +
      '</div>';

    // Set initial button state
    var addBtn = document.getElementById('modal-add-btn');
    var qtyWrap = document.getElementById('modal-qty-wrap');
    updateModalSizeState(product, addBtn, qtyWrap);

    // Events
    document.getElementById('modal-close-btn').addEventListener('click', closeProductModal);

    // Size change - update button and stock message
    document.getElementById('modal-size').addEventListener('change', function () {
      modalQuantity = 1;
      document.getElementById('modal-qty-value').textContent = '1';
      updateModalSizeState(product, addBtn, qtyWrap);
      updateModalPrice(product.price);
    });

    // Quantity
    document.getElementById('modal-qty-minus').addEventListener('click', function () {
      if (modalQuantity > 1) {
        modalQuantity--;
        document.getElementById('modal-qty-value').textContent = modalQuantity;
        updateModalPrice(product.price);
      }
    });

    document.getElementById('modal-qty-plus').addEventListener('click', function () {
      var selectedSize = document.getElementById('modal-size').value;
      var maxStock = getStockForSize(product, selectedSize);
      if (modalQuantity < maxStock) {
        modalQuantity++;
        document.getElementById('modal-qty-value').textContent = modalQuantity;
        updateModalPrice(product.price);
      } else {
        showToast('Only ' + maxStock + ' available in size ' + selectedSize);
      }
    });

    // Add to cart
    document.getElementById('modal-add-btn').addEventListener('click', function () {
      var size = document.getElementById('modal-size').value;
      var sizeStock = getStockForSize(product, size);

      if (sizeStock <= 0) {
        showToast('Sorry, size ' + size + ' is sold out.');
        return;
      }

      if (modalQuantity > sizeStock) {
        showToast('Only ' + sizeStock + ' available in size ' + size + '. Adjusted quantity.');
        modalQuantity = sizeStock;
        document.getElementById('modal-qty-value').textContent = modalQuantity;
        return;
      }

      CartStore.addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        size: size,
        quantity: modalQuantity,
        image: product.image
      });

      showToast(product.name + ' (' + size + ') added to cart!');
      closeProductModal();
      openCartDrawer();
    });

    // Carousel logic
    if (modalImages.length > 1) {
      var carouselIndex = 0;
      var slides = content.querySelectorAll('.carousel-slide');
      var dots = content.querySelectorAll('.carousel-dot');

      function goToSlide(index) {
        slides[carouselIndex].classList.remove('active');
        dots[carouselIndex].classList.remove('active');
        carouselIndex = (index + modalImages.length) % modalImages.length;
        slides[carouselIndex].classList.add('active');
        dots[carouselIndex].classList.add('active');
      }

      document.getElementById('carousel-prev').addEventListener('click', function () {
        goToSlide(carouselIndex - 1);
      });
      document.getElementById('carousel-next').addEventListener('click', function () {
        goToSlide(carouselIndex + 1);
      });
      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          goToSlide(parseInt(dot.dataset.index));
        });
      });

      // Touch swipe support
      var carousel = document.getElementById('modal-carousel');
      var touchStartX = 0;
      carousel.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });
      carousel.addEventListener('touchend', function (e) {
        var diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
          goToSlide(carouselIndex + (diff > 0 ? 1 : -1));
        }
      });
    }

    // Show modal
    modal.classList.add('open');
    document.body.classList.add('no-scroll');

    // Close on backdrop click
    modal.addEventListener('click', function handler(e) {
      if (e.target === modal) {
        closeProductModal();
        modal.removeEventListener('click', handler);
      }
    });

    // Close on escape
    function escHandler(e) {
      if (e.key === 'Escape') {
        closeProductModal();
        document.removeEventListener('keydown', escHandler);
      }
    }
    document.addEventListener('keydown', escHandler);
  }

  function updateModalSizeState(product, addBtn, qtyWrap) {
    var sizeSelect = document.getElementById('modal-size');
    var selectedSize = sizeSelect.value;
    var sizeStock = getStockForSize(product, selectedSize);
    var stockMsg = document.getElementById('size-stock-msg');

    if (sizeStock <= 0) {
      // Size is sold out
      addBtn.className = 'btn btn-lg product-modal-add-btn btn-sold-out';
      addBtn.disabled = true;
      addBtn.innerHTML = 'Sold Out &mdash; Size ' + selectedSize;
      qtyWrap.style.opacity = '0.4';
      qtyWrap.style.pointerEvents = 'none';
      if (stockMsg) {
        stockMsg.innerHTML = '<span style="color:#dc3545;font-size:13px;font-weight:600;">Size ' + selectedSize + ' is sold out</span>';
      }
    } else {
      // Size is available
      addBtn.className = 'btn btn-primary btn-lg product-modal-add-btn';
      addBtn.disabled = false;
      addBtn.innerHTML = 'Add to Cart &mdash; $' + (product.price * modalQuantity).toFixed(2);
      qtyWrap.style.opacity = '1';
      qtyWrap.style.pointerEvents = 'auto';
      if (stockMsg) {
        var urgency = sizeStock <= 3 ? ' style="color:#dc3545;font-weight:600;"' : '';
        stockMsg.innerHTML = '<span' + urgency + ' style="font-size:13px;">Size ' + selectedSize + ': ' + sizeStock + ' left in stock</span>';
      }
    }
  }

  function closeProductModal() {
    var modal = document.getElementById('product-modal');
    modal.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  function updateModalPrice(unitPrice) {
    var btn = document.getElementById('modal-add-btn');
    if (btn && !btn.disabled) {
      btn.innerHTML = 'Add to Cart &mdash; $' + (unitPrice * modalQuantity).toFixed(2);
    }
  }

  // Expose for URL-based product opening
  window.openProductModal = openProductModal;
})();
