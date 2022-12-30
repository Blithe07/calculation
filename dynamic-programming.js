/** 动态规划问题 */
// 切入点：从想要的结果开始考虑，有点类似逆序递归
// 核心元素：最优子结构，边界，状态转移方程式
// 步骤：
//  1.确定可变参数数量，并建立对应维度表格(尽可能找到单可变参数维度，即整型数据，以及尽可能找到可变参数个数少的尝试)
//  2.标出计算终止位置
//  3.根据base case填充边界数据
//  4.根据依赖关系推导其它位置

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
        return dp[rest][cur]
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
    if (rest < 0 || ( rest > 0 && index === arr.length)) {
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

/** 纸牌获胜者分数问题 */
// 规则：给定整型数组，玩家A和B每次只能从左侧或者右侧拿一张牌，两人都绝顶聪明，返回最后获胜者分数
function winner1(arr) {
    if (!arr || arr.length === 0) return 0
    return Math.max(f(arr, 0, arr.length - 1), s(arr, 0, arr.length - 1))
}
/** 先手 */
function f(arr, L, R) {
    // 只剩最后一张，先手的话，可以得到该分数
    if (L === R) {
        return arr[L]
    }
    // 绝顶聪明的情况下，先手拿到的肯定是最大值
    return Math.max(arr[L] + s(arr, L + 1, R), arr[R] + s(arr, L, R - 1))
}
/** 后手 */
function s(arr, L, R) {
    // 只剩最后一张，后手的话，得不到该分数
    if (L === R) {
        return 0
    }
    // 绝顶聪明的情况下，后手拿到的肯定是最小值
    return Math.min(f(arr, L + 1, R), f(arr, L, R - 1))
}
// 动态规划
function winner2(arr) {
    const f = Array.from(new Array(arr.length), () => new Array(arr.length))
    const s = Array.from(new Array(arr.length), () => new Array(arr.length))
    // 对角线填充值(先手能得到数组该索引上的数值，后手为0)
    for (let i = 0; i < arr.length; i++) {
        f[i][i] = arr[i]
    }
    for (let i = 0; i < arr.length; i++) {
        s[i][i] = 0
    }
    // 依赖关系：当前值由另一张表的当前值位置的左侧和下侧决定
    let row = 0
    let col = 1
    while (col < arr.length) {
        let i = row
        let j = col
        while (i < arr.length && j < arr.length) {
            f[i][j] = Math.max(arr[i] + s[i + 1][j], arr[j] + s[i][j - 1])
            s[i][j] = Math.min(f[i + 1][j], f[i][j - 1])
            i++
            j++
        }
        col++
    }
    return Math.max(f[0][arr.length - 1], s[0][arr.length - 1])
}

/** 象棋问题 */
// 规则：9*10的棋盘上，马从0,0位置出发，到达x,y位置，跳step步，总共多少跳法
function jumpWay1(x, y, step) {
    return jump1(x, y, step)
}
function jump1(x, y, step) {
    // 棋盘边界判断
    if (x < 0 || y < 0 || x > 8 || y > 9) {
        return 0
    }
    // base case
    // 当前没得跳了，而且当前位置是0,0。代表有一种跳法
    if (step === 0) {
        return x === 0 && y === 0 ? 1 : 0
    }
    // 题意是从0,0跳到x,y。代码实现是从x,y跳到0,0
    return jump1(x + 1, y + 2, step - 1)
        + jump1(x - 1, y + 2, step - 1)
        + jump1(x + 2, y + 1, step - 1)
        + jump1(x - 2, y + 1, step - 1)
        + jump1(x + 1, y - 2, step - 1)
        + jump1(x - 1, y - 2, step - 1)
        + jump1(x + 2, y - 1, step - 1)
        + jump1(x - 2, y - 1, step - 1)
}
// 动态规划
function jumpWay2(x, y, step) {
    const dp = Array.from(new Array(9), () => Array.from(new Array(10), () => new Array(step + 1)))
    dp[0][0][0] = 1
    for (let h = 1; h <= step; h++) {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 10; c++) {
                dp[r][c][h] += jump2(dp, r + 1, c + 2, h - 1)
                dp[r][c][h] += jump2(dp, r - 1, c + 2, h - 1)
                dp[r][c][h] += jump2(dp, r + 2, c + 1, h - 1)
                dp[r][c][h] += jump2(dp, r - 2, c + 1, h - 1)
                dp[r][c][h] += jump2(dp, r + 1, c - 2, h - 1)
                dp[r][c][h] += jump2(dp, r - 1, c - 2, h - 1)
                dp[r][c][h] += jump2(dp, r + 2, c - 1, h - 1)
                dp[r][c][h] += jump2(dp, r - 2, c - 1, h - 1)
            }
        }
    }
    return dp[x][y][step]
}
function jump2(dp, x, y, step) {
    // 棋盘边界判断
    if (x < 0 || y < 0 || x > 8 || y > 9) {
        return 0
    }
    return dp[x][y][step]
}

