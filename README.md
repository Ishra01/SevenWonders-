# Seven Wonders of the World — Interactive Carousel

A fast, animated carousel of all 7 Wonders. Pure HTML + CSS + JS — no frameworks, no dependencies.

## Features
- Smooth GPU-accelerated animations (translateZ, will-change)
- Lazy image loading — only visible cards load first
- Fast Wikimedia image CDN
- Tap/click center card → info panel
- Arrow buttons, dot indicators, swipe, keyboard (← → Esc)
- Responsive — works on mobile and desktop

## Files
```
index.html   ← page structure
style.css    ← all styles & animations
main.js      ← carousel logic & data
```

## Deploy to GitHub Pages
1. Push all 3 files to your repo root
2. Settings → Pages → Branch: main / (root) → Save
3. Live at: https://yourusername.github.io/repo-name/

## Controls
| Action | Result |
|---|---|
| Click center image | Open info panel |
| Click side image | Rotate to center |
| Arrow buttons | Prev / Next |
| Dots | Jump to any wonder |
| Swipe left/right | Navigate (mobile) |
| ← → keys | Navigate (keyboard) |
| Escape | Close panel |
