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