/** 生存概率问题 */
// 规则：N*M区域，从(row,col)出发，等概率随机四个方向走rest步后，获得生存方法数
function liveWay1(N, M, row, col, rest) {
    // 总的方法数
    const all = Math.pow(4, rest)
    // 生存方法数
    const live = live1(N, M, row, col, rest)
    return live / all
}
function live1(N, M, row, col, rest) {
    if (row < 0 || col < 0 || row === N || col === M) {
        return 0
    }
    if (rest === 0) {
        return 1
    }
    return live1(N, M, row + 1, col, rest - 1)
        + live1(N, M, row - 1, col, rest - 1)
        + live1(N, M, row, col + 1, rest - 1)
        + live1(N, M, row, col - 1, rest - 1)
}
// 动态规划
function liveWay2(N, M, row, col, rest) {
    // 总的方法数
    const all = Math.pow(4, rest)
    // 生存方法数
    const live = live2(N, M, row, col, rest)
    return live / all
}
function live2(N, M, row, col, rest) {
    // 考虑点在边界上，还往四个方向走，所以+2
    const dp = Array.from(new Array(N + 2), () => Array.from(new Array(M + 2), () => new Array(rest + 1).fill(0)))
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            dp[i][j][0] = 1
        }
    }
    for (let k = 1; k <= rest; k++) {
        for (let i = 0; i <= N; i++) {
            for (let j = 0; j <= M; j++) {
                dp[i][j][k] += getValue(dp, i + 1, j, k - 1, N, M)
                dp[i][j][k] += getValue(dp, i - 1, j, k - 1, N, M)
                dp[i][j][k] += getValue(dp, i, j + 1, k - 1, N, M)
                dp[i][j][k] += getValue(dp, i, j - 1, k - 1, N, M)
            }
        }
    }
    return dp[row][col][rest]
}
function getValue(dp, row, col, rest, N, M) {
    if (row < 0 || col < 0 || row === N || col === M) {
        return 0
    }
    return dp[row][col][rest]
}

/** 零钱找零组合问题 */
// 规则：arr都是正数，没有重复值，每个值代表一个面值，可以无限用该面值。最终要找零钱数rest，求找零方法
function coinsNum1(arr, rest) {
    return coins1(arr, 0, rest)
}
function coins1(arr, index, rest) {
    if (index === arr.length) {
        return rest === 0 ? 1 : 0
    }
    let ways = 0
    for (let zhang = 0; zhang * arr[index] <= rest; zhang++) {
        ways += coins1(arr, index + 1, rest - arr[index] * zhang)
    }
    return ways
}
// 动态规划(无优化版本，时间复杂度O(N*rest^rest))
// 最差情况：遇到面值为1的时候，当前rest为最大值，需要计算使用面值为1达到rest值的所有张数可能性。
// 但其实 (当前位置-1) 位置已经统计了达到 (当前位置-1) 值的所有张数可能性
// 此题目中，只需要使用 (当前位置-1) 的数加上 (当前位置) 下方的数就可以得出结果
function coinsNum2(arr, rest) {
    if (!arr || arr.length) return 0
    const dp = Array.from(new Array(arr.length + 1), () => new Array(rest + 1).fill(0))
    dp[arr.length][0] = 1
    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = 1; i < rest; j++) {
            let ways = 0
            // 痛点
            for (let zhang = 0; zhang * arr[i] <= rest; zhang++) {
                ways += dp[i + 1][rest - arr[i] * zhang]
            }
            dp[i][j] = ways
        }
    }
    return dp[0][rest]
}
// 动态规划(优化版本，)
// 对于上述痛点的优化(用临近数据代替枚举行为)
function coinsNum2(arr, rest) {
    if (!arr || arr.length) return 0
    const dp = Array.from(new Array(arr.length + 1), () => new Array(rest + 1).fill(0))
    dp[arr.length][0] = 1
    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = 1; i < rest; j++) {
            dp[i][j] = dp[i + 1][j]
            // 剩余零钱数必须为正数的情况下，才能加上(当前位置-1)本行前一个的数据的值
            if (j - arr[i] >= 0) {
                dp[i][j] += dp[i][j - arr[i]]
            }
        }
    }
    return dp[0][rest]
}
