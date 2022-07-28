/** n皇后问题 */
// 规则：任何两个皇后不共行不共列不共斜线
// 时间复杂度O(n的n次方)
function nQueens(n) {
    if (n < 1) return 0
    // 用一位数组表示二维数据
    // eg:record[i]标识第i行的皇后放在第几列
    const record = new Array(n)
    return setQueen(0, record, n)
}
/**
 * 放置皇后
 * @param {*} i 现在第几行
 * @param {*} record 存放已摆放了的皇后记录
 * @param {*} n 整体多少行
 * @returns 合法的摆法数量
 */
function setQueen(i, record, n) {
    // 代表前n行已经放好了合法的皇后，算一种摆法
    if (i === n) {
        return 1
    }
    let res = 0
    for (let j = 0; j < n; j++) {
        if (isValidate(record, i, j)) {
            record[i] = j
            res += setQueen(i + 1, record, n)
        }
    }
    return res
}
/** 校验i行j列是否能放置皇后 */
function isValidate(record, i, j) {
    // 遍历行，检查i行之前的已经放置的皇后是否与现在放置的冲突
    for (let k = 0; k < i; k++) {
        // 同列或者同斜线(x1-x2 === y1-y2，取绝对值)则不可放置皇后
        if (j === record[k] || Math.abs(record[k] - j) === Math.abs(k - i)) {
            return false
        }
    }
    return true
}

/** 常数项时间优化(前提是0<n<32)，通过位运算优化 */
function nQueensByBit(n) {
    if (n < 1 || n > 32) return 0
    // 用位图代表是否已放置皇后
    const limit = n === 32 ? -1 : (1 << n) - 1
    return setQueenByBit(limit, 0, 0, 0)
}
// eg: 
//  假设4皇后问题在第0行第1列位置放皇后:
//      列限制：0100
//    左侧限制：1000
//    右侧限制：0010
//  当操作下一行皇后时，左侧限制只需要向左移动一位，右侧只需要向右移动一位即可得到新的限制
/**
 * 放置皇后
 * @param {*} limit 总限制 8皇后即0000 0000 0000 0000 0000 0000 1111 1111 限制列，左侧，右侧活动范围区域(0为边界)
 * @param {*} colLim 列限制
 * @param {*} leftDiaLim 左侧限制
 * @param {*} rightDiaLim 右侧限制
 */
function setQueenByBit(limit, colLim, leftDiaLim, rightDiaLim) {
    // 列上限制和limit一致，代表完成了一种放置方法
    if (colLim === limit) {
        return 1
    }
    // 可以填皇后的列(1为可以填，0为不可以填)
    let pos = limit & (~(colLim | leftDiaLim | rightDiaLim))
    let mostRightOne = 0
    while (pos !== 0) {
        // 获取最右侧的1
        mostRightOne = pos & (~pos + 1)
        // 该位置标0，代表尝试在该位置放皇后
        pos = pos - mostRightOne
        res += setQueenByBit(limit, colLim | mostRightOne, (leftDiaLim | mostRightOne) << 1, (rightDiaLim | mostRightOne) >> 1)
    }
    return res
}