/* =========================================================
   TopZen Healthcare Limited — Shared UI Logic
   ========================================================= */

function tzInjectIcons(root = document){
  root.querySelectorAll("[data-icon]").forEach(el => {
    const name = el.getAttribute("data-icon");
    if(TZ_ICONS[name]) el.innerHTML = TZ_ICONS[name];
  });
}

function renderProductCard(p){
  const stock = TZ.stockLabel(p.stock);
  const badgeMap = { sale: "Sale", new: "New" };
  let badgeHtml = "";
  if(p.rx) badgeHtml += `<span class="badge rx">Rx</span>`;
  else if(p.badge && badgeMap[p.badge]) badgeHtml += `<span class="badge ${p.badge}">${badgeMap[p.badge]}</span>`;
  const wished = typeof Wishlist !== "undefined" && Wishlist.has(p.id) ? "active" : "";

  return `
  <div class="product-card" data-product-block>
    <a href="product.html?id=${p.id}" class="product-thumb">
      ${badgeHtml}
      <button class="wishlist-btn ${wished}" data-wishlist="${p.id}" aria-label="Save to wishlist" data-icon="heart"></button>
      <img src="${p.image || 'assets/placeholder.jpg'}" alt="${p.name}" style="width:100%; height:100%; object-fit:contain;">
    
    </a>
    <div class="product-body">
      <span class="product-cat">${TZ.getCategory(p.category)?.name || ""}</span>
      <div class="product-title"><a href="product.html?id=${p.id}">${p.name}</a></div>
      <div class="stars">${TZ.stars(p.rating)} <span>(${p.reviews})</span></div>
      <div class="price-row">
        <span class="price">${TZ.money(p.price)}</span>
        ${p.oldPrice ? `<span class="price-old">${TZ.money(p.oldPrice)}</span>` : ""}
      </div>
      <span class="stock ${stock.cls}">${stock.text}</span>
      <button class="add-cart-btn" data-add-to-cart="${p.id}" ${p.stock<=0 ? "disabled":""}>
        <span data-icon="cart"></span> ${p.stock<=0 ? "Notify me" : "Add to cart"}
      </button>
    </div>
  </div>`;
}

function renderCategoryCard(c){
  return `
  <a href="shop.html?cat=${c.id}" class="cat-card">
    <div class="cat-icon">${TZ_ICONS[c.icon] || ""}</div>
    <span>${c.name}</span>
    <small>${c.blurb}</small>
  </a>`;
}

/* Mobile nav drawer */
function tzSetupMobileNav(){
  const toggle = document.querySelector(".mobile-toggle");
  const drawer = document.querySelector(".mobile-drawer");
  if(!toggle || !drawer) return;
  const close = () => drawer.classList.remove("open");
  toggle.addEventListener("click", () => drawer.classList.add("open"));
  drawer.addEventListener("click", (e) => { if(e.target === drawer) close(); });
  drawer.querySelectorAll("a, .mobile-drawer-close").forEach(el => el.addEventListener("click", close));
}

/* Header search -> shop page */
function tzSetupSearch(){
  document.querySelectorAll("[data-search-form]").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      const q = encodeURIComponent(input.value.trim());
      window.location.href = `shop.html${q ? "?q=" + q : ""}`;
    });
  });
}

/* Newsletter form (demo — no backend wired) */
function tzSetupNewsletter(){
  document.querySelectorAll("[data-newsletter-form]").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.reset();
      tzToast("Thanks for subscribing! Check your inbox for a welcome email.");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  tzInjectIcons();
  tzSetupMobileNav();
  tzSetupSearch();
  tzSetupNewsletter();

  // Highlight active nav link based on current filename
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a, .mobile-drawer-panel a").forEach(a => {
    const href = a.getAttribute("href");
    if(href === page || (page === "" && href === "index.html")){
      a.classList.add("active");
    }
  });
});
