

function radixBucketSort (arr) {
  var idx1, idx2, idx3, len1, len2, radix, radixKey;
  var radices = {}, buckets = {}, num, curr;
  var currLen, radixStr, currBucket;

  len1 = arr.length;
  len2 = 10;  // radix sort uses ten buckets

  // find the relevant radices to process for efficiency        
  for (idx1 = 0;idx1 < len1;idx1++) {
    radices[arr[idx1].toString().length] = 0;
  }

  // loop for each radix. For each radix we put all the items
  // in buckets, and then pull them out of the buckets.
  for (radix in radices) {          
    // put each array item in a bucket based on its radix value
    len1 = arr.length;
    for (idx1 = 0;idx1 < len1;idx1++) {
      curr = arr[idx1];
      // item length is used to find its current radix value
      currLen = curr.toString().length;
      // only put the item in a radix bucket if the item
      // key is as long as the radix
      if (currLen >= radix) {
        // radix starts from beginning of key, so need to
        // adjust to get redix values from start of stringified key
        radixKey = curr.toString()[currLen - radix];
        // create the bucket if it does not already exist
        if (!buckets.hasOwnProperty(radixKey)) {
          buckets[radixKey] = [];
        }
        // put the array value in the bucket
        buckets[radixKey].push(curr);          
      } else {
        if (!buckets.hasOwnProperty('0')) {
          buckets['0'] = [];
        }
        buckets['0'].push(curr);          
      }
    }
    // for current radix, items are in buckets, now put them
    // back in the array based on their buckets
    // this index moves us through the array as we insert items
    idx1 = 0;
    // go through all the buckets
    for (idx2 = 0;idx2 < len2;idx2++) {
      // only process buckets with items
      if (buckets[idx2] != null) {
        currBucket = buckets[idx2];
        // insert all bucket items into array
        len1 = currBucket.length;
        for (idx3 = 0;idx3 < len1;idx3++) {
          arr[idx1++] = currBucket[idx3];
        }
      }
    }
    buckets = {};
  }
}


function pigeonholeSort(unsortedArray) {

  if (!Array.isArray(unsortedArray)) {
    throw new Error(`pigeonholeSort() expects an array! Found ${typeof unsortedArray}.`);
  }

  const pigeonhole = [];

  unsortedArray.forEach(number => {
    if (isNaN(number)) {
      throw new Error(`pigeonholeSort() expects an array of numbers! Found ${typeof number}.`);
    }
    // Add each number to its respective pigeonhole
    if (pigeonhole[number]) pigeonhole[number].push(number);
    else pigeonhole[number] = [number];
  });

  // Use reduce to flatten an array of arrays!
  return pigeonhole.reduce((a, b) => a.concat(b), []);

}

/**  From https://github.com/frolovilya/sorting-benchmark/blob/master/src/benchmark/utils/ArrayGenerator.js */

/**
 * Shell Sort
 *
 * Time: O(N^2)
 * Space: O(1)
 *
 * + better performance than insertion sort;
 * + less exchanges due to using window to reach far distance elements;
 * + no extra space;
 * - non-stable
 */
const shellSort = function(a) {

	const exchange = function(array, i, j) {
		let tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
	};

	let N = a.length;

    // find initial window size
	let h = 1;
	while (h < N / 3) h = 3*h + 1;

	while (h >= 1) {
		// insertion sort on h-sized window
		for(let i = h; i < N; i++) {
			for(let j = i; j >= h && (a[j] < a[j - h]); j -= h) {
				exchange(a, j, j - h);
			}
		}
		h = Math.floor(h / 3);
	}

	return a;

};

/**
 * Generate random integer
 *
 * @param min number
 * @param max number
 * @returns {number}
 */
const generateRandomIntInclusive = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate array of given size with random elements in given range
 *
 * @param size array size to generate
 * @param range elements range {min, max}
 * @returns {Array}
 */
const randomizedArray = function(size, range) {
	let a = [];
	for(let i = 0; i < size; i++) {
		a.push(generateRandomIntInclusive(range.min, range.max));
	}

	return a;
};


function test(sortAlgorithm,size,multiplier=2) {
  let ua = randomizedArray(size,{min:0,max:size*multiplier});
  var start = Date.now();
  let sa = sortAlgorithm(ua);
  var end = Date.now();
  console.log(sortAlgorithm.name);
  console.log(end-start);
  // console.log(ua);
  
}



/***
 * The 2 hash sort algorithms I propose
 */


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
    if(val>max) max = val;
    if(val<min) min = val;
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


test(hashSort,20000000,0.3)
test(shellSort,20000000,0.3)
test(hashSortNonUnique,20000000,0.3)

//test(radixBucketSort,20000000,1)
// test(pigeonholeSort,20000,1)
