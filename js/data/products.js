/* =============================================
   HBCU Crown GSO Outlet - Product Data
   NC A&T Aggies Collection
   Named after Collegiate Lifestyle convention
   ============================================= */

const PRODUCTS = [
  {
    id: 'NCAT-JACKET-BLUE',
    name: 'Blue NCA&T State University Silk Infused Lifestyle Jacket',
    category: 'Jackets',
    school: 'NC A&T',
    description: 'Premium silk-infused lifestyle jacket in Aggie Blue featuring NCA&T State University branding. Crafted from 300gsm organic French terry cotton — weighty enough for cooler nights, breathable enough for everyday wear. Features a silk-infused hood lining that reduces friction, frizz, and breakage — protecting braids, curls, and locs wherever you go. Distressed appliqué lettering with EST. 1891 heritage detail.',
    price: 125.00,
    salePrice: null,
    originalPrice: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    stock: { 'XS': 1, 'S': 0, 'M': 0, 'L': 0, 'XL': 0, '2XL': 0 },
    image: 'public/images/products/blujcket.webp',
    backImage: 'public/images/products/bkcblu.webp',
    sizeChart: 'public/images/products/jcketsizechrt.webp',
    tags: ['HBCU', 'NC A&T', 'Aggies', 'Silk Infused', 'Lifestyle Jacket'],
    collection: 'Featured',
    inStock: true
  },
  {
    id: 'NCAT-JACKET-BLACK',
    name: 'Black NCA&T State University Silk Infused Lifestyle Jacket',
    category: 'Jackets',
    school: 'NC A&T',
    description: 'Sleek black silk-infused lifestyle jacket with bold NCA&T State University branding. Built from 300gsm organic French terry cotton with a silk-infused hood to protect your crown. Features distressed appliqué lettering and Aggie Bulldog emblem. The perfect game-day-to-streetwear transition piece.',
    price: 125.00,
    salePrice: null,
    originalPrice: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    stock: { 'XS': 0, 'S': 0, 'M': 0, 'L': 0, 'XL': 0, '2XL': 0 },
    image: 'public/images/products/black_jacket.webp',
    backImage: 'public/images/products/bckblkjcket.webp',
    sizeChart: 'public/images/products/jcketsizechrt.webp',
    tags: ['HBCU', 'NC A&T', 'Aggies', 'Silk Infused', 'Lifestyle Jacket'],
    collection: 'Featured',
    inStock: false
  },
  {
    id: 'NCAT-JACKET-GREY',
    name: 'Grey NCA&T State University Silk Infused Lifestyle Jacket',
    category: 'Jackets',
    school: 'NC A&T',
    description: 'Premium grey silk-infused lifestyle jacket with NCA&T State University branding. Understated colorway with bold Aggie pride. 300gsm organic French terry cotton construction with silk-infused hood lining for ultimate crown protection.',
    price: 125.00,
    salePrice: null,
    originalPrice: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    stock: { 'XS': 5, 'S': 1, 'M': 4, 'L': 7, 'XL': 0, '2XL': 12 },
    image: 'public/images/products/greyjcket.webp',
    backImage: 'public/images/products/bckgreyjcket.webp',
    sizeChart: 'public/images/products/jcketsizechrt.webp',
    tags: ['HBCU', 'NC A&T', 'Aggies', 'Silk Infused', 'Lifestyle Jacket'],
    collection: 'All Products',
    inStock: true
  },
  {
    id: 'NCAT-JACKET-CAMO',
    name: 'Camouflage "NCA&T SU" Silk Infused Lifestyle Jacket',
    category: 'Jackets',
    school: 'NC A&T',
    description: 'Stand-out camouflage lifestyle jacket with NCA&T SU branding. Silk-infused hood lining for hair protection, crafted from 300gsm organic French terry cotton. A bold statement piece that merges military-inspired pattern with Aggie pride.',
    price: 125.00,
    salePrice: null,
    originalPrice: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    stock: { 'XS': 2, 'S': 1, 'M': 4, 'L': 0, 'XL': 0, '2XL': 0 },
    image: 'public/images/products/camojcket.webp',
    backImage: 'public/images/products/bckcamojcket.webp',
    sizeChart: 'public/images/products/jcketsizechrt.webp',
    tags: ['HBCU', 'NC A&T', 'Aggies', 'Silk Infused', 'Lifestyle Jacket', 'Camouflage'],
    collection: 'All Products',
    inStock: true
  },
  {
    id: 'NCAT-JACKET-LEMON',
    name: '"Light Lemon" North Carolina A&T State University Silk Infused Lifestyle Jacket',
    category: 'Jackets',
    school: 'NC A&T',
    description: 'Fresh light lemon colorway silk-infused lifestyle jacket featuring North Carolina A&T State University branding. A vibrant twist on classic Aggie gold. 300gsm organic French terry cotton with silk-infused hood lining to protect your crown.',
    price: 125.00,
    salePrice: null,
    originalPrice: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    stock: { 'XS': 1, 'S': 0, 'M': 0, 'L': 0, 'XL': 0, '2XL': 0 },
    image: 'public/images/products/yllowjcket.webp',
    backImage: 'public/images/products/bckyllowjcket.webp',
    sizeChart: 'public/images/products/jcketsizechrt.webp',
    tags: ['HBCU', 'NC A&T', 'Aggies', 'Silk Infused', 'Lifestyle Jacket'],
    collection: 'All Products',
    inStock: true
  },
  {
    id: 'NCAT-SWEATS-001',
    name: 'Black NCA&T SU Lifestyle Sweatpants',
    category: 'Bottoms',
    school: 'NC A&T',
    description: 'Premium black lifestyle sweatpants with NCA&T SU embroidered branding. Tapered leg with elastic cuffs, drawstring waist, and side pockets. Crafted from heavyweight fleece for all-day comfort on and off campus.',
    price: 80.00,
    salePrice: null,
    originalPrice: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    stock: { 'XS': 0, 'S': 1, 'M': 1, 'L': 0, 'XL': 0, '2XL': 0 },
    image: 'public/images/products/blkpants.webp',
    tags: ['HBCU', 'NC A&T', 'Aggies', 'Sweatpants', 'Lifestyle'],
    collection: 'Featured',
    inStock: true
  },
  {
    id: 'NCAT-SHORTS-001',
    name: '"North Carolina A&T" Cropped Shorts',
    category: 'Bottoms',
    school: 'NC A&T',
    description: 'Cropped shorts with "North Carolina A&T" branding down the leg. Comfortable mesh-lined construction with elastic waist. Perfect for warm-weather Aggie Pride or game-day tailgating.',
    price: 30.00,
    salePrice: null,
    originalPrice: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    stock: { 'XS': 0, 'S': 0, 'M': 0, 'L': 0, 'XL': 0, '2XL': 0 },
    image: 'public/images/products/shorts.webp',
    backImage: 'public/images/products/blck_shorts.webp',
    tags: ['HBCU', 'NC A&T', 'Aggies', 'Shorts'],
    collection: 'All Products',
    inStock: false
  },
  {
    id: 'NCAT-POLO-001',
    name: 'NCA&T SU Rugby Polo',
    category: 'Polos',
    school: 'NC A&T',
    description: 'NCA&T State University rugby polo with bold branding, striped sleeves, and classic collar. A standout piece that blends vintage rugby style with Aggie pride.',
    price: 80.00,
    salePrice: null,
    originalPrice: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    stock: { 'XS': 0, 'S': 2, 'M': 6, 'L': 1, 'XL': 0, '2XL': 2 },
    image: 'public/images/products/NRugbyPolo.webp',
    tags: ['HBCU', 'NC A&T', 'Aggies', 'Rugby Polo', 'Lifestyle'],
    collection: 'Featured',
    inStock: true
  },
  {
    id: 'NCAT-SHORTS-BLUE',
    name: 'Blue Shorts',
    category: 'Bottoms',
    school: 'NC A&T',
    description: 'NCA&T Aggies blue shorts with bold graphics and Aggie Bulldog branding. Comfortable mesh construction perfect for game day or everyday wear.',
    price: 80.00,
    salePrice: null,
    originalPrice: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    stock: { 'XS': 0, 'S': 0, 'M': 0, 'L': 0, 'XL': 0, '2XL': 0 },
    image: 'public/images/products/blueshorts_unC.webp',
    tags: ['HBCU', 'NC A&T', 'Aggies', 'Shorts'],
    collection: 'All Products',
    inStock: false
  },
  {
    id: 'NCAT-SHORTS-WHITE',
    name: 'White Shorts',
    category: 'Bottoms',
    school: 'NC A&T',
    description: 'NCA&T Aggies white shorts with bold graphics and Aggie Bulldog branding. Comfortable mesh construction perfect for game day or everyday wear.',
    price: 80.00,
    salePrice: null,
    originalPrice: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    stock: { 'XS': 0, 'S': 0, 'M': 0, 'L': 0, 'XL': 0, '2XL': 0 },
    image: 'public/images/products/whiteshorts_unC.webp',
    tags: ['HBCU', 'NC A&T', 'Aggies', 'Shorts'],
    collection: 'All Products',
    inStock: false
  },
];

