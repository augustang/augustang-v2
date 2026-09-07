#!/usr/bin/env bash
set -euo pipefail

# Encode a case study video to WebM + MP4 for augustang.com
# Usage: encode-video.sh <input> <basename> <width> <output-dir>
# Example: encode-video.sh source.mov homepage-scroll 1152 img/squarespace

if [[ $# -ne 4 ]]; then
  echo "Usage: $0 <input> <basename> <width> <output-dir>" >&2
  exit 1
fi

INPUT="$1"
BASENAME="$2"
WIDTH="$3"
OUT_DIR="$4"

if [[ ! -f "$INPUT" ]]; then
  echo "Input not found: $INPUT" >&2
  exit 1
fi

FFMPEG="${FFMPEG:-/opt/homebrew/bin/ffmpeg}"
FFPROBE="${FFPROBE:-/opt/homebrew/bin/ffprobe}"

if [[ ! -x "$FFMPEG" ]]; then
  echo "ffmpeg not found. Install with: brew install ffmpeg" >&2
  exit 1
fi

# Source recordings are 2880×1796; keep even height for H.264
HEIGHT=$(( WIDTH * 1796 / 2880 ))
if (( HEIGHT % 2 != 0 )); then
  HEIGHT=$(( HEIGHT - 1 ))
fi

VF="scale=${WIDTH}:${HEIGHT},setsar=1"
mkdir -p "$OUT_DIR"

WEBM="${OUT_DIR}/${BASENAME}.webm"
MP4="${OUT_DIR}/${BASENAME}.mp4"

echo "Encoding ${BASENAME} at ${WIDTH}x${HEIGHT}..."

"$FFMPEG" -y -i "$INPUT" -vf "$VF" -an \
  -c:v libvpx-vp9 -crf 32 -b:v 0 "$WEBM"

"$FFMPEG" -y -i "$INPUT" -vf "$VF" -an \
  -c:v libx264 -crf 23 -movflags +faststart -pix_fmt yuv420p "$MP4"

for f in "$WEBM" "$MP4"; do
  echo "--- $(basename "$f") ---"
  "$FFPROBE" -v error -select_streams v:0 \
    -show_entries stream=width,height -show_entries format=duration \
    -of default=noprint_wrappers=1 "$f"
  ls -lh "$f"
done

echo "Done."
