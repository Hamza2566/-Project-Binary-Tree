export function search(current, value) {
   if (current === null) {
      return
   }
   let data = value[0]
   let root = current
   let rootdata = current.data
   if (data === rootdata) {
      console.log("Was found " + root.data)
      return
   }
   if (data > rootdata) {
      let rightroot = root.right
      search(rightroot, value)
   }
   else {
      if (root.left) {
         let leftroot = root.left
         search(leftroot, value)
      }
      else {
         search(root.right, value)
      }
   }
}
export function sort(arr) {
   if (arr.length <= 1) {
      return arr
   }
   let index = Math.floor(arr.length / 2)
   let mid = arr[index]
   let right = arr.slice(0,index)
   let left = arr.slice(index)
   return merge(sort(left), sort(right)); 
   function merge(left, right) {
       let sorted = [];
      let leftIndex = 0;
      let rightIndex = 0;
  
      while (leftIndex < left.length && rightIndex < right.length) {
          if (left[leftIndex] < right[rightIndex]) {
              sorted.push(left[leftIndex]);
              leftIndex++;
          } else {
              sorted.push(right[rightIndex]);
              rightIndex++;
          }
      }
      while (leftIndex < left.length) {
          sorted.push(left[leftIndex]);
          leftIndex++;
      }
      while (rightIndex < right.length) {
          sorted.push(right[rightIndex]);
          rightIndex++;
      }
  
      return sorted;  
   }
   
   
}
export function removenode(current, val) {
   if (current === null) {
       console.log('Not Found');
       return; 
   }

   let currentdata = current.data;
   console.log(currentdata);
   console.log(val);

   if (currentdata > val) {
       console.log('GO GO left', current.left);
       removenode(current.left, val); 
   } else if (currentdata < val) {
       console.log('GO GO right', current.right);
       removenode(current.right, val); 
   } else {
       console.log('Found', current.data);
       console.log('Deleting node:', current.data);
       Delnode(current); 
   }

   console.log('Current node:', current);
}

export function Delnode(current) {
   let left = current.left;
   let right = current.right;

   if (left === null && right === null) {
       console.log(`Removing leaf node: ${current.data}`);
       console.log('Node removed, returning null');
       return; 
   }

   if (left === null) {
       console.log(`Replacing node ${current.data} with its right child: ${right.data}`);
       return; 
   }
   if (right === null) {
       console.log(`Replacing node ${current.data} with its left child: ${left.data}`);
       console.log('Node replaced, returning left child');
       return; 
   }

   let successor = findMin(right);
   console.log(`Replacing node ${current.data} with its in-order successor: ${successor.data}`);
   current.data = successor.data; 
   console.log(`Removing successor node: ${successor.data}`);
   Delnode(successor); 

   console.log('Updated current node:', current);
}

function findMin(node) {
   while (node.left !== null) {
       node = node.left; 
   }
   return node;
}
 export function printNode(node) {
    console.log(node);
}