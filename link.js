/**
 * 单链表节点
 * @param {*} value 值
 * @param {*} next 下一个节点
 */
function Node(value) {
    this.value = value
    this.next = null
}

const n_a = new Node('a')
const n_b = new Node('b')
const n_c = new Node('c')
const n_d = new Node('d')
const n_e = new Node('e')
n_a.next = n_b
n_b.next = n_c
n_c.next = n_d
n_d.next = n_e

/** 反转单向链表 */
function reverseLink(head) {
    // 找到尾节点的上一个节点
    if (head.next.next === null) {
        // 将尾节点指针指向上一个节点
        head.next.next = head
        return head.next
    } else {
        const newHead = reverseLink(head.next)
        // 将当前节点的下一个节点指针指向当前节点
        head.next.next = head
        // 当前节点指针设为空
        head.next = null
        return newHead
    }
}

function DoubleNode(value) {
    this.value = value
    this.next = null
    this.prev = null
}
const d_n_a = new DoubleNode('a')
const d_n_b = new DoubleNode('b')
const d_n_c = new DoubleNode('c')
const d_n_d = new DoubleNode('d')
const d_n_e = new DoubleNode('e')

d_n_a.prev = null
d_n_a.next = d_n_b

d_n_b.prev = d_n_a
d_n_b.next = d_n_c

d_n_c.prev = d_n_b
d_n_c.next = d_n_d

d_n_d.prev = d_n_c
d_n_d.next = d_n_e

d_n_e.prev = d_n_d
d_n_e.next = null

/** 反转双向链表(类似两数交换) */
function reverseDoubleLink(head) {
    let curr = head
    let newHead
    while (curr) {
        let tmpPrev = curr.prev
        curr.prev = curr.next
        curr.next = tmpPrev
        // 记录返回节点
        newHead = curr
        // 当前节点移动
        curr = curr.prev
    }
    return newHead
}

const n_1 = new Node('1')
const n_2 = new Node('2')
const n_3 = new Node('3')
const n_4 = new Node('2')
const n_5 = new Node('1')

n_1.next = n_2
n_2.next = n_3
n_3.next = n_4
n_4.next = n_5

/** 判断是否为回文链表(额外空间O(N)) */
function isPalindrome(head) {
    const stack = new Array()
    let cur = head
    // 所有数据压入栈中
    while (cur) {
        stack.push(cur.value)
        cur = cur.next
    }
    while (stack.length) {
        // 弹出比较，不一致则不是回文
        if (head.value !== stack.pop()) return false
        // 一致继续比较
        else head = head.next
    }
    // 全部比完，是回文
    return true
}
/** 判断是否为回文链表(额外空间O(N/2),利用快慢指针，只存中点后续部分数据) */
function isPalindrome(head) {
    if (head === null || head.next === null) return true
    let right = head.next
    let cur = head
    // 快指针走两步，慢指针走一步
    while (cur.next && cur.next.next) {
        right = right.next
        cur = cur.next.next
    }
    const stack = new Array()
    // 到中点后，数据压入栈中
    while (right) {
        stack.push(right.value)
        right = right.next
    }
    while (stack.length) {
        // 弹出比较，不一致则不是回文
        if (head.value !== stack.pop()) return false
        // 一致继续比较
        else head = head.next
    }
    return true
}
/** 判断是否回文链表(额外空间O(1),利用快慢指针，改变链表指向，最后再改回去) */
function isPalindrome(head) {
    if (head === null || head.next === null) return
    let n1 = head, n2 = head
    // 循环走完，n1会走到中点
    while (n2.next && n2.next.next) {
        n1 = n1.next
        n2 = n2.next.next
    }
    /** 将中点指向空 */
    // n2设置为n1的下一个节点
    n2 = n1.next
    // n1指向空
    n1.next = null
    let n3 = null
    /** 后半截逆序 */
    while (n2) {
        n3 = n2.next
        n2.next = n1
        n1 = n2
        n2 = n3
    }
    // n3保存最后一个节点
    n3 = n1
    // n2设为头节点
    n2 = head
    let res = true
    /** n1,n2两头向中间走，判断值是否相同 */
    while (n1 && n2) {
        if (n1.value !== n2.value) {
            res = false
            break
        }
        n1 = n1.next
        n2 = n2.next
    }
    /** 后半截逆序回去 */
    // n1设为倒数第二个节点
    n1 = n3.next
    // 指针调回原方向
    n3.next = null
    while (n1) {
        n2 = n1.next
        n1.next = n3
        n3 = n1
        n1 = n2
    }
    // 返回是否回文结果
    return res
}

