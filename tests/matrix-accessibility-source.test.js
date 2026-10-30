import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const htmlSource = readFileSync(
  new URL("../experience/matrix.html", import.meta.url),
  "utf8"
);
const appSource = readFileSync(
  new URL("../experience/matrix.js", import.meta.url),
  "utf8"
);

test("matrix laboratory has no-JavaScript fallback", () => {
  assert.match(htmlSource, /<html lang="en" class="no-js">/);
  assert.match(htmlSource, /class="js-required-message"/);
  assert.match(appSource, /classList\.remove\("no-js"\)/);
});

test("matrix laboratory exposes a polite live status", () => {
  assert.match(
    htmlSource,
    /id="matrix-live-status" class="sr-only" role="status"[\s\S]*aria-live="polite"/
  );
});

test("matrix laboratory keeps the public evidence boundary visible", () => {
  assert.match(htmlSource, /Mathematical boundary/);
  assert.match(htmlSource, /does not, by itself, establish a physical/);
});

test("matrix laboratory uses same-origin restrictive metadata", () => {
  assert.match(htmlSource, /name="referrer" content="no-referrer"/);
  assert.match(htmlSource, /connect-src 'none'/);
});
