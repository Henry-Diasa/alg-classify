class MaxHeap {
  constructor(arr) {
    this.data = [];

    // 根据传递的数组, 生成堆 heapify
    if (arr) {
      this.data = new Array(...arr);
      // 最后一个非叶子节点 向上下沉
      for (let i = this.parent(arr.length - 1); i >= 0; i--) {
        this.siftDown(i);
      }
    }
  }
  swap(i, j) {
    let temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }
  // 返回堆中的元素个数
  size() {
    return this.data.length;
  }
  // 返回一个布尔值, 表示堆中是否为空
  isEmpty() {
    return this.data.length === 0;
  }
  // 返回完全二叉树的数组表示中，一个索引所表示的元素的父亲节点的索引
  parent(index) {
    if (index == 0) {
      throw new Error("index-0 doesn't have parent.");
    }
    return Math.floor((index - 1) / 2);
  }
  // 返回完全二叉树的数组表示中，一个索引所表示的元素的左孩子节点的索引
  leftChild(index) {
    return index * 2 + 1;
  }
  // 返回完全二叉树的数组表示中，一个索引所表示的元素的右孩子节点的索引
  rightChild(index) {
    return index * 2 + 2;
  }
  // 向堆中添加元素
  add(e) {
    this.data.push(e);
    this.siftUp(this.data.length - 1);
  }
  // 元素上浮
  siftUp(k) {
    // 比父元素值大  向上交换位置
    while (k > 0 && this.data[k] > this.data[this.parent(k)]) {
      this.swap(k, this.parent(k));
      k = this.parent(k);
    }
  }
  // 查看堆中的最大元素
  findMax() {
    if (this.data.length === 0) {
      throw new Error("Can not findMax when heap is empty.");
    }
    return this.data[0];
  }
  // 取出堆中最大元素
  extractMax() {
    const ret = this.findMax();
    this.swap(0, this.data.length - 1);
    this.data.pop();
    this.siftDown(0);
    return ret;
  }
  // 元素下沉
  siftDown(k) {
    while (this.leftChild(k) < this.data.length) {
      let j = this.leftChild(k); // 在此轮循环中,data[k]和data[j]交换位置
      if (j + 1 < this.data.length && this.data[j + 1] > this.data[j]) {
        j++; // 右孩子比左孩子大
        // data[j] 是 leftChild 和 rightChild 中的最大值
      }
      if (this.data[k] > this.data[j]) {
        break;
      }
      this.swap(k, j);
      k = j;
    }
  }
  // 取出堆中的最大元素，并且替换成元素e
  replace(e) {
    const ret = this.findMax();
    this.data[0] = e;
    this.siftDown(0);
    return ret;
  }
}
