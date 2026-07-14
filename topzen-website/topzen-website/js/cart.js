/* =========================================================
   TopZen Healthcare Limited — Cart Logic
   Client-side cart persisted in localStorage. Swap the
   read/write functions here to call a real backend/API.
   ========================================================= */

const TZ_CART_KEY = "tz_cart_v1";
const TZ_WISHLIST_KEY = "tz_wishlist_v1";

const Cart = {
  read(){
    try{
      const raw = localStorage.getItem(TZ_CART_KEY);
      return raw ? JSON.parse(raw) : {};
    }catch(e){ return {}; }
  },
  write(cart){
    localStorage.setItem(TZ_CART_KEY, JSON.stringify(cart));
    Cart.updateBadge();
  },
  add(productId, qty=1){
    const cart = Cart.read();
    cart[productId] = (cart[productId] || 0) + qty;
    Cart.write(cart);
    return cart;
  },
  setQty(productId, qty){
    const cart = Cart.read();
    if(qty <= 0){ delete cart[productId]; }
    else { cart[productId] = qty; }
    Cart.write(cart);
    return cart;
  },
  remove(productId){
    const cart = Cart.read();
    delete cart[productId];
    Cart.write(cart);
    return cart;
  },
  clear(){ Cart.write({}); },
  count(){
    const cart = Cart.read();
    return Object.values(cart).reduce((a,b) => a+b, 0);
  },
  lineItems(){
    const cart = Cart.read();
    return Object.entries(cart).map(([id, qty]) => {
      const product = TZ.getProduct(id);
      return product ? { product, qty } : null;
    }).filter(Boolean);
  },
  subtotal(){
    return Cart.lineItems().reduce((sum, li) => sum + li.product.price * li.qty, 0);
  },
  updateBadge(){
    document.querySelectorAll("[data-cart-badge]").forEach(el => {
      const n = Cart.count();
      el.textContent = n;
      el.style.display = n > 0 ? "flex" : "none";
    });
  }
};

const Wishlist = {
  read(){
    try{ return JSON.parse(localStorage.getItem(TZ_WISHLIST_KEY) || "[]"); }catch(e){ return []; }
  },
  toggle(productId){
    let list = Wishlist.read();
    if(list.includes(productId)) list = list.filter(id => id !== productId);
    else list.push(productId);
    localStorage.setItem(TZ_WISHLIST_KEY, JSON.stringify(list));
    return list;
  },
  has(productId){ return Wishlist.read().includes(productId); }
};

function tzToast(message){
  let toast = document.querySelector(".toast");
  if(!toast){
    toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span class="toast-icon">${TZ_ICONS.badge}</span><span class="toast-msg"></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector(".toast-msg").textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.addEventListener("DOMContentLoaded", () => {
  Cart.updateBadge();

  document.body.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add-to-cart]");
    if(addBtn){
      e.preventDefault();
      const id = addBtn.getAttribute("data-add-to-cart");
      const qtyInput = addBtn.closest("[data-product-block]")?.querySelector("[data-qty-input]");
      const qty = qtyInput ? parseInt(qtyInput.value || "1", 10) : 1;
      const product = TZ.getProduct(id);
      Cart.add(id, qty);
      tzToast(`Added "${product.name}" to cart`);
    }

    const wishBtn = e.target.closest("[data-wishlist]");
    if(wishBtn){
      e.preventDefault();
      const id = wishBtn.getAttribute("data-wishlist");
      Wishlist.toggle(id);
      wishBtn.classList.toggle("active");
    }
  });
});
