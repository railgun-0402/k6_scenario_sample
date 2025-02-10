import http from "k6/http";

import { sleep } from "k6";

import { url } from "./config.js";

// k6が実行する関数
// /initializeに10sのタイムアウトを指定してGETリクエストし、完了後に1秒間待機
export default function () {
  http.get(url("/initialize"), {
    timeout: "10s",
  });
  sleep(1);
}
