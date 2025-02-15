// 必要によって書き換え
const BASE_URL = "http://43.207.166.13";

// 対象URLを作成する
export function url(path) {
  return `${BASE_URL}${path}`;
}
