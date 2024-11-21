import { removenode, search } from "./functions.mjs"

export class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}
export class BalanceTree {
    constructor() {
        this.root = null
    }
    insert(data,start = 0){
        let end = data.length
        if (end === 0) {
            return
        }
        let index = Math.floor(start + end / 2)        
        let mid = data[index]
        let newnode = new Node(mid)
        if (!this.root) {
            this.root = newnode
        }
        else{
            this._insertNode(this.root, newnode);
        }
         let left  = data.splice(0,index)    
         let right  = data.splice(1,index)    
         this.insert(left)
         this.insert(right)
    }
    _insertNode(current,newnode){
         if (newnode.data < current.data) {
            if (!current.left) {
                current.left = newnode
            }
            else{
                  this._insertNode(current.left,newnode)
              }
              }
              else{
                  
                  if (!current.right) {
                      current.right = newnode
                }
                else{
                    this._insertNode(current.right,newnode)
                }
         }
    }
    find(value){
        let num = value[0]
        if (num === this.root.data) {
            console.log(
                      "Found" +   this.root.data
            );
            return
        }
        if (num > this.root.data) {
            search(this.root,value)
        }
        else{
            search(this.root,value)
        }
    }
    remove(val){
            if (this.root.data === val) {
                console.log(true); 
            } else if (this.root.data > val) {
                let left = this.root.left
                console.log('Go Left',left); // Should go left since val is less than root.data
                removenode(left,val)
            } else {
                let right = this.root.right
                console.log("Go Right",right); // Should go right since val is greater than root.data
                removenode(right,val)
            }
    }
    levelOrder(callback) {
        if (!callback) {
            throw new Error("A callback function is required");
        }
        if (this.root === null) {
            return; 
        }

        let queue = []; 
        queue.push(this.root);

        while (queue.length > 0) {
            let currentNode = queue.shift();  
            callback(currentNode);

            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
    }
    inorder(callback){
        if (!callback) {
            throw new Error("A callback function is required");
        }
        if (this.root === null) {
            return; 
        }
        function recursive(node) {
            if (node === null) {
                return
            }
            recursive(node.left)
            callback(node.data)
            recursive(node.right)
        }
        recursive(this.root)  
    }
    preorder(callback){
        if (!callback) {
            throw new Error("A callback function is required");
        }
        if (this.root === null) {
            return; 
        }
        function preorder(node) {
            if (node === null) {
                return; 
            }
            callback(node.data);
            preorder(node.left); 
            preorder(node.right);
        }
        preorder(this.root)
    }
    postorder(callback){
        if (!callback) {
            throw new Error("A callback function is required");
        }
        if (this.root === null) {
            return; 
        }
        function postorder(node) {
            if (node === null) {
                return; 
            }
            postorder(node.left); 
            postorder(node.right);
            callback(node.data);
        }
        postorder(this.root)
    }
    height(node) {
        if (node === null) {
            return -1; 
        }
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        let result =  Math.max(leftHeight, rightHeight) + 1;
        console.log(result);
    }
    depth(node, targetValue, currentDepth = 0) {
        if (node === null) {
            return -1;
        }
        console.log(`Checking node with value: ${node.data}, current depth: ${currentDepth}`);
        if (node.data === targetValue) {
            return currentDepth; 
        }
        const leftDepth = this.depth(node.left, targetValue, currentDepth + 1);
        if (leftDepth !== -1) {
            return leftDepth; 
        }
        return this.depth(node.right, targetValue, currentDepth + 1);
    }
    isBalanced(node) {
        if (node === null) {
            return { balanced: true, height: -1 }; 
        }

        const leftResult = this.isBalanced(node.left);
        if (!leftResult.balanced) {
            return { balanced: false, height: 0 }; 
        }

        const rightResult = this.isBalanced(node.right);
        if (!rightResult.balanced) {
            return { balanced: false, height: 0 }; 
        }

        const heightDifference = Math.abs(leftResult.height - rightResult.height);
        const balanced = heightDifference <= 1;

        return {
            balanced: balanced,
            height: Math.max(leftResult.height, rightResult.height) + 1
        };
    }
    checkBalanced() {
        // return this.isBalanced(this.root).balanced;
        console.log(this.isBalanced(this.root).balanced);
        
    }

    rebalance() {
        const sortedValues = [];
        this.inorder(value => sortedValues.push(value));
        this.root = this.buildBalancedTree(sortedValues);
    }
    buildBalancedTree(sortedValues) {
        if (sortedValues.length === 0) {
            return null;
        }
        const mid = Math.floor(sortedValues.length / 2);
        const node = new Node(sortedValues[mid]);
        node.left = this.buildBalancedTree(sortedValues.slice(0, mid));
        node.right = this.buildBalancedTree(sortedValues.slice(mid + 1));
        return node;
    }
    visualize(node = this.root, prefix = '', isLeft = true) {
        if (node !== null) {
            console.log(prefix + (isLeft ? '├── ' : '└── ') + node.data);
            this.visualize(node.left, prefix + (isLeft ? '│   ' : '    '), true);
            this.visualize(node.right, prefix + (isLeft ? '│   ' : '    '), false);
        }
    }
    }

