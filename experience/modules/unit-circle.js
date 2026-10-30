const TAU = 2 * Math.PI;
const RADIUS = 110;
const CLEAN_EPSILON = 1e-10;
const SPECIAL_ANGLE_EPSILON = 1e-12;

export function clampAngle(angle) {
  return Math.min(TAU, Math.max(0, Number(angle)));
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

export function describeAngle(angle) {
  const theta = clampAngle(angle);
  const specialAngles = [
    [0, "0"],
    [Math.PI / 2, "π/2"],
    [Math.PI, "π"],
    [(3 * Math.PI) / 2, "3π/2"],
    [TAU, "2π"],
  ];

  for (const [value, label] of specialAngles) {
    if (Math.abs(theta - value) <= SPECIAL_ANGLE_EPSILON) {
      return label;
    }
  }

  return `≈${(theta / Math.PI).toFixed(3)}π`;
}

export function formatSignedImaginary(value) {
  const cleaned = clean(value);
  return `${cleaned < 0 ? "−" : "+"} ${Math.abs(cleaned).toFixed(3)}i`;
}
