import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const htmlSource = readFileSync(
  new URL("../experience/phase.html", import.meta.url),
  "utf8"
);
const appSource = readFileSync(
  new URL("../experience/phase.js", import.meta.url),
  "utf8"
);

test("phase laboratory has no-JavaScript fallback", () => {
  assert.match(htmlSource, /<html lang="en" class="no-js">/);
  assert.match(htmlSource, /class="js-required-message"/);
  assert.match(appSource, /classList\.remove\("no-js"\)/);
});

test("phase laboratory exposes a polite live status", () => {
  assert.match(
    htmlSource,
    /id="phase-live-status" class="sr-only" role="status"[\s\S]*aria-live="polite"/
  );
});

test("phase laboratory states the evidence boundary", () => {
  assert.match(htmlSource, /Evidence boundary/);
  assert.match(htmlSource, /physical\s+interference experiment additionally depends/);
});

test("phase laboratory has restrictive same-origin metadata", () => {
  assert.match(htmlSource, /name="referrer" content="no-referrer"/);
  assert.match(htmlSource, /connect-src 'none'/);
});
