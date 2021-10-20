/**
 * 从一个点 向两边扩散的方式  有两种情况
 * 1、abba
 * 2、aba
 * 所以遍历循环的时候 要判断两种类型的下标
 */

var longestPalindrome = function (s) {
  if (s.length < 2) {
    return s;
  }
  let start = 0;
  let maxLength = 1;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] == s[right]) {
      if (right - left + 1 > maxLength) {
        maxLength = right - left + 1;
        start = left;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i - 1, i + 1); // aba
    expandAroundCenter(i, i + 1); // abba
  }

  return s.substring(start, start + maxLength);
};
