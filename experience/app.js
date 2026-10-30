import {
  clampAngle,
  describeAngle,
  formatSignedImaginary,
  pointAt,
  specialAngleLabel,
} from "./modules/unit-circle.js";

const TAU = 2 * Math.PI;
const QUARTER_TURN = Math.PI / 2;

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
const explanationText = document.querySelector("#explanation-text");
const equationText = document.querySelector("#equation-text");
const statusMessage = document.querySelector("#status-message");
const playButton = document.querySelector("#play-button");
const resetButton = document.querySelector("#reset-button");
const explainButton = document.querySelector("#explain-button");
const presetButtons = document.querySelectorAll("[data-angle]");
const skipLink = document.querySelector(".skip-link");
const experience = document.querySelector("#experience");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const interactiveControls = [
  slider,
  playButton,
  resetButton,
  explainButton,
  ...presetButtons,
];

let frameId = null;
let previousTimestamp = null;
let explanationStep = 0;

function setLine(line, x1, y1, x2, y2) {
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
}

function announceStatus(message) {
  statusMessage.textContent = message;
}

function setAdditionStage(active) {
  additionVector.classList.toggle("hidden", !active);
  additionLabel.classList.toggle("hidden", !active);
  originPoint.classList.toggle("hidden", !active);
  radiusVector.classList.toggle("deemphasized", active);
}

function complexDisplay(point) {
  return `${point.real.toFixed(3)} ${formatSignedImaginary(point.imaginary)}`;
}

const SPOKEN_SPECIAL_ANGLES = {
  "0": "zero",
  "π/2": "pi over two",
  "π": "pi",
  "3π/2": "three pi over two",
  "2π": "two pi",
};

function spokenAngle(theta) {
  const exactLabel = specialAngleLabel(theta);
  if (exactLabel !== null) {
    if (exactLabel === "0") {
      return "exactly zero radians";
    }
    return (
      `exactly ${SPOKEN_SPECIAL_ANGLES[exactLabel]} radians, ` +
      `approximately ${theta.toFixed(3)} radians numerically`
    );
  }
  return `${theta.toFixed(3)} radians, approximately ${(theta / Math.PI).toFixed(4)} pi`;
}

function visualAngle(theta) {
  const exactLabel = specialAngleLabel(theta);
  if (exactLabel === "0") {
    return "0 rad";
  }
  if (exactLabel !== null) {
    return `${exactLabel} rad (≈ ${theta.toFixed(3)})`;
  }
  return `${theta.toFixed(3)} rad (${describeAngle(theta)})`;
}

function statusAngle(theta) {
  const exactLabel = specialAngleLabel(theta);
  if (exactLabel === "0") {
    return "0 radians";
  }
  if (exactLabel !== null) {
    return `${exactLabel} radians`;
  }
  return `${theta.toFixed(3)} radians (${describeAngle(theta)})`;
}

function syncPresetButtons(theta) {
  const exactLabel = specialAngleLabel(theta);
  presetButtons.forEach((button) => {
    const buttonLabel = specialAngleLabel(Number(button.dataset.angle));
    button.setAttribute("aria-pressed", String(buttonLabel === exactLabel && exactLabel !== null));
  });
}

function renderEquation(theta, point) {
  const exactLabel = specialAngleLabel(theta);
  const exponent = document.createElement("sup");
  const relation = exactLabel === null ? " ≈ " : " = ";

  if (exactLabel === null) {
    exponent.textContent = `i·${theta.toFixed(3)}`;
  } else if (exactLabel === "0") {
    exponent.textContent = "i·0";
  } else {
    exponent.textContent = `i${exactLabel}`;
  }

  equationText.replaceChildren(
    document.createTextNode("e"),
    exponent,
    document.createTextNode(`${relation}${complexDisplay(point)}`)
  );

  const spokenRelation = exactLabel === null ? "is approximately" : "equals";
  equationText.setAttribute(
    "aria-label",
    `e to the power i times ${spokenAngle(theta)} ${spokenRelation} ` +
      `${point.real.toFixed(3)} ${point.imaginary < 0 ? "minus" : "plus"} ` +
      `${Math.abs(point.imaginary).toFixed(3)} i`
  );
}

function update(angle, { preserveExplanation = false } = {}) {
  const theta = clampAngle(angle);
  slider.value = String(theta);
  slider.setAttribute("aria-valuetext", spokenAngle(theta));

  const point = pointAt(theta);
  rotatingPoint.setAttribute("cx", point.x);
  rotatingPoint.setAttribute("cy", point.y);
  setLine(radiusVector, 0, 0, point.x, point.y);
  setLine(realProjection, 0, 0, point.x, 0);
  setLine(imagProjection, point.x, 0, point.x, point.y);

  angleValue.textContent = visualAngle(theta);
  syncPresetButtons(theta);
  realValue.textContent = point.real.toFixed(3);
  imagValue.textContent = point.imaginary.toFixed(3);
  complexValue.textContent = complexDisplay(point);
  magnitudeValue.textContent = point.magnitude.toFixed(3);
  renderEquation(theta, point);

  if (!preserveExplanation) {
    explanationStep = 0;
    setAdditionStage(false);
    explanationText.textContent =
      "The real part is cos θ and the imaginary part is sin θ. " +
      "Non-special readouts use rounded numerical approximations.";
    explainButton.textContent = "Explain Euler’s identity";
  }
}

function syncPlayButton() {
  if (reducedMotionQuery.matches) {
    playButton.textContent = "Step ¼ turn";
    playButton.removeAttribute("aria-pressed");
    playButton.setAttribute(
      "aria-label",
      "Advance one quarter turn without continuous animation"
    );
    return;
  }

  const playing = frameId !== null;
  playButton.textContent = playing ? "Pause" : "Play";
  playButton.setAttribute("aria-pressed", String(playing));
  playButton.setAttribute(
    "aria-label",
    playing ? "Pause unit-circle animation" : "Play unit-circle animation"
  );
}

