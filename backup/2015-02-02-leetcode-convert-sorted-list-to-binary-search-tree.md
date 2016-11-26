---
layout: post
title: '[LeetCode] Convert Sorted List to Binary Search Tree'
date: 2015-02-02 12:57:30.000000000 +08:00
summary: 'Given a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.'
categories:
- Development
tags:
- LeetCode
- linked list
- DFS
- BST
- tree
status: publish
type: post
published: true

---

## [Convert Sorted List to Binary Search Tree](https://oj.leetcode.com/problems/convert-sorted-list-to-binary-search-tree/)

> Given a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.

给定一个链表，并将其转换为平衡树。转换思路很简单，把链表当作树的中序遍历的结果即可。链表中间值即根，左侧为左子树，右侧为右子树。对左子树和右子树再以同样的思路进行构建即可。对一链表找到中间值可以通过同时跑两个指针搜索，一个每次两步，一个每次一步，当较快指针到达链表尾部时，较慢的指针恰好到达中点。代码如下：

{% highlight c++ linenos %}
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
/**
 * Definition for binary tree
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode *sortedListToBST(ListNode *head) {
        if (head == NULL) return NULL;
        
        ListNode *fast = head, *slow = head, *tmp = head;
        while (fast != NULL && fast->next != NULL) {
            fast = fast->next->next;
            tmp = slow;
            slow = slow->next;
        }
        tmp->next = NULL;
        
        TreeNode *root = new TreeNode(slow->val);
        if (slow != head)
        {
            root->left = sortedListToBST(head);
            root->right = sortedListToBST(slow->next);
        }
        
        return root;
    }
};
{% endhighlight %}

以上思路比较好写，有一个潜在问题就是用这种方式构建平衡树会修改原链表。讨论区看到[vaputa](https://oj.leetcode.com/discuss/user/vaputa)的方法在不改变原链表的方式下构建出了平衡树，思路是类似的，先左子树，再当前结点，再右子树。代码如下：

{% highlight c++ linenos %}
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
/**
 * Definition for binary tree
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* listNode;
    int count(ListNode *node)
    {
        int count = 0;
        while (node != NULL) {
            count++;
            node = node->next;
        }
        return count;
    }
    
    TreeNode *generateTreeNode(int n)
    {
        if (n == 0) return NULL;
        
        TreeNode *node = new TreeNode(0);
        node->left = generateTreeNode(n / 2);
        node->val = listNode->val;
        listNode = listNode->next;
        node->right = generateTreeNode(n - n / 2 - 1);
        return node;
    }
    
    TreeNode *sortedListToBST(ListNode *head) {
        listNode = head;
        return generateTreeNode(count(head));
    }
};
{% endhighlight %}