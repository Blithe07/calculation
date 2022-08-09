// 节点
function Node(value) {
    this.value = value
    this.left = null
    this.right = null
}

/** 
 * 递归序：
 *  每个节点都会有三次到达自己的时候。
 *      先序遍历则是第一次遇到时就进行打印或者其它处理
 *      中序遍历则是第二次遇到时就进行打印或者其它处理
 *      后序遍历则是第三次遇到时就进行打印或者其它处理
*/
/** 递归形式遍历二叉树 */
/** 先序遍历二叉树 */
function preOrderRecur(head) {
    if (!head) return
    console.log(head.value);
    preOrderRecur(head.left)
    preOrderRecur(head.right)
}
/** 中序遍历二叉树 */
function inOrderRecur(head) {
    if (!head) return
    inOrderRecur(head.left)
    console.log(head.value);
    inOrderRecur(head.right)
}
/** 后序遍历二叉树 */
function posOrderRecur(head) {
    if (!head) return
    posOrderRecur(head.left)
    posOrderRecur(head.right)
    console.log(head.value);
}

/** 非递归行为遍历二叉树 */
/** 先序遍历二叉树 */
function preOrderUnReCur(head) {
    if (!head) return
    const stack = new Array()
    // 压入头节点
    stack.push(head)
    // 栈不为空，弹出节点，并进行打印或者其它处理，先压右节点进栈，再压左节点进栈
    while (stack.length) {
        head = stack.pop()
        console.log(head.value)
        if (head.right) {
            stack.push(head.right)
        }
        if (head.left) {
            stack.push(head.left)
        }
    }
}
/** 中序遍历二叉树 */
function inOrderUnRecur(head) {
    if (!head) return
    const stack = new Array()
    // 每颗子树左边界进栈，左边界为空后弹出并打印，然后如果有右树，对其右树周而复始
    while (head || stack.length) {
        if (head) {
            stack.push(head)
            head = head.next
        } else {
            head = stack.pop()
            console.log(head.value)
            head = head.right
        }
    }

}
/** 后序遍历二叉树 */
function posOrderUnRecur(head) {
    if (!head) return
    // 弹出栈
    const stack1 = new Array()
    // 收集栈(最后用于弹出数据实现后序遍历)
    const stack2 = new Array()
    stack1.push(head)
    // 弹出栈不为空,弹出的节点压入收集栈，先压左节点进栈，再压右节点进栈
    while (stack1.length) {
        head = stack1.pop()
        stack2.push(head)
        if (head.left) {
            stack1.push(head.left)
        }
        if (head.right) {
            stack1.push(head.right)
        }
    }
    // 得到右左根顺序的栈，依次弹出即可
    while (stack2.length) {
        console.log(stack2.pop().value)
    }
}

