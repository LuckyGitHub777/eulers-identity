const CLEAN_EPSILON = 1e-12;

function clean(value) {
  return Math.abs(value) <= CLEAN_EPSILON ? 0 : value;
}

export function unitPhasor(angle) {
  const theta = Number(angle);
  return {
    real: clean(Math.cos(theta)),
    imaginary: clean(Math.sin(theta)),
  };
}

export function addPhasors(first, second) {
  return {
    real: clean(first.real + second.real),
    imaginary: clean(first.imaginary + second.imaginary),
  };
}

export function magnitude(phasor) {
  return Math.hypot(phasor.real, phasor.imaginary);
}

export function equalAmplitudeSum(relativePhase) {
  const first = { real: 1, imaginary: 0 };
  const second = unitPhasor(relativePhase);
  const sum = addPhasors(first, second);
  return {
    first,
    second,
    sum,
    magnitude: clean(magnitude(sum)),
  };
}
