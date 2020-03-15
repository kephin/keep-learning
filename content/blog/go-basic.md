---
title: "[Golang] Basic concept"
date: "2020-02-29T17:30"
description: "Basic concept"
---

## Go basic CLI

```bash
go build
go run
go fmt
go install
go get
go test
```

## Packages, variables and functions

### What is `package main`

`main` is special! There are executable package and reusable packages. And executable package must to be `package main`, also must to have a `func` called `main`. Other packages are used as a helper functions.

### Declare variable and function

- A `var` statement can be at package or function level.
- The `:=` short assignment statement can only be used inside the function, to replace a var declaration with implicit type.

```go
// variable
var i int
i = 12
// or
var i, j int = 1, 2
// only inside the function
func main() {
  card := "Ace of Spades"
}
```

```go
// function and return types
func add(x, y int) int {
  return x + y
}
// multiple returns
func swap(x, y string) (string, string) {
  return y, x
}

func main() {
  fmt.Println(add(1, 2))

  a, b := swap("hello", "world")
  fmt.Println(a, b)) // world hello
}
```

### Basic types

- bool
- string
- int, int8, int16, int32, int64
- uint, uint8,uint16, uint32, uint64, uintptr
- float32, float64
- complex64, complex128

### Zero value

| Type | Zero value |
| :--: | :--------: |
| string | ""    |
| int    | 0     |
| float  | 0     |
| bool   | false |

### Type conversion

```go
// type_we_want(value_we_have)
[]byte("hello world")
```

## Flow control statements

### for loop

```go
sum := 0
for i := 0; i < 10; i++ {
  sum += i
}
```

The range form of the for loop iterates over a slice or map.

```go
for i, card := range cards {
  fmt.Println(i, card)
}
for _, name := range people {
  fmt.Println(name)
}
```

`while` loop in go is `for`

```go
sum := 1
for sum < 100 {
  fmt.Println(sum)
  sum += 1
}
```

### if statement

Like `for`, the `if` statement can start with a short statement to execute before the condition. And variables declared by the statement are available inside any of the `if`, `else if` and `else` blocks.

```go
if num := 9; num < 0 {
  fmt.Println(num, "is negative")
} else if num < 10 {
  fmt.Println(num, "has 1 digit")
} else {
  fmt.Println(num, "has multiple digits")
}
fmt.Println(num) // undefined: num
```

`switch` statement

In effect, the `break` statement that is needed at the end of other languages is provided automatically in Go

```go
switch os := runtime.GOOS; os {
case "darwin":
  fmt.Println("OS X.")
case "linux":
  fmt.Println("Linux.")
default:
  fmt.Printf("%s.\n", os)
}
```

`Switch` without a condition is the same as `switch true`. This construct can be a clean way to write long if-then-else chains.

```go
t := time.Now()
switch {
case t.Hour() < 12:
  fmt.Println("Good morning!")
case t.Hour() < 17:
  fmt.Println("Good afternoon.")
default:
  fmt.Println("Good evening.")
}
```

### Defer

A `defer` statement defers the execution of a function until the surrounding function returns. *The deferred call's arguments are evaluated immediately*, but the function call is not executed until the surrounding function returns.

```go
func hello() string {
  fmt.Println("1")
  return "2"
}

defer fmt.Println(hello())
fmt.Println("3")
// prints out: 1 3 2
```

Deferred function calls are pushed onto a *stack*. When a function returns, its deferred calls are executed in *last-in-first-out* order.

```go
for i := 0; i < 10; i++ {
  defer fmt.Println(i)
}
// prints out: 9 8 7 6 5 4 3 2 1 0
```

### Exercise: Loops and Functions

https://tour.golang.org/flowcontrol/8
