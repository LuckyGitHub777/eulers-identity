import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const appSource = readFileSync(new URL("../experience/app.js", import.meta.url), "utf8");
const htmlSource = readFileSync(
  new URL("../experience/index.html", import.meta.url),
  "utf8"
);

test("uses a dedicated polite live-status node", () => {
  assert.match(
    htmlSource,
    /id="live-status" class="sr-only" role="status"[\s\S]*aria-live="polite"/
  );
});

test("playback status is separated from the full explanation region", () => {
  assert.match(appSource, /liveStatus\.textContent/);
  assert.match(appSource, /Animation paused at/);
  assert.doesNotMatch(
    htmlSource,
    /<section class="explanation"[^>]*role="status"/
  );
});

test("hidden-tab suspension has explicit status", () => {
  assert.match(
    appSource,
    /Animation paused because the tab became inactive\./
  );
});

test("reduced motion uses a discrete quarter-turn action", () => {
  assert.match(
    appSource,
    /matchMedia\("\(prefers-reduced-motion: reduce\)"\)/
  );
  assert.match(appSource, /Step ¼ turn/);
  assert.match(appSource, /stepQuarterTurn/);
});

test("no-JavaScript state fails closed", () => {
  assert.match(htmlSource, /<html lang="en" class="no-js">/);
  assert.match(htmlSource, /class="js-required-message"/);
  assert.match(appSource, /classList\.remove\("no-js"\)/);
});
