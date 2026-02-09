# Bento Box Grid Design Reference

Comprehensive reference for implementing bento box layouts in dark-themed SaaS landing pages. Covers CSS Grid techniques, color strategy, hover/animation patterns, responsive breakpoints, and common pitfalls.

## Core Concept

A bento box layout arranges content into a grid of asymmetrically-sized cards — like a Japanese bento meal. Unlike uniform grids (blog cards, pricing columns), bento grids use varying `grid-column` and `grid-row` spans to create visual hierarchy. The largest card draws attention first; smaller cards fill supporting roles.

**Key references:** Apple product pages, Linear.app, Vercel dashboard, Stripe feature grids, Aceternity UI components.

---

## CSS Grid Fundamentals

### Base Grid Setup

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* 4 equal columns */
  gap: 16px;                                /* or 0px for flush */
}
```

### Spanning Cards

```css
.card-hero    { grid-column: span 2; grid-row: span 2; }  /* 2×2 large */
.card-wide    { grid-column: span 2; }                      /* 2×1 horizontal */
.card-tall    { grid-row: span 2; }                          /* 1×2 vertical */
.card-default { /* 1×1 — no span needed */ }
```

### Named Grid Areas (Alternative)

```css
.bento-grid {
  grid-template-areas:
    "hero hero   study study"
    "hero hero   voice deep"
    "ask  ask    persona persona"
    "imp1 imp2   imp3 imp4";
}
.card-hero    { grid-area: hero; }
.card-study   { grid-area: study; }
```

Named areas are more readable but less flexible. Prefer `span` for responsive layouts.

### Auto-placement with `grid-auto-flow: dense`

```css
.bento-grid {
  grid-auto-flow: dense;  /* Fills gaps automatically */
}
```

Use `dense` when you want the browser to backfill empty cells. Careful: it reorders visual display vs. DOM order, which can affect accessibility.

---

## Color Strategy (Dark Theme)

### Layer System

| Layer | Color | Usage |
|-------|-------|-------|
| Page background | `#0B0B14` | Body/main bg |
| Card background | `#13131F` | Card surfaces |
| Card hover | `#1a1a28` | Subtle lift on interaction |
| Border | `rgba(255,255,255,0.05)` | Hairline separators |
| Border hover | `rgba(255,255,255,0.10)` | Visible on interaction |
| Primary accent | `#8b5cf6` (purple-500) | CTAs, icons, active states |
| Text primary | `#ffffff` | Headings |
| Text secondary | `#9ca3af` (gray-400) | Body text |

### Gradient Backgrounds (Per Card)

```css
/* Subtle diagonal gradient — adds depth without distraction */
.card-gradient-purple {
  background: linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(19,19,31,1) 60%);
}
.card-gradient-blue {
  background: linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(19,19,31,1) 60%);
}
```

Keep gradient opacity under 0.10 — cards shouldn't compete with content.

---

## Hover Effects

### 1. Lift + Shadow (Flush Grid / Standard)

```css
.bento-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.bento-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.32);
}
```

### 2. Glow Border (Frosted Glass)

```css
.bento-card {
  border: 1px solid rgba(255,255,255,0.05);
  transition: border-color 0.3s ease, transform 0.3s ease;
}
.bento-card:hover {
  border-color: rgba(139,92,246,0.4);
  transform: scale(1.01);
  box-shadow: 0 0 20px rgba(139,92,246,0.15);
}
```

### 3. Inner Shadow Shift (Neumorphic)

```css
.bento-card {
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.06),
    inset 0 -1px 0 rgba(0,0,0,0.3);
  transition: box-shadow 0.3s ease;
}
.bento-card:hover {
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.08),
    inset 0 -2px 0 rgba(0,0,0,0.5),
    0 4px 16px rgba(0,0,0,0.2);
}
```

### 4. Tilt Toward Cursor (Gradient Cards)

```js
// JS required — track mouse position relative to card center
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
});
card.addEventListener('mouseleave', () => {
  card.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
});
```

