// 在arr上，找满足<=value的最右位置
function nearestIndex(arr, value) {
  let L = 0;
  let R = arr.length - 1;
  let index = -1; // 记录最右的对号

  while (L <= R) {
    // 至少一个数的时候
    let mid = (L + (R - L)) >> 1;
    if (arr[mid] <= value) {
      index = mid;
      l = mid + 1;
    } else {
      R = mid - 1;
    }
  }
  return index;
}
