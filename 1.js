// 问题1

function makeNo(size) {
  if (size == 1) {
    // 种子 其他的都有种子产生
    return new Array(1).fill(1);
  }

  // size
  // 一半长达标来
  // 7   :   4
  // 8   :   4
  // [4个奇数] [3个偶]
  //  1 2

  //  1 3 2 4

  //  1 5 3 7 2 6 4 8

  let halfSize = (size + 1) / 2;
  let base = makeNo(halfSize);
  // base -> 等长奇数达标来
  // base -> 等长偶数达标来
  let ans = new Array(size);
  let index = 0;
  // 左侧是奇数  右侧是偶数
  //   保证左侧单独满足  右侧单独满足   左右各一个 奇数+偶数！= 2[k](偶数)
  for (; index < halfSize; index++) {
    ans[index] = base[index] * 2 - 1;
  }
  for (let i = 0; index < size; index++, i++) {
    ans[index] = base[i] * 2;
  }
  return ans;
}

// 问题2

// 1)
let maxSum = Number.MIN_VALUE;
function maxPath(head) {
  maxSum = Number.MIN_VALUE;
  p(head, 0);
  return maxSum;
}

// 之前的路径和，为pre
function p(x, pre) {
  if (!x.left && !x.right) {
    // 叶子节点
    maxSum = Math.max(maxSum, pre + x.value);
  }
  if (x.left !== null) {
    p(x.left, pre + x.value);
  }
  if (x.right !== null) {
    p(x.right, pre + x.value);
  }
}

// x为头的整棵树上，最大路径和是多少，返回。
// 路径要求，一定从x出发，到叶节点，算做一个路径

function maxDis(head) {
  if (head == null) {
    return 0;
  }
  return process2(head);
}

function process2(x) {
  if (x.left == null && x.right == null) {
    return x.value;
  }
  let next = Number.MIN_VALUE;
  if (x.left != null) {
    next = process2(x.left);
  }
  if (x.right != null) {
    next = Math.max(next, process2(x.right));
  }
  return x.value + next;
}

// 2)
// 1）X无关的时候， 1， 左树上的整体最大路径和 2， 右树上的整体最大路径和
// 2) X有关的时候 3， x自己 4， x往左走 5，x往右走
function maxSum2(head) {
  if (head == null) {
    return 0;
  }
  return f2(head).allTreeMaxSum;
}
// 递归信息
function Info(allTreeMaxSum, fromHeadMaxSum) {
  this.allTreeMaxSum = allTreeMaxSum;
  this.fromHeadMaxSum = fromHeadMaxSum;
}

function f2(x) {
  if (x == null) {
    return null;
  }

  let leftInfo = f2(x.left);
  let rightInfo = f2(x.right);

  let p1 = Number.MIN_VALUE;
  if (leftInfo) {
    p1 = leftInfo.allTreeMaxSum;
  }

  let p2 = Number.MIN_VALUE;
  if (rightInfo) {
    p2 = rightInfo.allTreeMaxSum;
  }

  let p3 = x.value;
  let p4 = Number.MIN_VALUE;
  if (leftInfo != null) {
    // 经过头结点 必须经过左树的头结点
    p4 = x.value + leftInfo.fromHeadMaxSum;
  }
  let p5 = Number.MIN_VALUE;
  if (rightInfo != null) {
    p5 = x.value + rightInfo.fromHeadMaxSum;
  }

  let allTreeMaxSum = Math.max(
    Math.max(Math.max(p1, p2), p3),
    Math.max(p4, p5)
  );
  let fromHeadMaxSum = Math.max(Math.max(p3, p4), p5);
  return new Info(allTreeMaxSum, fromHeadMaxSum);
}

// 3）
// 1）X无关的时候， 1， 左树上的整体最大路径和 2， 右树上的整体最大路径和
// 2) X有关的时候 3， x自己 4， x往左走 5，x往右走 6, 既往左，又往右

function f3(x) {
  if (x == null) {
    return null;
  }
  let leftInfo = f3(x.left);
  let rightInfo = f3(x.right);
  let p1 = Number.MIN_VALUE;
  if (leftInfo != null) {
    p1 = leftInfo.allTreeMaxSum;
  }
  let p2 = Number.MIN_VALUE;
  if (rightInfo != null) {
    p2 = rightInfo.allTreeMaxSum;
  }
  let p3 = x.value;
  let p4 = Number.MIN_VALUE;
  if (leftInfo != null) {
    p4 = x.value + leftInfo.fromHeadMaxSum;
  }
  let p5 = Number.MIN_VALUE;
  if (rightInfo != null) {
    p5 = x.value + rightInfo.fromHeadMaxSum;
  }

  let p6 = Number.MIN_VALUE;
  if (leftInfo != null && rightInfo != null) {
    p6 = x.value + leftInfo.fromHeadMaxSum + rightInfo.fromHeadMaxSum;
  }

  let allTreeMaxSum = Math.max(
    Math.max(Math.max(p1, p2), p3),
    Math.max(Math.max(p4, p5), p6)
  );
  let fromHeadMaxSum = Math.max(Math.max(p3, p4), p5);
  return new Info(allTreeMaxSum, fromHeadMaxSum);
}

// 问题3
// 找出整个数组的最大值 - Math.min(arr[0], arr[arr.length - 1]) (左侧一项 和 右侧一项)
function maxABS(arr) {
  let max = Number.MIN_VALUE;
  for (let i = 0; i < arr.length; i++) {
    max = Math.max(arr[i], max);
  }

  return max - Math.min(arr[0], arr[arr.length - 1]);
}
