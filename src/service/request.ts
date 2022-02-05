import { nextTick } from "vue";
import Axios from "axios";
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import { ElLoading } from "element-plus";
import { DEFAULT_IS_SHOW_LOADING } from "@/constant";

/**
 * 定义接口，里面可以传入参数，也就是axios的拦截器函数
 *
 * @interface RequestConfigInterceptors
 */
interface RequestConfigInterceptors<T = AxiosResponse> {
  /**
   * 请求拦截器
   *
   * @memberof RequestConfigInterceptors
   */
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  /**
   * 请求发送错误的拦截器
   *
   * @memberof RequestConfigInterceptors
   */
  requestInterceptorCatch?: (error: any) => any;
  /**
   * 响应拦截
   *
   * @memberof RequestConfigInterceptors
   */
  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse;
  responseInterceptor?: (res: T) => T;
  /**
   * 响应发送错误时拦截器
   *
   * @memberof RequestConfigInterceptors
   */
  responseInterceptorCatch?: (error: any) => any;
}
interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestConfigInterceptors<T>;
  showLoading?: boolean;
}

export class Request {
  private instance: AxiosInstance;
  private interceptors?: RequestConfigInterceptors;
  private loading!: any;
  private isShowLoading: boolean;
  constructor(config: RequestConfig) {
    this.instance = Axios.create(config);
    this.isShowLoading = config?.showLoading ?? DEFAULT_IS_SHOW_LOADING; // 默认显示loading
    this.interceptors = config.interceptors;
    this.registerGlobalInterceptors(config);
    this.registerInterceptors();
  }

  private registerInterceptors() {
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
  }
  /**
   * 注册全局拦截器
   */
  private registerGlobalInterceptors(config: RequestConfig) {
    this.instance.interceptors.request.use(
      (config: RequestConfig) => {
        // 显示请求 loading
        if (this.isShowLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求！",
            spinner: "",
            background: "rgba(0,0,0,.3)"
          });
        }
        return config;
      },
      (err) => err
    );
    this.instance.interceptors.response.use(
      (res) => {
        // 关闭 loading
        nextTick(() => this.loading?.close());
        // TODO  数据解包
        return res.data;
      },
      (err) => {
        // 关闭 loading
        nextTick(() => this.loading?.close());
        return err;
      }
    );
  }
  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // 独立请求的拦截器 在请求之前执行
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 当前请求是否显示 loading
      if (config.showLoading === !DEFAULT_IS_SHOW_LOADING)
        this.isShowLoading = !DEFAULT_IS_SHOW_LOADING;
      // 发起请求
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求的响应拦截
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // res 已经是处理过的实际的data数据了
          resolve(res);
          // 请求完毕 还原 loading 不影响下次的请求
          this.isShowLoading = DEFAULT_IS_SHOW_LOADING;
        })
        .catch((err) => {
          reject(err);
          this.isShowLoading = DEFAULT_IS_SHOW_LOADING;
        });
    });
  }

  get<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: "GET" });
  }
  post<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: "POST" });
  }
  delete<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: "DELETE" });
  }
  patch<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: "PATCH" });
  }
}