/** morris遍历，利用空闲指针达到时间复杂度O(N)，空间复杂度O(1) */
function morris(head) {
    if (!head) return
    let cur = head, mostRight
    while (cur) {
        mostRight = cur.left
        if (mostRight) {
            // 对标/assets/morris.png中的情况2 
            while (mostRight.right && mostRight.right !== cur) {
                mostRight = mostRight.right
            }
            if (!mostRight.right) {
                // 对标/assets/morris.png中的情况2.a
                mostRight.right = cur
                cur = cur.left
                continue
            } else {
                // 对标/assets/morris.png中的情况2.b
                mostRight.right = null
            }
        }
        // 对标/assets/morris.png中的情况1
        cur = cur.right
    }
    // 对标/assets/morris.png中的情况3
}
/** morris实现先序遍历 */
// 1.只会遇到一次的节点，直接打印
// 2.能遇到两次的节点，打印第一次
function morrisPre(head) {
    if (!head) return
    let cur = head, mostRight
    while (cur) {
        mostRight = cur.left
        if (mostRight) {
            while (mostRight.right && mostRight.right !== cur) {
                mostRight = mostRight.right
            }
            if (!mostRight.right) {
                // 对应2.
                console.log(cur.value);
                mostRight.right = cur
                cur = cur.left
                continue
            } else {
                mostRight = null
            }
        } else {
            // 无左树，对应1.
            console.log(cur.value);
        }
        cur = cur.right
    }
}
/** morris实现中序遍历 */
// 1.只会遇到一次的节点，直接打印
// 2.能遇到两次的节点，打印第二次
function morrisIn(head) {
    if (!head) return
    let cur = head, mostRight
    while (cur) {
        mostRight = cur.left
        if (mostRight) {
            while (mostRight.right && mostRight.right !== cur) {
                mostRight = mostRight.right
            }
            if (!mostRight.right) {
                mostRight.right = cur
                cur = cur.left
                continue
            } else {
                mostRight = null
            }
        }
        // 没有左树或者第二次遇到同一节点(对应1、2)
        console.log(cur.value);
        cur = cur.right
    }
}
/** morris实现后序遍历 */
// 1.能遇到两次的节点，第二次遇到时，打印其节点左子树逆序右边界
// 2.单独逆序打印整棵树右边界
// 逆序打印(通过链表逆序完成，从而达到时间复杂度O(1))
function morrisPos(head) {
    if (!head) return
    let cur = head, mostRight
    while (cur) {
        mostRight = cur.left
        if (mostRight) {
            while (mostRight.right && mostRight.right !== cur) {
                mostRight = mostRight.right
            }
            if (!mostRight) {
                mostRight.right = cur
                cur = cur.left
                continue
            } else {
                mostRight.right = null
                printEdge(cur.left)
            }
        }
        cur = cur.right
    }
    printEdge(head)
}
function printEdge(node) {
    const tail = reverseEdge(node)
    let cur = tail
    while (cur) {
        console.log(cur.value);
        cur = cur.right
    }
    reverseEdge(tail)
}
function reverseEdge(from) {
    let next, prev
    while (from) {
        next = from.right
        from.right = prev
        prev = from
        from = next
    }
    return prev
}

/** 获取树的宽度(使用map) */
function getTreeWidth(head) {
    if (!head) return 0
    // 定义队列
    const queue = new Array()
    queue.push(head)
    // 定义map记录节点与层数之间的关系
    const curLevelMap = new Map()
    curLevelMap.set(head, 1)
    // 当前层
    let curLevel = 1
    // 当前层节点数
    let curLevelNodes = 0
    // 宽度
    let max = 0
    // 先进先出即可实现宽度优先遍历
    while (queue.length) {
        head = queue.shift()
        // 查看当前属于第几层
        const curNodeLevel = curLevelMap.get(head)
        if (curNodeLevel === curLevel) {
            // 如果属于同一层，当前层数数量+1
            curLevelNodes++
        } else {
            // 不是同一层，计算出最大值，并且当前层数和当前层节点数变化
            max = Math.max(max, curLevelNodes)
            curLevel++
            curLevelNodes = 0
        }
        if (head.left) {
            // 记录左孩子所在的层数
            curLevelMap.set(head.left, curNodeLevel + 1)
            queue.push(head.left)
        }
        if (head.right) {
            // 记录右孩子所在的层数
            curLevelMap.set(head.right, curNodeLevel + 1)
            queue.push(head.right)
        }
    }
    return max
}
/** 获取树的宽度(使用队列) */
function getTreeWidth(head) {
    if (!head) return 0
    // curEnd: 当前层最后一个节点
    // nextEnd: 下一层最后一个节点
    let curEnd = head, nextEnd = null, curLevelNodes = 0, max = 0
    const queue = new Array()
    queue.push(head)
    while (queue.length) {
        head = queue.shift()
        // 下一层节点入队列时，记录最新nextEnd
        if (head.left) {
            queue.push(head.left)
            nextEnd = head.left
        }
        if (head.right) {
            queue.push(head.right)
            nextEnd = head.right
        }
        // 当前层节点数+1
        curLevelNodes++
        // 如果到了当前层最后一个节点，清算最大值，将当前最后一个节点设为下一层最后一个节点，下一层最后一个节点清空
        if (curEnd === head) {
            max = Math.max(max, curLevelNodes)
            curLevelNodes = 0
            curEnd = nextEnd
            nextEnd = null
        }
    }
    return max
}

