# Bleen — Galaxy Health Care Website

A professionally designed React + Tailwind CSS website for Bleen pharmaceutical company.

## Tech Stack
- React 18
- React Router DOM 6
- Tailwind CSS 3
- Lucide React Icons
- Google Fonts (Outfit + Playfair Display)

## Brand Colors
- Primary Teal: `#2eb4b4`
- Primary Navy: `#174f9a`
- Gradient: `linear-gradient(to right, #2eb4b4, #174f9a)`

## Pages
1. **Home** — Hero carousel, stats, featured products, why choose us, network coverage
2. **Company** — About, milestones timeline, why us, Banyan Tree innovation model
3. **Products** — Searchable catalog with 6 divisions, 500+ products
4. **Responsibility** — 11 core responsibilities, supply chain flow
5. **Blog** — Health & wellness articles and tips
6. **Careers** — Job listings with apply functionality
7. **Contact** — Contact form with partnership info

## Setup & Run

```bash
npm install
npm start
```

## Build for Production
```bash
npm run build
```

## Project Structure
```
src/
  components/
    Navbar.jsx      — Sticky nav with dropdown menus
    Footer.jsx      — Footer with CTA band
  pages/
    Home.jsx
    Company.jsx
    Products.jsx
    Responsibility.jsx
    Blog.jsx
    Careers.jsx
    Contact.jsx
  index.css         — Tailwind + custom animations
  App.jsx           — Router setup
  index.js          — Entry point
```
