var findMedianSortedArrays = function (nums1, nums2) {
    //  最简单的方式 是 合并之后从小到大排序 然后判断 奇偶性 来进行取值
    const len = nums1.length + nums2.length
    const arr = nums1.concat(nums2).sort((a, b) => a - b)

    const ret = len % 2 == 0 ? (arr[len/2] + arr[len/2 -1]) / 2 : arr[Math.floor(len/2)]
    return ret;
};