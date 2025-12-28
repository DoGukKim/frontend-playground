interface ThrottledFunction<F extends (...args: any[]) => any> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): void;
  cancel: () => void;
}

export function throttle<F extends (...args: any[]) => any>(
  func: F,
  throttleMs: number
): ThrottledFunction<F> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const throttled = function (
    this: ThisParameterType<F>,
    ...args: Parameters<F>
  ) {
    if (timeoutId) return;

    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, throttleMs);
  };

  throttled.cancel = cancel;

  return throttled;
}
