/** 最长回文字串问题，和KMP算法类似,Manacher的思想也是避免"匹配"失败后的下标回退 */
/** 经典解法：时间复杂度O(N²)，从头到尾一个个尝试 
 *  通过往原始字符串插入特殊字符，解决偶数子符串回文匹配问题，最终最大结果除以2并向下取整就可以获取预期回文串长度
 *  但是有最差情况，'11111111111'，该情况下每次都能匹配出回文信息，且都会扩到左边界或者右边界
 *  */
/** Manacher算法时间复杂度O(N) */
/** 利用回文半径数组信息，将匹配的过程加速，不需要每次都匹配到边界，跳过无需验证的区域 */

function manacherString(str) {
    const charArr = str.split('')
    const result = new Array(charArr.length * 2 + 1)
    let index = 0
    for (let i = 0; i < result.length; i++) {
        // 奇数添加特殊字符，偶数添加原始字符
        result[i] = (i & 1) === 0 ? '#' : charArr[index++]
    }
    return result
}

function maxLcpsLength(s) {
    if (!s || s.length === 0) return 0
    // 1221 => #1#2#2#1#
    const str = manacherString(s)
    // 回文半径数组
    const pArr = new Array(str.length)
    // 中心
    let C = -1
    // 最大回文半径右边界 + 1
    let R = -1
    // 最大回文半径值
    let max = Number.MIN_VALUE
    // 求每个位置的回文半径
    for (let i = 0; i < str.length; i++) {
        // 得到i位置目前至少回文区域(跳过无需验证的区域)
        // 三种情况
        //  1.当前位置在最大回文右边界外，先返回1，需要外扩确认当前位置最大回文半径
        //  2.当前位置在最大回文右边界内：                                                                                    L                R   
        //      a.当前位置基于C的对称点(i')的回文区域左边界大于L，当前位置回文半径为i‘的回文半径                             eg:  [ ( i' ) C ( i ) ]
        //      b.当前位置基于C的对称点(i')的回文区域左边界小于L，当前位置回文半径为R-i                                     eg:( [  i'  ) C ( i   ]
        //      c.当前位置基于C的对称点(i')的回文区域左边界等于L，当前位置回文半径至少是为R-i，有可能能获得更大回文半径        eg:  [  i' )  C ( i   ]  
        pArr[i] = i < R ? Math.min(pArr[2 * C - i], R - i) : 1
        // 都往外扩看看能否得到更大回文半径(节省代码量，虽然只有1和2.c需要外扩，遇到2.a,2.b会直接break)
        while (i + pArr[i] < str.length && i - pArr[i] > -1) {
            if (str[i + pArr[i]] === str[i - pArr[i]]) {
                pArr[i]++
            } else {
                break
            }
        }
        /** 如果获得更大回文半径，调整最大回文半径右边界以及中心点 */
        if (i + pArr[i] > R) {
            R = i + pArr[i]
            C = i
        }
        max = Math.max(max, pArr[i])
    }
    // 获取原始串最大回文长度
    // eg: #1#2#2#1# => max=5 最大回文长度:1221 => 4
    return max - 1
}