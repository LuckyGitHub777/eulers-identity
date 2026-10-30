import assert from "node:assert/strict";
import test from "node:test";

import {
  determinant,
  rotateVector,
  rotationMatrix,
} from "../experience/modules/matrix-rotation.js";

const TOLERANCE = 1e-12;

function close(actual, expected, tolerance = TOLERANCE) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    String(actual) + " is not within " + String(tolerance) + " of " + String(expected)
  );
}

test("rotationMatrix returns identity at zero", () => {
  assert.deepEqual(rotationMatrix(0), [[1, 0], [0, 1]]);
});

test("rotationMatrix returns negative identity at pi", () => {
  assert.deepEqual(rotationMatrix(Math.PI), [[-1, 0], [0, -1]]);
});

test("rotateVector performs a quarter turn", () => {
  const result = rotateVector(2, 3, Math.PI / 2);
  close(result.x, -3);
  close(result.y, 2);
});

test("rotation preserves vector length", () => {
  const x = 2.5;
  const y = -4.25;
  const result = rotateVector(x, y, 1.234);
  close(Math.hypot(result.x, result.y), Math.hypot(x, y));
});

test("rotation matrix determinant remains one", () => {
  for (const theta of [0, 0.5, Math.PI / 2, Math.PI, 2 * Math.PI]) {
    close(determinant(rotationMatrix(theta)), 1);
  }
});
