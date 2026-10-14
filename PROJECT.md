# Project Memory

## Objective

Build and privately publish a single-page luxury real-estate website for **OneArc Residence**. The page should feel editorial, spacious, image-led, and fluid rather than like a generic template.

## Technical baseline

- Sites portable Vinext starter with App Router semantics
- TypeScript and Tailwind CSS
- GSAP + ScrollTrigger for reveals, parallax, counters, pinned media, and stacking cards
- Lenis for smooth scrolling
- No UI component library in the page implementation

## Visual system

- Warm off-white page: `#F5F5F5`
- White surfaces, black ink, soft gray copy, restrained gold `#B79B6F`
- Satoshi-first typography with tight display tracking
- 1300px content container, 20px desktop and 16px mobile gutters
- No drop shadows; depth comes from contrast, borders, imagery, and motion
- Rounded media, pill controls, fine hairline dividers

## Content flow

Header → Hero → Why choose this property → Pill marquee → Stacking room cards → Property overview → Neighbourhood → Floor planning → Contact → Fun facts → Reviews → Dark CTA/footer.

## Acceptance criteria

- All supplied sections and core copy are present.
- Layout is responsive from 1440px through 375px.
- Header, mobile menu, feature switcher, floor-plan tabs, carousel, form controls, and CTA links are keyboard accessible.
- Motion includes text reveals, image reveals, hero parallax, pinned overview, stacking rooms, pill movement, counters, and dark-section transition.
- `prefers-reduced-motion` disables smooth scrolling, pins, and scrubbed motion.
- Initial content is readable before client animation initializes.
- Production build passes and the private Sites deployment reaches a successful terminal state.

## Deliberate constraints

- The contact form is presentation-only; no lead-storage backend was requested.
- The current Sites-supported Vinext/Next runtime is retained instead of forcing an older Next 14 package.
- Map and floor plans are code-native illustrations; property photography is generated for a cohesive art direction.

