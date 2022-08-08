/** 滑动窗口 */
// 规则：获取窗口最大值
function getMaxWindow(arr, ws) {
    if (ws < 1 || !arr || arr.length < ws) return null
    // 双向队列，两头都可进可出
    // 此处队列人为规定从大到小排序
    // 存放索引
    const doubleQueue = new Array()
    // 最大值存储结果
    const result = new Array(arr.length - ws + 1)
    let index = 0
    for (let i = 0; i < arr.length; i++) {
        // 判断当前队列不为空的情况下，新进的数是否比当前队列末尾的大，大的话弹出队列末尾
        while (doubleQueue.length && arr[doubleQueue[doubleQueue.length - 1]] < arr[i]) {
            doubleQueue.pop()
        }
        // 添加当前数
        doubleQueue.push(i)
        // 处理已滑过的区域
        if (doubleQueue[0] === i - ws) {
            doubleQueue.shift()
        }
        // 处理已形成窗口
        if (i >= ws - 1) {
            result[index++] = arr[doubleQueue[0]]
        }
    }
    return result
}