### 5. Text Accent Shift (Minimal Editorial)

```css
.bento-card h3 {
  transition: color 0.3s ease;
}
.bento-card:hover h3 {
  color: #8b5cf6;
}
.bento-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #8b5cf6;
  transition: width 0.4s ease;
}
.bento-card:hover::after {
  width: 100%;
}
```

---

## Animation Patterns

### Staggered Entry (Intersection Observer)

```css
.bento-card {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.bento-card.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.bento-card').forEach(card => observer.observe(card));
```

### Backdrop Blur (Frosted Glass)

```css
.bento-card {
  background: rgba(19,19,31,0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);  /* Safari */
}
```

**Pitfall:** `backdrop-filter` is GPU-intensive. Limit to ~12 cards max. On mobile, consider disabling or reducing blur radius.

---

## Responsive Breakpoints

### Standard Approach

```css
.bento-grid {
  display: grid;
  gap: 16px;
}

/* Mobile: single column stack */
@media (max-width: 639px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
  .bento-card { grid-column: span 1 !important; grid-row: span 1 !important; }
}

/* Tablet: 2 columns */
@media (min-width: 640px) and (max-width: 1023px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  /* Hero still spans 2 cols on tablet */
  .card-hero { grid-column: span 2; grid-row: span 1; }
  /* Everything else: 1 col */
  .card-wide { grid-column: span 2; }
}

/* Desktop: full 4-col grid */
@media (min-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Tailwind Classes

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <div class="col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2">Hero</div>
  <div class="col-span-1 sm:col-span-2 lg:col-span-2">Wide card</div>
  <div class="col-span-1 lg:row-span-2">Tall card</div>
  <div class="col-span-1">Standard card</div>
</div>
```

---

## Content Strategy Per Card Size

| Card Size | Best For | Content Guidelines |
|-----------|----------|--------------------|
| 2×2 (Hero) | Primary CTA, hero message | Large heading, subtext, 1-2 buttons. Keep text minimal — this is the eye-catcher. |
| 2×1 (Wide) | Feature with screenshot | Heading + 1-2 sentences left, image right. Or full-width image with overlay text. |
| 1×2 (Tall) | Vertical screenshot, list | Works for Discord voice screenshots, feature lists. |
| 1×1 (Square) | Impact stat, icon feature | Icon + title + one sentence. No paragraphs. |

---

## Common Pitfalls

1. **Unequal card heights cause gaps.** Always set explicit `grid-row: span N` — don't rely on content height. Use `min-height` as fallback.

2. **Images break grid proportions.** Use `object-fit: cover` and constrain with `max-height`. Never let an image dictate card height.

3. **Too many spans = broken grid.** If total spans per row exceed column count, items wrap unpredictably. Plan your grid on paper first.

4. **Mobile: reset ALL spans.** A `span 2` card in a 1-column grid overflows. Always reset to `span 1` at mobile breakpoint.

5. **`backdrop-filter` performance.** GPU-heavy on low-end devices. Test on mobile. Consider `@media (prefers-reduced-motion)` fallback.

6. **Contrast in gradient cards.** Ensure WCAG AA contrast (4.5:1) for body text over any gradient color. Test with a contrast checker.

7. **Card content overflow.** Long text in a `1×1` card overflows. Use `overflow: hidden` + `text-overflow: ellipsis` or clamp lines.

8. **Focus states.** Hover-only effects exclude keyboard users. Add `:focus-visible` styles that match or approximate hover states.

---

## Implementation Checklist

- [ ] Define grid columns (3-col or 4-col)
- [ ] Assign span values to each content block
- [ ] Set responsive breakpoints (mobile 1-col, tablet 2-col, desktop full)
- [ ] Choose card style (flush/rounded/frosted/gradient/minimal)
- [ ] Implement hover effects with CSS transitions
- [ ] Add staggered entry animation (optional)
- [ ] Test card content overflow at all breakpoints
- [ ] Verify image aspect ratios don't break grid
- [ ] Check WCAG contrast on all text
- [ ] Performance test backdrop-filter if used
