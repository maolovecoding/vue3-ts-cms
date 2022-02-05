export class LocalCache {
  setCache<T = any>(key: string, value: T): boolean;
  setCache<T = any>(
    key: string,
    value: T,
    localOrSessionStorage: boolean
  ): boolean;
  /**
   * 设置缓存
   * @param key
   * @param value
   * @param localOrSessionStorage
   * @returns
   */
  setCache<T = any>(
    key: string,
    value: T,
    localOrSessionStorage = true
  ): boolean {
    try {
      const val = JSON.stringify(value);
      if (localOrSessionStorage) {
        window.localStorage.setItem(key, val);
      } else {
        window.sessionStorage.setItem(key, val);
      }
    } catch (error) {
      return false;
    }
    return true;
  }

  getCache<T = any>(key: string): T;
  getCache<T = any>(key: string, localOrSessionStorage: boolean): T;
  /**
   *
   * @param key 获取缓存
   * @param localOrSessionStorage
   * @returns
   */
  getCache<T>(key: string, localOrSessionStorage = true): T {
    let res: any;
    if (localOrSessionStorage) {
      const val = window.localStorage.getItem(key);
      if (val) {
        res = JSON.parse(val);
      }
    }
    const val = window.sessionStorage.getItem(key);
    if (val) {
      res = JSON.parse(val);
    }
    return res as T;
  }
  deleteCache(key: string): void;
  deleteCache(key: string, localOrSessionStorage = true): void {
    if (localOrSessionStorage) window.localStorage.removeItem(key);
    else window.sessionStorage.removeItem(key);
  }
  clearCache(): void;
  clearCache(localOrSessionStorage = true): void {
    if (localOrSessionStorage) window.localStorage.clear();
    else window.sessionStorage.clear();
  }
}

// 缓存对象
export default new LocalCache();
