/**
 * 题目1
 * 给定两个字符串s1和s2，问s2最少删除多少字符可以成为s1的子串？
 * 比如s1 = “abcde” s2 = "axbc"
 * 返回1， s2删掉x就是s1的子串了
 *
 * https://hub.fastgit.org/algorithmzuo/trainingcamp003/blob/master/src/class05/Code01_DeleteMinCost.java
 */

/**
 * 题目2
 *
 * 给定两个字符串str1和str2， 在给定三个整数ic、dc、rc, 分别代表插入、删除、和
 * 替换一个字符的代价，返回将str1编辑成str2的最小代价
 *
 * 【举例】
 *
 * str1 = “abc”, str2 = "adc", ic = 5, dc = 3, rc = 2 从abc 编辑成adc
 * 把b替换成d的代价最小的，所以返回2
 *
 * str1 = abc， str2 = adc, ic = 5, dc = 3, rc = 100 从abc编辑成adc， 先
 * 删除b，然后插入d是代价最小的，所以返回8
 *
 * str1 = abc, str2 = abc, ic = 5, dc = 3, rc = 2不用编辑了，本来就是一样
 * 的字符串，所以返回0
 */

function minCost(s1, s2, ic, dc, rc) {
  if (s1 == null || s2 == null) {
    return 0;
  }

  let str1 = s1.split("");
  let str2 = s2.split("");

  let N = str1.length + 1;
  let M = str2.length + 1;
  let dp = new Array(N).fill(new Array(M).fill(0));
  // dp[0][0]  = 0
  for (let i = 1; i < N; i++) {
    // 第一列str1 前几个值 替换成 "" 字符串需要的代价
    dp[i][0] = dc * i; // 删除字符串的代价
  }
  for (let j = 1; j < M; j++) {
    dp[0][j] = ic * j; // 第一行 "" 字符串换成字符串的代价 是插入的代价
  }
  for (let i = 1; i < N; i++) {
    for (let j = 1; j < M; j++) {
      if (str1[i - 1] == str2[j - 1]) {
        // i 和 j位置相等
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // i 和 j位置不相等
        dp[i][j] = dp[i - 1][j - 1] + rc;
      }
      // i, j => i, j - 1  + 插入j的代价
      dp[i][j] = Math.min(dp[i][j], dp[i][j - 1] + ic);
      // i, j => i - 1, j  + 删除i的代价
      dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + dc);
    }
  }
  return dp[N - 1][M - 1];
}

/**
 * 题目3
 * 求完全二叉树节点的个数， 时间复杂度 低于O(N)
 */

// 请保证head为头的树，是完全二叉树
function nodeNum(head) {
  if (head == null) {
    return 0;
  }
  return bs(head, 1, mostLeftLevel(head, 1));
}

// node在第level层，h是总的深度（h永远不变，全局变量
// 以node为头的完全二叉树，节点个数是多少
function bs(node, Level, h) {
  if (Level == h) {
    return 1;
  }
  if (mostLeftLevel(node.right, Level + 1) == h) {
    // 左子树是满二叉树  2^h - 1 + 1(头节点)
    return (1 << (h - Level)) + bs(node.right, Level + 1, h);
  } else {
    // 右子树是满二叉树
    return (1 << (h - Level - 1)) + bs(node.left, Level + 1, h);
  }
}

// 如果node在第level层，
// 求以node为头的子树，最大深度是多少
// node为头的子树，一定是完全二叉树
function mostLeftLevel(node, level) {
  while (node != null) {
    level++;
    node = node.left;
  }
  return level - 1;
}
