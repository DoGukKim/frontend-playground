/**
 * 함수 실행 횟수를 n - 1번으로 제한합니다.
 * @param n - 제한 횟수 (n - 1번까지만 실행)
 * @param func - 실행할 함수
 * @returns n번째 호출부터는 undefined 반환
 */
export function before<F extends (...args: any[]) => any>(
  n: number,
  func: F
): (...args: Parameters<F>) => ReturnType<F> | undefined {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n must be a non-negative integer.");
  }

  let count = 0;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (++count < n) {
      return func.apply(this, args);
    }

    return undefined;
  };
}
