const CLEAN_EPSILON = 1e-12;

function clean(value) {
  return Math.abs(value) <= CLEAN_EPSILON ? 0 : value;
}

export function rotationMatrix(theta) {
  const angle = Number(theta);
  const cosine = clean(Math.cos(angle));
  const sine = clean(Math.sin(angle));
  return [
    [cosine, -sine],
    [sine, cosine],
  ];
}

export function rotateVector(x, y, theta) {
  const matrix = rotationMatrix(theta);
  const vx = Number(x);
  const vy = Number(y);

  return {
    x: clean(matrix[0][0] * vx + matrix[0][1] * vy),
    y: clean(matrix[1][0] * vx + matrix[1][1] * vy),
    matrix,
  };
}

export function determinant(matrix) {
  return clean(
    matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
  );
}