// Stock helper functions
function getStockForSize(product, size) {
  if (!product.stock) return 0;
  return product.stock[size] || 0;
}

function isSizeInStock(product, size) {
  return getStockForSize(product, size) > 0;
}

function getFirstAvailableSize(product) {
  if (!product.stock) return product.sizes[0];
  for (var i = 0; i < product.sizes.length; i++) {
    if (getStockForSize(product, product.sizes[i]) > 0) {
      return product.sizes[i];
    }
  }
  return null;
}

function getTotalStock(product) {
  if (!product.stock) return 0;
  var total = 0;
  for (var key in product.stock) {
    total += product.stock[key];
  }
  return total;
}

// Product helper functions
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function getProductsBySchool(school) {
  if (!school || school === 'All') return PRODUCTS;
  return PRODUCTS.filter(p => p.school === school);
}

function getProductsByCategory(category) {
  if (!category || category === 'All') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.collection === 'Featured');
}

function filterProducts({ school, category }) {
  return PRODUCTS.filter(p => {
    const matchSchool = !school || school === 'All' || p.school === school;
    const matchCategory = !category || category === 'All' || p.category === category;
    return matchSchool && matchCategory;
  });
}

function sortProducts(products, sortBy) {
  const sorted = [...products];
  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted;
  }
}
