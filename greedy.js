/** 贪心算法(在某一标准下，优先考虑最满足标准的样本，最后考虑最不满足标准的样本，最终得到一个答案) */

/**
 * 技巧：
 *  1.建立比较器排序
 *  2.建立比较器组成堆
 */

/** 最多宣讲场次问题(只有一个会议室，只能容纳一个项目的宣讲) */
// 提供每个项目开始结束时间以及会议室开始时间，要求宣讲场次最多
// 贪心规则：最先结束宣讲的先安排
/**
 * 
 * @param {*} programs 对象数组，每个对象中存在宣讲开始时间和结束时间，start/end 
 * @param {*} timePoint 会议室开始时间
 */
function bestArrange(programs, timePoint) {
    programs = programs.sort((a, b) => a.end - b.end)
    let result = 0
    for (let i = 0; i < programs.length; i++) {
        if (programs[i].start >= timePoint) {
            result++
            timePoint += programs[i].end
        }
    }
    return result
}

/** 最小字典序问题 */
// 提供一组字符串数组，通过字符串拼接得到最小字典序
// 贪心规则：将比较的两个数相加进行比较ASCII码值
// eg: 如果只比较两个数b和ba，那么得到的结论是b>ba,得到的序列是bba，可是ba在前面会得到更小字典序，所以需要两数相加进行比较 
function lowestString(strs) {
    if (!strs || strs.length === 0) return ""
    const array = strs.sort((a, b) => (a + b).localeCompare(b + a))
    let res = ""
    for (const s of array) {
        res += s
    }
    return res
}

/** 切割金条问题 */
// 输入一个数组，返回切割的最小代价，一次只能切成两份
// 贪心规则：先切出最大值金条,准备小根堆
// eg:[10,20,30]
// 切割方案:
//   1.先切60，得到10和50长度金条，花费60铜板，再切50，得到20和30长度金条，花费50铜板。总计110
//   2.先切60，得到30和30长度金条，花费60铜板，再切30，得到10和20长度金条，花费30铜板。总计90
function lessMoney(arr) {
    // 从小到大排序
    arr = arr.sort((a, b) => a - b)
    let sum = 0
    while (arr.length > 1) {
        const tmp = arr.shift() + arr.shift()
        sum += tmp
        arr.push(tmp)
        arr = arr.sort((a, b) => a - b)
    }
    return sum
}

/** 最大收益问题 */
// 提供一个正数数组costs(每个项目花费金额)，一个正数数组profits(每个项目收益)，正数k(最多并行做k个项目)，正数m(初始资金)
// 贪心规则：先做利润最大且开销低于初始资金的，准备大根堆存放利润，小根堆存放花费资金
function findMaximizedCapital(k, m, profits, costs) {
    const minCostQueue = []
    const maxProfitQueue = []
    for (let i = 0; i < profits.length; i++) {
        minCostQueue.push({ profit: profits[i], cost: costs[i] })
    }
    minCostQueue = minCostQueue.sort((a, b) => a.cost - b.cost)
    for (let i = 0; i < k; i++) {
        while (minCostQueue.length && minCostQueue[0].cost <= m) {
            maxProfitQueue.push(minCostQueue.shift())
        }
        maxProfitQueue = maxProfitQueue.sort((a, b) => b.profit - a.profit)
        // 做不了，直接返回
        if (!maxProfitQueue.length) return m
        // 做得了，资金增加，找下一个项目做
        m += maxProfitQueue.shift().profit
    }
    return m
}

/** 苹果装袋问题 */
// 只提供一次装6个和一次装8个的袋子，苹果数为N，返回最少袋子数，装不了则返回-1
function minBags1(apple) {
    if (apple < 6 || apple % 2 === 1) {
        return -1
    }
    let bag6 = -1
    let bag8 = Math.floor(apple / 8)
    let rest = apple - 8 * bag8
    // 优化，取6和8最小公倍数，避免后续不必要计算
    while (rest > 0 && rest < 24) {
        let restBag6 = rest % 6 === 0 ? rest / 6 : -1
        if (restBag6 !== -1) {
            bag6 = restBag6
            break
        }
        rest = apple - 8 * (bag8 - 1)
    }
    return bag6 === -1 ? -1 : bag6 + bag8
}
// 根据返回结果存在一定规律
function minBags2(apple) {
    if (apple % 2 === 1) {
        return -1
    }
    if (apple < 18) {
        return apple === 0 ? 0 : (apple === 6 || apple === 8) ? 1 : (apple === 12 || apple === 14 || apple === 16) ? 2 : -1
    }
    return (apple - 18) / 8 + 3
}