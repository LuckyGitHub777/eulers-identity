import {
  clampAngle,
  describeAngle,
  formatSignedImaginary,
  pointAt,
} from "./modules/unit-circle.js";

const slider = document.querySelector("#angle-slider");
const rotatingPoint = document.querySelector("#rotating-point");
const radiusVector = document.querySelector("#radius-vector");
const realProjection = document.querySelector("#real-projection");
const imagProjection = document.querySelector("#imag-projection");
const additionVector = document.querySelector("#addition-vector");
const additionLabel = document.querySelector("#addition-label");
const originPoint = document.querySelector("#origin-point");

const angleValue = document.querySelector("#angle-value");
const realValue = document.querySelector("#real-value");
const imagValue = document.querySelector("#imag-value");
const complexValue = document.querySelector("#complex-value");
const magnitudeValue = document.querySelector("#magnitude-value");
const explanationRegion = document.querySelector(".explanation");
const explanationText = document.querySelector("#explanation-text");
const equationText = document.querySelector("#equation-text");

const playButton = document.querySelector("#play-button");
const resetButton = document.querySelector("#reset-button");
const explainButton = document.querySelector("#explain-button");
const presetButtons = document.querySelectorAll("[data-angle]");

const skipLink = document.querySelector(".skip-link");
const experience = document.querySelector("#experience");

skipLink.addEventListener("click", () => {
  window.requestAnimationFrame(() => {
    experience.focus({ preventScroll: true });
  });
});

let frameId = null;
let previousTimestamp = null;
let explanationStep = 0;

function setLine(line, x1, y1, x2, y2) {
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
}

function update(angle, { preserveExplanation = false } = {}) {
  const theta = clampAngle(angle);
  slider.value = String(theta);
  slider.setAttribute(
    "aria-valuetext",
    `${theta.toFixed(3)} radians, ${describeAngle(theta)}`
  );
  const point = pointAt(theta);

  rotatingPoint.setAttribute("cx", point.x);
  rotatingPoint.setAttribute("cy", point.y);

  setLine(radiusVector, 0, 0, point.x, point.y);
  setLine(realProjection, 0, 0, point.x, 0);
  setLine(imagProjection, point.x, 0, point.x, point.y);

  angleValue.textContent = `${theta.toFixed(3)} rad (${describeAngle(theta)})`;
  realValue.textContent = point.real.toFixed(3);
  imagValue.textContent = point.imaginary.toFixed(3);
  complexValue.textContent =
    `${point.real.toFixed(3)} ${formatSignedImaginary(point.imaginary)}`;
  magnitudeValue.textContent = point.magnitude.toFixed(3);

  if (!preserveExplanation) {
    explanationStep = 0;
    additionVector.classList.add("hidden");
    additionLabel.classList.add("hidden");
    originPoint.classList.add("hidden");
    explanationText.textContent =
      "The real part is cos θ and the imaginary part is sin θ.";
    equationText.innerHTML =
      `e<sup>i·${describeAngle(theta)}</sup> = ` +
      `${point.real.toFixed(3)} ${formatSignedImaginary(point.imaginary)}`;
    explainButton.textContent = "Explain Euler’s identity";
  }
}

function stopPlayback({ announce = false } = {}) {
  const wasPlaying = frameId !== null;

  if (wasPlaying) {
    cancelAnimationFrame(frameId);
  }

  frameId = null;
  previousTimestamp = null;
  playButton.textContent = "Play";

  if (wasPlaying) {
    explanationRegion.setAttribute("aria-live", "polite");

    if (announce) {
      const theta = Number(slider.value);
      explanationText.textContent =
        `Animation paused at ${describeAngle(theta)} ` +
        `(${theta.toFixed(3)} radians).`;
    }
  }
}

function animate(timestamp) {
  if (previousTimestamp === null) {
    previousTimestamp = timestamp;
  }

  const elapsedSeconds = (timestamp - previousTimestamp) / 1000;
  previousTimestamp = timestamp;

  let nextAngle = Number(slider.value) + elapsedSeconds * 0.8;
  if (nextAngle > 2 * Math.PI) {
    nextAngle = 0;
  }

  update(nextAngle);
  frameId = requestAnimationFrame(animate);
}

function togglePlayback() {
  if (frameId !== null) {
    stopPlayback({ announce: true });
    return;
  }

  explanationStep = 0;
  additionVector.classList.add("hidden");
  additionLabel.classList.add("hidden");
  originPoint.classList.add("hidden");
  explanationRegion.setAttribute("aria-live", "off");
  explanationText.textContent = "Animation running. Press Pause to stop.";
  playButton.textContent = "Pause";
  frameId = requestAnimationFrame(animate);
}

function resetExperience() {
  stopPlayback();
  explanationStep = 0;
  additionVector.classList.add("hidden");
  additionLabel.classList.add("hidden");
  originPoint.classList.add("hidden");
  explanationText.textContent =
    "Start at 1 on the real axis. Move the slider or choose a special angle.";
  equationText.innerHTML = "e<sup>i·0</sup> = 1";
  explainButton.textContent = "Explain Euler’s identity";
  update(0, { preserveExplanation: true });
}

function explainIdentity() {
  stopPlayback();
  explanationStep = (explanationStep % 3) + 1;

  if (explanationStep === 1) {
    additionVector.classList.add("hidden");
    additionLabel.classList.add("hidden");
    originPoint.classList.add("hidden");
    update(0, { preserveExplanation: true });
    explanationText.textContent =
      "Step 1 of 3: Begin at 1 on the positive real axis.";
    equationText.innerHTML = "e<sup>i·0</sup> = 1";
    explainButton.textContent = "Next: rotate by π";
    return;
  }

  if (explanationStep === 2) {
    additionVector.classList.add("hidden");
    additionLabel.classList.add("hidden");
    originPoint.classList.add("hidden");
    update(Math.PI, { preserveExplanation: true });
    explanationText.textContent =
      "Step 2 of 3: A half-turn, π radians, carries 1 to −1.";
    equationText.innerHTML = "e<sup>iπ</sup> = −1";
    explainButton.textContent = "Next: add 1";
    return;
  }

  update(Math.PI, { preserveExplanation: true });
  additionVector.classList.remove("hidden");
  additionLabel.classList.remove("hidden");
  originPoint.classList.remove("hidden");
  explanationText.textContent =
    "Step 3 of 3: Add 1 to −1. The result is exactly zero.";
  equationText.innerHTML = "e<sup>iπ</sup> + 1 = −1 + 1 = 0";
  explainButton.textContent = "Start again";
}

slider.addEventListener("input", () => {
  stopPlayback();
  update(Number(slider.value));
});

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    stopPlayback();
    update(Number(button.dataset.angle));
  });
});

playButton.addEventListener("click", togglePlayback);
resetButton.addEventListener("click", resetExperience);
explainButton.addEventListener("click", explainIdentity);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopPlayback();
  }
});

resetExperience();
