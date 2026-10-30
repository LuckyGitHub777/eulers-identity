import assert from "node:assert/strict";
import test from "node:test";

import {
  clampAngle,
  describeAngle,
  formatSignedImaginary,
  pointAt,
  specialAngleLabel,
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

test("clampAngle keeps finite values within zero and two pi", () => {
  assert.equal(clampAngle(-1), 0);
  assert.equal(clampAngle(20), 2 * Math.PI);
  assert.equal(clampAngle(Math.PI), Math.PI);
});

test("clampAngle rejects non-finite values instead of propagating NaN", () => {
  for (const value of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
    assert.throws(() => clampAngle(value), TypeError);
  }
});

test("specialAngleLabel identifies exact special angles", () => {
  assert.equal(specialAngleLabel(0), "0");
  assert.equal(specialAngleLabel(Math.PI / 2), "π/2");
  assert.equal(specialAngleLabel(Math.PI), "π");
  assert.equal(specialAngleLabel((3 * Math.PI) / 2), "3π/2");
  assert.equal(specialAngleLabel(2 * Math.PI), "2π");
});

test("nearby slider values are not mislabeled as exact special angles", () => {
  assert.equal(specialAngleLabel(3.14), null);
  assert.equal(specialAngleLabel(Math.PI - 0.001), null);
  assert.equal(specialAngleLabel(Math.PI + 0.001), null);
  assert.equal(specialAngleLabel(Math.PI + 1e-12), null);
  assert.match(describeAngle(3.14), /^≈ /);
  assert.notEqual(describeAngle(3.14), "π");
});

test("describeAngle distinguishes exact and approximate representations", () => {
  assert.equal(describeAngle(Math.PI), "π");
  assert.equal(describeAngle(Math.PI / 2), "π/2");
  assert.match(describeAngle(1), /^≈ 0\.3183π$/);
});

test("formatSignedImaginary cleans zero and preserves sign", () => {
  assert.equal(formatSignedImaginary(0), "+ 0.000i");
  assert.equal(formatSignedImaginary(0.5), "+ 0.500i");
  assert.equal(formatSignedImaginary(-0.5), "− 0.500i");
});
