/**
 * 题目一
 * 给定一个有序数组arr，从左到右依次表示X轴上从左往右点的位置，给定一个正整数L，返回如果有一根
 * 长度为L的绳子，最多能盖住几个点
 * 绳子的边缘点碰到X轴上的点，也算盖住
 */
function maxPoint(arr, L) {
  /**
   * 每次 遍历一个点 以当前点当做绳子的右端向左拉  然后找到大于绳子末端最靠近的那个点的索引
   */
  let res = 1;
  for (let i = 0; i < arr.length; i++) {
    let nearest = nearestIndex(arr, i, arr[i] - L);
    res = Math.max(res, i - nearest + 1);
  }
  return res;
}

// 寻找大于等于value的且离其最近的索引
function nearestIndex(arr, R, value) {
  let L = 0;
  let index = R;
  while (L <= R) {
    let mid = L + (R - L) / 2;
    if (arr[mid] >= value) {
      index = mid;
      R = mid - 1;
    } else {
      L = mid + 1;
    }
  }
  return index;
}

/**
 * 题目二
 * 括号有效配对是指
 * 1） 任何一个左括号都能找到和其正确配对的右括号
 * 2）任何一个右括号都能找到和其正确配对的左括号
 * 有效的： (())   ()()  (()()) 等
 * 无效的：（（） )( 等
 *
 * 问题1： 怎么判断一个括号字符串有效
 * 问题2：如果一个括号字符串无效，返回至少填几个字符能让其整体有效
 */
function valid(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    count += s[i] == "(" ? 1 : -1;
    if (count < 0) {
      return false;
    }
  }
  return count == 0;
}

function needParentheses(s) {
  let count = 0;
  let need = 0;

  for (let i = 0; i < s.length; s++) {
    if (s[i] == "(") {
      count++;
    } else {
      if (count == 0) {
        need++; // 右括号且没有左括号匹配
      } else {
        count--;
      }
    }
  }
  return count + need;
}

/**
 *
 * 题目三
 * 括号有效配对是指
 * 1） 任何一个左括号都能找到和其正确配对的右括号
 * 2）任何一个右括号都能找到和其正确配对的左括号
 *
 * 问题1：返回一个括号字符串中，有效匹配的深度 (())()  => 2
 * 问题2：返回一个括号字符串中，最长的括号有效子串的长度  (())() ((   =>  6
 */
function deep(s) {
  if (!valid(s)) {
    return 0;
  }

  let count = 0;
  let max = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] == "(") {
      max = Math.max(max, ++count);
    } else {
      count--;
    }
  }
  return max;
}
/**
 * 题目四
 *
 * 有一些排成一行的正方形，每个正方形已经被染成红色或者绿色，现在可以选择任意一个正方形然后用这两种
 * 颜色的任意一种进行染色，这个正方形的颜色将会被覆盖，目标是在完成染色之后，每个红色R都比每个绿色G
 * 距离最左侧近，返回最少需要涂染几个正方形。
 *
 * 如样例所示 s = RGRGR 我们涂染之后变成 RRRGG 满足要求了，涂染的个数为2，没有比这个更好的方案
 */

/**
 * 题目五
 *
 * 给定一个 N * N 的矩阵matrix, 只有0和1两种值，返回边框全是1的最大正方形的边长长度
 *
 * 例如
 *
 * 01111
 * 01001
 * 01001
 * 01111
 * 01011
 *
 * 其中边框全是1的最大正方形的大小为 4 * 4，所以返回4
 *
 */
