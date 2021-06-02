# Sorting Algorithms

### Insertion Sort

- Time Complexity: worst O(n^2), best O(n), average O(n^2)
- Space Complexity: worst O(1) auxiliary

```javascript
const insertionSort = arr => {
  const copy = [...arr]
  for (let i = 1; i < copy.length; i++) {
    const insertValue = copy[i]
    let j
    for (j = i - 1; j >= 0 && insertValue < copy[j]; j--) {
      copy[j + 1] = copy[j]
    }
    copy[j + 1] = insertValue
  }
  return copy
}
```

### Bubble Sort

- Time Complexity: worst O(n^2), best O(n), average O(n^2)
- Space Complexity: worst O(1) auxiliary

```javascript
const bubbleSort = arr => {
  const copy = [...arr]
  for (let i = copy.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (copy[j] > copy[j + 1]) {
        [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]]
      }
    }
  }
  return copy
}
```

### Selection Sort

- Time Complexity: worst O(n^2), best O(n^2), average O(n^2)
- Space Complexity: worst O(1) auxiliary

```javascript
const selectionSort = arr => {
  const copy = [...arr]
  for (let i = 0; i < copy.length; i++) {
    let minIndex = i
    for (let j = i + 1; j < copy.length; j++) {
      if (copy[j] < copy[minIndex]) minIndex = j
    }
    if (i !== minIndex)[copy[i], copy[minIndex]] = [copy[minIndex], copy[i]]
  }
  return copy
}
```

### Quick Sort (D&C)

- Time Complexity: worst O(n^2), best O(n logn), average O(n logn)
- Space Complexity: worst O(n) auxiliary
- Unstable

```javascript
const quickSort = arr => {
  if (arr.length < 2) return arr
  const pivot = arr[0]
  const less = arr.slice(1).filter(item => item <= pivot)
  const greater = arr.slice(1).filter(item => item > pivot)
  return quickSort(less)
    .concat(pivot)
    .concat(quickSort(greater))
}
```

### Merge Sort (D&C)

- Time Complexity: worst O(n logn), best O(n logn), average O(n logn)
- Space Complexity: worst O(n) auxiliary
- Stable

```javascript
const mergeSort = arr => {
  if (arr.length < 2) return arr
  const middle = parseInt(arr.length / 2, 10)
  const left = mergeSort(arr.slice(0, middle))
  const right = mergeSort(arr.slice(middle))
  const merge = (left, right) => {
    const final = []
    while(left.length && right.length){
      final.push(right[0] < left[0] ? right.shift() : left.shift())
    }
    return final.concat(left.concat(right))
  }
  return merge(left, right)
}
```
