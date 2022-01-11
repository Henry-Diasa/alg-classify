// 插入排序 O(n^2)
function insertSort(arr) {
  if (!arr || arr.length < 2) return;

  for (let i = 1; i < arr.length; i++) {
    // 从第二项开始和前面的比较 如果前面的大  进行交换位置
    for (let j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
      swap(arr, j, j + 1);
    }
  }
}
