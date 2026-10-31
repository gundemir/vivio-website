# Vivio website — finished Editorial design

Release: 31 October 2026.

## Replace the existing website

1. Extract `vivio-website.zip`.
2. Copy **the contents of the extracted `vivio-website` folder** into your existing `vivio-website` repository folder. Replace files with the same names. Do not create an extra `vivio-website/vivio-website` level: `index.html` belongs directly at the repository root.
3. Keep your existing Git repository metadata (`.git`), custom-domain files such as `CNAME`, and hosting/deployment configuration.
4. Commit the changed files and push to the branch your host already publishes.

For an existing deployment that publishes this repository's root, that is all that is needed. Keep the `assets` folder beside `index.html`. No npm install, build process, environment variables, API keys or server application are required.

## Files

- `index.html` — complete homepage, copy and contact interface.
- `styles.css` — the approved design and responsive layouts.
- `script.js` — interactive expertise topics, expanded service links, animation controls, navigation and email preparation.
- `privacy.html` — existing privacy notice, with portable links and local system fonts.
- `assets/` — current cell artwork, Vivio symbol and three portraits.
- `favicon.ico`, `favicon-*.png`, `apple-touch-icon.png` — browser and device icons.
- `.nojekyll` — lets GitHub Pages serve the static files without Jekyll processing. On macOS this file is normally hidden; Command–Shift–Period reveals hidden files.

All page assets are included. Fonts use the device's installed Georgia and Arial/Helvetica families; the pages do not fetch fonts or scripts from third-party CDNs. The unused design alternatives, preview-only pages, source artwork PNGs, private research notes and case-study report files are omitted.

## Hosting settings, only if needed

**Existing GitHub-connected Netlify or other static host:** use the repository root (`.`) as the publish directory, with no build command. Keep the existing repository connection, production branch and custom domain.

**GitHub Pages:** in repository Settings → Pages, use the existing publishing branch and `/(root)` if publishing from a branch. Keep any existing `CNAME` and domain settings. The included `.nojekyll` bypasses Jekyll; there is no need to add an Actions workflow for this static package.

The privacy notice retains the hosting/email providers named in your supplied notice (Netlify and Google Workspace). If you change providers, update that description to match.

## Preview before pushing

You can open `index.html` directly in a browser. To preview using a local server, if Python 3 is installed, run this from the `vivio-website` folder:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000/ . Stop the server with Control–C. A local server is optional; production needs only static hosting.

## What the controls do

- Each expertise topic displays its own description. The allogeneic and genomic links open their respective subsections of the expanded engineering service.
- Pause/Resume stops and continues the artwork's pan-and-zoom animation. A reduced-motion device preference starts it paused; the visitor can choose Resume.
- All five case-study buttons select the requested company in the contact area. No report is publicly downloadable from this package.
- “Open email draft” opens the visitor's email application with a prepared message to `gundemir@vivioresearch.com`. The visitor reviews and sends it. The website itself does not submit or store the enquiry.
- “Copy enquiry” is a fallback for visitors without a configured email application. Clipboard permissions can vary with the browser.

## Later edits

Edit the text in `index.html`, styles in `styles.css` and interactions in `script.js`. Preserve the element IDs and `data-topic`/`data-open-service` attributes used by the script. Keep asset filenames and paths consistent.

## Reference documentation

- GitHub Pages publishing source: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub Pages static sites: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- Netlify build settings: https://docs.netlify.com/build/configure-builds/file-based-configuration/
