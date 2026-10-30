import assert from "node:assert/strict";
import test from "node:test";

import {
  addPhasors,
  equalAmplitudeSum,
  magnitude,
  unitPhasor,
} from "../experience/modules/phasor.js";

const TOLERANCE = 1e-12;

function close(actual, expected, tolerance = TOLERANCE) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    String(actual) + " is not within " + String(tolerance) + " of " + String(expected)
  );
}

test("unitPhasor stays on the unit circle", () => {
  for (const phase of [0, 0.5, Math.PI, 2 * Math.PI]) {
    close(magnitude(unitPhasor(phase)), 1);
  }
});

test("equal phasors reinforce at zero phase", () => {
  const result = equalAmplitudeSum(0);
  close(result.sum.real, 2);
  close(result.sum.imaginary, 0);
  close(result.magnitude, 2);
});

test("equal phasors cancel at pi phase", () => {
  const result = equalAmplitudeSum(Math.PI);
  close(result.sum.real, 0);
  close(result.sum.imaginary, 0);
  close(result.magnitude, 0);
});

test("quarter-phase sum has magnitude square root two", () => {
  const result = equalAmplitudeSum(Math.PI / 2);
  close(result.magnitude, Math.sqrt(2));
});

test("addPhasors adds components", () => {
  const result = addPhasors(
    { real: 2, imaginary: -1 },
    { real: -0.5, imaginary: 3 }
  );
  close(result.real, 1.5);
  close(result.imaginary, 2);
});
