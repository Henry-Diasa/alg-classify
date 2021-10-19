/**
 * 双指针的题目
 *
 * 左指针不动  移动右指针  同时用map记录每个值的索引
 *
 *
 */

function lengthOfLongestSubstring(s) {
  let l = 0;
  let res = 0;

  const map = new Map();

  for (let r = 0; r < s.length; r++) {
    if (map.has(s[r] && map.get(s[r]) >= l)) {
      l = map.get(s[r]) + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(s[r], r);
  }

  return res;
}
