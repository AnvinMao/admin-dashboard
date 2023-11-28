/**
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path: string): boolean => {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path);
  return isExternal;
}

/**
 * @param num 
 */
export const zeroPad = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`
}

/**
 * date string to Date
 * @param time 
 */
export const convertDate = (time: Date | string): Date => {
  if (time instanceof Date) {
    return time;
  } else {
    time = time.replace(new RegExp(/-/gm), '/');
    return new Date(time);
  }
}

/**
 * to reable time.
 * @param time 
 */
export const readableTime = (time: Date | string): string => {
  const date = convertDate(time);
  const currentTimestamp: number = Date.now();
  const inputTimestamp: number = date.getTime();
  const diff = currentTimestamp - inputTimestamp;
  if (diff <= 5 * 60 * 1000) {
    return '刚刚';
  } else if (diff <= 60 * 60 * 1000) {
    return `${Math.round(diff / (60 * 1000))}分钟前`;
  } else if (diff <= 24 * 60 * 60 * 1000) {
    return `${Math.round(diff / (60 * 60 * 1000))}小时前`;
  } else if (diff <= 15 * 24 * 60 * 60 * 1000) {
    return `${Math.round(diff / (24 * 60 * 60 * 1000))}天前`;
  }

  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const mins = date.getMinutes();
  const s = date.getSeconds();
  return `${y}-${zeroPad(m)}-${zeroPad(d)} ${zeroPad(h)}:${zeroPad(mins)}:${zeroPad(s)}`;
}

export const labelPosition = () => {
  return window.innerWidth < 680 ? 'top' : 'right'; 
}