# LAVNA Smart Safe Locker - Premium Landing Page

A premium, responsive, and interactive landing page built with clean, semantic HTML5, modular CSS3, and vanilla ES6 JavaScript. Designed for optimal conversion and page performance.

---
 
## 🚀 Live Demo
The project is configured for deployment on Vercel:
👉 **[assesment-gamma-nine.vercel.app](https://assesment-gamma-nine.vercel.app)**

---

## 🌟 Core Features

1. **Interactive Hero Carousel:** A smooth, auto-playing product banner slide rotation with swipe-dot indicators and pause-on-hover capabilities.
2. **Product Picker Configurator:** A dynamic card-based selector allowing customers to choose between different safe sizes (39L, 49L, 58L). It performs smooth opacity cross-fades to swap prices, titles, and image previews without page reloads.
3. **Smart Access Ways Display:** A clean, hover-responsive card grid detailing the 4 secure ways to unlock the safe, styled with subtle numeric background watermarks and custom glowing borders.
4. **Banners Showcase Section:** A simple, stacked list layout displaying feature details and safe construction highlight banners with micro-animations.
5. **Infinite Testimonial Auto-Slider:** A circular client review slider that advances cards leftward automatically, resetting coordinates seamlessly behind the scenes for endless looping.
6. **Pop-up Enquiry modal:** A modern popup overlay form triggered on call-to-actions, featuring side-by-side product showcases, Call/WhatsApp shortcuts, validation logic (10-digit phone filtering), and successful submission overlays.
7. **Premium Branded Footer:** A light-themed partitioned footer arranging credit card/digital payment icons (Visa, Mastercard CSS Circles, RuPay, Paytm, G Pay, PhonePe), columns quick-links, and customer hotlines.

---

## 🛠️ Tech Stack & Dependencies
* **Core:** HTML5, JavaScript (ES6+ Vanilla)
* **Styling:** CSS3 variables, Flexbox, CSS Grid layouts
* **Fonts:** Outfit & Plus Jakarta Sans (loaded via Google Fonts)
* **Icons:** FontAwesome (SVG/Vector library)
* **Deployment:** Vercel (configured for static deployment)

---

## 📁 Directory Structure
```
assesment/
├── image/                  # Renamed asset directory (bypasses Vercel overrides)
│   ├── logo.png            # Main header corporate logo
│   ├── fav.png             # Browser tab shortcut favicon
│   ├── hero-banner.png     # Slide 1 banner safe showcase image
│   ├── safe-39l.png        # Product configurator assets
│   ├── user-1.png          # Testimonial user avatar photos
│   └── ...
├── css/                    # Modular, separated stylesheets
│   ├── base.css            # Standard themes, resets, header/footer styles
│   ├── hero.css            # Carousel slide overlay keyframes
│   ├── picker.css          # Product card selectors
│   ├── access.css          # Access cards grid watermarks
│   ├── banners.css         # Stacked image list sizing
│   ├── testimonials.css    # Track animations and avatars
│   ├── enquiry.css         # Pop-up modal, form inputs, validation error colors
│   └── responsive.css      # Viewport media queries (collapses, stacking layout orders)
├── index.html              # Main webpage structure
├── script.js               # Interactive components logic and form validator
├── style.css               # Orchestrator stylesheet importing CSS files
└── README.md               # Documentation guide
```

---

## ⚙️ Vercel Deployment Settings
To deploy this project successfully on Vercel without receiving a `404: NOT_FOUND` error, verify the following configuration in your **Vercel Project Dashboard**:

1. Go to **Settings** -> **General**.
2. Set the **Framework Preset** to **Other**.
3. In the **Build & Development Settings** panel:
   * **TURN OFF** all blue **Override** toggle switches.
   * This ensures Vercel serves files directly from the root folder (where `index.html` sits) instead of trying to look for a framework folder or building the `public` directory.
4. Save and trigger a **Redeploy**.

---

## 💻 Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Manjeetmathur/assesment.git
   cd assesment
   ```

2. **Open index.html:**
   Double click the `index.html` file in your directory to open it in any browser, or run a simple local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (npx)
   npx serve .
   ```
   Load `http://localhost:8000` in your web browser.
