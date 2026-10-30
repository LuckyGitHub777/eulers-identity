import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const appSource = readFileSync(new URL("../experience/app.js", import.meta.url), "utf8");
const htmlSource = readFileSync(
  new URL("../experience/index.html", import.meta.url),
  "utf8"
);

test("dynamic announcements use a dedicated small status region", () => {
  assert.match(
    htmlSource,
    /id="status-message"[^>]*role="status"[^>]*aria-live="polite"[^>]*aria-atomic="true"/
  );
  assert.doesNotMatch(
    htmlSource,
    /class="explanation"[^>]*role="status"/
  );
});

test("the range exposes a programmatic description and dynamic aria-valuetext", () => {
  assert.match(htmlSource, /id="angle-slider"[^>]*aria-describedby="angle-help"/s);
  assert.match(appSource, /slider\.setAttribute\("aria-valuetext", spokenAngle\(theta\)\)/);
});

test("reduced motion replaces continuous playback with a discrete step", () => {
  assert.match(appSource, /prefers-reduced-motion: reduce/);
  assert.match(appSource, /Step ¼ turn/);
  assert.match(appSource, /stepQuarterTurn\(\)/);
});

test("hidden-tab playback is stopped with an explicit state message", () => {
  assert.match(appSource, /document\.hidden && frameId !== null/);
  assert.match(appSource, /Animation paused because this tab became inactive/);
});

test("dynamic equations are constructed as DOM text rather than innerHTML", () => {
  assert.doesNotMatch(appSource, /innerHTML\s*=/);
  assert.match(appSource, /equationText\.replaceChildren/);
});

test("range preserves special-angle precision with deterministic keyboard increments", () => {
  assert.match(htmlSource, /id="angle-slider"[\s\S]*?step="any"/);
  assert.match(appSource, /ArrowRight: 0\.001/);
  assert.match(appSource, /PageUp: 0\.1/);
  assert.match(appSource, /event\.preventDefault\(\)/);
});

test("exact special angles lead with exact symbolic language rather than rounded equality", () => {
  assert.match(appSource, /exactly \$\{SPOKEN_SPECIAL_ANGLES\[exactLabel\]\} radians/);
  assert.match(appSource, /approximately \$\{theta\.toFixed\(3\)\} radians numerically/);
  assert.doesNotMatch(appSource, /\$\{theta\.toFixed\(3\)\} radians, exactly/);
});

test("special-angle presets expose persistent selected state", () => {
  assert.match(htmlSource, /data-angle="3\.141592653589793" aria-pressed="false"/);
  assert.match(appSource, /syncPresetButtons\(theta\)/);
  assert.match(appSource, /button\.setAttribute\("aria-pressed"/);
});

test("special-angle group is programmatically named", () => {
  assert.match(htmlSource, /class="preset-group" role="group" aria-label="Special angles"/);
});

test("social image alternative metadata is unique", () => {
  assert.equal((htmlSource.match(/name="twitter:image:alt"/g) || []).length, 1);
});

test("controls fail closed until JavaScript initializes", () => {
  assert.match(htmlSource, /id="angle-slider"[^>]*disabled/);
  assert.match(htmlSource, /id="play-button"[^>]*disabled/);
  assert.match(htmlSource, /id="reset-button"[^>]*disabled/);
  assert.match(htmlSource, /id="explain-button"[^>]*disabled/);
  assert.match(appSource, /control\.disabled = false/);
});
