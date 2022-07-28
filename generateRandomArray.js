/**
 * 生成随机长度的随机值数组
 * @param {*} maxSize 最大值
 * @param {*} maxValue 最大长度
 * @returns 
 */
const generateRandomArray = (maxSize, maxValue) => {
    const array = new Array(Math.ceil(Math.random() * maxSize))
    for (let i = 0; i < array.length; i++) {
        array[i] = Math.abs(Math.floor((maxValue + 1) * Math.random()) - Math.floor(maxValue * Math.random()))
    }
    return array
}