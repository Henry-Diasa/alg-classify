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
