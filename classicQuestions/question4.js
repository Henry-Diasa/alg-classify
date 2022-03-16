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
