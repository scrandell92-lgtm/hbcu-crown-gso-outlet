/* =============================================
   HBCU Crown GSO Outlet - Homepage
   Featured products rendering - NC A&T Edition
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {
  renderFeaturedProducts();
});

function renderFeaturedProducts() {
  var grid = document.getElementById('featured-grid');
  if (!grid) return;

  var featured = getFeaturedProducts();
  if (featured.length === 0) {
    featured = PRODUCTS.slice(0, 4);
  }

  grid.innerHTML = featured.map(function (product) {
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
      : '<button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); quickAdd(\'' + product.id + '\')">Add to Cart</button>';

    return '<div class="' + cardClass + '" data-category="' + product.category + '" onclick="window.location.href=\'catalog.html?product=' + product.id + '\'">' +
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
}

function getCategoryIcon(category) {
  switch (category) {
    case 'Jackets': return '&#x1F9E5;';
    case 'Hoodies': return '&#x1F9E5;';
    case 'Bottoms': return '&#x1F456;';
    case 'T-Shirts': return '&#x1F455;';
    case 'Sweatshirts': return '&#x1F9E5;';
    case 'Hats': return '&#x1F9E2;';
    default: return 'A&T';
  }
}

function quickAdd(productId) {
  var product = getProductById(productId);
  if (!product) return;

  if (!product.inStock) {
    showToast('Sorry, ' + product.name + ' is currently sold out.');
    return;
  }

  CartStore.addItem({
    productId: product.id,
    name: product.name,
    price: product.price,
    size: product.sizes[0],
    quantity: 1,
    image: product.image
  });

  showToast(product.name + ' added to cart!');
  openCartDrawer();
}
