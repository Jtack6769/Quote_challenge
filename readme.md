# Quote Challenge

Quote Challenge is a theater-themed web game about identifying movies, television shows, cartoons, and speakers from memorable quotes.

**[Play Quote Challenge](https://jtack6769.github.io/Quote_challenge/)**

## Start here

- [One-player game](one-player.html)
- [Two-player game](two-player.html)
- [Bonus room](bonus.html)
- [Lunatic Fringe](lunatic_fringe.html)

The site is a static website built with HTML, CSS, JavaScript, and media files. There is no package installation or build step for the published site.

## Previewing changes

The published site is the simplest way to try the game. For local development, serve the repository root with a static web server, for example:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000/`. **Note:** the current landing page has a `<base>` URL pointing at the published GitHub Pages site, so relative links and assets from that page may resolve to the live site during local testing. Check any changed page's asset and navigation paths before merging.

## Repository notes

The repository contains multiple experiments and older page versions alongside the live experience. The published landing page is `index.html`; game and media files are referenced by relative paths. Before renaming or removing files, search for references across the site and confirm the intended page still works.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for a small pre-merge checklist and guidance on handling the existing prototypes and media.

## About

Quote Challenge began as a board-game idea and grew into a playable web project. Its goal is to bring people together over familiar movie and TV quotes.

[GitHub profile](https://github.com/Jtack6769) · [Live site](https://jtack6769.github.io/Quote_challenge/)
