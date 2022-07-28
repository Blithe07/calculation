var arr = [30, 41, 52, 13, 75, 84, 66, 99, 27, 100]
// 交换位置(通过创建空间交换)
function exchange(arr, a, b) {
    var temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
}
// 交换位置(通过位运算交换，前提：a !== b)
function swap(arr, a, b) {
    arr[a] = arr[a] ^ arr[b]
    arr[b] = arr[a] ^ arr[b]
    arr[a] = arr[a] ^ arr[b]
}

// 冒泡排序 时间复杂度O(N²)，空间复杂度O(1),具备稳定性
function bubbleSort(arr) {
    if (!arr || arr.length < 2) return
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                exchange(arr, j, j + 1)
            }
        }
    }
}

// 选择排序 时间复杂度O(N²)，空间复杂度O(1)，不具备稳定性
function selectSort(arr) {
    if (!arr || arr.length < 2) return
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < arr.length; j++) {
            minIndex = arr[j] < arr[minIndex] ? j : minIndex
        }
        exchange(arr, i, minIndex)
    }
}

// 插入排序，时间复杂度O(N²)，空间复杂度O(1)，具备稳定性
function insertSort(arr) {
    if (!arr || arr.length < 2) return
    for (let i = 1; i < arr.length; i++) {
        for (let j = i - 1; j < i && arr[j] > arr[j + 1]; j--) {
            exchange(arr, j, j + 1)
        }
    }
}

// 归并排序，时间复杂度O(N*logN)，空间复杂度O(N)，具备稳定性
function mergeSort(arr, L, R) {
    if (!arr || arr.length < 2 || L == R) return
    const M = L + ((R - L) >> 1)
    mergeSort(arr, L, M)
    mergeSort(arr, M + 1, R)
    merge(arr, L, M, R)
}
function merge(arr, L, M, R) {
    let p1 = L, p2 = M + 1;
    const help = new Array(R - L + 1)
    let i = 0
    while (p1 <= M && p2 <= R) {
        help[i++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++]
    }
    while (p1 <= M) {
        help[i++] = arr[p1++]
    }
    while (p2 <= R) {
        help[i++] = arr[p2++]
    }
    for (i = 0; i < help.length; i++) {
        arr[L + i] = help[i]
    }
}

// 快速排序(双端比较) 通过概率性时间复杂度O(N*logN),空间复杂度O(N),不具备稳定性
function quickSort(arr, L, R) {
    if (!arr || arr.length < 2 || L >= R) return
    const random = Math.floor(Math.random() * (R - L + 1))
    exchange(arr, random, R)
    const p = patation(arr, L, R)
    quickSort(arr, L, p[0] - 1)
    quickSort(arr, p[1] + 1, R)
}
function patation(arr, L, R) {
    let less = L - 1, more = R
    while (L < more) {
        if (arr[L] < arr[R]) {
            exchange(arr, ++less, L++)
        } else if (arr[L] > arr[R]) {
            exchange(arr, --more, L)
        } else {
            L++
        }
    }
    exchange(arr, more, R)
    return [less + 1, more]
}

// 堆排序，时间复杂度O(N*logN)，空间复杂度O(1)，不具备稳定性
function heapSort(arr) {
    if (!arr || arr.length < 2) return
    let heapSize = arr.length
    for (let i = heapSize - 1; i >= 0; i--) {
        heapify(arr, i, heapSize)
    }
    exchange(arr, 0, --heapSize)
    while (heapSize > 0) {
        heapify(arr, 0, heapSize)
        exchange(arr, 0, --heapSize)
    }
}
function heapify(arr, index, heapSize) {
    let left = index * 2 + 1
    while (left < heapSize) {
        let largest = left + 1 < heapSize && arr[left] < arr[left + 1] ? left + 1 : left
        largest = arr[largest] > arr[index] ? largest : index
        if (largest === index) { break }
        exchange(arr, largest, index)
        index = largest
        left = index * 2 + 1
    }
}

// 桶排序(基数排序)，空间复杂度O(N),具备稳定性
function radixSort(arr, L, R) {
    if (!arr || arr.length < 2) return
    const max = Math.max(...arr)
    const digest = getDigest(max)
    radix(arr, L, R, digest)
}
function radix(arr, L, R, digest) {
    let i = 0, j = 0;
    const radix = 10;
    const help = new Array(R - L + 1)
    for (let d = 0; d < digest; d++) {
        const count = new Array(radix).fill(0)
        for (i = L; i <= R; i++) {
            j = getDigestNum(arr[i], d)
            count[j]++
        }
        for (i = 1; i < radix; i++) {
            count[i] = count[i] + count[i - 1]
        }
        for (i = R; i >= L; i--) {
            j = getDigestNum(arr[i], d)
            help[count[j] - 1] = arr[i]
            count[j]--
        }
        for (i = L, j = 0; i < help.length; i++, j++) {
            arr[i] = help[j]
        }
    }
}
function getDigestNum(num, d) {
    return Math.floor((num / (Math.pow(10, d))) % 10)
}
function getDigest(max) {
    let res = 0
    while (max !== 0) {
        res++
        max = Math.floor(max / 10)
    }
    return res
}

// sort方法对于基础数据类型会采用快排(不在乎稳定性)，对于复杂数据类型则采用归并排序来保证稳定性。