/**
 * 题目1
 *
 * 每种工作有难度和报酬 规定如下
 *
 * class Job {
 *  constructor(money, hard) {
 *      this.money = money // 该工作的报酬
 *      this.hard = hard // 该工作的强度
 *  }
 * }
 *
 * 给定一个Job类型的数组jobarr， 表示所有岗位， 每个岗位都可以提供任意份工作
 * 选工作的标准是在难度不超过自身能力值的情况下，选择报酬最高的岗位
 * 给定一个int类型的数组arr， 表示所有人的能力
 *
 * 返回一个数组，表示每个人按照标准选工作后所能获取的最高报酬
 *
 */
function getMoneys(job, ability) {
  // 按照难度排序 难度相同 按照报酬大 => 小排序
  job.sort((a, b) => {
    return a.hard !== b.hard ? a.hard - b.hard : b.money - a.money;
  });

  let map = {};
  map[job[0].hard] = job[0].money;

  let pre = job[0]; // pre 之前组的组长
  for (let i = 1; i < job.length; i++) {
    if (job[i].hard != pre.hard && job[i].money > pre.money) {
      pre = job[i];
      map[pre.hard] = pre.money;
    }
  }
  let ans = new Array(ability.length);
  for (let i = 0; i < ability.length; i++) {
    // 找出小于ability[i]且最靠近的key
    let key = Object.keys(map)
      .filter((key) => key <= ability[i])
      .pop();

    ans[i] = key ? map[key] : 0;
  }

  return ans;
}

/**
 * 题目2
 *
 * 背包容量为w
 * 一共n袋零食，第i袋零食体积为arr[i] > 0
 * 总体积不超过背包容量的情况下
 * 一共有多少种零食放法
 */

// 1) 递归算法  从左到右的经典模型
// 还剩的容量是rest，arr[index...]自由选择，
// 返回选择方案
// index ： 0～N
// rest : 0~w
function way1(arr, w) {
  return process(arr, 0, w);
}
function process(arr, index, rest) {
  if (rest < 0) {
    return -1; // 无方案
  }
  // rest>=0
  if (index === arr.length) {
    return 1;
  }

  let next1 = process(arr, index + 1, rest); // 不选择当前零食
  let next2 = process(arr, index + 1, rest - arr[index]); // 选择当前零食

  return next1 + (next2 == -1 ? 0 : next2);
}

// 2) 递归改dp
function way2(arr, w) {
  let N = arr.length;
  let dp = new Array(N + 1).fill(new Array(M + 1));

  // base case

  for (let j = 0; j <= w; j++) {
    dp[N][j] = 1;
  }

  for (let i = N - 1; i >= 0; i--) {
    for (let j = 0; j <= w; j++) {
      dp[i][j] = dp[i + 1][j] + (j - arr[i] >= 0 ? dp[i + 1][j - arr[i]] : 0);
    }
  }

  return dp[0][w];
}

/**
 * 题目3
 *
 * 给定一个二维数组matrix，其中每个数都是正数，要求从左上到右下。每一步只能向右或者向下，沿途经过的数字要累加起来
 *
 * 最后请返回最小的路径和
 *
 * 动态规划的空间压缩技巧
 */

function minPathSum(m) {
  if (!m || m.length == 0 || m[0] == null || m[0].length == 0) {
    return 0;
  }

  let row = m.length;
  let col = m[0].length;

  let dp = new Array(row).fill(new Array(col));

  dp[0][0] = m[0][0];
  // 第一列
  for (let i = 1; i < row; i++) {
    dp[i][0] = dp[i - 1][0] + m[i][0];
  }

  // 第一行
  for (let j = 1; j < col; j++) {
    dp[0][j] = dp[0][j - 1] + m[0][j];
  }

  // 任意一项 依赖左侧和上侧 小值
  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + m[i][j];
    }
  }

  return dp[row - 1][col - 1];
}
/**
 * 题目4
 *
 * 请注意区分子串（连续）和子序列（可以不连续）的不同， 给定两个字符串str1 和 str2
 * 求两个字符的最长公共子序列
 *
 * 动态规划的空间压缩技巧
 */

function lcs(s1, s2) {
  const N = s1.length;
  const M = s2.length;

  return process(s1, s2, N - 1, M - 1);
}

