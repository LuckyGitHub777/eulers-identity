import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const appSource = readFileSync(new URL("../experience/app.js", import.meta.url), "utf8");
const htmlSource = readFileSync(
  new URL("../experience/index.html", import.meta.url),
  "utf8"
);

test("explanation status region is polite and atomic at rest", () => {
  assert.match(
    htmlSource,
    /role="status" aria-live="polite" aria-atomic="true"/
  );
});

test("playback suppresses repeated live-region announcements", () => {
  assert.match(
    appSource,
    /explanationRegion\.setAttribute\("aria-live", "off"\)/
  );
  assert.match(
    appSource,
    /explanationRegion\.setAttribute\("aria-live", "polite"\)/
  );
});

test("pausing restores one settled announcement", () => {
  assert.match(appSource, /stopPlayback\(\{ announce: true \}\)/);
  assert.match(appSource, /Animation paused at/);
});
