export function isHigher(v1, v2) {
  const _v1 = v1.split('.');
  const _v2 = v2.split('.');

  return (
    [0, 1, 2].filter((i) => {
      const num1 = parseInt(_v1[i] ?? 0, 10);
      const num2 = parseInt(_v2[i] ?? 0, 10);
      return num1 > num2;
    }).length !== 0
  );
}