// 系统数字最小值
let prevValue = Number.MIN_VALUE
/** 判断是否为搜索二叉树(左子树节点值<子树节点值<右数节点值) */
function isSearchTree(root) {
    if (!root) return true
    // 判断左树是否为搜索二叉树
    const isLeftSearchTree = isSearchTree(root.left)
    // 如果左树不是直接返回false
    if (!isLeftSearchTree) return false
    if (head.value < prevValue) {
        return false
    } else {
        prevValue = head.value
    }
    // 判断右树是否为搜索二叉树
    const isRightSearchTree = isSearchTree(root.right)
    return isRightSearchTree
}
/** 判断是否为搜索二叉树 */
/**
 * 1.向自己左右子树要三个信息，是否为搜索二叉树,最大值,最小值
 * 2.根据左右子树得到该节点信息
 */
function isSearchTree(head) {
    return searchTreeInfo(head).isBST
}
/** 定义返回信息 */
class ReturnSearchInfo {
    constructor(isBST, min, max) {
        this.isBST = isBST
        this.min = min
        this.max = max
    }
}
function searchTreeInfo(head) {
    if (!head) {
        return null
    }
    // 左树信息
    const leftData = searchTreeInfo(head.left)
    // 右树信息
    const rightData = searchTreeInfo(head.right)
    // 加工出该树信息
    let isBST = true, min = head.value, max = head.value
    if (leftData) {
        min = Math.min(leftData.min, min)
        max = Math.min(leftData.max, max)
        isBST = leftData.isBST && leftData.max >= head.value
    }
    if (rightData) {
        min = Math.min(rightData.min, min)
        max = Math.min(rightData.max, max)
        isBST = rightData.isBST && rightData.min <= head.value
    }
    return new ReturnSearchInfo(isBST, min, max)
}

/** 判断是否为完全二叉树 */
/** 
 * 1.宽度优先遍历，当遍历到某个节点有右孩子却没有左孩子直接返回false
 * 2.宽度优先遍历，当遍历到某个节点有左无右时，接下来遍历的节点都必须是叶子节点
 */
function isCompleteTree(head) {
    if (!head) return true
    const queue = new Array()
    let leaf = false, l, r
    queue.push(head)
    while (queue.length) {
        head = queue.pop()
        l = head.left
        r = head.right
        if ((!l && r) || (leaf && (l || r))) {
            return false
        }
        if (l) {
            queue.push(l)
        }
        if (r) {
            queue.push(r)
        }
        if (!l || !r) {
            leaf = true
        }
    }
}

/** 判断是否为平衡二叉树(树形DP问题) */
/**
 * 1.向自己左右子树要两个信息，是否平衡,高度
 * 2.根据左右子树得到该节点信息
 */
function isBalanceTree(head) {
    return balanceTreeInfo(head).isBalanced
}
/** 定义返回信息 */
class ReturnBalanceInfo {
    constructor(isBalanced, height) {
        this.isBalance = isBalanced;
        this.height = height;
    }
}
function balanceTreeInfo(head) {
    // base case
    if (!head) {
        return new ReturnBalanceInfo(true, 0)
    }
    // 左树信息
    const leftTree = balanceTreeInfo(head.left)
    // 右树信息
    const rightTree = balanceTreeInfo(head.right)
    // 加工出该树高度
    const height = Math.max(leftTree.height, rightTree.height) + 1
    // 加工出该树是否平衡
    const isBalanced = leftTree.isBalanced && rightTree.isBalanced && Math.abs(leftTree.height - rightTree.height) < 2
    // 返回加工信息
    return new ReturnBalanceInfo(isBalanced, height)
}

