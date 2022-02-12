import { Request } from "./request";
import { BASE_URL, TIME_OUT } from "../constant/index";
import { localCache } from "@/utils";

export default new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      // 携带token
      config.headers!.Authorization = `Bearer ${localCache.getCache<string>(
        "token"
      )}`;
      return config;
    },
    requestInterceptorCatch: (error) => {
      return error;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (error) => {
      return error;
    }
  }
});
