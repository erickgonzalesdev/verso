# Verso

A static **webzine starter** — the lighter twin to RECTO.

| Layer | Source |
| --- | --- |
| Base | [concrete.css](https://github.com/louismerlin/concrete.css) (classless, ~3 kB, auto dark mode) |
| Titles | Neon Genesis Evangelion title cards (stacked series, `EPISODE:n`, flush-right name) |
| Chrome | [Hermes](https://hermes-agent.nousresearch.com/) structure — centered mark, mono eyebrows, monumental display on pure black |

No build step. Semantic HTML + two stylesheets.

## Quick start

```bash
cd verso
npm run dev
# open http://localhost:4173
```

Or open `index.html` directly, or point any static server at this folder.

## Layout

```
verso/
├── index.html              # issue home + title card + feed
├── about.html              # colophon / design notes
├── articles/
│   └── angel-attack.html   # sample piece with Eva card
├── css/
│   ├── concrete.min.css    # vendored concrete 3.1
│   └── theme.css           # title cards, feed, type, black field
└── package.json
```

## Title card pattern

```html
<header class="title-card">
  <p class="title-card__series">
    <span>Neon</span>
    <span>Genesis</span>
    <span>Evangelion</span>
  </p>
  <div class="title-card__meta">
    <p class="title-card__episode">Episode&nbsp;: 1</p>
    <p class="title-card__title">Angel Attack</p>
  </div>
</header>
```

Body copy needs almost no classes — concrete styles `main`, `section`, `p`, etc.
For imagery: **plate rhythm** — every image is a `section.passage` that cycles
inset → float right → float left (see sample article and `AGENTS.md`).

## Colour

One field: `#000` background, `#f5f5f5` type. No blue, no gray bands. OS light/dark
is overridden so the page stays black. Tokens live at the top of `css/theme.css`.

## Design rules (easy to break)

1. **Keep concrete classless for prose.** Theme classes are for cards, feed, and chrome only.
2. **One measure.** Don’t widen the reading column without a reason; title cards already go full-bleed.
3. **Type (trial).** Geist Sans sitewide (local variable font); hierarchy by weight. Revert via git if needed.
4. **Articles are poster fields.** Frame, corner marks, top/footer rails, hairline breaks; one reading measure; freeform `.plate__stage` for cutout PNGs.
4. **Stay monochrome.** Hover is underline or invert; don’t reintroduce a brand blue unless the issue asks for it.

See `AGENTS.md` for full agent/context notes.

## Relationship to RECTO

| | RECTO | Verso |
| --- | --- | --- |
| Stack | Astro 7, tokens, MDX | Static HTML |
| Grid | 12-col, baseline | concrete measure (~640px) |
| Settings | `canonical` / `plate` | title card + article body |
| Images | staged slots, Img.astro | ordinary `<img>` / `<figure>` |

Use RECTO when you want a full editorial system. Use Verso when you want a zine you can ship from a folder.
