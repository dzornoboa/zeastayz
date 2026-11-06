# ZeaStayz — immersive accommodation website

A responsive, ZeaStayz-blue, Airbnb-inspired static website with property profiles and interactive photo tours.

## Pages
- `index.html` — homepage with discovery/search
- `stays.html` — searchable, filterable listings and saved properties
- `property.html?stay=<property-slug>` — full listing profile with actual ZeaStayz images, image gallery, amenities, indicative price, availability enquiry and photo walkthrough
- `concierge.html` — concierge
- `about.html` — company information
- `contact.html` — contact and email enquiry

## How to use

Open `index.html` from a local web server (for example, `python -m http.server 8000`) or deploy the repository root as a static site on Vercel (Framework preset: Other, no build step). All links use relative paths.

## Original media and data

`assets/properties.js` references verified ZeaStayz-owned photographs served from `zeastayz.com/wp-content/uploads`, along with property pages, representative descriptions, guest counts and listed nightly rates. **There is no Unsplash placeholder photography in the new pages.**

The pages link to the **original** listing for verification. Some original listing metadata is contradictory; review before production. Hotlinked original images require the existing WordPress site to remain online; mirror them into an approved asset store for long-term reliability.

## Motion and walkthrough

`assets/immersive.css` and `assets/site.js` implement:
- Scroll-triggered reveal effects (IntersectionObserver; respects reduced-motion preference).
- Smooth card and image interactions.
- Property photo walkthrough with mouse drag, pointer movement, keyboard arrows, mouse wheel, thumbnail selection and full-screen button.
- The walkthrough is a **simulated interactive photo sequence**. It is not 360-degree capture, a 3D model, spatial navigation, CGI or a video production. True room-to-room tours require properly captured 360 panoramas, 3D scans or a commissioned video.

## Booking and account limitations

This is a prototype frontend. The calendar collects enquiry dates; it does not check live inventory. Booking requests and contact forms use `mailto:` links, not a booking engine. Prices are indicative and fees may differ; no customer payment is taken. The saved properties feature uses localStorage on that browser only.

Before enabling production reservations: connect real inventory and a secure booking API, validate final price server-side, add user accounts if required, define payment confirmation, cancellation policy and privacy requirements.

## Deployment

Project repository: `dzornoboa/zeastayz`. The intended Vercel project is `zeastayz`; deployment status must be verified in the Vercel dashboard before announcing the pages as live.


## Enhanced 3D-depth property photo tour (November 2026)

Visit `tour.html?stay=santa-cruz-bungalow` or click **Start immersive 3D photo tour** at the top of any listing profile. The full-screen tour uses CSS perspective, translated image planes, pointer-controlled camera yaw/pitch, wheel/key navigation, thumbnail controls, fullscreen mode, and an optional guided auto-tour. The homepage intentionally keeps an Airbnb-inspired structure with horizontal rows of listing cards. This is a **3D animated presentation of existing 2D listing images**, not a 360-degree panorama, a real 3D capture, or authentic room-to-room navigation; those require additional source assets. Camera perspective and photo position are artistic, not architectural dimensions.
