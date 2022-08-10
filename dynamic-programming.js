/** 动态规划问题 */
// 切入点：从想要的结果开始考虑，有点类似逆序递归
// 核心元素：最优子结构，边界，状态转移方程式

/** 机器人行走问题 */
// 规则：在长度为1~N固定位置中，每次只能走一步，从开始位置S到结束位置E走K布一共有多少走法
// 暴力递归(时间复杂度O(2^k)，类似二叉树)
function walkWay1(N, E, K, S) {
    return walk1(N, E, K, S)
}
function walk1(N, end, rest, cur) {
    // 没得走了
    if (rest === 0) {
        return end === cur ? 1 : 0
    }
    // 当前是第一个位置，只能向右走
    if (cur === 1) {
        return walk1(N, end, rest - 1, cur + 1)
    }
    // 当前是最后一个位置，只能向左走
    if (cur === N) {
        return walk1(N, end, rest - 1, cur - 1)
    }
    // 1~N之间可以选择向右走，也可以选择向左走
    return walk1(N, end, rest - 1, cur + 1) + walk1(N, end, rest - 1, cur - 1)
}
// 缓存方式(时间复杂度O(K*N)，避免重复的函数计算)
function walkWay2(N, E, K, S) {
    const dp = Array.from(new Array(K + 1), () => new Array(N + 1).fill(-1))
    return walk2(N, E, K, S, dp)
}
function walk2(N, end, rest, cur, dp) {
    if (dp[rest][cur] !== -1) {
        return dp[rest][cur]
    }
    if (rest === 0) {
        dp[rest][cur] = cur === end ? 1 : 0
    }
    if (cur === 1) {
        dp[rest][cur] = walk2(N, end, rest - 1, cur + 1, dp)
    } else if (cur === N) {
        dp[rest][cur] = walk2(N, end, rest - 1, cur - 1, dp)
    } else {
        dp[rest][cur] = walk2(N, end, rest - 1, cur + 1, dp) + walk2(N, end, rest - 1, cur - 1, dp)
    }
    return dp[rest][cur]
}
// 动态规划(时间复杂度O(K*N)，整理缓存数据)
function walkWay3(N, E, K, S) {
    const dp = Array.from(new Array(K + 1), () => new Array(N + 1).fill(0))
    // 没得走的位置标1
    dp[0][E] = 1
    // 索引0无用，行和列从1开始
    for (let rest = 1; rest <= K; rest++) {
        for (let cur = 1; cur <= N; cur++) {
            if (cur === 1) {
                // 当前位置只能向右走，依赖右上角数据
                dp[rest][cur] = dp[rest - 1][cur + 1]
            } else if (cur === N) {
                // 当前位置只能向左走，依赖左上角数据
                dp[rest][cur] = dp[rest - 1][cur - 1]
            } else {
                // 当前位置两头走，依赖左上角和右上角的数据
                dp[rest][cur] = dp[rest - 1][cur + 1] + dp[rest - 1][cur - 1]
            }
        }
    }
    // 返回出发点累加结果
    return dp[K][S]
}

/** 最少硬币数问题 */
// 规则：给定一个目标硬币值rest，在一堆正数数组arr中选择最少能达到该值的硬币数
// 暴力递归
function minCoins1(arr, rest) {
    return min1(arr, 0, rest)
}
function min1(arr, index, rest) {
    // 超出目标或者超出选择
    if (rest < 0 || index === arr.length) {
        return -1
    }
    // 达到目标
    if (rest === 0) {
        return 0;
    }
    // 取要与不要当前硬币两种情况中最小值(可能都为-1，即选不出最终结果)
    const p1 = min1(arr, index + 1, rest)
    const p2 = min1(arr, index + 1, rest - arr[index])
    if (p1 === -1 && p2 === -1) {
        return -1
    } else {
        if (p1 === -1) {
            return p2 + 1
        }
        if (p2 === -1) {
            return p1
        }
        return Math.min(p1, p2 + 1)
    }
}
// 缓存方式
function minCoins2(arr, rest) {
    const dp = Array.from(new Array(arr.length + 1), () => new Array(rest + 1).fill(-2))
    return min2(arr, 0, rest, dp)
}
function min2(arr, index, rest, dp) {
    if (rest < 0) {
        return -1
    }
    if (dp[index][rest] !== -2) {
        return dp[index][rest]
    }
    if (rest === 0) {
        dp[index][rest] = 0
    } else if (index === arr.length) {
        dp[index][rest] = -1
    } else {
        const p1 = min2(arr, index + 1, rest, dp)
        const p2 = min2(arr, index + 1, rest - arr[index], dp)
        if (p1 === -1 && p2 === -1) {
            dp[index][rest] = -1
        } else {
            if (p1 === -1) {
                dp[index][rest] = p2 + 1
            }
            else if (p2 === -1) {
                dp[index][rest] = p1
            } else {
                dp[index][rest] = Math.min(p1, p2 + 1)
            }
        }
    }
    return dp[index][rest]
}
// 动态规划
function minCoins3(arr, rest) {
    const dp = Array.from(new Array(arr.length + 1), () => new Array(rest + 1))
    for (let i = 0; i <= arr.length; i++) {
        dp[i][0] = 0
    }
    for (let j = 1; j <= rest; j++) {
        dp[arr.length][j] = -1
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = 1; j <= rest; j++) {
            const p1 = dp[i + 1][j]
            let p2 = -1
            if (j - arr[i] >= 0) {
                p2 = dp[i + 1][j - arr[i]]
            }
            if (p1 === -1 && p2 === -1) {
                dp[i][j] = -1
            } else {
                if (p1 === -1) {
                    dp[i][j] = p2 + 1
                } else if (p2 === -1) {
                    dp[i][j] = p1
                } else {
                    dp[i][j] = Math.min(p1, p2 + 1)
                }
            }
        }
    }
    return dp[0][rest]
}