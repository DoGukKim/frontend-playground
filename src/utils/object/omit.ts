/**
 * 객체에서 지정된 키들을 제외한 새 객체를 반환합니다.
 * @param obj - 원본 객체
 * @param keys - 제외할 키 배열
 * @returns 지정된 키가 제외된 새 객체
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { b: 2 }
 */
export function omit<O extends Record<PropertyKey, any>, K extends keyof O>(
  obj: O,
  keys: K[]
) {
  const result = { ...obj };

  for (let i = 0; i < keys.length; i++) {
    delete result[keys[i]];
  }

  return result as Omit<O, K>;
}
