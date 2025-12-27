/**
 * n번째 호출부터 함수를 실행합니다.
 * @param n - 실행 시작 횟수 (n번째 호출부터 실행)
 * @param func - 실행할 함수
 * @returns n번째 호출 전까지는 undefined 반환
 */
export function after<F extends (...args: any[]) => any>(
  n: number,
  func: F
): (...args: Parameters<F>) => ReturnType<F> | undefined {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n must be a non-negative integer.");
  }

  let count = 0;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (++count >= n) {
      return func.apply(this, args);
    }

    return undefined;
  };
}
