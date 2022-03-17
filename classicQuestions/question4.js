/**
 * 题目1  前缀树
 *
 * 给你一个字符串类型的arr， 譬如
 * arr = ['b\st', 'd\', 'a\d\e', 'a\b\c']
 *
 * 把这些路径中蕴含的目录结构给打印出来，子目录直接列在父目录下面，并比父目录向右进两格，
 * 就像这样
 * a
 *  b
 *   c
 *  d
 *   e
 * b
 *  st
 * d
 *
 * 同一级的需要按字母顺序排列不能乱
 *
 * https://hub.fastgit.org/algorithmzuo/trainingcamp003/blob/master/src/class04/Code01_GetFolderTree.java
 */

/**
 * 题目2
 *
 * 双向链表节点结构和二叉树节点结构是一样的，如果你把last认为是left，next认为是next的话
 * 给定一个搜索二叉树的头节点head， 请转化成一条有序的双向链表，并返回链表的头节点
 */

function convert(head) {
  if (head == null) {
    return null;
  }
  return process(head).start;
}

// 整棵树，串成双向链表，返回头、尾
function Info(start, end) {
  this.start = start;
  this.end = end;
}

// 以x为头的整棵搜索二叉树，请全部以有序双向链表的方式，连好
// 并且返回，整个有序双向链表的头节点和尾节点

function process(X) {
  if (X == null) {
    return new Info(null, null);
  }

  let leftInfo = process(X.left);
  let rightInfo = process(X.right);

  if (leftInfo.end != null) {
    leftInfo.end.right = X;
  }
  X.left = leftInfo.end;
  X.right = rightInfo.start;
  if (rightInfo.start != null) {
    rightInfo.start.left = X;
  }

  return new Info(
    // 整棵树的头，
    leftInfo.start != null ? leftInfo.start : X,
    // 整棵树的尾，
    rightInfo.start != null ? rightInfo.end : X
  );
}
/**
 * 题目3
 *
 * 已知一棵二叉树中没有重复节点， 并且给定了这棵树的中序遍历和先序遍历数组， 返回后序遍历数组
 *
 * 比如给定
 * pre = [1,2,4,5,3,6,7]
 * in = [4,2,5,1,6,3,7]
 *
 * 返回 [4, 5, 2, 6, 7, 3, 1]
 */

function preInToPos(pre, ior) {
  if (!pre || !pre || pre.length != ior.length) {
    return null;
  }

  let N = pre.length;
  let inMap = {};
  // 中序先生成一个map
  for (let i = 0; i < N; i++) {
    inMap[ior[i]] = i;
  }
  let pos = new Array(N);
  process(pre, 0, N - 1, ior, 0, N - 1, pos, 0, N - 1, inMap);
  return pos;
}
function process(pre, L1, R1, ior, L2, R2, pos, L3, R3, inMap) {
  if (L1 > R1) {
    return;
  }
  if (L1 == R1) {
    pos[L3] = pre[L1];
    return;
  }
  // 将先序 第一个元素放在后续遍历的最后
  pos[R3] = pre[L1];

  let mid = inMap[pre[L1]];
  let leftSize = mid - L2;
  process(
    pre,
    L1 + 1,
    L1 + leftSize,
    ior,
    L2,
    mid - 1,
    pos,
    L3,
    L3 + leftSize - 1,
    inMap
  );
  process(
    pre,
    L1 + leftSize + 1,
    R1,
    ior,
    mid + 1,
    R2,
    pos,
    L3 + leftSize,
    R3 - 1,
    inMap
  );
}

/**
 * 题目4
 * https://hub.fastgit.org/algorithmzuo/trainingcamp003/blob/master/src/class04/Code04_LIS.java
 * 最长递归子序列问题的O(n * logn) 解法
 */

/**
 * 题目5
 * 每个信封都有长和宽两个维度的数据， A信封如果想嵌套在B信封里面， A信封必须在长和宽都小于B信封才行
 *
 * 如果给你一批信封， 返回最大的嵌套层数
 * https://hub.fastgit.org/algorithmzuo/trainingcamp003/blob/master/src/class04/Code05_EnvelopesProblem.java
 *
 * 长度从小到大排序 长度相同 宽度从大到小排序 然后取出宽度求最长递归子序列
 *
 */

/**
 * 题目6
 *
 * 给定一个数组arr， 返回子数组的最大累加和
 *
 * 数组从头开始遍历， 累加和 < 0的时候, cur重新置为0 继续累加
 *
 * 假设 [i...j] 是最大的累加和子数组， 可以得到以下两个结论
 *
 * 1、[i...k...j] 肯定不小于0  否则 [k...j]的累加和将大于 [i...j]
 * 2、[...i-1] i-1以前的位置累加和 肯定是小于0的， 否则可以一同并入到[i...j] 使长度更长
 */

function maxSum(arr) {
  if (!arr || arr.length == 0) {
    return 0;
  }

  let max = Number.MIN_VALUE;
  let cur = 0;
  for (let i = 0; i < arr.length; i++) {
    cur += arr[i];
    max = Math.max(max, cur);
    // 小于0的时候证明前面累加的不会计入到最长子数组中
    cur = cur < 0 ? 0 : cur;
  }
  return max;
}

/**
 * 题目7
 *
 * 给定一个整型矩阵， 返回子矩阵的最大累加和
 *
 * 压缩矩阵
 * 0~0 0~1 0~2 0~3
 * 1~1 1~2 1~3
 *
 * 遍历所有情况
 *
 * 每行相应列加和 最后形成一维数组 求最大累加和
 */

function maxSum(m) {
  if (!m || m.length == 0 || m[0].length == 0) {
    return 0;
  }
  let max = Number.MIN_VALUE;
  let cur = 0;
  let s = null;
  for (let i = 0; i != m.length; i++) {
    // 开始的行号i
    s = new Array(m[0].length).fill(0);
    for (let j = i; j != m.length; j++) {
      // 结束的行号j，i~j行是我讨论的范围
      cur = 0;
      for (let k = 0; k != s.length; k++) {
        s[k] += m[j][k];
        cur += s[k];
        max = Math.max(max, cur);
        cur = cur < 0 ? 0 : cur;
      }
    }
  }
  return max;
}