/** 判断是否为满二叉树 */
/**
 * 1.获取树的高度h，满二叉树的节点为(2的h次方)-1
 * 2.向自己左右子树获取两个信息，节点数量信息,高度
 */
function isFullTree(head) {
    if (!head) return true
    const data = fullTreeInfo(head)
    return data.nodes === (data.height << 1) - 1
}
class ReturnFullInfo {
    constructor(nodes, height) {
        this.nodes = nodes
        this.height = height
    }
}
function fullTreeInfo(head) {
    if (!head) return new ReturnFullInfo(0, 0)
    const leftData = fullTreeInfo(head.left)
    const rightData = fullTreeInfo(head.right)
    const height = Math.max(leftData.height, rightData.height) + 1
    const nodes = leftData.nodes + rightData.nodes + 1
    return new ReturnFullInfo(nodes, height)
}

/**
 *  两个节点最低公共祖先(默认两个节点都在一棵树上)(额外空间O(N))
 * @param {*} head 
 * @param {*} o1 
 * @param {*} o2 
 */
function lowestCommonAncestor(head, o1, o2) {
    const fatherMap = new Map()
    setNodeInFatherMap(head, fatherMap)
    fatherMap.set(head, head)
    const set = new Set()
    let cur = o1
    // o1往上遍历到头节点，并沿途添加上经过的节点
    while (cur !== fatherMap.get(cur)) {
        set.add(cur)
        cur = fatherMap.get(cur)
    }
    // 添加上头节点
    set1.add(head)
    // o2往上遍历至头节点，并沿途查看是否存在set中，存在即返回
    cur = o2
    while (cur !== fatherMap.get(cur)) {
        if (set.has(cur)) {
            break
        }
        cur = fatherMap.get(cur)
    }
    return cur
}
/** 将所有节点的父节点与自己构建联系 */
function setNodeInFatherMap(head, fatherMap) {
    if (!head) return null
    fatherMap.set(head.left, head)
    fatherMap.set(head.right, head)
    setNodeInFatherMap(head.left, fatherMap)
    setNodeInFatherMap(head.right, fatherMap)
}
/** 两个节点最低公共祖先(默认两个节点都在一棵树上)(额外空间O(1)) */
/**
 * 1.o1是o2最低公共祖先或者o2是o1最低公共祖先
 * 2.o1,o2不互为公共祖先，向上找最低公共祖先
 */
function lowestCommonAncestor(head, o1, o2) {
    // base case
    if (!head || head === o1 || head === o2) {
        return head
    }
    const left = lowestCommonAncestor(head.left, o1, o2)
    const right = lowestCommonAncestor(head.right, o1, o2)
    if (left && right) {
        return head
    }
    return left ? left : right
}

// 特殊节点(带parent指针)
function pNode(value) {
    this.value = value
    this.left = null
    this.right = null
    this.parent = null
}
/** 后继节点(中序遍历中下一个节点) */
/**
 * 实现一：使用数组存储中序遍历结果，得到后继节点，额外空间复杂度O(N)
 * 实现二：访问第K个节点的后继节点，使用指针信息得到后继节点，额外空间复杂度O(K)，优于实现一
 *  1.如果有右子树，后继节点是右子树的最左节点
 *  2.如果无右树，有左子树，后继节点是当前节点向上查询，查当前节点是否为父节点的左子树，如果是的话，返回该父节点；整个树最右节点的后继节点是null
 */
