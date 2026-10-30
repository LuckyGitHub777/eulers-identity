import {
  equalAmplitudeSum,
} from "./modules/phasor.js";

document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

const SCALE = 70;

const lab = document.querySelector("#phase-lab");
const skipLink = document.querySelector(".skip-link");
const slider = document.querySelector("#phase-slider");
const presetButtons = document.querySelectorAll("[data-phase]");

const firstLine = document.querySelector("#phase-first");
const secondLine = document.querySelector("#phase-second");
const sumLine = document.querySelector("#phase-sum");

const phaseValue = document.querySelector("#phase-value");
const firstValue = document.querySelector("#phase-first-value");
const secondValue = document.querySelector("#phase-second-value");
const sumValue = document.querySelector("#phase-sum-value");
const magnitudeValue = document.querySelector("#phase-magnitude-value");
const explanationText = document.querySelector("#phase-explanation-text");
const equationText = document.querySelector("#phase-equation-text");
const liveStatus = document.querySelector("#phase-live-status");

skipLink.addEventListener("click", () => {
  window.requestAnimationFrame(() => {
    lab.focus({ preventScroll: true });
  });
});

function format(value) {
  const cleaned = Math.abs(value) < 5e-13 ? 0 : value;
  return cleaned.toFixed(3);
}

function complexText(value) {
  const sign = value.imaginary < 0 ? "−" : "+";
  return format(value.real) + " " + sign + " " + format(Math.abs(value.imaginary)) + "i";
}

function setVector(line, value) {
  line.setAttribute("x2", value.real * SCALE);
  line.setAttribute("y2", -value.imaginary * SCALE);
}

function explanationFor(phase) {
  const tolerance = 1e-12;
  if (Math.abs(phase) <= tolerance || Math.abs(phase - 2 * Math.PI) <= tolerance) {
    return "The equal phasors are aligned, so they reinforce to magnitude 2.";
  }
  if (Math.abs(phase - Math.PI) <= tolerance) {
    return "The equal phasors are opposite. Their vector sum is exactly zero.";
  }
  return "Changing relative phase changes the direction and magnitude of the vector sum.";
}

function update(options = {}) {
  const phase = Number(slider.value);
  const result = equalAmplitudeSum(phase);

  setVector(firstLine, result.first);
  setVector(secondLine, result.second);
  setVector(sumLine, result.sum);

  phaseValue.textContent = phase.toFixed(3) + " rad";
  firstValue.textContent = complexText(result.first);
  secondValue.textContent = complexText(result.second);
  sumValue.textContent = complexText(result.sum);
  magnitudeValue.textContent = format(result.magnitude);
  explanationText.textContent = explanationFor(phase);
  equationText.textContent =
    "1 + e^(i·" + phase.toFixed(3) + ") = " + complexText(result.sum);

  if (options.announce) {
    liveStatus.textContent =
      "Relative phase " + phase.toFixed(3) + " radians. Sum magnitude " +
      format(result.magnitude) + ".";
  }
}

slider.addEventListener("input", () => update());

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    slider.value = button.dataset.phase;
    update({ announce: true });
  });
});

update();
