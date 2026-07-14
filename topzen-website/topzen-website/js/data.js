/* =========================================================
   TopZen Healthcare Limited — Catalog Data
   Static demo dataset. Swap for a real API by replacing
   TZ_PRODUCTS / TZ_CATEGORIES below (see README).
   ========================================================= */

const TZ_CATEGORIES = [
  { id: "medicines",   name: "Medicines",          icon: "pill",       blurb: "OTC & prescription" },
  { id: "equipment",   name: "Medical Equipment",  icon: "stethoscope",blurb: "Diagnostics & devices" },
  { id: "ppe",         name: "PPE & Hygiene",      icon: "mask",       blurb: "Masks, gloves, sanitizer" },
  { id: "wellness",    name: "Wellness & Vitamins",icon: "leaf",       blurb: "Supplements & nutrition" },
  { id: "mother-baby", name: "Mother & Baby",      icon: "baby",       blurb: "Maternal & infant care" },
  { id: "first-aid",   name: "First Aid",          icon: "aid",        blurb: "Wound care & emergencies" },
];

/* Simple inline icon set drawn to match the brand's rounded, friendly geometry */
const TZ_ICONS = {
  pill: `<svg viewBox="0 0 24 24" fill="none" width="26" height="26"><path d="M4.93 19.07a5 5 0 0 1 0-7.07l7.07-7.07a5 5 0 0 1 7.07 7.07l-7.07 7.07a5 5 0 0 1-7.07 0Z" stroke="currentColor" stroke-width="1.8"/><path d="M8 8l8 8" stroke="currentColor" stroke-width="1.8"/></svg>`,
  stethoscope: `<svg viewBox="0 0 24 24" fill="none" width="26" height="26"><path d="M5 3v6a4 4 0 0 0 8 0V3M9 3H5m8 0h-4M17 13v2a5 5 0 0 1-10 0v-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="19" cy="13" r="2.2" stroke="currentColor" stroke-width="1.8"/></svg>`,
  mask: `<svg viewBox="0 0 24 24" fill="none" width="26" height="26"><path d="M3 10c3-3 15-3 18 0-1 5-4 9-9 9s-8-4-9-9Z" stroke="currentColor" stroke-width="1.8"/><path d="M7 12c2-1 8-1 10 0" stroke="currentColor" stroke-width="1.6"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" width="26" height="26"><path d="M20 4S9 3 5 9s0 12 0 12 10-1 14-7 1-10 1-10Z" stroke="currentColor" stroke-width="1.8"/><path d="M5 21c3-6 8-10 15-16" stroke="currentColor" stroke-width="1.6"/></svg>`,
  baby: `<svg viewBox="0 0 24 24" fill="none" width="26" height="26"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  aid: `<svg viewBox="0 0 24 24" fill="none" width="26" height="26"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M3 4h2l2.4 12.2A2 2 0 0 0 9.36 18H18a2 2 0 0 0 1.94-1.51L21.5 8H6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="21" r="1.4" fill="currentColor"/><circle cx="17.5" cy="21" r="1.4" fill="currentColor"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M12 21s-7.5-4.9-10-9.3C.5 8 2 4 6 4c2.2 0 3.6 1.2 4.5 2.6C11.4 5.2 12.8 4 15 4c4 0 5.5 4 4 7.7-2.5 4.4-10 9.3-10 9.3Z" stroke="currentColor" stroke-width="1.8"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" width="16" height="16"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="m21 21-3.6-3.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" width="22" height="22"><path d="M2 6h11v10H2z" stroke="currentColor" stroke-width="1.8"/><path d="M13 10h4l4 4v2h-8z" stroke="currentColor" stroke-width="1.8"/><circle cx="6.5" cy="18.5" r="1.6" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="18.5" r="1.6" stroke="currentColor" stroke-width="1.8"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" width="22" height="22"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" stroke="currentColor" stroke-width="1.8"/><path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" width="22" height="22"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3.5 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  badge: `<svg viewBox="0 0 24 24" fill="none" width="22" height="22"><path d="M12 2l2.4 2.6 3.5-.5.6 3.5 3.2 1.6-1.6 3.2 1.6 3.2-3.2 1.6-.6 3.5-3.5-.5L12 22l-2.4-2.6-3.5.5-.6-3.5-3.2-1.6 1.6-3.2-1.6-3.2 3.2-1.6.6-3.5 3.5.5Z" stroke="currentColor" stroke-width="1.6"/><path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  headset: `<svg viewBox="0 0 24 24" fill="none" width="22" height="22"><path d="M4 13v-1a8 8 0 0 1 16 0v1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><rect x="2.5" y="13" width="4.5" height="6" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="17" y="13" width="4.5" height="6" rx="1.5" stroke="currentColor" stroke-width="1.8"/><path d="M19.5 19v1a2 2 0 0 1-2 2h-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
};

