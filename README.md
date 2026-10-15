# Avenova Global Platform v1

A multi-page responsive website foundation for Avenova Global Organisation.

## Pages and assets
- `index.html` — main organisation website
- `services.html` — service pathways, deliverables, and delivery boundaries
- `styles.css` — shared responsive design system
- `script.js` — mobile navigation, reduced-motion-aware reveal effects, year update, enquiry validation
- `assets/favicon.svg` — vector favicon

## Important limitations
- Avenova is described as an independent initiative and **not yet legally registered**.
- No clients, testimonials, or completed case studies are invented.
- The enquiry form opens the visitor's email app using `mailto:`. It does not store submissions or send them to a server.
- No authentication, database, CMS, payment processing, or custom backend is included. These need separate requirements, architecture, security planning, and configuration.
- Google Fonts are optional; system font fallbacks are defined.
- Service scope exclusions are explicit. Do not promise work beyond an agreed written scope.

## Preview and free deployment
Open `index.html` in a browser for a quick preview. For free deployment, enable GitHub Pages in repository settings and select the intended branch and root directory. Verify the published URL on mobile and desktop before calling the site live.

## Pre-launch checklist
- [ ] Review public wording and contact details.
- [ ] Test mobile navigation with keyboard and touch.
- [ ] Test the enquiry form: it should open an email draft addressed to `avenovaglobal@gmail.com`.
- [ ] Verify mobile and desktop layouts, links, focus states, and browser console.
- [ ] Add a privacy notice if a future version collects personal data.
- [ ] Add real portfolio examples only after work exists and is approved for publication.

## Next phase: advanced platform
A client portal, stored enquiries, CRM, SaaS functionality, authentication, database, or analytics should be designed as a separate system. Define data ownership, access controls, retention, backups, monitoring, testing, and operating costs before implementation. Keep paid services disabled until the founder approves any cost.
