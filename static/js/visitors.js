(function () {
  'use strict';
  var section = document.getElementById('visitors');
  if (!section) return;
  var status = document.getElementById('visitor-count-status');
  var mapStatus = document.getElementById('visitor-map-status');
  var productionHost;
  try { productionHost = new URL(section.dataset.siteUrl).hostname; } catch (_) { return; }

  // Do not send local previews or forked deployments to the live counters.
  if (window.location.hostname !== productionHost || window.location.protocol !== 'https:') {
    status.textContent = 'Local preview · visits are not counted';
    mapStatus.textContent = section.dataset.mapId.trim()
      ? 'Map connected · live locations appear after publishing'
      : 'Map setup pending · no visitor data yet';
    return;
  }

  var value = document.getElementById('busuanzi_value_page_pv');
  var timeout;
  var observer = new MutationObserver(function () {
    if (/^\d+$/.test(value.textContent.trim())) {
      status.textContent = 'Recorded homepage views';
      window.clearTimeout(timeout);
      observer.disconnect();
    }
  });
  observer.observe(value, { childList: true, subtree: true, characterData: true });
  function unavailable() {
    if (!/^\d+$/.test(value.textContent.trim())) {
      status.textContent = 'Visit count temporarily unavailable';
    }
  }
  timeout = window.setTimeout(unavailable, 12000);
  var counter = document.createElement('script');
  counter.async = true;
  counter.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
  counter.onerror = unavailable;
  document.head.appendChild(counter);

  var mapId = section.dataset.mapId.trim();
  if (!mapId || !/^[A-Za-z0-9_-]+$/.test(mapId)) {
    mapStatus.textContent = 'Visitor map is not connected yet';
    return;
  }

  var live = document.getElementById('visitor-map-live');
  var fallback = document.getElementById('visitor-map-fallback');
  mapStatus.textContent = 'Loading visitor map…';
  live.hidden = false;
  var map = document.createElement('script');
  map.id = 'mapmyvisitors';
  map.async = true;
  map.src = 'https://mapmyvisitors.com/map.js?d=' + encodeURIComponent(mapId) + '&cl=ffffff&co=2559c7&w=a';
  // The current provider renders a vector map, not an <img> element.
  // Its SVG and visitor summary arrive after a separate data request.
  function mapReady() {
    var canvas = live.querySelector('.mapmyvisitors-map svg');
    var summary = live.querySelector('.mapmyvisitors-visitors');
    var hasCount = summary && /\d/.test(summary.textContent);
    if (canvas || hasCount) {
      live.hidden = false;
      fallback.hidden = true;
      window.clearTimeout(mapTimeout);
      mapObserver.disconnect();
    } else if (live.querySelector('.mapmyvisitors-failed')) {
      mapUnavailable();
    }
  }
  var mapObserver = new MutationObserver(mapReady);
  function mapUnavailable() {
    if (fallback.hidden) return;
    mapStatus.textContent = 'Visitor map temporarily unavailable';
    live.hidden = true;
  }
  var mapTimeout = window.setTimeout(mapUnavailable, 15000);
  mapObserver.observe(live, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class'] });
  map.onerror = mapUnavailable;
  live.appendChild(map);
}());
