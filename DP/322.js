/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
 var coinChange = function (coins, amount) {
    let INF = Number.MAX_SAFE_INTEGER
    let dp = new Array(amount + 1).fill(INF)
    dp[0] = 0
    for (let i = 0; i < amount; i++) {
        for(let y of coins) {
            // 只有选择的硬币金额小于amount  并且 i+y 不要越界
            if(y<=amount && i + y < amount + 1 && i+y>=0) {
                dp[i+y] = Math.min(dp[i+y], dp[i] + 1)
            }
        }
    }
    return dp[amount] >=INF ? -1 : dp[amount]
};