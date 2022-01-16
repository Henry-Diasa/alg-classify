function exist(sortedArr, num) {
  if (sortedArr == null || sortedArr.length == 0) {
    return false;
  }
  let L = 0;
  let R = sortedArr.length - 1;
  let mid = 0;

  while (L < R) {
    // L..R 至少两个数的时候
    mid = (L + (R - L)) >> 1;
    if (sortedArr[mid] == num) {
      return mid;
    } else if (sortedArr[mid] > num) {
      R = mid - 1;
    } else {
      L = mid + 1;
    }
  }

  return sortedArr[L] == num;
}
