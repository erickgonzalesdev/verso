# Verso — agent context

Static webzine starter. Sibling spirit to RECTO (Astro theme in a separate repo),
but deliberately lighter: no build, no components framework, classless HTML.

## Stack

- **Base:** [concrete.css](https://github.com/louismerlin/concrete.css) 3.1, vendored at `css/concrete.min.css`
- **Theme:** `css/theme.css` only — tokens, title cards, chrome, article type, plate rhythm
- **Pages:** plain HTML (`index.html`, `about.html`, `articles/*.html`)
- **Serve:** `npm run dev` → static server on port 4173 (no bundler)

## Design sources

| Layer | Inspiration | What we took |
| --- | --- | --- |
| Base | concrete.css | Measure ~640px, classless prose, semantic elements |
| Titles | Neon Genesis Evangelion title cards | Stacked series mark, `EPISODE : n` left, title right, monumental type |
| Chrome | [Hermes Agent](https://hermes-agent.nousresearch.com/) | Centered wordmark nav, mono eyebrows, open feature blocks — **not** their blue |
| Body type | Hermes descriptive copy | **Courier Prime** for article prose |

## Colour

- **One field:** `#000` background, `#f5f5f5` type
- No brand blue, no gray bands between masthead / title card / body
- Override concrete’s light/dark OS scheme so the page stays black
- Tokens only at the top of `css/theme.css` (`--fg`, `--bg`, fonts, spacing, measure)

## Type

| Role | Face |
| --- | --- |
| Title cards, in-article headings (`h2`/`h3`), pull quotes, standfirst | **Instrument Serif** (`--font-display`) |
| Article body prose | **Courier Prime** (`--font-body`) |
| Nav, kickers, bylines, captions, episode labels, code, `h4` labels | **JetBrains Mono** (`--font-mono`) |

Fonts load from Google Fonts in each HTML `<head>`. Keep the three faces in sync across pages when adding a new HTML file.

## Title card pattern

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

## Layout shells

- `body.site` — unlocks full-width; chrome lives in `.shell` (wider max-width + gutters)
- `main.shell.article-body` — shell-wide so media can break the reading column
- Prose children — constrained to `--measure` (~38rem)
- Masthead — Hermes-style three-column grid, mark centered

## Hard rules (easy to break)

1. **Classless prose.** Theme classes are for cards, feed, features, masthead, buttons, passages — not for every paragraph.
2. **Tokens in `theme.css` only.** Don’t scatter colours or typefaces into HTML `style=` attributes (aspect-ratio on frames is fine).
3. **Stay monochrome.** Hover is underline, opacity, or invert — do not reintroduce Hermes blue unless the issue explicitly asks.
4. **Don’t fight concrete.** Prefer semantic HTML; override only where title cards or the black field require it.
5. **Three type roles.** Serif = titles/cards; Courier Prime = reading; JetBrains = UI chrome. Don’t mix roles casually.
6. **Plate rhythm is universal.** Every article uses `section.passage` in order; do not invent per-piece image layouts.
7. **No remark/rehype/Astro unless the project graduates.** This starter is a folder you can ship.

## Adding an article

1. Copy `articles/angel-attack.html`
2. Change title card series / episode / title
3. Write prose under `<main class="shell article-body">`
4. For every image: add a `<section class="passage">` (see plate rhythm)
5. Link it from the feed on `index.html`

## Article body

- **Standfirst** (`.standfirst`): serif dek under the byline
- **Lede** (`.lede`): slightly larger + drop cap
- **Pull** (`.pull`): wide serif quote with hairline top/bottom + optional `<cite>`
- **Endnote** (`.endnote`): mono footer line for “back to issue”

### Plate rhythm (universal — every article)

Every image moment is a **passage**. Do not hand-pick inset/float per piece;
**order alone** assigns the beat.

**Cycle:** inset → float right → float left → **repeat**.

| Passage # (among `section` siblings) | Layout |
| --- | --- |
| 1, 4, 7… | **Inset** — full measure block |
| 2, 5, 8… | **Float right** — plate + optional `.passage__body` |
| 3, 6, 9… | **Float left** — same |

Only `<section>` elements count toward the cycle. Ordinary `<p>` / `<h2>`
between passages do not reset it.

```html
<section class="passage">
  <figure class="plate">
    <div class="plate__frame" style="aspect-ratio: 3 / 2">
      <img src="…" alt="…" />
      <!-- or empty stage: <div class="slot slot--wide">16:9</div> -->
    </div>
    <figcaption>Caption <span class="credit">Credit</span></figcaption>
  </figure>
  <!-- recommended on float beats -->
  <div class="passage__body">
    <p>Copy that wraps the float.</p>
  </div>
</section>
```

**Rules**

1. Always use `<section class="passage">` for images — bare figures are escapes only.
2. Put wrapping copy in `.passage__body` on float beats.
3. Vary crop, caption, and content; do not vary the skeleton.
4. Slots may replace images; empty stages are valid (compose before photographs arrive).
5. Do not use other `section` elements inside `article-body` unless you intend them to advance the cycle.

**Escapes** (rare)

| Class | Effect |
| --- | --- |
| `passage--inset` | Force inset beat |
| `passage--float-right` / `passage--float-left` | Force float beat |
| `passage--span` | Wider block (~52rem), never floats |
| `passage--fill` | Shell-wide block, never floats |
| `.pair` | Equal text + plate columns — **outside** the rhythm |

Span/fill/forced passages are still `<section>`s and **still advance** the nth-of-type counter. Prefer keeping escapes rare.

**Slots:** `.slot` (default 3:2), `.slot--square`, `.slot--portrait`, `.slot--wide`.

**Sample:** `articles/angel-attack.html` demonstrates two full cycles plus a span escape.

## Verifying

```bash
npm run dev
# open sample article
```

Check:

- Pure black field (no gray seam under the masthead)
- Title card type scale at 375 / 768 / 1280
- Type roles: Courier Prime body, Instrument Serif headings, JetBrains chrome
- Passage 1 inset, 2 float-right, 3 float-left, 4 inset again
- Floats stack full-width below ~40rem
- No horizontal overflow

## Relationship to RECTO

RECTO is the full Astro editorial system (tokens, MDX, `canonical`/`plate`, staged image slots). Verso is the static opposite edge: ship an issue from a directory. Keep them separate repos; don’t merge design systems casually.
