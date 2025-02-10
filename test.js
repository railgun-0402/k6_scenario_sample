import http from "k6/http";

const BASE_URL = "http://13.231.219.179";

export default function () {
  http.get(`${BASE_URL}`);
}
