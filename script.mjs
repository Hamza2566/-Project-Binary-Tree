import { printNode, sort } from "./functions.mjs";
import { BalanceTree } from "./Tree.mjs";
let array = [1,7,4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
 const updatearray = [...new Set(array)];
const sorted = sort(updatearray)
console.log(sorted);
const tree = new BalanceTree();
tree.insert(sorted);
tree.find([8])
tree.remove(9)
console.log("Binary Tree Structure:");
tree.visualize();
tree.height(tree.root);
console.log(tree.depth(tree.root,7));
tree.rebalance()
tree.checkBalanced()
console.log(tree.checkBalanced());
tree.inorder(printNode)
tree.preorder(printNode)
tree.postorder(printNode)
tree.levelOrder(printNode)



