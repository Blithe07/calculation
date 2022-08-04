/** 图结构(模板)，基于图的算法转换为该模板处理 */
function Graph() {
    // 点集合
    this.nodes = new Map()
    // 边集合
    this.edges = new Set()
}
/** 点结构 */
function Node(value) {
    // 值
    this.value = value
    // 入度(箭头指向自己)
    this.in = 0
    // 出度(箭头指向其它)
    this.out = 0
    // 点邻居(出度具体的点)
    this.nexts = []
    // 边邻居(出度具体的边)
    this.edges = []
}
/** 边结构 */
function Edge(weight, from, to) {
    this.weight = weight
    this.from = from
    this.to = to
}

/** 宽度优先遍历 */
function bfs(node) {
    if (!node) return
    // 定义队列
    const queue = []
    // 定义set，判断是否已遍历过
    const set = new Set()
    // 加入节点
    queue.push(node)
    set.add(node)
    while (queue.length) {
        let cur = queue.shift()
        console.log(cur.value);
        // 遍历点邻居，不存在set中则添加到队列和set集合中
        for (const next of cur.nexts) {
            if (!set.has(next)) {
                queue.push(next)
                set.add(next)
            }
        }
    }
}

/** 深度优先遍历 */
function dfs(node) {
    if (!node) return
    // 定义栈结构，用于深度遍历
    const stack = []
    // 定义set，保证数据只进一次
    const set = new Set()
    stack.push(node)
    set.add(node)
    console.log(node.value)
    while (stack.length) {
        let cur = stack.pop()
        for (const next of cur.nexts) {
            // 不存在set中，加入到set，并将原先值和现在值压入栈中，跳过其它邻居节点。
            if (!set.has(next)) {
                set.add(next)
                stack.push(cur)
                stack.push(next)
                console.log(next.value);
                break
            }
        }
    }
}

/** 拓扑排序 */
function sortedTopology(graph) {
    // 存放所有入度节点
    const inMap = new Map()
    // 存放入度为0的节点
    const zeroQueue = new Array()
    // 遍历图的点结构，将入度为0的节点加入到队列
    for (const node of graph.nodes.values()) {
        inMap.set(node, node.in)
        if (node.in === 0) {
            zeroQueue.push(node)
        }
    }
    const result = new Array()
    while (zeroQueue.length) {
        const cur = zeroQueue.shift()
        result.add(cur)
        // 遍历当前节点的邻居节点
        for (const next of cur.nexts) {
            // 邻居节点入度减一
            inMap.set(next, inMap.get(next) - 1)
            // 入度为0的节点加入队列
            if (inMap.get(next) === 0) {
                zeroQueue.push(next)
            }
        }
    }
    return result
}

/** 并查集结构 */
class UnionFind {
    // <Node,Array<Node>>
    setMap = new Map()
    // 填充map(初始化，每个节点中对应的只有自己集合)
    mySets(nodes) {
        for (const node of nodes) {
            const set = new Array()
            set.push(node)
            this.setMap.set(node, set)
        }
    }
    // 是否为同一集合
    isSameSet(from, to) {
        const fromSet = this.setMap.get(from)
        const toSet = this.setMap.get(to)
        // 通过引用判断
        return fromSet === toSet
    }
    // 合并集合
    union(from, to) {
        const toSet = this.setMap.get(to)
        const fromSet = this.setMap.get(from)
        // 将toSet的点集合放到fromSet中，并且重新设置toNode指向的集合
        for (const toNode of toSet) {
            fromSet.push(toNode)
            this.setMap.set(toNode, fromSet)
        }
    }
}
/** 克鲁斯卡尔算法(要求无向图，以边作为出发点) */
function kruskal(graph) {
    // 初始化结构
    const unionFind = new UnionFind()
    unionFind.mySets(graph.nodes)
    // 通过比较器(边权重为比较值)得到从小到大的边数组
    const arr = new Array()
    for (const edge of graph.edges) {
        arr.push(edge)
    }
    arr = arr.sort((a, b) => a.weight - b.weight)
    const result = new Set()
    while (arr.length) {
        const edge = arr.shift()
        // 不是同一个集合，合并并添加到结果数组中
        if (!unionFind.isSameSet(edge.from, edge.to)) {
            result.add(edge)
            unionFind.union(edge.from, edge.to)
        }
    }
    return result
}

