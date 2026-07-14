# TopZen Healthcare Limited — Website

A fully functional, static online-pharmacy website for **TopZen Healthcare Limited**, built with plain HTML, CSS, and JavaScript (no build step, no dependencies). Modeled on the structure of medipalmedicalsupplies.co.ke, using your logo and brand palette.

## How to open it

No server or install needed — just double-click **`index.html`** to open it in your browser. All pages, the cart, and checkout work fully offline.

If you prefer running it through a local server (recommended for the most accurate preview):
```bash
cd topzen-website
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Pages included

| Page | Description |
|---|---|
| `index.html` | Home page — hero, categories, featured products, trust badges, testimonials |
| `shop.html` | Full catalog with category filters, search, and sorting |
| `product.html?id=p001` | Product detail page (pass any product `id` from `js/data.js`) |
| `cart.html` | Shopping cart — add/remove items, quantity controls, order summary |
| `checkout.html` | Checkout form — delivery details, M-Pesa/Card/COD selection, order confirmation |
| `about.html` | Company story, values, and milestones |
| `contact.html` | Contact form and business info |

## How it works

- **Catalog data** lives in `js/data.js` — a plain JavaScript array (`TZ_PRODUCTS`) and category list (`TZ_CATEGORIES`). Add, edit, or remove products by editing this file directly; every page reads from it automatically.
- **Cart & wishlist** are handled in `js/cart.js` using the browser's `localStorage`, so a visitor's cart persists between page visits on the same device/browser.
- **Shared UI logic** (icons, mobile menu, search redirect, toasts) lives in `js/main.js`.
- **Checkout is a working demo flow**: it validates the form, shows an order confirmation with a generated order number, and clears the cart — but it does not charge a real M-Pesa/card payment or send real emails/SMS. See "Connecting a real backend" below.

## Customizing

- **Logo**: replace `assets/logo.png` (keep the same filename, or update the `<img src="assets/logo.png">` references across the HTML files).
- **Brand colors**: all defined as CSS variables at the top of `css/style.css` (`--primary`, `--secondary`, `--accent`, `--leaf`, `--neutral`), matching the palette you provided.
- **Contact details / working hours**: currently placeholders (`+254 700 123 456`, `care@topzenhealthcare.co.ke`) — find-and-replace across the HTML files.
- **Products & prices**: edit `js/data.js`. Prices are in KSh (Kenyan Shillings).

## Connecting a real backend (next step)

This is a front-end demo with realistic interactions (cart, filtering, checkout flow), but it doesn't have a live database, real payments, or order emails yet. Since you're already building the TopZen FastAPI + SQLite backend, the natural next step is to:
1. Replace the static `TZ_PRODUCTS` array with a `fetch()` call to your FastAPI `/products` endpoint.
2. Replace the checkout form's `submit` handler in `checkout.html` with a `fetch()` POST to a `/orders` endpoint.
3. Integrate the real Safaricom M-Pesa Daraja API for the M-Pesa payment option (STK push).

Happy to help wire any of these up — just point me to your FastAPI backend's routes and I can adapt the JavaScript to call them directly.