function stopPlayback({ message = null, announce = false } = {}) {
  const wasPlaying = frameId !== null;
  if (wasPlaying) {
    cancelAnimationFrame(frameId);
  }

  frameId = null;
  previousTimestamp = null;
  syncPlayButton();

  if (wasPlaying && message !== null) {
    explanationText.textContent = message;
    if (announce) {
      announceStatus(message);
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
  if (nextAngle > TAU) {
    nextAngle %= TAU;
  }

  update(nextAngle, { preserveExplanation: true });
  frameId = requestAnimationFrame(animate);
}

function stepQuarterTurn() {
  let nextAngle = Number(slider.value) + QUARTER_TURN;
  if (nextAngle > TAU) {
    nextAngle -= TAU;
  }
  update(nextAngle, { preserveExplanation: true });
  const message = `Reduced-motion mode: advanced one quarter turn to ${statusAngle(nextAngle)}.`;
  explanationText.textContent = message;
  announceStatus(message);
}

function togglePlayback() {
  if (reducedMotionQuery.matches) {
    stepQuarterTurn();
    return;
  }

  if (frameId !== null) {
    const theta = Number(slider.value);
    stopPlayback({
      message: `Animation paused at ${statusAngle(theta)}.`,
      announce: true,
    });
    return;
  }

  explanationStep = 0;
  setAdditionStage(false);
  explanationText.textContent = "Animation running. Press Pause to stop.";
  announceStatus("Animation started.");
  frameId = requestAnimationFrame(animate);
  syncPlayButton();
}

function resetExperience({ announce = false } = {}) {
  stopPlayback();
  explanationStep = 0;
  setAdditionStage(false);
  explanationText.textContent =
    "Start at 1 on the real axis. Move the slider or choose a special angle.";
  explainButton.textContent = "Explain Euler’s identity";
  update(0, { preserveExplanation: true });
  if (announce) {
    announceStatus("Experience reset to zero radians.");
  }
}

function announceExplanationStep() {
  announceStatus(`${explanationText.textContent} ${equationText.textContent}`);
}

function explainIdentity() {
  stopPlayback();
  explanationStep = (explanationStep % 3) + 1;

  if (explanationStep === 1) {
    setAdditionStage(false);
    update(0, { preserveExplanation: true });
    explanationText.textContent =
      "Step 1 of 3: Begin at 1 on the positive real axis.";
    explainButton.textContent = "Next: rotate by π";
    announceExplanationStep();
    return;
  }

  if (explanationStep === 2) {
    setAdditionStage(false);
    update(Math.PI, { preserveExplanation: true });
    explanationText.textContent =
      "Step 2 of 3: A half-turn, π radians, carries 1 to −1.";
    explainButton.textContent = "Next: add 1";
    announceExplanationStep();
    return;
  }

  update(Math.PI, { preserveExplanation: true });
  setAdditionStage(true);
  explanationText.textContent =
    "Step 3 of 3: Add 1 to −1. The result is exactly zero.";
  equationText.replaceChildren(
    document.createTextNode("e"),
    Object.assign(document.createElement("sup"), { textContent: "iπ" }),
    document.createTextNode(" + 1 = −1 + 1 = 0")
  );
  equationText.setAttribute(
    "aria-label",
    "e to the power i pi plus one equals negative one plus one equals zero"
  );
  explainButton.textContent = "Start again";
  announceExplanationStep();
}

function moveSliderBy(delta) {
  stopPlayback();
  update(clampAngle(Number(slider.value) + delta));
}

slider.addEventListener("keydown", (event) => {
  const keyActions = {
    ArrowLeft: -0.001,
    ArrowDown: -0.001,
    ArrowRight: 0.001,
    ArrowUp: 0.001,
    PageDown: -0.1,
    PageUp: 0.1,
  };

  if (event.key === "Home") {
    event.preventDefault();
    stopPlayback();
    update(0);
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    stopPlayback();
    update(TAU);
    return;
  }

  if (Object.hasOwn(keyActions, event.key)) {
    event.preventDefault();
    moveSliderBy(keyActions[event.key]);
  }
});

slider.addEventListener("input", () => {
  stopPlayback();
  update(Number(slider.value));
});

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    stopPlayback();
    const theta = Number(button.dataset.angle);
    update(theta);
    announceStatus(`Angle set to ${spokenAngle(theta)}.`);
  });
});

playButton.addEventListener("click", togglePlayback);
resetButton.addEventListener("click", () => resetExperience({ announce: true }));
explainButton.addEventListener("click", explainIdentity);

skipLink.addEventListener("click", () => {
  window.requestAnimationFrame(() => {
    experience.focus({ preventScroll: true });
  });
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden && frameId !== null) {
    const theta = Number(slider.value);
    stopPlayback({
      message: `Animation paused because this tab became inactive at ${statusAngle(theta)}.`,
      announce: true,
    });
  }
});

function handleReducedMotionChange() {
  if (reducedMotionQuery.matches && frameId !== null) {
    const theta = Number(slider.value);
    stopPlayback({
      message: `Animation paused because reduced motion is now enabled at ${statusAngle(theta)}.`,
      announce: true,
    });
  }
  syncPlayButton();
}

if (typeof reducedMotionQuery.addEventListener === "function") {
  reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
} else {
  reducedMotionQuery.addListener(handleReducedMotionChange);
}

interactiveControls.forEach((control) => {
  control.disabled = false;
});
resetExperience();
syncPlayButton();
