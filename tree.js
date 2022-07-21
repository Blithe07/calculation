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

// 给出两种遍历方式（必须包含中序才能确定根节点位置，以及左右子树）还原二叉树(思路：递归)
function f1(qian, zhong) {
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

function f2(zhong, hou) {
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

// 深度优先遍历
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
 * 二叉树中查询值是否存在
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

function Node(value) {
    this.value = value
    this.childs = []
}

var a = new Node('a')
var b = new Node('b')
var c = new Node('c')
var d = new Node('d')
var e = new Node('e')
var f = new Node('f')

a.childs.push(b)
a.childs.push(c)
a.childs.push(f)
b.childs.push(d)
b.childs.push(e)

/**
 * 树的深搜
 * @param {*} root 
 * @returns 
 */
function deepSearchTree(root, target) {
    if (!root) return
    if (root.value === target) return true
    var result = false
    for (var i = 0; i < root.childs.length; i++) {
        // 存在childs就继续递归遍历且存在result就为true（或等于）
        result |= deepSearchTree(root.childs[i], target)
    }
    return result
}
/**
 * 树的广搜
 * @param {*} rootList 
 * @param {*} target 
 * @returns 
 */
function widthSearchTree(rootList, target) {
    if (!rootList || rootList.length === 0) return false
    var childList = []
    for (var i = 0; i < rootList.length; i++) {
        if (rootList[i].value === target) {
            return true
        } else {
            childList = childList.concat(rootList[i].childs)
        }
    }
    return widthSearchTree(childList, target)
}