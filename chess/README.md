# ♟️ Chess

A clean, modern chess game you can play in your browser against a bot or a friend. No server required.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-blue?logo=github)](http://zrnge.com/chess/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Features

- Play against the built-in bot or in local two-player mode
- Adjustable difficulty: Easy, Medium, Hard
- Move history, FEN export/import, undo, hints, and resign
- Dark mode toggle and sound effects
- Mobile-friendly responsive layout
- Pure HTML, CSS, and vanilla JavaScript — no dependencies

## How to Play

Visit the live version: **[zrnge.com/chess](http://zrnge.com/chess/)**

Or run it locally:

```bash
# Clone the repository
git clone https://github.com/zrnge/chess.git

# Enter the project folder
cd chess

# Start a local server
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `N` | New game |
| `U` | Undo |
| `B` | Toggle bot |
| `F` | Flip board |
| `H` | Hint |
| `T` | Toggle dark mode |
| `M` | Toggle sound |

## Project Structure

```
chess/
├── index.html    # Game UI
├── style.css     # Styling and responsive layout
├── chess.js      # Game logic, bot, and interactions
├── package.json  # Project metadata
└── README.md     # This file
```

## License

This project is open source and available under the [MIT License](LICENSE).

---

Made by [zrnge](https://zrnge.com)

## Portfolio integration

Localized for tolgaipek.com.tr. Original project by zrnge, MIT licensed as explicitly declared above. Original source: https://github.com/zrnge/chess

Embedded chess piece artwork resembles the Cburnett set. Attribution: Colin M. L. Burnett, via Wikimedia Commons, CC BY-SA 3.0 / GFDL.
