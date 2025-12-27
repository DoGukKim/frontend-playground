/** 디바운스된 함수의 타입 정의 */
interface DebouncedFunction<F extends (...args: any[]) => any> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): void;
  /** 대기 중인 함수 호출을 취소 */
  cancel: () => void;
}

/**
 * 함수 호출을 지연시키고, 연속 호출 시 마지막 호출만 실행
 * @param func - 디바운스할 함수
 * @param debounceMs - 지연 시간(ms)
 * @returns 디바운스된 함수 (cancel 메서드 포함)
 * @example
 * const debouncedSearch = debounce(search, 300);
 * debouncedSearch('query'); // 300ms 후 실행
 * debouncedSearch.cancel(); // 실행 취소
 */
export function debounce<F extends (...args: any[]) => any>(
  func: F,
  debounceMs: number
): DebouncedFunction<F> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const debounced = function (
    this: ThisParameterType<F>,
    ...args: Parameters<F>
  ) {
    cancel();

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, debounceMs);
  };

  debounced.cancel = cancel;

  return debounced;
}
