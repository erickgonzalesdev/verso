# Verso — agent context

Static webzine starter. Sibling spirit to RECTO (Astro theme in a separate repo),
but deliberately lighter: no build, no components framework, classless HTML.

## Stack

- **Base:** [concrete.css](https://github.com/louismerlin/concrete.css) 3.1, vendored at `css/concrete.min.css`
- **Theme:** `css/theme.css` only — tokens, title cards, chrome, poster field, plate rhythm, motion CSS
- **Pages:** plain HTML (`index.html`, `about.html`, `articles/*.html`)
- **JS:** `js/motion.js` — optional Motion CDN fallback for panel scroll (no build)
- **Serve:** `npm run dev` → static server on port 4173 (no bundler)

## Motion (minimal)

Respects `prefers-reduced-motion: reduce` (no animation).

| Target | Trigger | Effect |
| --- | --- | --- |
| **`.title-card`** | Page load | Soft zoom + rise; series lines stagger; meta fades in after |
| **`.article-body`** | Scroll (scrubbed) | Zoom + rise into place via CSS `animation-timeline: view()` (`entry 0%` → `entry 55%`) |
| Fallback | Browsers without view timelines | `js/motion.js` uses Motion `scroll()` with the same transform range |

Do not add heavy page transitions or per-element animation libraries beyond this.

## Site structure

| Page | Open | Body panel |
| --- | --- | --- |
| **Home** | Full Eva title card (issue) | `main.article-body.article-body--sheet` = **contents leaf** |
| **About** | Compact title card | Same poster field (colophon) |
| **Article** | Full Eva title card (episode) | Same poster field (prose + plates) |

All three share frame, corner marks, top/footer rails, and hairline `<hr>` breaks.

### Homepage

1. Masthead → **issue title card** (do not restyle with article type tweaks)
2. Framed panel: rails + **`.feed` TOC** + footer rail
3. **`.article-body--sheet`** — min-height ≈ one page (`100dvh - 6rem` or ~A4 vs width); footer rail sticks to bottom of the leaf

### TOC (`.feed`) — normal zine contents

```
Title ····························· 01
  Quiet dek under the title
```

- **Title left** (display face, uppercase, impactful but list-sized)
- **Dotted leader**
- **Episode number right** (tabular mono — like a page number)
- **Dek** under, left, quiet body size
- Markup: `.feed__row` > `.feed__title` + `.feed__leader` + `.feed__ep`, then `.feed__dek`

## Design sources

| Layer | Inspiration | What we took |
| --- | --- | --- |
| Base | concrete.css | Measure ~640px, classless prose, semantic elements |
| Open titles | Neon Genesis Evangelion title cards | Stacked series mark, `EPISODE : n` left, title right, monumental type |
| Chrome | [Hermes Agent](https://hermes-agent.nousresearch.com/) | Centered wordmark nav, mono eyebrows, open feature blocks — **not** their blue |
| Body type | Sans prose | **Geist Sans** (sitewide type trial — all roles) |
| Article field | Editorial / print posters | Frame, corner marks, top/footer rails, hairline breaks — calm, one column |

## Colour

- **One field:** `#000` background, `#f5f5f5` type
- No brand blue, no gray bands between masthead / title card / body
- Override concrete’s light/dark OS scheme so the page stays black
- Tokens only at the top of `css/theme.css` (`--fg`, `--bg`, fonts, spacing, measure)

## Type

| Role | Face |
| --- | --- |
| Display (title cards, standfirst, heads, pulls, plate titles) | **Geist Sans** (`--font-display`, weight ~500) |
| Article body prose | **Geist Sans** (`--font-body`, weight 400) |
| Nav, kickers, bylines, rails, captions, code | **Geist Sans** (`--font-mono`, weight 500) |

**TYPE TRIAL:** entire site on local Geist Sans (`assets/fonts/geist/Geist-Variable.woff2` only, `@font-face` in `theme.css`). Hierarchy is weight only (`--weight-body` 400, `--weight-chrome` / `--weight-display` 500). No Google Fonts required while the trial is active.

## Title card pattern (episode open)

```html
<header class="title-card">
  <p class="title-card__series">
    <span>Line</span>
    <span>Two</span>
    <span>Three</span>
  </p>
  <div class="title-card__meta">
    <p class="title-card__episode">Episode&nbsp;: 1</p>
    <p class="title-card__title">Piece Title</p>
  </div>
</header>
```

- Full-width, same black as the page (transparent card on black body)
- Beat concrete’s `body > header { max-width; padding: 8rem }` when using a real `<header class="title-card">`
- Series mark stacks via `span { display: block }`
- Optional: `.title-card--compact` for short opens (about page)

## Layout shells

- `body.site` — unlocks full-width; chrome lives in `.shell` (wider max-width + gutters)
- `main.shell.article-body` — poster field + reading column
- Prose / heads / pulls / passages — constrained to `--measure` (~38rem)
- Masthead — Hermes-style three-column grid, mark centered
- **Open title card** — left/right Eva grammar; do **not** restyle it when tweaking article type

## Article = long poster (calm)

Each article body is a **poster field** around a **single reading column**. Low noise, uniform, not asymmetric chaos.

### Alignment (article only — not the open title card)

| Element | Alignment |
| --- | --- |
| Body prose (`.lede`, `p`, lists) | **Left** (readable) |
| Standfirst, byline, endnote | **Center** |
| `h1`–`h4`, `.pull`, `.impact` | **Center** |
| Plate figcaption (kicker / title / credit) | **Center** |
| Open `.title-card` | **Unchanged** (series left stack, episode left / title right) |

When the user asks to change article type or layout, **leave the open title card alone** unless they explicitly include it.

### Chrome (inside `main.article-body`)

1. **Frame** — thin border on `.article-body`
2. **Corner marks** — four `+` registration marks via `.poster-frame` + `.plate__mark--tl|tr|bl|br`
3. **Top rail** — `.poster-rail` with three mono slots (issue · episode · meta)
4. **Footer rail** — `.poster-rail.poster-rail--footer` (close the piece)
5. **Hairline breaks** — full-width `<hr>` between major beats; `h2` has top + bottom hairlines

```html
<main class="shell article-body">
  <div class="poster-frame" aria-hidden="true">
    <span class="plate__mark plate__mark--tl"></span>
    <span class="plate__mark plate__mark--tr"></span>
    <span class="plate__mark plate__mark--bl"></span>
    <span class="plate__mark plate__mark--br"></span>
  </div>

  <div class="poster-rail">
    <p>Issue 01 · Verso</p>
    <p>Episode 02 · Title</p>
    <p class="poster-rail__end">9 min</p>
  </div>

  <p class="byline">…</p>
  <p class="standfirst"><span>Line</span><span>Two</span></p>
  <!-- body, pulls, passages… -->

  <div class="poster-rail poster-rail--footer">
    <p>Verso · Issue 01</p>
    <p>Episode 02</p>
    <p class="poster-rail__end"><a href="../index.html">← All episodes</a></p>
  </div>
</main>
```

### Body elements

| Class | Role |
| --- | --- |
| `.byline` | Mono meta under the top rail (centered) |
| `.standfirst` | Monumental Instrument title, centered (optional stacked `span`s) |
| `.lede` | First prose + drop cap (left) |
| `.pull` | Centered serif quote, hairlines top/bottom, optional `<cite>` |
| `h2` | Centered section display, hairlines top/bottom |
| `.impact` | Optional centered short display line |
| `.endnote` | Optional mono footer line (prefer footer rail for close) |

Do **not** invent asymmetric “poster bands,” multi-column spec grids, or type-over-image HUDs. Drama is scale + spacing + chrome, not a second layout language.

## Hard rules (easy to break)

1. **Classless prose.** Theme classes are for cards, feed, features, masthead, buttons, passages, poster chrome — not for every paragraph.
2. **Tokens in `theme.css` only.** Don’t scatter colours or typefaces into HTML `style=` attributes (aspect-ratio on crop frames is fine).
3. **Stay monochrome.** Hover is underline, opacity, or invert — do not reintroduce Hermes blue unless the issue explicitly asks.
4. **Don’t fight concrete.** Prefer semantic HTML; override only where title cards or the black field require it.
5. **Type (trial):** Geist Sans sitewide; hierarchy via `--weight-body` / `--weight-chrome` / `--weight-display`.
6. **Article = long poster, low noise.** Frame + corner marks + top/footer rails + hairline `<hr>` breaks. One measure, shared left edge.
7. **Plate rhythm is universal.** Every article uses `section.passage` in order; do not invent per-piece image layouts.
8. **No remark/rehype/Astro unless the project graduates.** This starter is a folder you can ship.

## Adding an article

1. Prefer copying `articles/the-beast.html` (full poster chrome + filled plates) or `articles/angel-attack.html` (pattern sample)
2. Change open title card series / episode / title
3. Write prose under `<main class="shell article-body">` with poster-frame + rails
4. For every image: add a `<section class="passage">` (see plates)
5. Link it from the feed on `index.html`
6. Keep Google Fonts link in sync with other pages

## Plates

### Stage vs frame

| Wrapper | Use when |
| --- | --- |
| **`.plate__stage`** (default) | Freeform / irregular / transparent PNGs; natural silhouette; no crop |
| **`.plate__frame`** | Rectangular photo crop; set `style="aspect-ratio: …"` |

Type always sits **under** the image (not over it). Same caption stack every time.

```html
<section class="passage">
  <figure class="plate">
    <div class="plate__stage">
      <img src="cutout.png" alt="…" />
    </div>
    <figcaption>
      <span class="plate__kicker">01 · Label</span>
      <span class="plate__title">Display Title</span>
      <span class="credit">Optional credit</span>
    </figcaption>
  </figure>
  <!-- float beats: optional wrapping copy -->
  <div class="passage__body">
    <p>…</p>
  </div>
</section>
```

Cropped photo (optional):

```html
<div class="plate__frame" style="aspect-ratio: 3 / 2">
  <img src="photo.jpg" alt="…" />
</div>
```

### Plate rhythm (universal)

Every image moment is a **passage**. Do not hand-pick inset/float per piece;
**order alone** assigns the beat.

**Cycle:** inset → float right → float left → **repeat**.

| Passage # (among `section` siblings) | Layout |
| --- | --- |
| 1, 4, 7… | **Inset** — full measure block |
| 2, 5, 8… | **Float right** — plate + optional `.passage__body` |
| 3, 6, 9… | **Float left** — same |

Only `<section>` elements count toward the cycle. Ordinary `<p>` / `<h2>` / `<hr>` between passages do not reset it.

**Rules**

1. Always use `<section class="passage">` for images — bare figures are escapes only.
2. Prefer `.plate__stage` unless you intentionally need a crop.
3. Put wrapping copy in `.passage__body` on float beats — enough prose that text wraps **beside and under** the plate (no empty column under a tall float).
4. **Never** put `display: flow-root` / `overflow: hidden` on `.passage__body` — that blocks wrap-under and leaves whitespace beside floats.
5. Caption stack: kicker → title → credit (centered); do not invent per-piece caption layouts.
6. Slots may replace images: `.slot`, `.slot--square`, `.slot--portrait`, `.slot--wide`.
7. Do not use other `section` elements inside `article-body` unless you intend them to advance the cycle.

**Escapes** (rare)

| Class | Effect |
| --- | --- |
| `passage--inset` | Force inset beat |
| `passage--float-right` / `passage--float-left` | Force float beat |
| `passage--span` | Wider block (~52rem), never floats |
| `passage--fill` | Shell-wide block, never floats |
| `.pair` | Equal text + plate columns — **outside** the rhythm |

Span/fill/forced passages are still `<section>`s and **still advance** the nth-of-type counter. Prefer keeping escapes rare.

**Samples**

- `articles/the-beast.html` — full poster chrome + filled plates (canonical article)
- `articles/angel-attack.html` — plate rhythm / pattern sample

## Verifying

```bash
npm run dev
# open http://localhost:4173/articles/the-beast.html
```

Check:

- Pure black field (no gray seam under the masthead)
- Title card type scale at 375 / 768 / 1280 (Eva layout intact — not centered)
- Article frame + four corner marks + top/footer rails
- Hairline breaks between major sections
- Article display centered (standfirst, h2, pulls, plate captions); body left
- Type (trial): Geist Sans all roles — title card + body + chrome
- Passage 1 inset, 2 float-right, 3 float-left, 4 inset again
- Float beats: prose wraps under the plate (no tall empty gap)
- Freeform stages do not crop transparent/irregular PNGs
- Floats stack full-width below ~40rem
- No horizontal overflow

## Relationship to RECTO

RECTO is the full Astro editorial system (tokens, MDX, `canonical`/`plate`, staged image slots). Verso is the static opposite edge: ship an issue from a directory. Keep them separate repos; don’t merge design systems casually.
