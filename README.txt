QUOTE CHALLENGE THEATER ENTRANCE — INDEX 5.1.10

Upload the contents of this folder to the root of the GitHub Pages site.
Keep the existing one-player.html and two-player.html files in that same root.

Included:
- index.html: theater entrance, blue-and-yellow marquee, game links, add-icon button,
  visible report-bug art, local unique-device marker, and the two new Star Trek posters.
- bonus.html: working bonus wall. Clicking the hidden portrait in the entrance opens
  this page, identifies the creator without naming him, and awards 20 points once.
  Its message closes after 20 seconds or from the button so the wall remains visible.
- assets/: the entrance artwork (including the hidden portrait), report button,
  both poster files, and the app icons.
- manifest.webmanifest and sw.js: add-to-home-screen support and basic offline caching.

The device marker is stored locally in each browser. A true shared all-device total
needs a server-side counter; this static version does not send visitor data anywhere.
