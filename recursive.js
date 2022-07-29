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
    const visit = new Array(26)
    // i往后，做不同字符尝试
    for (let j = i; j < arr.length; j++) {
        // 保证不重复
        if (!visit[arr[j] - 'a']) {
            visit[arr[j] - 'a'] = true
            // 交换i和j，实现多种排列情况
            swap(arr, i, j)
            // arr[i+1~arr.length-1]继续做选择排列
            process1(arr, i + 1, result)
            // 利用递归栈保存信息的特性，将数据恢复回去
            swap(arr, i, j)
        }
    }
}
function swap(arr, i, j) {
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}

