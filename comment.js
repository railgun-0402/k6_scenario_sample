// k6からhttp処理等のmoduleをimport
import http from "k6/http";
import { check } from "k6";
import { parseHTML } from "k6/html";
// 共通URL
import { url } from "./config.js";

export default function () {
  // /loginへアカウント名とPWを送信する
  const login_res = http.post(url("/login"), {
    account_name: "terra",
    password: "terraterra",
  });

  // レスポンスのステータスコードが200かどうか
  check(login_res, {
    "is status 200": (r) => r.status === 200,
  });

  // ログインが成功したら、アカウント名を取得
  const res = http.get(url("/@terra"));

  const doc = parseHTML(res.body);

  // フォームのhiddenからcsrf_token, post_idを持ってくる
  const token = doc.find('input[name="csrf_token"]').first().attr("value");
  const post_id = doc.find('input[name="post_id"]').first().attr("value");

  // /commentに対して、post_id, csrf_tokenとともにコメント本文をPOST
  const comment_res = http.post(url("/comment"), {
    post_id: post_id,
    csrf_token: token,
    comment: "Hello k6!!!!",
  });
  check(comment_res, {
    is_status_200: (r) => r.status === 200,
  });
}