/** 荷兰国旗问题(链表)(额外空间O(N)) */
function listPartition(head) {
    const arr = new Array()
    while (head) {
        arr.push(head.value)
        head = head.next
    }
    // 获得排序数组
    mergeSort(arr, 0, arr.length - 1)
    /** 将节点依次连接 */
    const newHead = new Node(arr.shift())
    let root = null
    if (arr.length) {
        root = new Node(arr.shift())
        newHead.next = root
        while (arr.length) {
            root.next = new Node(arr.shift())
            root = root.next
        }
    }
    return newHead
}
function mergeSort(arr, L, R) {
    if (L >= R || !arr || arr.length < 2) return
    const M = L + ((R - L) >> 1)
    mergeSort(arr, L, M)
    mergeSort(arr, M + 1, R)
    merge(arr, L, M, R)
}
function merge(arr, L, M, R) {
    let p1 = L, p2 = M + 1, i = 0
    const help = new Array(R - L + 1)
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
/**  荷兰国旗问题(链表)(额外空间O(1)) */
function listPartition(head, value) {
    // 小于、等于、大于区域的头尾指针,以及一个保存下一个节点的节点
    let sh = null, st = null, eh = null, et = null, bh = null, bt = null, next = null
    while (head) {
        next = head.next
        head.next = null
        /** 
         * 根据比较结果往对应的头尾指针插值
         * 第一次添加，头尾指针为同一个
         * 第二次添加，原尾指针指向当前节点，尾指针移动到当前节点
         */
        if (head.value < value) {
            if (!sh) {
                sh = head
                st = head
            } else {
                st.next = head
                st = head
            }
        } else if (head.value === value) {
            if (!eh) {
                eh = head
                et = head
            } else {
                et.next = head
                et = head
            }
        } else {
            if (!bh) {
                bh = head
                bt = head
            } else {
                bt.next = head
                bt = head
            }
        }
        head = next
    }
    /**
     * 两个if处理有无小于区，有无等于区，有无大于区的情况
     */
    // 存在小于区
    if (st) {
        // 小于区尾指针指向等于区头指针
        st.next = eh
        // 处理等于区尾指针
        et = et ? et : st
    }
    // 存在等于区
    if (et) {
        // 等于区尾指针指向大于区头指针
        et.next = bh
    }
    // 返回头指针
    return sh ? sh : eh ? eh : bh
}

/** 复制链表(额外空间O(N)) */
function copyListWithRan(head) {
    let cur = head
    const map = new Map()
    // 建立map(老，新)
    while (cur) {
        map.set(cur, new Node(cur.value))
        cur = cur.next
    }
    cur = head
    // 设置新节点指向
    while (cur) {
        map.get(cur).next = map.get(cur.next)
        map.get(cur).rand = map.get(cur.rand)
        cur = cur.next
    }
    // 返回新节点的头
    return map.get(head)
}
/** 复制链表(额外空间O(1)) */
function copyListWithRan(head) {
    if (!head) return null
    let cur = head
    // 定义存放原链表next值的变量
    let next
    /** 将1->2->3 变成 1->1'->2->2'->3->3' */
    while (cur) {
        next = cur.next
        cur.next = new Node(cur.value)
        cur.next.next = next
        cur = next
    }
    cur = head
    let curCopy
    /** 设置复制节点的rand指针 */
    while (cur) {
        next = cur.next.next
        curCopy = cur.next
        curCopy.rand = cur.rand ? cur.rand.next : null
        cur = next
    }
    res = head.next
    cur = head
    /** 将原链表拆离出来，并设置next指向 */
    while (cur) {
        next = cur.next.next
        curCopy = cur.next
        cur.next = next
        curCopy.next = next ? next.next : null
        cur = cur.next
    }
    return res
}

/**
 * 两个单链表相交问题(额外空间O(1),时间O(N))
 * 1.两个单链表都是无环单链表
 *  a.两个单链表尾指针不是同一引用，不相交
 *  b.两个单链表尾指针同一个，相交。实现思路：得到两个链表长度差，长链表先走插值步，然后长短链表同时走，一定有相交节点
 * 2.两个单链表都是有环单链表
 *  a.两个有环单链表不相交
 *  b.两个有环单链表在入环节点之前相交
 *  c.两个有环单链表在环内相交
 */
function getIntersectNode(head1, head2) {
    if (!head1 || !head2) return null
    const loop1 = getLoopNode(head1)
    const loop2 = getLoopNode(head2)
    // 都是有环链表
    if (loop1 && loop2) {
        return bothLoop(head1, loop1, head2, loop2)
    }
    // 都是无环链表
    if (!loop1 && !loop2) {
        return noLoop(head1, head2)
    }
    // 一个有环一个无环这种相交结构不存在
    return null
}
/** 获取两个有环链表第一个相交节点 */
function bothLoop(head1, loop1, head2, loop2) {
    let cur1, cur2
    // 2.b情况,与noLoop类似，不过停止节点为入环节点
    if (loop1 === loop2) {
        cur1 = head1;
        cur2 = head2
        let n = 0
        while (cur1 !== loop1) {
            n++
            cur1 = cur1.next
        }
        while (cur2 !== loop2) {
            n--
            cur2 = cur2.next
        }
        cur1 = n > 0 ? head1 : head2
        cur2 = cur1 === head1 ? head2 : head1
        n = Math.abs(n)
        while (n !== 0) {
            n--
            cur1 = cur1.next
        }
        while (cur1 !== cur2) {
            cur1 = cur1.next
            cur2 = cur2.next
        }
        return cur1
    } else {
        // cur1设置为入环节点下一个
        cur1 = loop1.next
        // 走完一圈，判断是否遇到loop2，遇到则相交，否则不相交
        while (cur1 !== loop1) {
            if (cur1 === loop2) {
                return loop1
            }
            cur1 = cur1.next
        }
        return null
    }
}
/** 获取两个无环链表第一个相交节点 */
function noLoop(head1, head2) {
    // 参数初始判断
    if (!head1 || !head2) return null
    let n = 0, cur1 = head1, cur2 = head2
    // 巧妙运用一个变量n得到长度差
    while (cur1) {
        n++
        cur1 = cur1.next
    }
    while (cur2) {
        n--
        cur2 = cur2.next
    }
    // 不是同一尾指针，返回null
    if (cur1 !== cur2) return null
    // 得到长链表
    cur1 = n > 0 ? head1 : head2
    // 得到短链表
    cur2 = cur1 === head1 ? head2 : head1
    n = Math.abs(n)
    // 长链表先走n步
    while (n !== 0) {
        n--
        cur1 = cur1.next
    }
    // 长短链表一起走，一定相交
    while (cur1 !== cur2) {
        cur1 = cur1.next
        cur2 = cur2.next
    }
    return cur1
}
/** 获取链表第一个入环节点 */
function getLoopNode(head) {
    // 参数初始判断
    if (!head || !head.next || !head.next.next) return null
    // 慢指针一次走一步
    let n1 = head.next
    // 快指针一次走两步
    let n2 = head.next.next
    // 只要有环，一定能相遇，且在环内不会超过两圈
    while (n1 !== n2) {
        // 判断是否有环，无环则返回null
        if (!n2.next || !n2.next.next) return null
        n1 = n1.next
        n2 = n2.next.next
    }
    // 快指针回到头节点
    n2 = head
    // 快慢指针同时一次走一步，一定会在第一个入环节点相遇
    while (n1 !== n2) {
        n1 = n1.next
        n2 = n2.next
    }
    return n1
}