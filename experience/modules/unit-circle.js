const TAU = 2 * Math.PI;
const RADIUS = 110;
const CLEAN_EPSILON = 1e-10;
const SPECIAL_ANGLES = [
  [0, "0"],
  [Math.PI / 2, "π/2"],
  [Math.PI, "π"],
  [(3 * Math.PI) / 2, "3π/2"],
  [TAU, "2π"],
];

export function clampAngle(angle) {
  const numericAngle = Number(angle);
  if (!Number.isFinite(numericAngle)) {
    throw new TypeError("angle must be a finite number");
  }
  return Math.min(TAU, Math.max(0, numericAngle));
}

export function clean(value) {
  return Math.abs(value) < CLEAN_EPSILON ? 0 : value;
}

export function pointAt(angle) {
  const theta = clampAngle(angle);
  const real = clean(Math.cos(theta));
  const imaginary = clean(Math.sin(theta));
  return {
    real,
    imaginary,
    magnitude: Math.hypot(real, imaginary),
    x: RADIUS * real,
    y: imaginary === 0 ? 0 : -RADIUS * imaginary,
  };
}

function sameRepresentableAngle(left, right) {
  const scale = Math.max(1, Math.abs(left), Math.abs(right));
  const machineTolerance = 8 * Number.EPSILON * scale;
  return Math.abs(left - right) <= machineTolerance;
}

export function specialAngleLabel(angle) {
  const theta = clampAngle(angle);
  for (const [value, label] of SPECIAL_ANGLES) {
    if (sameRepresentableAngle(theta, value)) {
      return label;
    }
  }
  return null;
}

export function describeAngle(angle) {
  const theta = clampAngle(angle);
  const exactLabel = specialAngleLabel(theta);
  if (exactLabel !== null) {
    return exactLabel;
  }
  return `≈ ${(theta / Math.PI).toFixed(4)}π`;
}

export function formatSignedImaginary(value) {
  const cleaned = clean(value);
  return `${cleaned < 0 ? "−" : "+"} ${Math.abs(cleaned).toFixed(3)}i`;
}
