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
