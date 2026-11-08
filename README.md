# Bruce Repei — Artist Website

A gallery website for Canadian painter Bruce Repei, built with [Astro](https://astro.build). It outputs a fully static site (plain HTML, CSS and optimized images) that can be hosted for free on Netlify, Cloudflare Pages, Vercel or GitHub Pages.

## Run it locally

```sh
npm install
npm run dev       # http://localhost:4321, reloads on save
npm run build     # outputs the finished site to dist/
npm run preview   # serves dist/ to check the production build
```

## Before launch

Open `src/config.ts` and fill in:

| Setting        | What it does                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| `email`        | Bruce's email. Shown on the contact page and footer; used as the form fallback.                       |
| `formEndpoint` | Contact form destination. Create a free form at [formspree.io](https://formspree.io), paste its URL. |
| `heroWork`     | The painting shown large on the home page.                                                           |
| `selectedWorks`| The 8 paintings in "From the studio" on the home page.                                               |

The domain (`brucerepei.ca`) is set in `src/config.ts` (`url`), `astro.config.mjs` (`site`), `public/robots.txt` and `public/CNAME`. Change all four if it ever moves.

Until `formEndpoint` is set, the contact form opens the visitor's email app addressed to `email`.

## Deployment

The site is hosted on **GitHub Pages**. Every push to `main` builds and publishes it automatically via `.github/workflows/deploy.yml` (watch progress in the repo's **Actions** tab). Live in about a minute.

### Pointing brucerepei.ca at GitHub Pages (GoDaddy DNS)

In GoDaddy: **My Products → brucerepei.ca → DNS**. Remove any existing `A` record for `@` (GoDaddy's "Parked" record) and any domain forwarding, then add:

| Type  | Name  | Value                 |
| ----- | ----- | --------------------- |
| A     | @     | 185.199.108.153       |
| A     | @     | 185.199.109.153       |
| A     | @     | 185.199.110.153       |
| A     | @     | 185.199.111.153       |
| AAAA  | @     | 2606:50c0:8000::153   |
| AAAA  | @     | 2606:50c0:8001::153   |
| AAAA  | @     | 2606:50c0:8002::153   |
| AAAA  | @     | 2606:50c0:8003::153   |
| CNAME | www   | cdimat.github.io      |

DNS can take from a few minutes to a few hours. Once GitHub sees it (repo **Settings → Pages** shows a green check), tick **Enforce HTTPS**.

### After it's live (SEO)

1. Add the site to [Google Search Console](https://search.google.com/search-console) as a **Domain** property (verify with a TXT record in GoDaddy DNS) and submit `https://brucerepei.ca/sitemap-index.xml`.
2. Do the same in [Bing Webmaster Tools](https://www.bing.com/webmasters) (it can import from Search Console).
3. Link to `https://brucerepei.ca` from Bruce's Fine Art America profile, social accounts and any gallery or class listings. Inbound links are the biggest ranking factor a small site controls.
4. Consider a free [Google Business Profile](https://www.google.com/business/) for the Hamilton studio and classes, so he appears in local "Hamilton artist" / "painting classes Hamilton" searches.

## Adding a painting

1. Save the image as `src/assets/works/<slug>.jpg`, where the slug is lowercase with hyphens (e.g. `harbour-at-dusk.jpg`). Use a large, high-quality photo; the site generates every smaller size and modern format (AVIF/WebP) automatically.
2. Add an entry to `src/data/works.json`:

   ```json
   {
     "slug": "harbour-at-dusk",
     "title": "Harbour at Dusk",
     "medium": "Oil on canvas",
     "description": "Optional notes about the painting, in Bruce's words.",
     "faaUrl": "https://fineartamerica.com/featured/harbour-at-dusk-bruce-repei.html"
   }
   ```

   `faaUrl` is optional; without it the "Buy prints" button is hidden. An optional `"year": 2024` shows a Year row.

3. To place it in a collection, add the slug to that collection's `works` list in `src/data/collections.json`. The order of that list is the order on the page. Works in no collection still appear under **Work**.

## Adding or editing a collection

Each entry in `src/data/collections.json` has a `slug` (used in the URL), `name`, `description`, a `cover` (the slug of the painting used as its thumbnail) and the ordered `works` list. Collections appear in the order they're listed.

## Project layout

```
src/
  config.ts              site-wide settings (email, form, home page picks)
  data/works.json        every painting
  data/collections.json  collections and their order
  assets/works/          painting images (file name = slug)
  pages/                 one file per page; work/[slug] and collections/[slug] generate a page per item
  components/            header, footer, gallery grid, collection cards
  styles/global.css      colours, fonts and shared styles
```

## Notes

- The current images came from Bruce's Fine Art America profile. They're 900px wide and carry a small FAA watermark; replacing them with original photographs (same file names) will noticeably improve quality.
- The accent colour is a deep "British racing" green, Bruce's favourite colour per his note on *The Music Box*. Change `--green` in `src/styles/global.css` to adjust it.
