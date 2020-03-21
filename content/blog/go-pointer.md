---
title: "[Golang] Pointers and methods"
date: "2020-03-15T17:47"
description: "Pointers and methods"
---

## Pointer

A pointer holds the memory address of a value

| Operator  | Description |
| --------- | ----------- |
| &variable | Give me the **memory address** of the value this variable is pointing at |
| *pointer  | Give me the **value** this memory address is referring to |

```go
func main () {
  i := 11
  p := &i
  fmt.Println(*p) // 11, read i through the pointer
}
func main() {
  i, j := 42, 27
  p := &i         // point to i
  fmt.Println(p)  // 0x40e020
  fmt.Println(*p) // 42, read i through the pointer

  *p = 21         // set i through the pointer
  fmt.Println(i)  // 21

  p = &j
  *p = *p / 3    // divide j through the pointer
  fmt.Println(j) // 9
}
```

## Method (Receiver function)

Go does not have classes. However, you can define method, which is a receiver function, on custom types.

```go
type deck []string

func (d deck) print() {
  for _, deck := range d {
    fmt.Println(deck)
  }
}

func main() {
  d := newDeck()
  d.print()
}
```

You can also declare a method on non-struct types. You can only declare a method with a receiver whose type is defined in the same package as the method.

```go
type MyFloat float64

func (f MyFloat) Abs() float64 {
  if f < 0 {
    return float64(-f)
  }
  return float64(f)
}

func main() {
  f := MyFloat(-math.Sqrt(10))
  fmt.Println(f.Abs())
}
```

## Pointer receivers

Go is a **pass by value** language. Whenever we pass value into a function, go will take that value(or struct), copy all the data and *place* it inside a new memory, which is what we know as **immutable**. So it means we are not able to update the struct passed into the method.

| Types           | Description |
| --------------- | ----------- |
| Value types     | int, float, string, bool, *structs* |
| Reference types | slices, maps, channels, pointers, functions |

```go
type person struct{
  name string
  age  int
}
func (p person) updateName(n string) {
  // because p here is a copy of kevin, not kevin itself!
  p.bane = n
}

func main() {
  kevin := person{
    name: "kevin",
    age:  32,
  }
  kevin.updateName("kephin")
  kevin.print() // not changed -> {name:kevin age:32}
}
```

:bulb: How does Go do

Declare receiver function with pointer receiver

> Here `*type` is the type description, it means the it's the pointer. It's not the operator as we saw `*pointer`

```go
// *person is the type description, it means p is the pointer type
func (p *person) updateName(n string) {
  // *p here, however means the value the pointer is referring to
  (*p).name = n
  // or we can simply just do
  p.name = n
}
func main() {
  kevin := person{
    name: "kevin",
    age:  32,
  }
  (&kevin).updateName("kephin")
  kevin.print() // changed -> {name:kephin age:32}
}
```

### Receiver functions and regular functions

Receiver functions are just like functions. However, the difference is that functions with a pointer argument *must* take a pointer:

```go
type Vertex struct {
  X, Y float64
}
func ScaleFunc(v *Vertex, f float64) {
  // ...
}
var v Vertex
ScaleFunc(v, 5)  // Compile error!
ScaleFunc(&v, 5) // OK
```

while methods with pointer receivers take *either a value or a pointer* as the receiver when they are called:

```go
func (v *Vertex) Scale(f float64) {
  // ...
}
var v Vertex
v.Scale(5)  // OK, Go interprets the statement v.Scale(5) as (&v).Scale(5)
p := &v
p.Scale(10) // OK
```

Th9s happens in the reverse direction.

Functions that take a value argument must take a value of that specific type while methods with value receivers take either a value or a pointer as the receiver when they are called:

```go
func (v Vertex) Abs() float64 {
  // ...
}
func AbsFunc(v Vertex) float64 {
  // ...
}
v := Vertex{3, 4}
v.Abs()      // OK
(&v).Abs()   // OK
AbsFunc(v)   // OK
AbsFunc(&v)  // Compile error!
```

There are two reasons to use a pointer receiver.

1. Ｍethod can modify the value that its receiver points to
2. To avoid copying the value on each method call. This can be more efficient if the receiver is a large struct