/** 普利姆算法(要求无向图，以点作为出发点) */
function prime(graph) {
    // 通过比较器(边权重为比较值)得到从小到大的边数组
    const arr = new Array()
    const set = new Set()
    const result = new Set()
    // 处理森林问题，存在点集和边集不连通。(如果是连通图，则不需要该for循环)
    for (const node of graph.nodes.values()) {
        if (!set.has(node)) {
            // 随便加个点
            set.add(node)
            // 该点所有边放到优先级队列中
            for (const edge of node.edges) {
                arr.push(edge)
            }
            arr = arr.sort((a, b) => a.weight - b.weight)
            while (arr.length) {
                const edge = arr.shift()
                const toNode = edge.to
                // 如果新的点不在set中，加入到set中并解锁其它边
                if (!set.has(toNode)) {
                    set.add(toNode)
                    result.add(edge)
                    for (const nextEdge of toNode.edges) {
                        arr.push(nextEdge)
                    }
                    arr = arr.sort((a, b) => a.weight - b.weight)
                }
            }
        }
    }
    // 最小生成树的边
    return result
}

/** 迪克斯特拉算法(单源最短路径算法，没有权值为负数的边) */
function dijkstra(head) {
    // 代表head出发到所有点的最小距离
    // key:head出发指向的node
    // value:head出发到node最小距离
    // 如果没有对应node记录，代表从head到该node距离为正无穷
    const distanceMap = new Map()
    distanceMap.set(head, 0)
    // 用于记录已经求过距离的节点，后续不处理
    const selectedNodes = new Set()
    // 找到map中最小距离的记录，并且不存在set中
    const minNode = getMinDistanceAndUnSelectedNode(distanceMap, selectedNodes)
    // 第一次选中的是头节点
    while (minNode) {
        const distance = distanceMap.get(minNode)
        for (const edge of minNode.edges) {
            const toNode = edge.to
            // 没记录，新增记录
            if (!distanceMap.has(toNode)) {
                // 当前最小节点距离 + 边的权重
                distanceMap.set(toNode, distance + edge.weight)
            }
            // 更新节点路径
            distanceMap.set(toNode, Math.min(distanceMap.get(toNode), distance + edge.weight))
        }
        // 将当前最小节点设为选中
        selectedNodes.add(minNode)
        // 再找map中最小距离的记录，并且不存在set中
        minNode = getMinDistanceAndUnSelectedNode(distanceMap, selectedNodes)
    }
    return distanceMap
}
/** 返回最小距离并未选中的节点 */
function getMinDistanceAndUnSelectedNode(distanceMap, selectedNodes) {
    let minNode
    let minDistance = Number.MAX_VALUE
    for (const [node, distance] of distanceMap.entries()) {
        // 未选中过并距离小于minDistance
        if (!selectedNodes.has(node) && minDistance > distance) {
            minNode = node
            minDistance = distance
        }
    }
    return minNode
}
/** 优化版迪克斯特拉算法(使用最小堆) */
function dijkstra(size) {
    const nodeHeap = new NodeHeap(size)
    nodeHeap.addOrUpdateOrIgnore(head, 0)
    const result = new Map()
    while (!nodeHeap.isEmpty()) {
        const record = nodeHeap.pop()
        const cur = record.node
        const distance = record.distance
        for (const edge of cur.edges) {
            nodeHeap.addOrUpdateOrIgnore(edge.toNode, edge.weight + distance)
        }
        result.set(cur, distance)
    }
    return result
}
/** 加工后的小根堆 */
class NodeHeap {

    // 距离map
    distanceMap = new Map()
    // 索引map，查询在nodes中的位置
    heapIndexMap = new Map()

