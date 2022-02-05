// export const BASE_URL = "http://152.136.185.210:5000";
// export const TIMEOUT = 10000;
// loading show or hide
export const DEFAULT_IS_SHOW_LOADING = true;
let BASE_URL: string;
const TIME_OUT = 5000;

if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://152.136.185.210:4000";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://152.136.185.210:4000";
} else {
  // test环境
  BASE_URL = "http://";
}
const NOT_FOUND_PAGE_PATH = "/not-found";
export { TIME_OUT, BASE_URL, NOT_FOUND_PAGE_PATH };
