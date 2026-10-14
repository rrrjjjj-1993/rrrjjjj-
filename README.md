# RYAN SZETO — Portfolio prototype

A responsive opening and selected-work transition for a creative planner / director. Built with Next.js App Router, TypeScript and Tailwind CSS. Scroll interaction uses one requestAnimationFrame per scroll update and CSS custom properties; no animation library is required.

## Run

Requires Node.js 20.9 or newer. Tested on Node.js 24.

```sh
npm ci --cache /tmp/ryan-npm-cache
npm run dev
```

Open http://localhost:3000 on your computer, or forward port 3000 from your development environment. The server listens on all interfaces.

```sh
npm run typecheck
npm run build
npm start
```

## Interaction and accessibility

The opening fades in immediately and can be skipped at any time by scrolling or the WORKS link. Scrolling moves the name and expands the image; the following selected-work section scrolls naturally. All navigation links have working section anchors. Keyboard users can use the skip link. `prefers-reduced-motion: reduce` disables entry animation, parallax and smooth scrolling and shortens the opening.

## Prototype content

`public/ocean.svg` is a locally generated monochrome wave study, not a completed portfolio asset. Project titles and imagery are explicitly marked concept previews. The small ABOUT and CONTACT anchor sections are prototype copy; no contact address or completed commercial work is implied. Edit the project data in `app/page.tsx` and replace the image in `public/` when final assets are available.

The supplied ChatGPT visual-reference link returned HTTP 403 in this environment. This version follows the written visual brief; exact reference matching awaits a directly supplied screenshot.
