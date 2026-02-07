/* =============================================
   HBCU Crown GSO Outlet - Cart Store
   localStorage-based cart with pub/sub notifications
   ============================================= */

const CartStore = (function () {
  const STORAGE_KEY = 'hbcu_crown_cart';
  const listeners = [];

  function load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    notify();
  }

  function notify() {
    const items = load();
    listeners.forEach(fn => fn(items));
  }

  function generateKey(productId, size, color) {
    return `${productId}__${size}__${color}`;
  }

  return {
    /** Subscribe to cart changes */
    onChange(callback) {
      listeners.push(callback);
    },

    /** Get all cart items */
    getItems() {
      return load();
    },

    /** Get total item count */
    getCount() {
      return load().reduce((sum, item) => sum + item.quantity, 0);
    },

    /** Get cart subtotal */
    getTotal() {
      return load().reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    /** Add item to cart (or increment if same product+size+color exists) */
    addItem({ productId, name, price, size, color, quantity = 1, image }) {
      const items = load();
      const key = generateKey(productId, size, color);
      const existing = items.find(item => item.key === key);

      if (existing) {
        existing.quantity += quantity;
      } else {
        items.push({
          key,
          productId,
          name,
          price,
          size,
          color,
          quantity,
          image
        });
      }

      save(items);
    },

    /** Remove item by key */
    removeItem(key) {
      const items = load().filter(item => item.key !== key);
      save(items);
    },

    /** Update quantity for an item */
    updateQuantity(key, quantity) {
      const items = load();
      const item = items.find(i => i.key === key);
      if (item) {
        if (quantity <= 0) {
          save(items.filter(i => i.key !== key));
        } else {
          item.quantity = quantity;
          save(items);
        }
      }
    },

    /** Clear the entire cart */
    clear() {
      save([]);
    }
  };
})();
