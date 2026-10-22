# Reddit Ads Branding — Figma asset extraction

Source: Figma file `KbDstbrLh7nEFtIaEkG9Mn`, page `_team-branding`, frames 02–09.

## Extracted

- Frame 02: 12 SVG vector assets
- Frame 03: 10 original JPEG assets
- Frame 04: 2 original PNG assets
- Frame 05: 2 original PNG assets
- Frame 06: 6 original image assets and 1 SVG vector asset
- Frame 07: 9 original image assets and 4 SVG vector assets
- Frame 08: 2 original JPEG assets
- Frame 09 A: 2 original PNG assets
- Frame 09 B: 6 original PNG assets
- Frame 09 C: 11 original image assets and 3 SVG vector assets

Total: 70 files.

Files use a stable `frame-{number}-{image|vector}-{index}` naming scheme. Presentation
frame exports were intentionally not saved. Text panels, replacement footers, page
numbers, and other presentation chrome were excluded from layer selection.

## Embedded videos not extractable as originals

The Figma file contains four VIDEO fills. Figma MCP exposed their layer metadata and
hashes, but did not return original video download URLs through `download_assets`:

- `3416:30177` — Screen Recording 2026-08-23 at 11.44.21 AM 1
  - video hash: `aef7b3c3ff046c5d49cca90255eee980d65ae762`
- `3450:31297` — logo-color-cycle-loop 1
  - video hash: `aabc53de998d10d7f2358bcee1138b8c247188d1`
- `3450:31300` — one-stroke-emblem-animation 1
  - video hash: `3973ed4143a4d96704ccb8b7fa8bb88ecbc4a28b`
- `3458:31316` — Generated image 2 1
  - video hash: `024c44214043b70b25d7eddb10cac3a6bf698cef`

The available Figma video-export endpoint renders an entire animated top-level frame;
it does not expose the embedded source video. Such a render would also include the
presentation text and footer, so it was not used as a substitute for the originals.
