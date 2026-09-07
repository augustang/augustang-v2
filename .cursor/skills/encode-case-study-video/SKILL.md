---
name: encode-case-study-video
description: Encode self-hosted case study videos for augustang.com with ffmpeg (WebM + MP4). Use when adding, re-encoding, or resizing portfolio videos, ReplayKit .mov sources, squarespace/hd-collections/vital-sync sizzle clips, or when HandBrake aspect ratio fails.
---

# Encode case study video

## Defaults

| Setting | Value |
|---|---|
| Tool | `ffmpeg` (`/opt/homebrew/bin/ffmpeg`; install with `brew install ffmpeg`) |
| Source aspect | **2880×1796** ReplayKit screen recordings (square pixels) |
| Audio | Strip (`-an`) |
| Output dir | `img/{project}/` (e.g. `img/squarespace/`) |
| HTML | WebM first, MP4 fallback; autoplay `muted loop playsinline` |

## Preset widths

Heights are **even** (required for H.264). Ratio from source: `height = width × 1796 ÷ 2880`.

| Preset | Size | Notes |
|---|---|---|
| `half` | **1440×898** | Nav, hero, general case studies |
| `scroll` | **1152×718** | Long Squarespace scroll clips (smaller file) |
| `showcase` | **1152×1080** | Tall Squarespace showcase grid (2880×2702 source) |

For a custom width: `HEIGHT = round(width × sourceHeight ÷ 2880)` — if odd, subtract 1. Wide clips use source height **1796**; showcase uses **2702**.

## Encode command

Use explicit `scale=WIDTH:HEIGHT,setsar=1` (not HandBrake). ReplayKit `.mov` files often have bad DAR metadata; ffmpeg pixel scaling avoids the “stuck aspect ratio” issue.

```bash
scripts/encode-video.sh <input.mov> <output-basename> <width> <output-dir>

# Examples
scripts/encode-video.sh "/Volumes/BigGayGigi/Website Assets/squarespace-nav.mov" squarespace-nav 1440 img/squarespace
scripts/encode-video.sh "/Volumes/BigGayGigi/Website Assets/homepage-scroll.mov" homepage-scroll 1152 img/squarespace
```

Produces `{basename}.webm` and `{basename}.mp4`.

### Codec settings (do not change without reason)

- **WebM:** `-c:v libvpx-vp9 -crf 32 -b:v 0`
- **MP4:** `-c:v libx264 -crf 23 -movflags +faststart -pix_fmt yuv420p`

## After encoding

1. Verify with ffprobe — both files must match width/height and full duration:
   ```bash
   ffprobe -v error -select_streams v:0 -show_entries stream=width,height -show_entries format=duration -of default=noprint_wrappers=1 img/squarespace/FILE.webm
   ```
2. Embed in HTML (Squarespace inset videos use `videoWrapper videoWrapper--inset`).
3. Do **not** use `video/` folder — assets live in `img/{project}/`.

## HandBrake

Avoid for ReplayKit sources. If the user insists, set Anamorphic **None**, uncheck Scaled Size **Automatic**, and use the preset dimensions above — but prefer `scripts/encode-video.sh`.
