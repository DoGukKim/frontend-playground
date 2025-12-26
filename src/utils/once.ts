/**
 * 주어진 함수를 한 번만 실행하고 결과를 캐싱하는 고차 함수입니다.
 * 이후 호출에서는 캐싱된 결과를 반환합니다.
 *
 * @template F - 래핑할 함수의 타입
 * @param func - 한 번만 실행할 함수
 * @returns 첫 번째 호출 결과를 캐싱하여 반환하는 래핑된 함수
 *
 * @remarks
 * - 첫 번째 호출 이후 원본 함수 참조가 해제되어 가비지 컬렉션이 가능합니다.
 * - `this` 컨텍스트가 올바르게 보존됩니다.
 * - 원본 함수가 에러를 던져도 호출된 것으로 간주되며, 이후 호출에서는 `undefined`를 반환합니다.
 * - 이후 호출 시 전달된 인자는 무시되고 첫 번째 호출의 결과만 반환됩니다.
 *
 * @example 기본 사용법
 * ```typescript
 * const expensiveOperation = once(() => {
 *   console.log('이 로그는 한 번만 출력됩니다');
 *   return Math.random();
 * });
 *
 * expensiveOperation(); // 로그 출력, 랜덤 값 반환
 * expensiveOperation(); // 로그 없음, 동일한 캐싱된 값 반환
 * ```
 *
 * @example this 컨텍스트 보존
 * ```typescript
 * const obj = {
 *   value: 42,
 *   getValue: once(function() {
 *     return this.value;
 *   }),
 * };
 *
 * obj.getValue(); // 42
 * ```
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
