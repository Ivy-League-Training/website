# Ivy League Training & Sales — Website

## File Structure

```
ivy-league-training/
├── index.html          ← Homepage
├── services.html       ← Services / Training Programs page
├── about.html          ← About Us page
├── contact.html        ← Contact & Quote Request page
├── _headers            ← Cloudflare Pages security & cache headers
├── _redirects          ← Cloudflare Pages redirect rules
├── css/
│   └── style.css       ← All styles (CSS variables, responsive, components)
├── js/
│   └── main.js         ← Mobile nav, scroll animations, counter, form
├── images/
│   ├── logo.svg        ← Logo (color, for light backgrounds)
│   └── logo-white.svg  ← Logo (white text, for dark/navy backgrounds)
└── partials/
    ├── header.html     ← Header snippet (reference — not auto-included)
    └── footer.html     ← Footer snippet (reference — not auto-included)
```

## Deploying to Cloudflare Pages

1. Push this folder to a GitHub (or GitLab) repository
2. Log in to Cloudflare Dashboard → Pages → Create a project
3. Connect your GitHub repo
4. Build settings:
   - **Framework preset**: None
   - **Build command**: *(leave blank)*
   - **Build output directory**: `/` (root)
5. Click **Save and Deploy**

That's it — Cloudflare Pages will serve all .html, css, js, and image files automatically.

## Customizing

### Colors & Fonts
Edit CSS variables at the top of `css/style.css`:
```css
:root {
  --navy:       #0D2040;
  --gold:       #C8902A;
  /* etc. */
}
```

### Phone Number
Search & replace `775-462-2086` across all HTML files.

### Address
Search & replace `150 Highway 160, Suite 8-374` across all HTML files.

### Contact Form
The form on `contact.html` currently simulates submission. To wire it to a real backend:

**Option A — Cloudflare Worker**
Create a Worker that accepts POST requests and sends email via SendGrid or Mailgun.
Update the form `action` attribute or the JS fetch URL in `js/main.js`.

**Option B — Formspree (easiest)**
1. Sign up at formspree.io
2. Get your form endpoint URL
3. In `contact.html`, update the form tag:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
4. Remove the `e.preventDefault()` in `js/main.js` or let Formspree handle redirects.

### Logo
Replace `images/logo.svg` and `images/logo-white.svg` with the client's final logo files.
Keep the same filenames or update all `<img src="...">` references in the HTML files.

### Adding Pages
1. Copy an existing page (e.g., `about.html`) as a template
2. Update the `<title>`, `<meta name="description">`, and content
3. Update the active nav link: change `class="active"` to the correct `<a>` tag
4. Add a link to the new page in the `<nav>` of all other pages

## Notes
- All pages are self-contained HTML (header + footer inlined for Cloudflare static hosting)
- The `partials/` folder contains standalone header/footer snippets for reference, or for use with a build tool like Eleventy or Astro if you later want templating
- Mobile-responsive at 480px, 768px, and 960px breakpoints
