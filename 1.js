// 问题1



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



// 2)




// 问题3

