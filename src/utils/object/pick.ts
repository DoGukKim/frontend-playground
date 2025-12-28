/**
 * 객체에서 지정한 키만 선택하여 새 객체 반환
 * @template T - 원본 객체 타입
 * @template K - 선택할 키 타입
 * @param obj - 원본 객체
 * @param keys - 선택할 키 배열
 * @returns 선택된 키만 포함된 새 객체
 * @example
 * pick({ name: "John", age: 30 }, ["name"]) // { name: "John" }
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: readonly K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (Object.hasOwn(obj, key)) {
      result[key] = obj[key];
    }
  }

  return result;
}
