---
title: "[Golang] Slices, structs and maps"
date: "2020-03-07T15:11"
description: "Slices, structs and maps"
---

## Slices

- Array: *fixed-sized* of array
- Slice: *dynamically-sized* of array

```go
// declare an array
primes := [5]int{2, 3, 5, 7}
fmt.Println(primes) // [2, 3, 5, 7, 0]
// declare a slice of string
cards := []string{"one", "two"}
// append to a slice
cards = append(cards, "three")

// declare a slice of struct
s := []struct {
  name   string
  gender string
}{
  {name: "kevin", gender: "male"},
  {name: "kelly", gender: "female"},
}
fmt.Println(s) // [{kevin male} {kelly female}]
```

The default is zero for the low bound and the length of the slice for the high bound.

```go
cards := []string{"one", "two", "three"}
// slice range syntax
cards[0:2] // [one two]
cards[:2]  // [one two]
cards[1:]  // [two three]
cards[:]   // [one two three]
```

### Slices are like references to arrays

```go
// this is an array literal
a := [3]bool{true, true, false}

// this creates the same array as above
// then builds a slice that references it
s := []bool{true, true, false}
```

*A slice does not store any data*, it just describes a section of an underlying array. Changing the elements of a slice modifies the corresponding elements of its underlying array.

```go
names := [4]string{"John", "Paul", "George", "Ringo",}
a := names[1:3]
b := names[0:2]
a[0] = "XXX"
fmt.Println(a)     // [XXX George]
fmt.Println(b)     // [John XXX]
fmt.Println(names) // [John XXX George Ringo]
```

### Length and capacity

- `len(s)` the number of elements it contains
- `cap(s)` the number of elements in the underlying array, counting from the first element in the slice

```go
s := []int{2, 3, 5, 7, 11} // len=5 cap=5 [2 3 5 7 11]
s = s[:0]                  // len=0 cap=5 []
s = s[:4]                  // len=4 cap=5 [2 3 5 7]
s = s[2:]                  // len=2 cap=3 [5 7]
```

### The zero value of a slice is nil

```go
var s []int
fmt.Println(s, len(s), cap(s)) // [] 0 0
fmt.Println(s == nil)          // true

a := []int{}
fmt.Println(a == nil)         // false
```

### Slices will resize the underlying array for you

If the backing array of `s` is too small to fit all the given values , a bigger array will be allocated. The returned slice will point to the newly allocated array.

```go
s := make([]int, 0, 2)
for i := 0; i < 3; i++ {
  s = append(s, i)
  fmt.Printf("cap=%v, len=%v, %p\n", cap(s), len(s), s)
}
// prints out:
// cap=2, len=1, 0x40e020
// cap=2, len=2, 0x40e020
// cap=4, len=3, 0x40e050 <- changed
```

### Creating a slice with `make`

The `make` function allocates a zeroed array and returns a slice that refers to that array.

```go
a := make([]int, 5)  // len(a)=5

// To specify a capacity, pass a third argument to make:
b := make([]int, 0, 5) // len(b)=0, cap(b)=5

a := make([]int, 5)    // len=5 cap=5 [0 0 0 0 0]
b := make([]int, 0, 5) // len=0 cap=5 []
c := b[:2]             // len=2 cap=5 [0 0]
d := c[2:5]            // len=3 cap=3 [0 0 0]
e := []int{}           // len=0 cap=0 []
```

## Structs

Collection of fields that are related together. As `object` in JavaScript, `hash` in Ruby and `dictionary` in Python.

```go
type person struct {
  firstName string
  lastName  string
}

func main() {
  kevin := person{firstName: "kevin", lastName: "hsiao"}
  fmt.Printf("%+v", kevin) // {firstName:kevin lastName:hsiao}
  fmt.Println(kevin.firstName, kevin.lastName)
}
```

### Embedded structs

which is object inside object basically

```go
type contactInfo struct {
  email   string
  zipCode int
}

type person struct {
  firstName string
  lastName  string
  contactInfo contactInfo
  // or just
  contactInfo
}

func main() {
  kevin := person{
    firstName: "kevin",
    lastName:  "hsiao",
    contactInfo: contactInfo{
      email:   "kevin@test.com",
      zipCode: 123,
    },
  }
}
```

## Maps

Maps is a collection of key-value pairs

1. Both keys and values are typed
2. Keys and values, however, don't have to be the same type
3. The zero value of a map is `nil`
4. The `make` function returns a map of the given type, initialized and ready for use

### Create and manipulate the maps

```go
// zero value of map
var m map[string]int
fmt.Println(m, m == nil)       // map[] true

// `make` will initialize a map of the given type
m = make(map[string]int)
fmt.Println(m, m == nil)       // map[] false

m["hello world"] = 1
fmt.Println(m["hello world"])  // 1
delete(m, "hello world")
fmt.Println(m["hello world"])  // 0, default value

elem, ok := m["hello world"]   // elem:0, ok:false
m["hello world"] = 0
elem, ok := m["hello world"]   // elem:0, ok:true
```

Map literals

```go
type Vertex struct {
  Lat, Long float64
}

func main() {
  m := map[string]Vertex{
  "Bell Labs": Vertex{40.68433, -74.39967},
  "Google":    Vertex{37.42202, -122.08408},
}
```

If the top-level type is just a type name, you can omit it from the elements of the literal.

```go
m := map[string]Vertex{
  "Bell Labs": {40.68433, -74.39967},
  "Google":    {37.42202, -122.08408},
}
```

### Iterate over a map

```go
func printMap(m map[string]int) {
  for key, value :=range m {
    fmt.Println(key, "is", value)
  }
}
```

### Exercise: Fibonacci closure

```js
const fibonacci = num => {
  if (num === 0) return [0]
  if (num === 1) return [0, 1]
  return fibonacci(num - 2) + fibonacci(num - 1)
}
```

### Exercise: Exercise: Fibonacci closure

https://tour.golang.org/moretypes/26

```go
// fibonacci is a function that returns
// a function that returns an int.
func fibonacci() func() int {

}

func main() {
  f := fibonacci()
  for i := 0; i < 10; i++ {
    fmt.Println(f())
  }
}
```

### What's the difference between Maps and Structs

| Maps | Strcuts |
| ---- | -------|
| All values must be the same types and all keys must be the same types | Values can be different types |
| Keys are indexed, we can iterate over them | Keys don't support indexing |
| *Reference* type | *Value* type |

### When to use Maps or Structs

:point_right: Maps

1. To represent a collection of related properties
2. Don't need to know all the keys at compile time

:point_right: Structs

1. Represent a object with a lot of different properties
2. Need to know all fields at compile time(need to define first)