function getSuccessorNode(node) {
    // 空节点直接返回null
    if (!node) return node
    if (node.right) {
        // 有右树，得到右子树的最左节点
        return getLeftMost(node.right)
    } else {
        // 无右树
        let parent = node.parent
        // 存在父节点，并且父节点的左子树不是自己，则继续向上访问
        while (parent && parent.left !== node) {
            node = parent
            parent = node.parent
        }
        // 该return parent代表两种情况
        //  1.找到父节点的左子树是自己，返回父节点
        //  2.一直找不到父节点的左子树是自己，代表是右子树最右侧节点，返回null
        return parent
    }
}
/** 返回右子树最左侧节点 */
function getLeftMost(node) {
    if (!node) return node
    while (node.left) {
        node = node.left
    }
    return node
}

/** 二叉树-序列化(内存->硬盘)，采用先序 */
function serialByPre(head) {
    if (!head) {
        return '#_'
    }
    let res = head.value + '_'
    res += serialByPre(head.left)
    res += serialByPre(head.right)
    return res
}
/** 二叉树-反序列化(硬盘->内存) */
function reconByPreString(preStr) {
    const values = preStr.split('_')
    return reconPreOrder(values)
}
function reconPreOrder(queue) {
    const value = queue.shift()
    if (value === '#') return null
    const head = new Node(value)
    head.left = reconPreOrder(queue)
    head.right = reconPreOrder(queue)
    return head
}

// 给出两种遍历方式（必须包含中序才能确定根节点位置，以及左右子树）还原二叉树(思路：递归)
/** 前中序树，得到整棵树 */
function getRootTree(qian, zhong) {
    if (qian == null || zhong == null || qian.length == 0 || zhong.length == 0 || qian.length !== zhong.length) return undefined
    var root = newNode(qian[0])
    var rootIndex = zhong.indexOf(root.value)
    var leftQian = qian.slice(1, rootIndex + 1)
    var rightQian = qian.slice(rootIndex + 1, qian.length)
    var leftZhong = zhong.slice(0, rootIndex)
    var rightZhong = zhong.slice(rootIndex + 1, zhong.length)
    root.left = f1(leftQian, leftZhong)
    root.right = f1(rightQian, rightZhong)
    return root
}
/** 中后序树，得到整棵树 */
function getRootTree(zhong, hou) {
    if (zhong == null || hou == null || zhong.length == 0 || hou.length == 0 || zhong.length !== hou.length) return undefined
    var root = new Node(hou[hou.length - 1])
    var rootIndex = zhong.indexOf(root.value)
    var zhongLeft = zhong.slice(0, rootIndex)
    var zhongRight = zhong.slice(rootIndex + 1, zhong.length)
    var houLeft = hou.slice(0, rootIndex)
    var houRight = hou.slice(rootIndex, hou.length - 1)
    root.left = f2(zhongLeft, houLeft)
    root.right = f2(zhongRight, houRight)
    return root
}

// 深度优先搜索
function deepSearch(root, target) {
    if (root == null) return false
    if (root.value == target) return true
    var left = deepSearch(root.left, target)
    var right = deepSearch(root.right, target)
    return left || right
}

// 广度优先搜索
function widthSearch(rootList, target) {
    if (rootList == null || rootList.length == 0) return false
    var childList = []
    for (var i = 0; i < rootList.length; i++) {
        if (rootList[i] !== null && rootList[i] === target) {
            return true
        } else {
            childList.push(rootList[i].left)
            childList.push(rootList[i].right)
        }
    }
    return widthSearch(childList, target);
}

// 二叉树比较（不允许换位）
function compareTree(root1, root2) {
    if (root1 === root2) return true
    if ((root1 == null && root2 !== null) || (root2 == null && root1 !== null)) return false
    if (root1.value !== root2.value) return false
    return compareTree(root1.left, root2.left) && compareTree(root1.right, root2.right)
}
// 二叉树比较（允许换位）
function compareChangeTree(root1, root2) {
    if (root1 === root2) return true
    if ((root1 == null && root2 !== null) || (root2 == null && root1 !== null)) return false
    if (root1.value !== root2.value) return false
    return compareChangeTree(root1.left, root2.left) ||
        compareChangeTree(root1.right, root2.right) ||
        compareChangeTree(root1.left, root2.right) ||
        compareChangeTree(roo1.right, root2.left)
}

