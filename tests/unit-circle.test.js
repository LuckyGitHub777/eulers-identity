import assert from "node:assert/strict";
import test from "node:test";

import {
  clampAngle,
  describeAngle,
  formatSignedImaginary,
  pointAt,
} from "../experience/modules/unit-circle.js";

const TOLERANCE = 1e-12;

function close(actual, expected, tolerance = TOLERANCE) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${actual} is not within ${tolerance} of ${expected}`
  );
}

test("pointAt returns the five cardinal unit-circle values", () => {
  const cases = [
    [0, 1, 0],
    [Math.PI / 2, 0, 1],
    [Math.PI, -1, 0],
    [(3 * Math.PI) / 2, 0, -1],
    [2 * Math.PI, 1, 0],
  ];

  for (const [angle, expectedReal, expectedImaginary] of cases) {
    const point = pointAt(angle);
    close(point.real, expectedReal);
    close(point.imaginary, expectedImaginary);
    close(point.magnitude, 1);
  }
});

test("pointAt uses cleaned coordinates for SVG geometry", () => {
  const point = pointAt(Math.PI);
  assert.equal(point.imaginary, 0);
  assert.equal(point.y, 0);
});

test("clampAngle keeps values within zero and two pi", () => {
  assert.equal(clampAngle(-1), 0);
  assert.equal(clampAngle(20), 2 * Math.PI);
  assert.equal(clampAngle(Math.PI), Math.PI);
});

test("describeAngle identifies the special angles", () => {
  assert.equal(describeAngle(0), "0");
  assert.equal(describeAngle(Math.PI / 2), "π/2");
  assert.equal(describeAngle(Math.PI), "π");
  assert.equal(describeAngle((3 * Math.PI) / 2), "3π/2");
  assert.equal(describeAngle(2 * Math.PI), "2π");
});

test("formatSignedImaginary cleans zero and preserves sign", () => {
  assert.equal(formatSignedImaginary(0), "+ 0.000i");
  assert.equal(formatSignedImaginary(0.5), "+ 0.500i");
  assert.equal(formatSignedImaginary(-0.5), "− 0.500i");
});
