import {
  determinant,
  rotateVector,
} from "./modules/matrix-rotation.js";

document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

const SCALE = 110;
const MAX_DISPLAY_LENGTH = 1.25;

const lab = document.querySelector("#matrix-lab");
const skipLink = document.querySelector(".skip-link");
const vectorX = document.querySelector("#vector-x");
const vectorY = document.querySelector("#vector-y");
const angleSlider = document.querySelector("#matrix-angle-slider");
const presetButtons = document.querySelectorAll("[data-matrix-angle]");

const originalVector = document.querySelector("#original-vector");
const rotatedVector = document.querySelector("#rotated-vector");
const originalPoint = document.querySelector("#original-point");
const rotatedPoint = document.querySelector("#rotated-point");

const angleValue = document.querySelector("#matrix-angle-value");
const inputVectorValue = document.querySelector("#input-vector-value");
const rotatedVectorValue = document.querySelector("#rotated-vector-value");
const determinantValue = document.querySelector("#determinant-value");
const equationText = document.querySelector("#matrix-equation-text");
const explanationText = document.querySelector("#matrix-explanation-text");
const liveStatus = document.querySelector("#matrix-live-status");

skipLink.addEventListener("click", () => {
  window.requestAnimationFrame(() => {
    lab.focus({ preventScroll: true });
  });
});

function cleanDisplay(value) {
  return Math.abs(value) < 5e-13 ? 0 : value;
}

function format(value) {
  return cleanDisplay(value).toFixed(3);
}

function normalizedDisplayScale(x, y) {
  const magnitude = Math.hypot(x, y);
  if (magnitude === 0) {
    return 0;
  }
  return SCALE * Math.min(1, MAX_DISPLAY_LENGTH / magnitude);
}

function setVector(line, point, x, y, scale) {
  const svgX = x * scale;
  const svgY = -y * scale;
  line.setAttribute("x2", svgX);
  line.setAttribute("y2", svgY);
  point.setAttribute("cx", svgX);
  point.setAttribute("cy", svgY);
}

function explanationFor(theta) {
  const tolerance = 1e-12;
  if (Math.abs(theta) <= tolerance || Math.abs(theta - 2 * Math.PI) <= tolerance) {
    return "A full-turn multiple leaves the vector in its original direction.";
  }
  if (Math.abs(theta - Math.PI / 2) <= tolerance) {
    return "A quarter-turn maps (x, y) to (−y, x).";
  }
  if (Math.abs(theta - Math.PI) <= tolerance) {
    return "A half-turn maps every vector to its negative.";
  }
  if (Math.abs(theta - (3 * Math.PI) / 2) <= tolerance) {
    return "Three quarter-turns map (x, y) to (y, −x).";
  }
  return "The matrix preserves length and rotates the vector counterclockwise.";
}

function update(options = {}) {
  const x = Number(vectorX.value);
  const y = Number(vectorY.value);
  const theta = Number(angleSlider.value);

  const safeX = Number.isFinite(x) ? x : 0;
  const safeY = Number.isFinite(y) ? y : 0;
  const result = rotateVector(safeX, safeY, theta);
  const matrix = result.matrix;
  const scale = normalizedDisplayScale(safeX, safeY);

  setVector(originalVector, originalPoint, safeX, safeY, scale);
  setVector(rotatedVector, rotatedPoint, result.x, result.y, scale);

  angleValue.textContent = theta.toFixed(3) + " rad";
  inputVectorValue.textContent = "(" + format(safeX) + ", " + format(safeY) + ")";
  rotatedVectorValue.textContent =
    "(" + format(result.x) + ", " + format(result.y) + ")";
  determinantValue.textContent = format(determinant(matrix));
  equationText.textContent =
    "R(" + theta.toFixed(3) + ") = [[" +
    format(matrix[0][0]) + ", " + format(matrix[0][1]) + "], [" +
    format(matrix[1][0]) + ", " + format(matrix[1][1]) + "]]";
  explanationText.textContent = explanationFor(theta);

  if (options.announce) {
    liveStatus.textContent =
      "Rotated vector is " + format(result.x) + ", " + format(result.y) +
      ". Determinant " + format(determinant(matrix)) + ".";
  }
}

vectorX.addEventListener("input", () => update());
vectorY.addEventListener("input", () => update());
angleSlider.addEventListener("input", () => update());

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    angleSlider.value = button.dataset.matrixAngle;
    update({ announce: true });
  });
});

update();
