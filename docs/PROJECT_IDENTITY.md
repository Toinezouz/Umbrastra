# Project identity — UMBRASTRA

## Name

**UMBRASTRA**

An invented word made of two Latin ones: *umbra*, the shadow, and *astra*,
the stars. **The stars in the shadow**: that is the whole game, where your own
five stars stay hidden from you while everyone else's shine in plain sight.

It reads the same in English, French and Spanish, with nothing to translate
or decline, and it has no link, in sound or in meaning, with the game whose
technical architecture this project started from.

### Why not NOCTALIS any more

The game was called NOCTALIS up to version 1.3. A search in September 2026
showed the name was already widely used: an independent game studio on
itch.io, a French digital agency, a bat museum in Germany (open since 2006),
a novel series and several musicians. UMBRASTRA had no such use as a game,
app or brand in that search. That search was not a trademark clearance:
check the trademark registers (INPI, EUIPO) before any commercial use.

## Tagline

- **en** — "Find your constellation before anyone else."
- **fr** — « Devine ta constellation avant les autres. »
- **es** — «Adivina tu constelación antes que nadie.»

The first taglines ("… avant lui", "… antes que él") assumed a single rival
and a gender; they were rewritten with 1.1, when tables grew to four.

## Pitch

Two to four stargazers under the same sky. Everyone can see everybody's
stars, except their own. By asking questions about the stars of the open sky,
each person pieces their own five stars together — and the first to call them
right, **CONSTELLATION!**, wins.

## World

**Astronomy, not astrology.** The game looks like a night at the
observatory: stars seen through an eyepiece, real constellations, a star
chart with its coordinate grid, a total eclipse for a logo. Nothing
esoteric: no fate, no signs, no engraved brass, no invented symbols.

- **Dark theme** (the default) — a soft night: slate blue, well above
  black, with text in a soft white. Nothing glares.
- **Light theme** — warm paper and dark ink.

**One rule governs the look: only the stars are vivid.** The page, the
panels, the text and the buttons stay neutral, flat and still, so the eye
rests and the five constellation colours carry the game.

## Vocabulary

This table is the single reference. No other term should appear in the
interface.

| Concept | English | French | Spanish |
| --- | --- | --- | --- |
| Numbered item 1–60 | **star** | étoile | estrella |
| Colour family (5) | **constellation** | constellation | constelación |
| Value 1 to 3 | **spark** | éclat | destello |
| Shared area | **the open sky** | le ciel commun | el cielo común |
| A player's stars | **row** | rangée | fila |
| "classify" hint | **PLACE** | SITUER | SITUAR |
| "compare" hint | **GAUGE** | JAUGER | MEDIR |
| Final call | **CONSTELLATION!** | CONSTELLATION ! | ¡CONSTELACIÓN! |
| Deduction sheet | **star chart** | carte du ciel | carta celeste |
| Wrong call | **out of the race** | hors course | fuera de la carrera |
| People | **everyone at the table, the others** | astronomes, adversaires, les autres | personas, el resto |

The five constellations, in internal order (`green`, `pink`, `blue`, `red`,
`orange` — technical identifiers, unchanged):

All five are **real constellations**, drawn from their actual stick figures
(simplified, north up). Their colours form a palette of their own, inspired
by the false colours of space-telescope images rather than by any card game,
and each has an astronomical reason:

| Identifier | English | French | Spanish | Figure | Colour, and why |
| --- | --- | --- | --- | --- | --- |
| `green` | Lyra | Lyre | Lira | Vega above a small parallelogram | lime — the green glow of oxygen in the Ring Nebula (M57) |
| `pink` | Orion | Orion | Orión | the shoulders, the belt, Saiph and Rigel | violet — the hot young stars of the Orion Nebula |
| `blue` | Cygnus | Cygne | Cisne | the Northern Cross, from Deneb to Albireo | silver — Deneb, a white supergiant |
| `red` | Scorpius | Scorpion | Escorpio | the claws, Antares, the curved tail | copper — Antares, red and low in the sky |
| `orange` | Cassiopeia | Cassiopée | Casiopea | the W | pale gold — the warm light of its stars |

The palette deliberately stays away from the green, pink, blue, red and
orange of the game this project started from; `tests/unit/theme.test.ts`
checks that each colour keeps a clear distance from those.

Up to version 1.4 the pink, red and orange constellations were invented
ones (Aurora, Ember, Phoenix); they were replaced by real ones in 1.5.

The technical identifiers stay as they are: they are never shown, and
freezing them avoids a pointless migration of the engine, tests and CSS.

## Writing for players

- **Talk about the game, never the machinery.** No "server", "data" or
  "session" in the interface; they belong in the README.
- **Write for everyone at the table.** In French and Spanish, words that do
  not assume anybody's gender (« astronome », « adversaire », « personne »,
  « persona », « quien juega »), no median dots or other markers.
- **Be warm and brief.** The rules read like a friend explaining the game.

These principles are partly enforced by `tests/unit/i18n.test.ts`.

## Logo

A **total solar eclipse**: the Moon's black disc (the *umbra*, the shadow the
name comes from), the pale corona around it, the last bead of sunlight on its
edge, and a few stars, as they appear in the sky during totality. Drawn in
SVG, with no dependency, used as favicon and in the header.