// 二叉树diff
function diffTree(root1, root2, diffList) {
    if (root1 == root2) return diffList
    if (root1 == null && root2 != null) {
        diffList.push({
            type: "新增",
            origin: null,
            now: root2
        })
    } else if (roo1 != null && roo2 == null) {
        diffList.push({
            type: "删除",
            origin: root1,
            now: null
        })
    } else if (root1.value !== root2.value) {
        diffList.push({
            type: "修改",
            origin: root1,
            now: root2
        })
        // 比较子树
        diffTree(root1.left, root2.left, diffList);
        diffTree(root1.right, root2.right, diffList);
    } else {
        diffTree(root1.left, root2.left, diffList);
        diffTree(root1.right, root2.right, diffList);
    }
}

/**
 * 构建二叉搜索树
 * @param {*} arr 一维节点数组 
 */
function buildSearchTree(arr) {
    if (!arr || arr.length === 0) return null
    var root = new Node(arr[0])
    for (var i = 1; i < arr.length; i++) {
        addNode(root, arr[i])
    }
    return root
}
/**
 * 节点按规则添加到root中
 * @param {*} root 根节点
 * @param {*} nodeValue 节点值
 */
function addNode(root, nodeValue) {
    if (root === null) return
    if (root.value === nodeValue) return
    // 节点值大于根节点，放到右子树中
    // 节点值小于根节点，放到左子树中
    if (root.value < nodeValue) {
        if (root.right === null) {
            root.right = new Node(nodeValue)
        } else {
            addNode(root.right, nodeValue)
        }
    } else if (root.value > nodeValue) {
        if (root.left === null) {
            root.left = new Node(nodeValue)
        } else {
            addNode(root.left, nodeValue)
        }
    }
}

/**
 * 搜索二叉树中查询值是否存在
 * @param {*} root 根节点（树结构）
 * @param {*} target 目标节点值
 */
function searchByTree(root, target) {
    if (root === null) return false
    if (root.value === target) return true
    if (root.value > target) {
        searchByTree(root.left, target)
    } else {
        searchByTree(root.right, target)
    }
}
/**
 * 获取树的深度
 * @param {*} root 根节点
 * @returns 
 */
function getDeep(root) {
    if (root === null) return 0
    return Math.max(getDeep(root.left), getDeep(root.right)) + 1
}
/**
 * 判断该树是否为平衡二叉树
 * @param {*} root 根节点
 * @returns 
 */
function isBalance(root) {
    if (root === null) return true
    var leftDeep = getDeep(root.left)
    var rightDeep = getDeep(root.right)
    if (Math.abs(leftDeep - rightDeep) > 1) {
        return false
    } else {
        return isBalance(root.left) && isBalance(root.right)
    }
}
/**
 * 左单旋
 * @param {*} root 当前根节点 
 * @returns 返回新根节点
 */
function leftRotate(root) {
    // 找到最新根节点
    var newRoot = root.right
    // 找到变化的点
    var changeNode = newRoot.left
    // 当前根节点变成最新根节点的左孩子
    newRoot.left = root
    // 当前根节点的右孩子为变化节点
    root.right = changeNode
    // 返回根节点
    return newRoot
}
/**
 * 右单旋
 * @param {*} root 当前根节点
 * @returns 返回新根节点
 */
function rightRotate(root) {
    // 找到最新根节点
    var newRoot = root.left
    // 找到变化的点
    var changeNode = newRoot.right
    // 当前根节点变成最新根节点的左孩子
    newRoot.right = root
    // 当前根节点的右孩子为变化节点
    root.left = changeNode
    // 返回根节点
    return newRoot
}
/**
 * 单旋，将不平衡二叉树转成平衡二叉树
 * @param {*} root 当前根节点
 * @returns 返回新根节点
 */
