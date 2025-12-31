/**
 * 조건을 만족하는 첫 번째 키를 반환합니다.
 * @param obj - 검색할 객체
 * @param predicate - 각 속성에 대해 호출되는 조건 함수
 * @returns 조건을 만족하는 첫 번째 키, 없으면 undefined
 * @example
 * findKey({ a: 1, b: 2 }, (v) => v === 2) // 'b'
 */
export function findKey<T extends Record<PropertyKey, any>>(
  obj: T,
  predicate: (value: any, key: keyof T, obj: T) => boolean
): keyof T | undefined {
  const keys = Object.keys(obj) as Array<keyof T>;

  return keys.find((key) => predicate(obj[key], key, obj));
}
