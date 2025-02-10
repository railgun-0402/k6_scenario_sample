// 必要によって書き換え
const BASE_URL = "http://13.231.219.179";

// 対象URLを作成する
export function url(path) {
  return `${BASE_URL}${path}`;
}