    constructor(size) {
        // 存放所有节点
        this.nodes = new Array(size)
        // 堆上节点数量
        this.size = size
    }
    // 加入一个节点，根据节点信息调整堆
    addOrUpdateOrIgnore(node, distance) {
        // update
        if (this.inHeap(node)) {
            this.distanceMap.set(node, Math.min(this.distanceMap.get(node), distance))
            this.insertHeapify(node, this.heapIndexMap.get(node))
        }
        // add
        if (!this.isEntered(node)) {
            this.nodes[this.size] = node
            this.heapIndexMap.set(node, this.size)
            this.distanceMap.set(node, distance)
            this.insertHeapify(node, this.size++)
        }
        // ignore，不需要处理
    }
    // 弹出一个数，并调整堆结构
    pop() {
        const nodeRecord = new NodeRecord(this.nodes[0], this.getDistance(0))
        this.swap(0, this.size - 1)
        this.heapIndexMap.set(this.nodes[this.size - 1], -1)
        this.distanceMap.delete(this.nodes[this.size - 1])
        this.nodes.splice(this.size - 1, 1)
        this.heapify(0, --this.size)
        return nodeRecord
    }
    // 向上堆处理
    insertHeapify(node, index) {
        while (this.getDistance(index) < this.getDistance(this.nodes[(index - 1) / 2])) {
            this.swap(index, (index - 1) * 2)
            index = (index - 1) * 2
        }
    }
    // 向下堆处理
    heapify(index, size) {
        let left = index * 2 - 1
        while (left < size) {
            let smallest = left + 1 < size && this.getDistance(left + 1) < this.getDistance(left) ? left + 1 : left
            smallest = this.getDistance(smallest) < this.getDistance(index) ? smallest : index
            if (smallest === index) break
            this.swap(smallest, index)
            index = smallest
            left = index * 2 - 1
        }
    }
    // node在不在堆中
    inHeap(node) {
        return this.isEntered(node) && this.heapIndexMap.get(node) !== -1
    }
    // node是否进过堆
    isEntered(node) {
        this.heapIndexMap.has(node)
    }
    // 堆是否为空
    isEmpty() {
        return this.size === 0
    }
    // 交换位置
    swap(i1, i2) {
        this.heapIndexMap.set(this.nodes[i1], i2)
        this.heapIndexMap.set(this.nodes[i2], i1)
        const tmp = this.nodes[i1]
        this.nodes[i1] = this.nodes[i2]
        this.nodes[i2] = tmp
    }
    getDistance(index) {
        return this.distanceMap.get(this.nodes[index])
    }
}
/** 返回节点数据 */
class NodeRecord {
    constructor(node, distance) {
        this.node = node
        this.distance = distance
    }
}

/** 岛问题 */
// 规则：一个矩阵只有0，1，每个位置可以和自己上下左右四个位置相连，一片1连在一起为一个岛，求一个矩阵中有多少个岛
function infect(arr) {
    // 矩阵不存在返回0
    if (!arr || !arr[0]) return 0
    // 行数
    const N = arr.length
    // 列数
    const M = arr[0].length
    // 岛数
    let res = 0
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (arr[i][j] === 1) {
                res++
                infect(arr, i, j, N, M)
            }
        }
    }
    return res
}
/**
 * 将为1的四周包括自身为2
 * @param {*} arr 矩阵
 * @param {*} i 当前行索引
 * @param {*} j 当前列索引
 * @param {*} N 行数
 * @param {*} M 列数
 */
function infect(arr, i, j, N, M) {
    // 边界判断
    if (i < 0 || i >= N || j < 0 || j >= M || arr[i][j] !== 1) return
    // 没越界，将自身和周边变为2
    arr[i][j] = 2
    infect(arr, i + 1, j, N, M)
    infect(arr, i - 1, j, N, M)
    infect(arr, i, j + 1, N, M)
    infect(arr, i, j - 1, N, M)
}