# hashSort
A sorting algorithm that is has O(n+k) where k is difference between the largest value and smallest value.

It is faster than ShellSort when the range of values is smaller than the number of elements.

It is similar to Counting sort or a simplified Bucket sort.


```javascript
let hashSort = (unsortedArray)=>{

  let myHash = {}
  let min = Infinity;
  let max = -Infinity;

  unsortedArray.forEach(val=>{
    myHash[val]=val;
    if(val>max) max = val;
    if(val<min) min = val;
  });

  let count = 0;

  for (let sorter = min; sorter <= max; sorter++) {
    if(myHash[sorter]){
      unsortedArray[count]=myHash[sorter];
      count++;
    }
  }
  return unsortedArray;

}

let hashSortNonUnique = (unsortedArray)=>{
  let myHash = {}
  let min = Infinity;
  let max = -Infinity;

  unsortedArray.forEach(val=>{
    myHash[val]=myHash[val]?myHash[val]+1:1;
    if(val>max) max = val;
    if(val<min) min = val;
  });

  let count = 0;

  for (let sorter = min; sorter <= max; sorter++) {
    let num = myHash[sorter];
    while(num--){
      unsortedArray[count]=sorter;
      count++;
    }
  }
  return unsortedArray;
}

let hashSortObjectsWithNonUniqueVals = (unsortedArray,valFunction)=>{
  let myHash = {}
  let min = Infinity;
  let max = -Infinity;

  unsortedArray.forEach(val=>{
    v= valFunction(val);
    myHash[v]=myHash[v]?myHash[v].push(val):[val];
    if(v>max) max = v;
    if(v<min) min = v;
  });

  let count = 0;

  for (let sorter = min; sorter <= max; sorter++) {
    let vals = myHash[sorter];
    for (let index = 0; index < vals.length; index++) {
      unsortedArray[count]= vals[index];
      count++;      
    }
  }
  return unsortedArray;
}
```