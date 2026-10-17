# VELORA | Online Fashion Store

VELORA is a responsive static fashion storefront demo built with semantic HTML, CSS, and vanilla JavaScript.

## Pages
- `index.html` — Home, featured collections, new arrivals and promotional banner
- `men.html` — Men's product catalogue and category filters
- `women.html` — Women's product catalogue and category filters
- `offers.html` — Demonstration promotions, promo codes and discounted items
- `contact.html` — Contact form demo, support details, business hours, social links and FAQs

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser. No build step or package installation is required.
3. For a local web server (recommended), open a terminal in the project folder and run:
   - Python 3: `python -m http.server 8000`
   - Then visit `http://localhost:8000`

## Features
- Refined editorial layouts, image hover effects, premium product cards and responsive spacing
- Accessible mobile navigation that closes on selection or Escape
- Responsive navigation for mobile, tablet and desktop
- Shared styles and JavaScript
- Product cards with INR prices, optional original prices and badges
- Category filters on catalogue pages
- Demo shopping-bag counter stored in browser local storage
- Accessible form labels, semantic landmarks, focus styles and reduced-motion support
- Original local SVG fashion illustrations in `assets/images/`, so the site imagery works offline

## Important demo notes
This is a static front-end demonstration. The bag counter is not a real cart or checkout system. The contact form validates inputs in the browser but does not send messages. Offer codes, product prices, business hours, phone number and email are illustrative and are not connected to a real business. Google Fonts are optional and require internet access; system fallbacks are provided.

## Project structure
```text
VELORA/
├── index.html
├── men.html
├── women.html
├── offers.html
├── contact.html
├── README.md
└── assets/
    ├── css/style.css
    ├── js/script.js
    └── images/*.svg
```


### Product photography
The storefront uses direct Unsplash image URLs for fashion photography, so an internet connection is required for the photographs. If a remote image cannot load, the bundled local SVG illustration is used as a fallback so the image area is not blank.


## Prompt 3 functionality
- Responsive navigation toggle with `aria-expanded`, Escape-key close and mobile link close behavior.
- Live product-name search and category filtering on Men and Women pages, including All Categories and Clear filters.
- Shopping bag persisted as structured product objects in `localStorage` (`velora-cart`), with quantities, removal and subtotal/total calculations.
- Sample coupon demonstrations on Offers: `VELORA10` gives 10% off a subtotal of ₹1,000 or more; `STYLE20` gives 20% off a subtotal of ₹3,000 or more. One code is active per calculation; no checkout/payment is connected.
- Client-side contact form validation and clear demo-only feedback. No message is sent or stored.
- Scroll-reveal animations use IntersectionObserver when available and respect reduced-motion preferences.


## Final refinement notes
- Five separate static pages share the same navigation, typography, palette and responsive styling.
- The active navigation page is identified with `aria-current="page"`.
- Keyboard focus is visibly indicated for links, buttons and form controls.
- The mobile product grid adapts down to narrow 360px screens.
- The shopping bag is a browser-only demo stored in localStorage. Coupon calculations are sample promotions only.
- Contact form submission performs client-side validation only; it does not send email or store a server-side message.

## Run locally
From this folder, run `python -m http.server 8000`, then open `http://localhost:8000`.
To rebuild the final ZIP, run `python make_zip.py` from this folder.
