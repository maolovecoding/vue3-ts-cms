import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
// 支持utc时间格式化
dayjs.extend(utc);
/**
 *
 * @param time 时间字符串 “2021-05-02T07:24:12.000Z”
 */
export function formatTime(time: string): string {
  return formatUtcTime(time);
}
const DATA_FORMAT_DEFAULT = "YYYY-MM-DD HH:mm:ss";
/**
 * 格式化utc时间
 * @param utcTime
 * @param format
 * @returns
 */
export function formatUtcTime(
  utcTime: string,
  format: string = DATA_FORMAT_DEFAULT
) {
  return dayjs.utc(utcTime).utcOffset(8).format(format);
}

export function formatTimestamp(
  timestamp: number | string,
  format: string = DATA_FORMAT_DEFAULT
) {
  return dayjs(timestamp).format(format);
}
