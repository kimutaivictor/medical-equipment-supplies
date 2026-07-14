# TopZen Healthcare Limited — Backend

A FastAPI + SQLite backend for the TopZen Healthcare online pharmacy frontend.
It mirrors the frontend's data and checkout logic exactly (same products,
categories, delivery-fee rules, and order fields as `js/data.js` and
`checkout.html`), so the two are drop-in compatible.

## Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

- API base: `http://localhost:8000`
- Interactive docs (Swagger UI): `http://localhost:8000/docs`
- The SQLite database file (`topzen.db`) is created automatically next to
  this README on first run, and seeded with the same 18 products / 6
  categories already in the frontend's `js/data.js`.

## Connecting the frontend

The frontend already points at `http://localhost:8000` by default
(`js/api.js`). To use a different backend URL, set it before the other
scripts load, e.g. in each HTML page's `<head>`:

```html
<script>window.TZ_API_BASE = "https://api.yourdomain.com";</script>
```

If the backend isn't running, the frontend automatically falls back to its
built-in demo data and demo checkout/contact flow — nothing breaks.

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/categories` | List all categories |
| GET | `/api/products` | List products. Query params: `cat`, `q`, `sort` (`price-asc`\|`price-desc`\|`rating`\|`name`) |
| GET | `/api/products/{id}` | Get a single product |
| POST | `/api/orders` | Place an order (validates stock, computes totals, decrements stock) |
| GET | `/api/orders/{order_no}` | Look up an order by its order number |
| POST | `/api/contact` | Submit a contact-form message |
| POST | `/api/payments/mpesa/stkpush` | Simulated M-Pesa STK push (see note below) |
| GET | `/api/health` | Health check |

### Example: place an order

```bash
curl -X POST http://localhost:8000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Jane Wanjiru",
    "phone": "+254712345678",
    "email": "jane@example.com",
    "address": "123 Kilimani Rd",
    "city": "Nairobi",
    "area": "Kilimani",
    "payment_method": "mpesa",
    "mpesa_phone": "0712345678",
    "items": [{"product_id": "p001", "qty": 1}]
  }'
```

## Business rules mirrored from the frontend

- **Delivery fee**: KSh 300, free on subtotal ≥ KSh 3,000 (`checkout.html`'s
  `DELIVERY_FEE` / `FREE_DELIVERY_THRESHOLD`).
- **Order numbers**: `TZ` + 6 random digits, guaranteed unique.
- **Prescription (Rx) flag**: `needs_rx` on an order is computed server-side
  from whether any line item is a prescription product — never trusted from
  the client.
- **Stock**: validated and decremented atomically when an order is placed;
  orders are rejected if requested quantity exceeds available stock.

## About the M-Pesa integration

`/api/payments/mpesa/stkpush` is a **simulation** — there are no live
Safaricom Daraja credentials configured, so it doesn't move real money. It
mimics the shape of a real STK push response so the frontend has something
real to call. To go live:

1. Register an app at https://developer.safaricom.co.ke and get a Consumer
   Key/Secret, Shortcode, and Passkey.
2. Replace the body of `initiate_stk_push` in `app/routers/payments.py` with
   a real POST to Safaricom's `/mpesa/stkpush/v1/processrequest` endpoint.
3. Add a callback route to receive Safaricom's async payment confirmation
   and update `Order.payment_status` accordingly (currently set optimistically).

## Project structure

```
backend/
├── app/
│   ├── main.py          FastAPI app, CORS, startup DB seeding
│   ├── database.py      SQLAlchemy engine/session (SQLite)
│   ├── models.py        ORM models (Category, Product, Order, OrderItem, ContactMessage)
│   ├── schemas.py       Pydantic request/response schemas
│   ├── seed_data.py     Categories & products, transcribed from js/data.js
│   └── routers/
│       ├── categories.py
│       ├── products.py
│       ├── orders.py
│       ├── contact.py
│       └── payments.py  Simulated M-Pesa STK push
├── requirements.txt
└── topzen.db             (created on first run)
```

## Notes / next steps

- CORS is wide open (`allow_origins=["*"]`) for local development. Restrict
  it to your real domain(s) before deploying.
- There's no auth layer yet (admin endpoints, order status updates, etc.
  are all open). Add an auth dependency before exposing this publicly.
- Order emails/SMS aren't sent — wire up an email provider (e.g. SES,
  SendGrid) or SMS gateway (e.g. Africa's Talking) in `orders.py` if needed.
