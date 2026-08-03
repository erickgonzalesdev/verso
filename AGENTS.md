# Verso — agent context

Static webzine starter. Sibling spirit to RECTO (Astro theme in a separate repo),
but deliberately lighter: no build, no components framework, classless HTML.

## Stack

- **Base:** [concrete.css](https://github.com/louismerlin/concrete.css) 3.1, vendored at `css/concrete.min.css`
- **Theme:** `css/theme.css` only — tokens, title cards, chrome, article type
- **Pages:** plain HTML (`index.html`, `about.html`, `articles/*.html`)
- **Serve:** `npm run dev` → static server on port 4173 (no bundler)

## Design sources

| Layer | Inspiration | What we took |
| --- | --- | --- |
| Base | concrete.css | Measure ~640px, classless prose, semantic elements |
| Titles | Neon Genesis Evangelion title cards | Stacked series mark, `EPISODE : n` left, title right, monumental type |
| Chrome | [Hermes Agent](https://hermes-agent.nousresearch.com/) | Centered wordmark nav, mono eyebrows, open feature blocks — **not** their blue |

## Colour

- **One field:** `#000` background, `#f5f5f5` type
- No brand blue, no gray bands between masthead / title card / body
- Override concrete’s light/dark OS scheme so the page stays black
- Tokens only at the top of `css/theme.css` (`--fg`, `--bg`, fonts, spacing)

## Type

| Role | Face |
| --- | --- |
| Title cards, in-article headings, pull quotes | **Instrument Serif** (`--font-display`) |
| Article body prose | **Courier Prime** (`--font-body`) — same family Hermes uses for descriptive copy |
| Nav, kickers, bylines, episode labels, code | **JetBrains Mono** (`--font-mono` / concrete `--font-h` for chrome) |

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
- Prose / `.article-body` — stays on concrete’s measure (~640px)
- Masthead — Hermes-style three-column grid, mark centered

## Hard rules (easy to break)

1. **Classless prose.** Theme classes are for cards, feed, features, masthead, buttons — not for every paragraph.
2. **Tokens in `theme.css` only.** Don’t scatter colours or typefaces into HTML `style=` attributes.
3. **Stay monochrome.** Hover is underline, opacity, or invert — do not reintroduce Hermes blue unless the issue explicitly asks.
4. **Don’t fight concrete.** Prefer semantic HTML; override only where title cards or the black field require it.
5. **Two faces of drama.** Serif = titles/cards; Courier Prime = reading; JetBrains = UI chrome. Don’t mix roles casually.
6. **No remark/rehype/Astro unless the project graduates.** This starter is a folder you can ship.

## Adding an article

1. Copy `articles/angel-attack.html`
2. Change title card series / episode / title
3. Write prose under `<main class="shell article-body">`
4. Link it from the feed on `index.html`

## Verifying

Open in a browser (or `npm run dev`). Check:

- Pure black field (no gray seam under the masthead)
- Title card type scale at 375 / 768 / 1280
- Article body is Courier Prime; in-article `h2` is Instrument Serif; nav is JetBrains Mono
- No horizontal overflow

## Relationship to RECTO

RECTO is the full Astro editorial system (tokens, MDX, `canonical`/`plate`, staged image slots). Verso is the static opposite edge: ship an issue from a directory. Keep them separate repos; don’t merge design systems casually.