function process(str1, str2, i1, i2) {
  if (i1 == 0 && i2 == 0) {
    return str1[i1] == str2[i2] ? 1 : 0;
  }

  // i1 和 i2 不同时为0
  if (i1 == 0) {
    // str1[0..0] str2[0...i2 - 1]
    return str1[i1] == str2[i2] || process(str1, str2, i1, i2 - 1) == 1 ? 1 : 0;
  }

  if (i2 == 0) {
    return str1[i1] == str2[i2] || process(str1, str2, i1 - 1, i2) == 1 ? 1 : 0;
  }

  // i1 和 i2 都不是0
  // 最长公共子序列结尾，不是以str1[i1]与str2[i2]结尾的
  let p1 = process(str1, str2, i1 - 1, i2 - 1);
  let p2 = process(str1, str2, i1, i2 - 1);
  let p3 = process(str1, str2, i1 - 1, i2);
  let p4 = 0;
  if (str1[i1] == str2[i2]) {
    p4 = p1 + 1;
  }
  return Math.max(Math.max(p1, p2), Math.max(p3, p4));
}

function dp(s1, s2) {
  let N = s1.length;
  let M = s2.length;

  let dp = new Array(N).fill(new Array(M));

  dp[0][0] = s1[0] == s2[0] ? 1 : 0;
  for (let j = 1; j < M; j++) {
    // 第一行
    dp[0][j] = s1[0] == s2[j] ? 1 : dp[0][j - 1];
  }
  for (let i = 1; i < N; i++) {
    // 第一列
    dp[i][0] = s1[i] == s2[0] ? 1 : dp[i - 1][0];
  }
  for (let i = 1; i < N; i++) {
    for (let j = 1; j < M; j++) {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      if (s1[i] == s2[j]) {
        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - 1] + 1);
      }
    }
  }
  return dp[N - 1][M - 1];
}

/**
 * 题目5
 *
 * 给定两个字符串str1和str2， 求两个字符串的最长公共子串
 */
function lcst1(str1, str2) {
  if (!str1 || !str2) {
    return "";
  }

  const dp = getDp(str1, str2);

  let end = 0;
  let max = 0;

  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < str2.length; j++) {
      if (dp[i][j] > max) {
        end = i;
        max = dp[i][j];
      }
    }
  }

  return str1.substring(end - max + 1, end + 1);
}

function getDp(str1, str2) {
  let dp = new Array(str1.length).fill(new Array(str2.length).fill(0));
  // 第一列  如果字符串相等  这个位置置为1
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] == str2[0]) {
      dp[i][0] = 1;
    }
  }
  // 第一行
  for (let j = 1; j < str2.length; j++) {
    if (str1[0] == str2[j]) {
      dp[0][j] = 1;
    }
  }
  // 任意位置 当前位置的值 = dp[行 - 1][列 - 1]的位置的值 + 1
  for (let i = 1; i < str1.length; i++) {
    for (let j = 1; j < str2.length; j++) {
      if (str1[i] == str2[j]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      }
    }
  }
  return dp;
}

// 极致路径压缩 从右上角开始 在按照斜对角线往下方延展
function lcst2(s1, s2) {
  if (!s1 || !s2) {
    return "";
  }
  let row = 0; // 出发点的行号
  let col = s2.length - 1; // 出发点的列号
  let max = 0;
  let end = 0;
  while (row < s1.length) {
    let i = row;
    let j = col;
    let len = 0;
    // 向右下方移动的这一轮
    while (i < s1.length && j < s2.length) {
      if (s1[i] != s2[j]) {
        len = 0;
      } else {
        len++;
      }
      // len
      if (len > max) {
        end = i;
        max = len;
      }
      i++;
      j++;
    }
    if (col > 0) {
      col--;
    } else {
      row++;
    }
  }
  return s1.substring(end - max + 1, end + 1);
}
/**
 * 题目6 （留大的抛弃小的 => 小堆）
 *
 * 给定一个由字符串组成的数组strs， 给定一个正数K， 返回词频最大的前K个字符串，假设结果是唯一的
 *
 * https://github.com/algorithmzuo/trainingcamp003/blob/master/src/class03/Code06_TopKTimes.java
 */
