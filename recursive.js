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