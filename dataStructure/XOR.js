// 异或 ^  （相同为0，不同为1） 无进位相加

/**
 *
 * 交换律  a^b = b^a
 * 结合律  a^(b^c) = (a^b)^c
 *
 * 0 ^ N = N
 * N ^ N = 0
 * 多个数的异或运算和顺序无关
 */

// 题目1: 不用额外变量 交换两个数 (两个值不能相同，否则会变成0)
(a = 1), (b = 2);

a = a ^ b;
b = a ^ b;
a = a ^ b;

// 题目2: 一个数组中有一种数出现了奇数次，其他数出现了偶数次，怎么找到并打印这种数

// 定义一个变量eor = 0, 遍历数组一直对eor异或  eor = eor ^ arr[0]; eor = eor ^ arr[1]...
// 最后eor的值就是奇数次的值

// 题目3: 找出二进制数中的 最右侧第一个出现1的位置  a & (-a + 1) 取反 + 1
/**
 * 1100100101000  =>  0000000001000
 *
 */

// 题目4: 一个数组中有两种数出现了奇数次，其他数出现了偶数次，怎么找到并打印这种数

function printOddTimesNum2(arr) {
  let eor = 0;
  for (let i = 0; i < arr.length; i++) {
    eor ^= arr[i]; // eor = a ^ b
  }

  // a 和 b是两个数
  // eor!=0
  // eor 最右侧的1，提取出来
  let rightOne = eor & (-eor + 1); // 证明当前位置的数 a 和 b是不相同的

  let onlyOne = 0; // eor'
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] & (rightOne != 0)) {
      onlyOne ^= arr[i]; // 只异或  eor最右侧的1 相同位置为1的数 最终onlyOne就是其中的一个奇数
    }
  }

  console.log("a", onlyOne, "b", onlyOne ^ eor);
}

// 题目5: arr中只有一种数出现了K次， 其他数都出现了M次,  K < M
function onlyKTimes(arr, k, m) {
  // 32位长度的数组
  let t = new Array(32).fill(0);
  // t[0] 0位置出现1的次数为t[0]次
  for (let num of arr) {
    // 把每一个位置出现1的个数进行累加
    for (let i = 0; i <= 31; i++) {
      t[i] += (num >> i) & 1;
    }
  }
  let ans = 0;
  for (let i = 0; i < 32; i++) {
    if (t[i] % m != 0) {
      // 当前位置 不是m的整数倍 可以判断这个位置 是有出现k次的数所贡献的1
      ans |= 1 << i;
    }
  }
  return ans;
}
