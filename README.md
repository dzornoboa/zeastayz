# ZeaStayz website redesign

A responsive Airbnb-inspired **ZeaStayz** frontend for showcasing handpicked stays in Ghana.

## Run locally

Open `index.html` in a browser or serve it with any static web server. No build step or dependencies are required.

## Included

- Responsive sticky header, menu and search
- Location and guest filtering, check-in/check-out validation
- Accommodation type filters, horizontally scrollable listings, favourites
- Listing enquiry form via `mailto:info@zeahomes.com`
- Popular neighbourhoods, About, Concierge, footer and contact details

## Important limitations

This is a static frontend proof of concept. It does **not** support live inventory, booking, payment, user registration or saved favourites across devices.

Property names, locations, and indicative nightly rates were sourced from the current ZeaStayz website (https://zeastayz.com/) on 6 November 2026. Some property descriptions (bedrooms/guest limits) need confirmation. Images are **illustrative Unsplash placeholders**, not official property photography. Do not present them as photos of the actual listed homes. Replace each `img` ID in the `stays` array with approved ZeaStayz photos and replace root-domain listing links with exact property URLs before production launch.

## Next steps

1. Connect an approved property-data source (CMS/database) and real photographs.
2. Implement genuine listing detail pages and inventory-based date availability.
3. Implement authentication and role-based host/admin access.
4. Integrate secure payments only after booking flow and price validation are in place.
5. Test mobile layouts, image loading, forms and accessibility before publishing.

This redesign is not affiliated with Airbnb.
