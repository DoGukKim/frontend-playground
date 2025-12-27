/**
 * 함수를 한 번만 실행하고 결과를 캐싱합니다.
 * @param func - 한 번만 실행할 함수
 * @returns 이후 호출 시 캐싱된 결과 반환
 */
export function once<F extends (...args: any[]) => any>(func: F): F {
  let called = false;
  let cache: ReturnType<F>;
  let fn: F | null = func;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (!called) {
      called = true;
      cache = fn!.apply(this, args);
      fn = null;
    }

    return cache;
  } as F;
}
