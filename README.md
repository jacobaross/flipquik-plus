# flipquik+

A mobile-first Progressive Web App (PWA) - the fast-paced party game where you guess words by tilting your phone.

## Features

- 25 pre-loaded deck categories with 20 cards each
- Custom deck creation and management with cloud backup
- Tilt controls for mobile devices
- Desktop fallback controls
- Configurable timer (30/45/60/90/120 seconds)
- Audio countdown and sound effects
- Round summary with detailed results
- Cloud sync with Supabase
- Offline support via service worker
- Installable as a PWA on mobile devices

## Play Now

Visit: https://jacobaross.github.io/flipquik-plus

## How to Play

1. Choose a deck category
2. Hold your phone to your forehead
3. Tilt forward when you guess correctly
4. Tilt backward to skip
5. Try to get as many correct as possible before time runs out!

## Local Development

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Technologies

- Vanilla JavaScript
- CSS3 with CSS Variables
- DeviceOrientation API
- Web Audio API
- Service Worker API
- Supabase (Cloud Database)
- Local Storage API
