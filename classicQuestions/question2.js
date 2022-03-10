/**
 * 题目1
 *
 * 给定一个正整数M, 请构造出一个长度为M的数组arr， 要求对任意的i,j,k三个位置，如果i<j<k, 都有
 * arr[i] + arr[k] !=2 * arr[j]。 返回构造出的arr
 *
 */

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

/**
 * 题目2
 *
 * 给定一个二叉树的头节点head， 路径的规定有以下三种不同的规定
 *
 * 1、路径必须是头节点出发，到叶节点为止，返回最大路径和
 * 2、路径可以从任何节点出发，但必须往下走到达任何节点，返回最大路径和
 * 3、路径可以从任何节点出发，到任何节点，返回最大路径和
 */
// 1）
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
/**
 * 题目3
 *
 * 在行也有序、列也有序(小 => 大)的二维数组中，找num，找到返回true，否则false
 */

// 从右上角 开始比较
function isContains(matrix, K) {
  let row = 0;
  let col = matrix[0].length - 1;
  while (row < matrix.length && col > -1) {
    if (matrix[row][col] == K) {
      return true;
    } else if (matrix[row][col] > K) {
      col--;
    } else {
      row++;
    }
  }
  return false;
}

/**
 * 题目4
 *
 * 给定一个数组arr长度为N， 你可以把任意长度大于0且小于N的前缀作为左部分，剩下的作为
 * 右部分
 *
 * 但是每种划分下都有左部分的最大值和右部分的最大值，请返回最大的，左部分最大值
 * 减去右部分最大值得绝对值
 */

// 找出整个数组的最大值 - Math.min(arr[0], arr[arr.length - 1]) (左侧一项 和 右侧一项)
function maxABS(arr) {
  let max = Number.MIN_VALUE;
  for (let i = 0; i < arr.length; i++) {
    max = Math.max(arr[i], max);
  }

  return max - Math.min(arr[0], arr[arr.length - 1]);
}

/**
 * 题目5
 *
 * 给定一个数组arr， 已知其中所有的值都是非负的，讲这个数组看做一个容器，请
 * 返回容器能装多少水
 *
 * 比如， arr = [3,1,2,5,2,4], 根据直画出的直方图就是容器形状，该容器可以装下
 * 5格水
 *
 * 在比如， arr = [4,5,1,3,2], 该容器可以装下2格水
 *
 */

// 计算每一个位置左侧最大值和右侧最大值的最小值 也就是当前的界限。
// 界限 - arr[i] 的值就是i位置可以储存的水
function water(arr) {
  if (!arr || arr.length < 2) {
    return 0;
  }

  let N = arr.length;
  let L = 1;
  let leftMax = arr[0];
  let R = N - 2;
  let rightMax = arr[N - 1];

  let water = 0;

  while (L <= R) {
    if (leftMax <= rightMax) {
      water += Math.max(0, leftMax - arr[L]);
      leftMax = Math.max(leftMax, arr[L++]);
    } else {
      water += Math.max(0, rightMax - arr[R]);
      rightMax = Math.max(rightMax, arr[R--]);
    }
  }
  return water;
}

/**
 * 题目6
 *
 * 题目5的升级 改为二维数组
 * 利用小堆和局部湖的特性
 * https://github.com/algorithmzuo/trainingcamp003/blob/master/src/class02/Code05_TrappingRainWaterII.java
 */

/**
 * 题目7
 *
 * 给定一个有序数组arr，给定一个整数aim
 *
 * 1） 返回累加和为aim的，所有不同二元组
 * 2）返回累加和为aim的，所有不同三元组
 */

// 1)
function printUniquePair(arr, k) {
  if (!arr || arr.length < 2) {
    return;
  }
  // 双指针
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    if (arr[left] + arr[right] < k) {
      left++;
    } else if (arr[left] + arr[right] > k) {
      right--;
    } else {
      if (left == 0 || arr[left - 1] !== arr[left]) {
        // 排除相等的元素
        console.log(arr[left], arr[right]);
      }
      left++;
      right--;
    }
  }
}

// 2)

function printUniqueTriad(arr, k) {
  if (!arr || arr.length < 3) {
    return;
  }

  for (let i = 0; i < arr.length - 2; i++) {
    if (i == 0 || arr[i] !== arr[i - 1]) {
      printRest(arr, i, i + 1, arr.length - 1, k - arr[i]);
    }
  }
}

function printRest(arr, f, l, r, k) {
  while (l < r) {
    if (arr[l] + arr[r] < k) {
      l++;
    } else if (arr[l] + arr[r] > k) {
      r--;
    } else {
      if (l == f + 1 || arr[l - 1] != arr[l]) {
        System.out.println(arr[f] + "," + arr[l] + "," + arr[r]);
      }
      l++;
      r--;
    }
  }
}

/**
 * 题目7
 *
 * 长度为N的数组arr， 一定可以组成N^2个数值对
 * 例如 arr=[3,1,2]
 *
 * 数值对有（3,3）（3,1）（3,2）（1,3）（1,1）（1,2）（2,3）（2,1）（2,2）
 *
 * 也就是任意两个数都有数值对，而且自己和自己也算数值对。
 * 数值对怎么排序？规定：第一维数据从小到大，第一维数据一样的，第二维数组也从小到大
 * ，所以上面的数值对排序的结果为
 *
 * （1,2）（1,2）（1,3）（2,1）（2,2）（2,3）（3,1）（3,2）（3,3）
 *
 * 给定一个数组arr， 和整数K，返回第K小的数值对
 *
 * // 在无序数组arr中，找到，如果排序的话，arr[index]的数是什么？
 * https://hub.fastgit.org/algorithmzuo/trainingcamp003/blob/master/src/class02/Code07_KthMinPair.java#L94
 */

function kthMinPair2(arr, k) {
  let N = arr.length;
  if (k > N * N) {
    return null;
  }

  arr.sort((a, b) => a - b);

  // 第K小的数值对，第一维数字，是什么 是arr中
  let firstNum = arr[(k - 1) / N];
  let lessFristNumSize = 0; // 数出比fristNum小的数有几个
  let fristNumSize = 0; // 数出==fristNum的数有几个

  for (let i = 0; i < N && arr[i] <= firstNum; i++) {
    if (arr[i] < firstNum) {
      lessFristNumSize++;
    } else {
      fristNumSize++;
    }
  }
  let rest = k - lessFristNumSize * N;

  return [firstNum, arr[(rest - 1) / fristNumSize]];
}
