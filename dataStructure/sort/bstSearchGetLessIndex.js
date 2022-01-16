// 找出数组中 存在的一个极小值点 也就是 左右都比当前值大的点
function getLessIndex(arr) {
  if (arr == null || arr.length == 0) {
    return -1; // no exist
  }
  // 处理第一项
  if (arr.length == 1 || arr[0] < arr[1]) {
    return 0;
  }
  // 处理最后一项
  if (arr[arr.length - 1] < arr[arr.length - 2]) {
    return arr.length - 1;
  }
  let left = 1;
  let right = arr.length - 2;
  let mid = 0;
  while (left < right) {
    mid = (left + right) / 2;
    if (arr[mid] > arr[mid - 1]) {
      // 从0开始是下降趋势，从mid - 1 ~ mid是上升趋势 所以中间必定存在一个极小值点
      right = mid - 1;
    } else if (arr[mid] > arr[mid + 1]) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
  return left;
}
