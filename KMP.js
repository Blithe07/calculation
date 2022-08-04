/** 改进的字符串匹配算法。利用匹配失败后的信息，尽量减少模式串与主串的匹配次数以达到快速匹配的目的。 */
/** 暴力尝试时间复杂度为O(M*N),从头到尾一个个尝试 */
/** KMP时间复杂度为O(N) */
/** 根据当前字符k获取k之前的前缀和后缀信息，长度不能取到k-1整体，得到前缀和后缀相等最大长度 */
function KMP(str1, str2) {
    if (str2.length > str1.length || !str1 || !str2 || str2.length < 1) return
    const str1Arr = str1.split('')
    const str2Arr = str2.split('')
    /** 时间复杂度O(M),线性的 */
    const nextArr = getNextArr(str2)
    let i1 = 0
    let i2 = 0
    /** 时间复杂度O(N),由于M<N，所以时间复杂度为O(N) */
    while (i1 < str1Arr.length && i2 < str2Arr.length) {
        if (str1Arr[i1] === str2Arr[i2]) {
            // 当前比较一致，一起向后移动
            i1++
            i2++
        } else if (nextArr[i2] === -1) {
            // str2移动到了0位置，代表str2Arr[0]和str1Arr[i]都匹配不了，向后移动
            i1++
        } else {
            // 根据前缀和后缀信息移动，即str2整体右移
            i2 = nextArr[i2]
        }
    }
    /** 返回匹配头索引值 */
    return i2 === str2.length ? i1 - i2 : -1
}
/** 获取短字符串的前缀和后缀数组信息 */
function getNextArr(str2Arr) {
    if (str2Arr.length === 1) return [-1]
    const nextArr = new Array(str2Arr.length)
    // 人为约定，因为0和1位置不可能匹配出最长前缀和后缀
    nextArr[0] = -1
    nextArr[1] = 0
    let i = 2
    // 与i-1索引位上的数比较的索引值
    let num = 0
    while (i < nextArr.length) {
        if (str2Arr[i - 1] === str2Arr[num]) {
            // 相等，代表有更长的前缀和后缀
            // i位置则是i-1位置上的前缀和后缀信息再+1
            nextArr[i++] = ++num
        } else if (num > 0) {
            // 不相等且当前和i-1匹配的索引不为0，只能匹配更短的前缀和后缀
            num = nextArr[num]
        } else {
            // 当str2Arr[0]和str2Arr[i-1]位置上的数比还不相等，i位置上的前缀和后缀信息为0
            nextArr[i++] = 0
        }
    }
    return nextArr
}