function singleRotateChangeTreeToBalance(root) {
    if (isBalance(root)) return root
    // 判断条件要从下往上，判断是否为平衡二叉树，遇到不平衡点选择指定单旋方式（后序遍历）
    if (root.left !== null) root.left = singleRotateChangeTreeToBalance(root.left)
    if (root.right !== null) root.right = singleRotateChangeTreeToBalance(root.right)
    var leftDeep = getDeep(root.left)
    var rightDeep = getDeep(root.right)
    if (Math.abs(leftDeep - rightDeep) < 2) {
        return root
    } else if (leftDeep > rightDeep) {
        return rightRotate(root)
    } else if (rightDeep > leftDeep) {
        return leftRotate(root)
    }
}
/**
 * 左右双旋，当变化分支为唯一最深分支时，在原本需要右旋的前面先进行一次左旋
 * @param {*} root 
 */
function leftRightRotateChangeTreeToBalance(root) {
    if (isBalance(root)) return root
    // 判断条件要从下往上，判断是否为平衡二叉树，遇到不平衡点选择指定单旋方式（后序遍历）
    if (root.left !== null) root.left = leftRightRotateChangeTreeToBalance(root.left)
    if (root.right !== null) root.right = leftRightRotateChangeTreeToBalance(root.right)
    var leftDeep = getDeep(root.left)
    var rightDeep = getDeep(root.right)
    if (Math.abs(leftDeep - rightDeep) < 2) {
        return root
    } else if (leftDeep > rightDeep) {
        /**
         * 右旋之前，检查该节点的左子树
         */
        // 需要旋转点的右子树（即变化分支）
        var changeTreeDeep = getDeep(root.left.right)
        // 需要旋转点的左子树（即不变化分支）
        var noChangeTreeDeep = getDeep(root.left.left)
        // 如果变化分支深度大于不变化分支，则需要左右双旋
        if (changeTreeDeep > noChangeTreeDeep) {
            root.left = leftRotate(root.left)
        }
        // 右旋
        return rightRotate(root)
    } else if (rightDeep > leftDeep) {
        /**
         * 左旋之前，检查该节点的右子树
         */
        // 需要旋转点的左子树（即变化分支）
        var changeTreeDeep = getDeep(root.right.left)
        // 需要旋转点的右子树（即不变化分支）
        var noChangeTreeDeep = getDeep(root.right.right)
        // 如果变化分支深度大于不变化分支，则需要右左双旋
        if (changeTreeDeep > noChangeTreeDeep) {
            root.right = rightRotate(root.right)
        }
        // 左旋
        return leftRotate(root)
    }
}

/**
 * （左左||右右）双旋，当变化分支深度超过比旋转节点另一侧深度差距超过2，那么单旋过后依旧不平衡。
 * @param {*} root 
 */
