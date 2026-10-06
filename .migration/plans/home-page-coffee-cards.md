# Plan: Coffee example cards on the Home page

## Goal
Add a new **"Know your coffee"** section to the Home page with cards for six classic drink styles. Each card has a photo, the drink name and a short note on how it's made, so visitors understand the drinks before ordering.

## Placement
The new section goes **right after "Signature drinks"** and before the light "Sourced directly. Roasted weekly." section:

1. Hero
2. Intro ("Roasted in small batches…")
3. Signature drinks (Flat White, Cold Brew, Pour-Over), unchanged
4. **Know your coffee (new)**
5. Sourced directly (light background)
6. Come say hello (dark)

## Card content
Heading: **Know your coffee**
Intro line: *"New to specialty coffee? Here's what's behind the names on our menu."*

| Drink | Description |
|---|---|
| Espresso | A short, concentrated shot pulled under pressure. The base of almost everything we make. |
| Americano | Espresso topped with hot water. Long and clean like a filter coffee, with espresso's depth. |
| Cappuccino | Equal parts espresso, steamed milk and thick foam. Light, airy and balanced. |
| Latte | Espresso with plenty of steamed milk and a thin layer of foam. Mellow and creamy. |
| Cortado | Espresso cut with an equal amount of warm milk. Small, smooth and strong. |
| Mocha | Espresso, dark chocolate and steamed milk. Dessert in a cup. |

The cards don't repeat the Flat White, Cold Brew or Pour-Over from Signature drinks. Prices stay on the Menu page.

## Design
- Uses the existing **Cards** block, so authors edit it the same way as Signature drinks.
- On desktop the six cards form a grid of 3 across and 2 down. On phones they stack.
- Same look as the rest of the site: serif drink names, muted descriptions and rounded photos that zoom slightly on hover.
- No code changes are planned. If six tall photos make the section feel too long, I'll add a small square-image version of the cards block for this section only.

## Images
- Use free stock coffee photos that aren't already on the site. Check that each one loads.
- Look at every photo to make sure it shows the right drink, and write alt text that describes it accurately.

## Checklist
- [ ] Choose six unused stock photos, one per drink, and confirm each loads and matches its drink
- [ ] Add the "Know your coffee" section with six cards to the Home page source, after "Signature drinks"
- [ ] Re-run the content import for the Home page only
- [ ] Check in the preview that the section shows six cards with images, names and descriptions in the right place
- [ ] Check the desktop layout (3 × 2 grid) and the phone layout (stacked) in the preview
- [ ] Decide whether the section is too tall; if so, add a square-image cards version and apply it to this section only
- [ ] Run the linters if any code changed
- [ ] Confirm the other Home page sections are unchanged and there are no errors in the preview

*Execution needs Execute mode; nothing will change until then.*
