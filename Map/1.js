// leetcode 题号1

/**
 *  一般要求和的问题 都可以转换为差来进行计算
 * 同时，本题可以通过 两层for 循环来解题 但是复杂度较高
 * 可以通过一个map来 减少一层循环  典型的 空间换时间 的做法
 */

function twoSum(nums, target) {
    let map = {}
    for(let i = 0;i<nums.length;i++) {
        if(map[target - nums[i]]) {
            return [i, map[target - nums[i]]]
        }
        map[nums[i]] = i
    }
}