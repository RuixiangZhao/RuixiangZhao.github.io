# Ruixiang Zhao — Personal Homepage

A lightweight academic homepage for GitHub Pages. The page uses Jekyll's existing layout structure, local images, system fonts, and responsive CSS. The research content works without JavaScript. Live visitor statistics use a small script loaded at the end of the page.

## Content and design

- `index.html`: biography, latest work, publications grouped by year, service, and contact information.
- `_layouts/default.html`: navigation, metadata, structured data, and footer.
- `styles.css`: desktop and mobile layouts, keyboard focus styles, and reduced-motion support.
- `static/files/publications/`: publication thumbnails.
- `_config.yml`: site URL and build exclusions.

The September 2026 update adds **Realtime-Venus: A full-duplex interaction system with asynchronous delegation**, with links to its paper, project, code, and models. The official team attribution is preserved, with Ruixiang Zhao identified separately as an equal-contributing core contributor, as documented in [Section 9 of the technical report](https://arxiv.org/html/2609.13814v1#S9).

The Realtime-Venus-Omni thumbnail is the original architecture and audio–visual memory figure from the [project website](https://realtime-venus.github.io/assets/model-memory.png?v=7), saved locally as `static/files/publications/2026_realtime_venus_omni.png`.

## Local development

With a compatible Ruby/Bundler environment:

```sh
bundle install
bundle exec jekyll serve
```

Visit `http://localhost:4000`. The repository retains its existing Jekyll dependency declarations.

## Publishing

The changes can be published using this repository's existing GitHub Pages setup after committing and pushing them to the publishing branch. This local copy has not been pushed to GitHub.

## Visitor statistics

The footer now includes a homepage page-view counter and a visitor-map panel.

- **Counter:** [Busuanzi](https://busuanzi.ibruce.info/) loads on `https://ruixiangzhao.github.io/` only and reports `page_pv` (views of the current page, not unique people). No account is needed. Its count starts when tracking is enabled; previously unrecorded traffic cannot be reconstructed. If this URL has used Busuanzi before, the service may return its existing count.
- **Map:** The owner's MapMyVisitors ID is configured in `visitor_stats.mapmyvisitors_id` in `_config.yml`. It uses the supplied map widget with white land and a blue background matching the homepage. Publishing the updated site activates the map. The loader recognizes the provider's SVG map and visitor summary, and preserves a clear fallback if loading fails.
- **Preview:** Localhost, HTTP previews, and other domains do not contact either tracking provider. The preview shows a neutral world map and a dash for the count; neither represents collected data.
- **Failure state:** If a tracker is blocked or unavailable, the page says so instead of displaying a fake zero. Visitor locations are approximate IP-based locations, not GPS coordinates.
- **Historical tracking:** The old template included an unrelated Google Analytics tag. The site owner confirmed they had not configured it, so it is not reused.

The neutral map outline is generated from [Natural Earth's 1:110m land dataset](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson). It contains no visitor data. Natural Earth geographic data is public domain.
