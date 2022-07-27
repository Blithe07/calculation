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
    MySets(nodes) {
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
    unionFind.MySets(graph.nodes)
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