## Type

| Role | Typeface | Why |
| --- | --- | --- |
| Titles, star numbers | **Space Grotesk** | a grotesque with a technical, instrument-panel feel; its figures read like a readout |
| Everything else | **Jost** | a clear geometric sans-serif, very legible at small sizes |

Both are self-hosted and released under the SIL Open Font License.

## Palette

| Role | Light | Dark |
| --- | --- | --- |
| Page | `#f3f2ee` warm paper | `#0e121b` soft night |
| Panels | `#fcfbf8` | `#161c2a` |
| Ink | `#1c2230` | `#e3e6ee` soft white |
| Secondary ink | `#596277` | `#9aa4b8` |
| Accent | `#2f55a8` ink blue | `#9db8f2` |
| Second accent | `#a8405a` | `#e79ab0` |
| Sunlight | `#8a6410` (text) / `#dcae45` (fill) | `#e6c170` / `#ecc878` |

No gradient, no glow, no coloured shadow: surfaces are flat fills with a
hairline border. Pure black and pure white are not used.

The five constellations keep the same colours in both themes, so the star
chart always matches the table:

| Constellation | Colour | Deep | Light | Text on a fill |
| --- | --- | --- | --- | --- |
| Lyra | `#9ccc3a` lime | `#3b5410` | `#e8f8c6` | navy |
| Orion | `#8f6cf0` violet | `#33207a` | `#e2d6ff` | white |
| Cygnus | `#9aa8c2` silver | `#3a455c` | `#f1f4fa` | navy |
| Scorpius | `#b86a45` copper | `#4f2213` | `#ffd9c4` | white |
| Cassiopeia | `#e3c85f` pale gold | `#5c4a0c` | `#fff4c9` | navy |

Contrast is measured, not guessed: `tests/unit/theme.test.ts` checks the WCAG
ratios of the main text and accent pairs in both themes.

## The stars

Each star is a **disc of night with a ring in its constellation's colour**:

- face up — the constellation's figure at the top, the number in Space
  Grotesk, and one to three round **sparks** underneath, as in a star
  chart's brightness legend. Flat: no glow, no reflection;
- my own, hidden — **not observed yet**: the disc is filled with the
  constellation's colour (so each one is recognised at a glance), with a
  dashed inner ring, its figure, a question mark, and the position in a
  small badge;
- gauged with a NO — dimmed, its ring dashed.

The constellation figures carry the identity even without colour, which
matters for colour-blind players.

The home screen shows a **sky chart** as a faint, still watermark: circles
of declination, hour circles, a graduated rim like a planisphere's, and the
five constellations.

## Stillness

An earlier version (1.7) animated the whole sky and every surface; it was
tiring to look at. The rule since 1.8:

- **Nothing loops for decoration.** The sky behind the screens is still: one
  soft glow and a sparse field of faint stars. The only repeating movement
  is the three waiting dots, which mean "someone is thinking".
- **Movement answers an event, then stops**: a star appears, a star is
  placed, a dialog opens, the game ends. Durations are short (120 to 360 ms,
  the end screen aside).
- **Attention is drawn by colour, not by motion**: sunlight yellow marks my
  turn, the rack of the player in the lead and the gap a star was just
  placed in.

`tests/unit/design.dom.test.tsx` enforces the first point on the
stylesheets.

## Comfort

- **Stars grow with the screen** (up to 76 px on a large one), and the
  constellation figures are drawn with a firmer line.
- **On a phone**, the secondary tools of the game header fold behind one
  "more" button, and the turn banner stays in view while scrolling.
- **My next move is lit**: a sunlight edge around the constellation buttons
  when I must reveal, around the open sky when I must pick a star.
- **The history** shows the star of each line as a small chip in its
  constellation's colour.
- **High contrast** is a setting of its own, in either theme: text closer to
  black or white, stronger secondary text and lines.
- **The home screen** names the five constellations under the pitch, each
  with its figure and colour; **the rules** show a worked example of PLACE
  and of GAUGE.
- **Sounds** are soft: sine and triangle waves, low volume, one pentatonic
  scale.

## Moments

- **A star is placed** — it settles into its gap from just above, and the
  gap turns sunlight yellow for a few seconds, with two soft pulses. Everyone at the table sees it, on
  whichever row it happens. Only what happens while the page is open is
  animated: opening or reloading the page replays nothing.
- **Someone wins** — the end screen opens on a total eclipse. The corona
  grows, the diamond ring appears in a soft wash of light, then the winner's
  five stars light up one by one above the Moon, on the zigzag of
  Cassiopeia (the one constellation of the game with exactly five stars),
  and join into a constellation while a few shooting stars cross the sky, before
  **CONSTELLATION!** appears and the results rise. When nobody wins, the
  eclipse stays alone: *the sky kept its secrets*.

Both respect the device's "reduce motion" setting: the final state shows at
once, without movement.

## Positioning

UMBRASTRA is an **independent open-source project**. It is not affiliated with
any publisher, reuses no protected content, and does not present itself as
the official version of any existing game. It reuses the technical
architecture of an earlier personal project by the same author, which this
documentation says openly.
