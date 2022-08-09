/** 不使用判断逻辑区分两数大小 */
// 异或，0->1 1->0
function flip(n) {
    return n ^ 1
}
// n右移31位获得符号位(0是正，1是负)
// 通过flip函数最终结果：正数得到1，负数得到0
function sign(n) {
    return flip(n >> 31 & 1)
}
/**
 * eg:
 *  1.a=10 b=9 sa=1 sb=1 sc=1 diffSab=0 sameSab=1 returnA=1 returnB=0 结果：a
 *  2.a=9 b=10 sa=1 sb=1 sc=0 diffSab=0 sameSab=1 returnA=0 returnB=1 结果：b
 *  3.a=-9 b=-10 sa=0 sb=0 sc=1 diffSab=0 sameSab=1 returnA=1 returnB=0 结果：a
 *  4.a=-10 b=-9 sa=1 sb=1 sc=0 diffSab=0 sameSab=1 returnA=0 returnB=1 结果：b
 *  5.a=10 b=-9 sa=1 sb=0 sc=1 diffSab=1 sameSab=0 returnA=1 returnB=0 结果：a
 *  6.a=-10 b=9 sa=0 sb=1 sc=0 diffSab=1 sameSab=0 returnA=0 returnB=1 结果：b
 */
function getMax(a, b) {
    // 但是a-b有可能溢出
    const c = a - b
    // 判断a是否为正数(是为1，不是为0)
    const sa = sign(a)
    // 判断b是否为正数(是为1，不是为0)
    const sb = sign(b)
    // 判断a-b是否为正数(是为1，不是为0)
    const sc = sign(c)
    // 判断a和b符号是否一样，一样为0，不一样为1
    const diffSab = sa ^ sb
    // diffSab取反
    const sameSab = flip(diffSab)
    // 如果a和b符号相同，a-b一定不溢出,a - b是正数(1)
    // 如果a和b符号不相同，并且a是正数(1)
    // 加号两侧一定互斥
    const returnA = diffSab * sa + sameSab * sc
    // 和returnA一定要互斥
    const returnB = flip(returnA)
    return a * returnA + b * returnB
}

/** 判断某数是否为2的幂次方 */
function is2Power(n) {
    // 如果是2的幂次方，通过位来表示该数时只有一个1
    return (n & (n - 1)) === 0
}

/** 判断某数是否为4的幂次方 */
function is4Power(n) {
    // 首先得是2的幂次方，接着跟01...0101做与运算，能排除掉 2，8，32等是2的幂次方但不是4的幂次方的数
    return is2Power(n) && (n & 0x55555555) !== 0
}

/** 通过位运算实现加法 */
function add(a, b) {
    let sum = a
    // 当b不为零重复执行，就能得到最终结果
    // a ^ b = 无进制加法
    // (a & b) << 1 = 进位信息
    while (b !== 0) {
        sum = a ^ b
        b = (a & b) << 1
        a = sum
    }
    return sum
}

/** 通过位运算实现减法 */
function minus(a, b) {
    // a + b的相反数，即可实现减法
    return add(a, add(~b + 1))
}

/** 通过位运算实现乘法 */
function multi(a, b) {
    let res = 0
    // 整个流程和数学乘法类似
    while (b !== 0) {
        if ((b & 1) !== 0) {
            // 如果b最右侧为1才会添加上结果
            res = add(res, a)
        }
        // a向左移
        a <<= 1
        // b无符号右移右移(补0)
        b >>>= 1
    }
    return res
}
/** 通过位运算实现除法 */