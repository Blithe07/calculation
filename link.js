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