const TZ_PRODUCTS = [
  {
    id: "p001", name: "Digital Blood Pressure Monitor", category: "equipment",
    image: "https://images.pexels.com/photos/8670204/pexels-photo-8670204.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 3200, oldPrice: 3800, rx: false, rating: 4.6, reviews: 128, stock: 24,
    sku: "TZ-EQ-1001", brand: "OmniHealth",
    short: "Automatic upper-arm BP monitor with irregular heartbeat detection and 2-user memory.",
    description: "Clinically validated automatic blood pressure monitor for home use. Large backlit display, one-touch operation, and 90-reading memory for two users make it easy to track your readings over time. Cuff fits arms 22–42cm.",
    features: ["One-touch automatic measurement","Irregular heartbeat detection","90-reading memory, 2 users","Large backlit LCD display","WHO blood pressure classification indicator"],
    badge: "sale"
  },
  {
    id: "p002", name: "Infrared Non-Contact Thermometer", category: "equipment",
    image: "https://images.pexels.com/photos/8949825/pexels-photo-8949825.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1450, oldPrice: null, rx: false, rating: 4.7, reviews: 302, stock: 60,
    sku: "TZ-EQ-1002", brand: "ThermoCare",
    short: "1-second contactless readings for forehead, room, and object temperature.",
    description: "Fast, hygienic, non-contact infrared thermometer suitable for the whole family. Switch between body, surface, and room modes, with a fever alarm and memory recall of the last 32 readings.",
    features: ["1-second accurate reading","Fever alert (color-coded)","Body / surface / room modes","32-reading memory","Auto shut-off to save battery"],
    badge: "new"
  },
  {
    id: "p003", name: "Pulse Oximeter Fingertip", category: "equipment",
    image: "https://images.pexels.com/photos/7580256/pexels-photo-7580256.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1800, oldPrice: 2200, rx: false, rating: 4.5, reviews: 89, stock: 15,
    sku: "TZ-EQ-1003", brand: "OmniHealth",
    short: "Measures SpO2 and pulse rate in seconds with a bright OLED display.",
    description: "Compact fingertip pulse oximeter for quick SpO2 and pulse-rate checks at home. Bright, rotatable OLED display makes readings easy in any position, and low-battery indication keeps you covered.",
    features: ["SpO2 and pulse rate readout","Rotating 4-way OLED display","Auto power-off after 8 seconds idle","Lightweight, pocket-sized","Includes lanyard and 2 AAA batteries"],
    badge: "sale"
  },
  {
    id: "p004", name: "Manual Wheelchair – Standard", category: "equipment",
    image: "https://images.pexels.com/photos/2026764/pexels-photo-2026764.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 18500, oldPrice: null, rx: false, rating: 4.4, reviews: 21, stock: 6,
    sku: "TZ-EQ-1004", brand: "MobilAid",
    short: "Foldable steel-frame wheelchair with padded armrests and footrests.",
    description: "Durable, foldable manual wheelchair suited for everyday indoor and outdoor use. Padded seat and armrests, swing-away footrests, and locking rear wheels for stability when stationary.",
    features: ["Foldable steel frame","Padded seat, back & armrests","Swing-away, height-adjustable footrests","Locking rear wheels","Weight capacity: 100kg"],
    badge: null
  },
  {
    id: "p101", name: "Paracetamol 500mg (100 Tablets)", category: "medicines",
    image: "https://images.pexels.com/photos/3652103/pexels-photo-3652103.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 250, oldPrice: null, rx: false, rating: 4.8, reviews: 540, stock: 200,
    sku: "TZ-MD-2001", brand: "GenPharm",
    short: "Effective relief for mild to moderate pain and fever.",
    description: "Fast-acting paracetamol tablets for the relief of headaches, toothache, cold and flu symptoms, and fever. Each pack contains 100 film-coated tablets. Always read the label and use as directed.",
    features: ["500mg per tablet","Pack of 100","Fever and pain relief","Suitable for adults and children over 12"],
    badge: null
  },
  {
    id: "p102", name: "Amoxicillin 250mg Capsules", category: "medicines",
    image: "https://images.pexels.com/photos/3683093/pexels-photo-3683093.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 420, oldPrice: null, rx: true, rating: 4.7, reviews: 96, stock: 80,
    sku: "TZ-MD-2002", brand: "GenPharm",
    short: "Broad-spectrum antibiotic — prescription required.",
    description: "Amoxicillin capsules used to treat a range of bacterial infections as prescribed by a licensed physician. A valid prescription is required at checkout; our pharmacist will verify before dispatch.",
    features: ["250mg per capsule","Requires valid prescription","Pharmacist-verified dispensing","Pack of 21 capsules"],
    badge: null
  },
  {
    id: "p103", name: "Oral Rehydration Salts (Sachets x10)", category: "medicines",
    image: "https://images.pexels.com/photos/18705174/pexels-photo-18705174.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 350, oldPrice: 400, rx: false, rating: 4.9, reviews: 210, stock: 150,
    sku: "TZ-MD-2003", brand: "HydraPlus",
    short: "WHO-formula rehydration for diarrhoea and dehydration.",
    description: "WHO-recommended oral rehydration salt formula to replace fluids and electrolytes lost through diarrhoea, vomiting, or heat exposure. Simply dissolve in clean water and drink.",
    features: ["WHO-standard formula","Box of 10 sachets","Suitable for adults and children","Pleasant citrus flavor"],
    badge: "sale"
  },
  {
    id: "p104", name: "Loratadine 10mg Antihistamine", category: "medicines",
    image: "https://images.pexels.com/photos/9742768/pexels-photo-9742768.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 300, oldPrice: null, rx: false, rating: 4.5, reviews: 74, stock: 120,
    sku: "TZ-MD-2004", brand: "GenPharm",
    short: "Non-drowsy relief from allergy symptoms, once daily.",
    description: "Once-daily antihistamine tablets for relief from sneezing, runny nose, itchy eyes, and other allergy symptoms, without the drowsiness of older antihistamines.",
    features: ["Non-drowsy formula","Once-daily dosing","Pack of 30 tablets","For seasonal & year-round allergies"],
    badge: null
  },
  {
    id: "p201", name: "3-Ply Surgical Face Masks (Box of 50)", category: "ppe",
    image: "https://images.pexels.com/photos/3986422/pexels-photo-3986422.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 600, oldPrice: 750, rx: false, rating: 4.6, reviews: 412, stock: 300,
    sku: "TZ-PPE-3001", brand: "SafeGuard",
    short: "Breathable 3-ply protection with adjustable nose clip.",
    description: "Disposable 3-ply surgical masks offering breathable, comfortable protection for daily use. Adjustable nose clip and soft ear loops for a secure, all-day fit. Box of 50.",
    features: ["3-ply filtration","Adjustable nose clip","Soft elastic ear loops","Box of 50 masks"],
    badge: "sale"
  },
  {
    id: "p202", name: "Nitrile Examination Gloves (Box of 100)", category: "ppe",
    image: "https://images.pexels.com/photos/4021267/pexels-photo-4021267.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1100, oldPrice: null, rx: false, rating: 4.7, reviews: 188, stock: 90,
    sku: "TZ-PPE-3002", brand: "SafeGuard",
    short: "Powder-free, latex-free gloves for clinical and home use.",
    description: "Powder-free nitrile examination gloves offering excellent tactile sensitivity and puncture resistance. Latex-free formulation suitable for those with latex sensitivities. Box of 100, size M.",
    features: ["Powder-free & latex-free","Textured fingertips for grip","Ambidextrous fit","Box of 100 gloves"],
    badge: null
  },
  {
    id: "p203", name: "Hand Sanitizer Gel 500ml (70% Alcohol)", category: "ppe",
    image: "https://images.pexels.com/photos/4908438/pexels-photo-4908438.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 450, oldPrice: null, rx: false, rating: 4.8, reviews: 267, stock: 180,
    sku: "TZ-PPE-3003", brand: "SafeGuard",
    short: "Fast-acting antibacterial gel with moisturizing aloe vera.",
    description: "70% alcohol hand sanitizer gel that kills 99.9% of germs without water. Enriched with aloe vera and glycerin to keep hands from drying out with frequent use. Pump-top 500ml bottle.",
    features: ["70% alcohol formula","Kills 99.9% of germs","Aloe vera & glycerin enriched","500ml pump bottle"],
    badge: "new"
  },
  {
    id: "p301", name: "Multivitamin & Mineral Tablets (60ct)", category: "wellness",
    image: "https://images.pexels.com/photos/13787561/pexels-photo-13787561.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1200, oldPrice: 1400, rx: false, rating: 4.6, reviews: 156, stock: 100,
    sku: "TZ-WL-4001", brand: "VitaLife",
    short: "Daily complete multivitamin for immune and energy support.",
    description: "A complete daily multivitamin and mineral blend supporting immune function, energy metabolism, and overall wellbeing. Formulated with 23 essential nutrients for adults.",
    features: ["23 essential vitamins & minerals","Supports immunity & energy","One tablet daily","60-day supply"],
    badge: "sale"
  },
  {
    id: "p302", name: "Omega-3 Fish Oil Softgels (90ct)", category: "wellness",
    image: "https://images.pexels.com/photos/17820735/pexels-photo-17820735.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1650, oldPrice: null, rx: false, rating: 4.7, reviews: 98, stock: 70,
    sku: "TZ-WL-4002", brand: "VitaLife",
    short: "High-strength EPA/DHA for heart and brain health.",
    description: "High-strength omega-3 fish oil softgels providing EPA and DHA to support cardiovascular and cognitive health. Molecularly distilled for purity, with no fishy aftertaste.",
    features: ["1000mg fish oil per softgel","EPA + DHA blend","Molecularly distilled","90 softgels — 3 month supply"],
    badge: null
  },
  {
    id: "p303", name: "Vitamin C 1000mg Effervescent (20 Tabs)", category: "wellness",
    image: "https://images.pexels.com/photos/5722880/pexels-photo-5722880.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 550, oldPrice: null, rx: false, rating: 4.8, reviews: 231, stock: 140,
    sku: "TZ-WL-4003", brand: "VitaLife",
    short: "Immune-boosting fizzy vitamin C, orange flavor.",
    description: "High-dose effervescent vitamin C tablets that dissolve quickly in water for a refreshing, orange-flavored immune boost. Great for daily use or during cold and flu season.",
    features: ["1000mg vitamin C per tablet","Effervescent, fast-dissolving","Natural orange flavor","Tube of 20 tablets"],
    badge: "new"
  },
  {
    id: "p401", name: "Baby Digital Ear Thermometer", category: "mother-baby",
    image: "https://images.pexels.com/photos/3985216/pexels-photo-3985216.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 2100, oldPrice: null, rx: false, rating: 4.6, reviews: 64, stock: 22,
    sku: "TZ-MB-5001", brand: "BabyCare+",
    short: "Gentle, fast ear thermometer designed for infants.",
    description: "Fast and gentle ear thermometer designed specifically for babies and toddlers. Soft probe tip and one-second reading make temperature checks stress-free for little ones.",
    features: ["1-second reading","Soft, gentle probe tip","Fever alarm indicator","Memory recall for last reading"],
    badge: null
  },
  {
    id: "p402", name: "Nursing & Feeding Starter Set", category: "mother-baby",
    image: "https://images.pexels.com/photos/5593124/pexels-photo-5593124.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 3400, oldPrice: 3900, rx: false, rating: 4.7, reviews: 41, stock: 18,
    sku: "TZ-MB-5002", brand: "BabyCare+",
    short: "BPA-free bottles, teats, and steriliser-safe storage set.",
    description: "A complete BPA-free feeding starter set including bottles, anti-colic teats, and steriliser-safe storage containers, designed to make the first months of feeding easier.",
    features: ["100% BPA-free materials","Anti-colic teat design","Steriliser & microwave safe","Includes travel case"],
    badge: "sale"
  },
  {
    id: "p501", name: "First Aid Kit — Home & Travel (120pcs)", category: "first-aid",
    image: "https://images.pexels.com/photos/5149757/pexels-photo-5149757.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1800, oldPrice: null, rx: false, rating: 4.8, reviews: 143, stock: 40,
    sku: "TZ-FA-6001", brand: "SafeGuard",
    short: "Comprehensive 120-piece kit for home, car, or travel.",
    description: "A comprehensive 120-piece first aid kit covering wound care, burns, sprains, and minor emergencies. Compact, water-resistant case makes it ideal for home, car, or travel.",
    features: ["120 assorted first-aid items","Water-resistant carry case","Includes bandages, antiseptic wipes & more","Compact size for car or bag"],
    badge: "new"
  },
  {
    id: "p502", name: "Elastic Adhesive Bandage Roll (Pack of 5)", category: "first-aid",
    image: "https://placehold.co/600x600/fdeeee/a02020?text=Elastic+Bandage+Roll",
    price: 400, oldPrice: null, rx: false, rating: 4.5, reviews: 58, stock: 200,
    sku: "TZ-FA-6002", brand: "SafeGuard",
    short: "Flexible, breathable support wrap for sprains and strains.",
    description: "Flexible elastic adhesive bandages that stretch and conform for secure, breathable support of sprains, strains, and minor injuries. Pack of 5 rolls, 7.5cm x 4.5m each.",
    features: ["Self-adhesive & breathable","7.5cm x 4.5m per roll","Pack of 5 rolls","Tears easily by hand"],
    badge: null
  },
];

/* Helpers shared across pages */
const TZ = {
  money(n){ return "KSh " + Number(n).toLocaleString("en-KE"); },
  getProduct(id){ return TZ_PRODUCTS.find(p => p.id === id); },
  getCategory(id){ return TZ_CATEGORIES.find(c => c.id === id); },
  stockLabel(stock){
    if(stock <= 0) return {cls:"out", text:"Out of stock"};
    if(stock <= 10) return {cls:"low", text:`Only ${stock} left`};
    return {cls:"in", text:"In stock"};
  },
  stars(rating){
    const full = Math.round(rating);
    return "★".repeat(full) + "☆".repeat(5-full);
  }
};