/** 汉纳塔问题 */
// 规则:圆盘大的不能压圆盘小的，一次只能移动一块圆盘
// 思路：1~i-1 from->other , i from->to , 1~i-1 other->to
function hanoi(n) {
    if (n > 0) {
        func(n, "左", "右", "中")
    }
}
function func(i, start, end, other) {
    // base case
    if (i === 1) {
        console.log('move ' + i + ' from ' + start + ' to ' + end);
    } else {
        // 把i-1的圆盘从start移动到other
        func(i - 1, start, other, end)
        // 把i的圆盘从start移动到end
        console.log('move ' + i + ' from ' + start + ' to ' + end);
        // 把i-1的圆盘从other移动到end
        func(i - 1, other, end, start)
    }
}

/** 打印字符串全部子序列，包括空字符串 */
// 思路：遇到一个字符，存在要与不要两个选择
// eg: abc => abc,ab,ac,a,bc,b,c,null
function printAllSubsequences(str) {
    const arr = str.split('')
    process(arr, 0)
}
function process(arr, i) {
    if (i === arr.length) {
        console.log(arr.filter(item => item !== 0).toString())
        return
    }
    // 要的情况
    process(arr, i + 1)
    const tmp = arr[i]
    arr[i] = 0
    // 不要的情况
    process(arr, i + 1)
    // 恢复数据
    arr[i] = tmp
}

/** 打印字符串全部排列，要求不重复 */
// 思路：第一个位置N种可能性，第二种N-1种可能性...
function Permutation(str) {
    // 存放排列结果
    const result = new Array()
    if (!str || !str.length) return result
    const arr = str.split('')
    process1(arr, 0, result)
    return result
}
// arr[i~arr.length-1]范围，i往后所有字符都可以在i位置上尝试
// arr[0~i-1]范围，是已经做了选择的范围
function process1(arr, i, result) {
    // base case 当索引值超出数组长度，代表完成了一种全排列
    if (i === arr.length) {
        result.push(arr.toString())
        return
    }
    // i往后，做不同字符尝试
    for (let j = i; j < arr.length; j++) {
            // 交换i和j，实现多种排列情况
            swap(arr, i, j)
            // arr[i+1~arr.length-1]继续做选择排列
            process1(arr, i + 1, result)
            // 利用递归栈保存信息的特性，将数据恢复回去
            swap(arr, i, j)
    }
}
function swap(arr, i, j) {
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}

/** 逆序栈 */
function reverseStack(stack) {
    if (!stack || stack.length === 0) return
    // 得到栈顶元素
    const result = getStackBottomValue(stack)
    reverseStack(stack)
    // eg: [1,2,3]=>[3,2,1]
    stack.push(result)
}
/** 获取栈底元素并返回 */
function getStackBottomValue(stack) {
    const result = stack.pop()
    if (stack.length === 0) {
        return result
    } else {
        const last = getStackBottomValue(stack)
        stack.push(result)
        return last
    }
}

/** 数字转换结果问题 */
// 规则：规定1对应A，2对应B，3对应C；数字字符串111，可转换成AAA、KA、AK；给定只有数字字符串数组，返回有多少种转换结果
function numChangeChar(str, i) {
    // i-1之前已经做了决定，此时如果i为0，无法进行转换，返回0
    if (str[i] === '0') {
        return 0
    }
    // 当前索引已经到达了数组长度，代表前面已经确认能转换为合法的格式，记为一种结果
    if (i === str.length) {
        return 1
    }
    // 两种情况
    if (str[i] === '1') {
        // 1.i作为独立转换，变成A，后续继续转换
        let res = numChangeChar(str, i + 1)
        if (i + 1 < str.length) {
            // 2.i可以和i+1作为一个整体，可转换为K,L,M,N,O,P,Q,R,S，后续继续转换
            res += numChangeChar(str, i + 2)
        }
        return res
    }
    // 两种情况
    if (str[i] === '2') {
        // 1.2作为独立转换，变成B，后续继续转换
        let res = numChangeChar(str, i + 1)
        if (i + 1 < str.length && str[i + 1] >= '0' && str[i + 1] <= '6') {
            // 2.i可以和i+1作为一个整体，只可转换为T,U,V,W,X,Y,Z，后续继续转换
            res += numChangeChar(str, i + 2)
        }
        return res
    }
    // 3，4，5，6，7，8，9只能作为独立转换，后续继续转换
    return numChangeChar(str, i + i)
}

/** 最多价值问题 */
// 规则：给定两个长度为N的数组weights(重量)和values(价值)，一个正数bag(载重)，所装物品不能超过bag，返回最多的价值
function biggest(weights, values, i, alreadyWeight, bag) {
    // 选到没得选了，返回0
    if (i === weights.length) return 0
    // 超重，返回0
    if (alreadyWeight > bag) return 0
    // 返回要当前重量或者不要当前重量情况下最大值
    return Math.max(
        biggest(weights, values, i + 1, alreadyWeight, bag),
        values[i] + biggest(weights, values, i + 1, alreadyWeight + weights[i], bag)
    )
}

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
//  假设8皇后问题在第0行第2列位置放皇后:
//      列限制：00100000
//    左侧限制：01000000
//    右侧限制：00010000
//  假设8皇后问题在第1行第4列位置放皇后:
//      列限制：00101000
//    左侧限制：10010000
//    右侧限制：00001100
//  当操作下一行皇后时，左侧限制只需要向左移动一位（上一行左侧限制 | 当前行决定后向左移），右侧只需要向右移动一位即可得到新的限制（上一行右侧限制 | 当前行决定后向右移）
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
    // 已经做的选择种类
    let res = 0
    // 当pos位上全为0时，代表已经不能再放置皇后
    while (pos !== 0) {
        // 获取最右侧的1(即当前做的选择)
        mostRightOne = pos & (~pos + 1)
        // 该位置标0，代表尝试在该位置放皇后
        pos = pos - mostRightOne
        res += setQueenByBit(limit, colLim | mostRightOne, (leftDiaLim | mostRightOne) << 1, (rightDiaLim | mostRightOne) >> 1)
    }
    return res
}