function changeTreeToBalance(root) {
    if (isBalance(root)) return root
    // 判断条件要从下往上，判断是否为平衡二叉树，遇到不平衡点选择指定单旋方式（后序遍历）
    if (root.left !== null) root.left = changeTreeToBalance(root.left)
    if (root.right !== null) root.right = changeTreeToBalance(root.right)
    var leftDeep = getDeep(root.left)
    var rightDeep = getDeep(root.right)
    if (Math.abs(leftDeep - rightDeep) < 2) {
        return root
    } else if (leftDeep > rightDeep) {
        /**
         * 右旋之前，检查该节点的左子树
         */
        // 需要旋转点的右子树（即变化分支）
        var changeTreeDeep = getDeep(root.left.right)
        // 需要旋转点的左子树（即不变化分支）
        var noChangeTreeDeep = getDeep(root.left.left)
        // 如果变化分支深度大于不变化分支，则需要左右双旋
        if (changeTreeDeep > noChangeTreeDeep) {
            root.left = leftRotate(root.left)
        }
        // 右旋后最新的根节点
        var newRoot = rightRotate(root)
        // 判断右旋后最新根节点的右节点是否平衡，不平衡则继续旋转
        newRoot.right = changeTreeToBalance(newRoot.right)
        // 对右节点旋转后，可能整体又不平衡了，所以最新根节点还需要判断是否平衡
        newRoot = changeTreeToBalance(newRoot)
        return newRoot
    } else if (rightDeep > leftDeep) {
        /**
         * 左旋之前，检查该节点的右子树
         */
        // 需要旋转点的左子树（即变化分支）
        var changeTreeDeep = getDeep(root.right.left)
        // 需要旋转点的右子树（即不变化分支）
        var noChangeTreeDeep = getDeep(root.right.right)
        // 如果变化分支深度大于不变化分支，则需要右左双旋
        if (changeTreeDeep > noChangeTreeDeep) {
            root.right = rightRotate(root.right)
        }
        // 左旋后最新的根节点
        var newRoot = leftRotate(root)
        // 判断左旋后最新根节点的左节点是否平衡，不平衡则继续旋转
        newRoot.left = changeTreeToBalance(newRoot.left)
        // 对左节点旋转后，可能整体又不平衡了，所以最新根节点还需要判断是否平衡
        newRoot = changeTreeToBalance(newRoot)
        return newRoot
    }
}

/** 树形DP问题 */

// 二叉树节点间最大距离
/**
 * 最大距离
 *  1.头节点不参与
 *      a.左树的最大距离
 *      b.右树的最大距离
 *  2.头节点参与
 *      a.左树离头节点最远的距离(左树高度)+右树离头节点最远的距离(右树高度)+1
 */
function maxDistance(head) {
    return maxTreeDistanceInfo(head).maxDistance
}
class ReturnMaxDistanceInfo {
    constructor(maxDistance, height) {
        this.maxDistance = maxDistance
        this.height = height
    }
}
function maxTreeDistanceInfo(node) {
    // base case
    if (!node) {
        return new ReturnMaxDistanceInfo(0, 0)
    }
    const leftData = maxTreeDistanceInfo(node.left)
    const rightData = maxTreeDistanceInfo(node.right)
    // 三种情况
    const p1 = leftData.maxDistance
    const p2 = rightData.maxDistance
    const p3 = rightData.height + rightData.height + 1
    // 组合出最大距离
    const maxDistance = Math.max(p1, p2, p3)
    // 组合出树的高度
    const height = Math.max(rightData.height, leftData.height) + 1
    return new ReturnMaxDistanceInfo(maxDistance, height)
}

// 派对最大快乐值问题(某个员工来，直接下级不能来)
/**
 * 1.当前员工参加
 *  a.直接下级不参加
 * 2.当前员工不参加
 *  a.直接下级参加，
 *  b.直接下级不参加
 */
class Employee {
    // 快乐值
    happy = 0
    // 直接下级
    subordinates = []
    constructor(happy, subordinates) {
        this.happy = happy
        this.subordinates = subordinates
    }
}
function maxHappy(head) {
    const headInfo = maxHappyInfo(head)
    return Math.max(headInfo.laiMaxHappy, headInfo.buMaxHappy)
}
class ReturnHappyInfo {
    constructor(laiMaxHappy, buMaxHappy) {
        this.laiMaxHappy = laiMaxHappy
        this.buMaxHappy = buMaxHappy
    }
}
/**
 * @param {Employee} node 多叉节点
 */
function maxHappyInfo(node) {
    // base case
    if (!node.subordinates.length) {
        return new ReturnHappyInfo(node.happy, 0)
    }
    const lai = node.happy
    const bu = 0
    for (const subordinate of node.subordinates) {
        const nextInfo = maxHappyInfo(subordinate)
        // 1.a
        lai += nextInfo.buMaxHappy
        // 2.a和2.b取最大值
        bu += Math.max(nextInfo.laiMaxHappy, nextInfo.buMaxHappy)
    }
    return new ReturnHappyInfo(lai, bu)
}