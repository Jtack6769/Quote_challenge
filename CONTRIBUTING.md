# Contributing to Quote Challenge

Thanks for helping improve Quote Challenge. The project is a static HTML/CSS/JavaScript site hosted on GitHub Pages; there is no build or package-install step for the published site.

## Before editing

- `index.html` is the published landing page. Other similarly named HTML files may be prototypes or saved iterations; don't assume they are interchangeable.
- Pages refer to images, audio, video, and other pages by relative paths. Search for references before moving or renaming any file.
- Keep changes focused. Avoid deleting backups, experiments, or media unless you have confirmed they are unused and intended for removal.
- Confirm you have permission to publish any third-party images, clips, audio, and other media you add. Add attribution where required.

## Preview and check

1. Preview the published experience at <https://jtack6769.github.io/Quote_challenge/>.
2. For local work, run a static server from the repository root, for example `python -m http.server 8000`, and open <http://localhost:8000/>.
3. Be aware that the current landing page declares a production `<base>` URL; some relative links and media may therefore load from the live site when previewing locally.
4. Check the affected page at both a narrow/mobile viewport and a desktop viewport.
5. Test the links and controls you changed, including keyboard focus where relevant. Check the browser console and confirm any changed media loads.
6. Review the final diff for accidental large files, unrelated edits, or whitespace issues.

## Pull requests

Describe what changed, which page(s) are affected, and how you checked the change. Include before/after screenshots for visual changes when practical. Keep existing experiments intact unless cleanup is explicitly part of the change and all references have been checked.
