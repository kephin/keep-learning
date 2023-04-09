---
author: Kevin
pubDatetime: 2023-03-27T19:23:00Z
title: Rust Programming
postSlug: rust-programming
featured: true
draft: false
tags:
  - rust
ogImage: ""
description: Jayson Lennon
---

## Installation & Tool

```zsh
brew install rustup
rustup-init
```

## Fundamentals

### Data Types

- Memory only stores binary data
- Program determines what the binary represents
- Basic types that are universally useful are provided by the language

#### Basic Types

- Boolean
- Integer: 1, 2 ,4, 999, -2
- Double/Float: 1.1, 2000.000001, 2.0
- Character: 'A', 'c', '6', '$'
- String: "Hello", "World"

### Variables

What's a variable?

- Assign data data to a temporary memory location
- Can be set to any value & type
- Immutable by default, but can be mutable

```rust
let two = 2;
let hello = "Hello";
let j = 'j';
let pi = 3.14;
let mut my_name = "Bill";
let quit_program = false;
```

### Functions

What's a function?

- A way to encapsulate program functionality
- Optionally accepts data
- Optionally returns data
- Useful to organize code

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

### The `println` macro

- Macros expand into additional code and Macros use an exclamation mark to call/invoke
- `println` display information ot the terminal
- `:?` here means it for debugging

```rust
let life = 42;
println!("The answer to life is {:?}", life);
println!("{:?} {:?}", life, life);
```

### Control Flow

```rust
if age < 18 {
    println!("You are under 18");
} else if age >= 18 && age <= 22 {
    println!("You are on college")
} else {
    println!("You are good to work");
}
```

### Match

- Exhaustive: must cover all possible cases
- `match` will be checked by the compiler, while `if` / `else` is **not**
- use `_` to match anything else

```rust
let value = 3;
match value {
    1 => println!("one"),
    2 => println!("two"),
    3 => println!("three"),
    _ => println!("other"),
}
```

### Loop

- Called "looping" or "iteration"
- Both `loop` and `while` are used to repeat code and can exit using `break`

```rust
let mut i = 0;

// loop
loop {
    if (i == 10) {
        break:
    }
    println!("{:?}", i);
    i += 1;
}

// while
while i != 10 {
    println!("{:?}", i);
    i += 1;
}
```

### Enums

- Data that can be one of multiple different possibilities, each possibility is called a variant
- Provides information about your program to the complier
- Enums can only be variant at a time

```rust
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

fn which_direction(go: Direction) -> &'static str {
    match go {
        Direction::Up => "up",
        Direction::Down => "down",
        Direction::Left => "left",
        Direction::Right => "right",
    }
}
```

### Structs

- A type that contains multiple other types
- All fields must be present to create a struct
- Each piece of data is called a "field"
- Field can be accessed using dot (`.`)
- Makes working with data easier

```rust
struct ShippingBox {
    width: i32,
    height: i32,
    depth: i32,
}

}
fn main() {
    let my_box = ShippingBox {
        width: 10,
        height: 20,
        depth: 30,
    };
    println!("The box is {:?} tall", my_box.height);
}
```

### Tuples

- A type of "record"
- Store data anonymously, no need to name fields
- Useful to return pairs of data from functions
- Can be "destructured" easily into variables

```rust
fn one_two_three() -> (i32, i32, i32) {
    (1, 2, 3)
}
let numbers = one_two_three();
println!("one: {:?}, two: {:?}, three: {:?}", numbers.0, numbers.1, numbers.2);

let (one, two, three) = numbers;
println!("one: {:?}, two: {:?}, three: {:?}", one, two, three);

enum Access {
    Full,
}
let (employee, access) = ("John", Access::Full);
```

### Expressions

- Rust is an expression-based language, most things are evaluated and return some value
- Expressions values coalesce to a single point
- Expressions allows nested logic

```rust
let my_num = 3;
let is_lt_5 = if my_num < 5 { true } else { false };
let is_gt_5 = my_num > 5;
let is_three = match my_num {
    3 => true,
    _ => false,
};
enum Access {
    Admin,
    User,
    Guest,
}
let access_level = Access::Guest;
let system_is_hacked = true;
let can_access = match access_level {
    Access::Admin => true,
    _ => {
        if system_is_hacked == true {
            true
        } else {
            false
        }
    },
};
```

### Intermediate Memory

Memory

- Memory uses addresses & offsets to locate data
- Memory is stored using binary
- Computer is optimized for bytes, 1 byte == 8 contiguous bits
- Fully contiguous, means that each bits are placed next to each other in sequence

Addressed

- All data in memory has an "address"
  - Used to locate data
  - Always the same 👉 only data changes
- Usually don't utilize the address directly
  - _Variables_ handle most of the work

Offsets

- Items can be located at an address using an "offset"
- Offsets begin at 0
- Represent the number of bytes away from the original address
- Normally deal with _indexes_ instead

![Address and Offset](/src/content/blog/rust-programming/address-and-offset.png)

### Ownership

- Programs must track memory, if they don't, memory leaks can occur
- Rust utilizes an **ownership** modal to manage memory. The ownership of memory is responsible for freeing memory when it's no longer needed
- The owner of data must clean up the memory and this occurs at the end of the scope
- Memory can either be _moved_ or _borrowed_
- Default behavior is to _move_ memory to a new owner, we can use ampersand(&) to allow code to _borrow_ memory
- The reason Rust is doing this is for efficiency and memory management.

```rust
enum Light {
    Red,
    Yellow,
    Green,
}
fn display_light(light: &Light) {
    match light {
        Light::Red => println!("Red"),
        Light::Yellow => println!("Yellow"),
        Light::Green => println!("Green"),
    }
}
fn main() {
    let red = Light::Red;
    // instead of moving the ownership into this function, we're going to have this function just borrow the data
    display_light(&red);
    display_light(&red);
}
```

### impl

- `impl` allows us to implement functionality on specific enums, structs, or traits
- makes the code more organized, it allows us to encapsulate the functionality into the smallest unit possible and compose them together

```rust
enum Color {
    Red,
    Green,
    Blue,
}
impl Color {
    fn display(&self) {
        match self {
            Color::Red => println!("Red"),
            Color::Green => println!("Green"),
            Color::Blue => println!("Blue"),
        }
    }
}

struct Dimension {
    length: i32,
    width: i32,
    height: i32,
}
impl Dimension {
    fn display(&self) {
        println!("Length: {:?}", self.length);
        println!("Width: {:?}", self.width);
        println!("Height: {:?}", self.height);
    }
}

struct ShippingBox {
    weight: i32,
    dimension: Dimension,
    color: Color,
}
impl ShippingBox {
    fn new(weight: i32, dimension: Dimension, color: Color) -> Self {
        Self {
            weight,
            dimension,
            color
        }
    }
    fn display(&self) {
        println!("Weight: {:?}", self.weight);
        self.dimension.display();
        self.color.display()
    }
}



fn main() {
    let small_box = Dimension {
        length: 1,
        width: 2,
        height: 3,
    };

    let shipping_box = ShippingBox::new(1, small_box, Color::Green);
    shipping_box.display();
}
```

### Vectors

- Multiple pieces of data and must be the same type
- Used for lists of information
- The `vec!` macro is used to create a vector
- Can add, remove and traverse data
- Use `for..in` to iterate over a vector
  - noticed when you create a `for` loop, you transferred the ownership of the vector to the loop

```rust
let mut my_numbers = Vec::new();
my_numbers.push(1);
my_numbers.push(2);   vb
my_numbers.push(3);
my_numbers.pop();
println!("length is {:?}", my_numbers.len());
println!("{:?}", my_numbers);
println!("{:?}", my_numbers[0]);

let numbers = vec![1,2,3,4,5];
for number in numbers {
    println!("for in loop: {}", number);
}
```

### Strings

- Two commonly used types of strings
  - `String` 👉 owned
  - `&str` 👉 borrowed String slice
- Must use an owned `String` to store in a struct
  - When the struct is being dropped at the end of the scope, the struct is responsible for cleaning up its own memory
- Use `&str` when passing to a function
- When we create a string in a double quote, it's by default automatically borrowed
- Use `.to_owned()` or `String::from()` to create an owned copy of a sting slice

example 1:

```rust
fn display(data: &str) {
    println!("Hello, {:?}", data);
}

fn main() {
    // by default borrowed
    let name = "kevin";
    display(name);

    let owned_string = "owned".to_owned();
    let another_owned_string = String::from("another");
    display(&owned_string);
    display(&another_owned_string);
}
```

example 2:

```rust
struct LineItem {
    name: String,
    count: i32,
}

fn display_name(data: &str) {
    println!("name: {:?}", data);
}

fn main() {
    let receipts = vec![LineItem {
        name: "apple".to_owned(),
        count: 1,
    }, LineItem {
        name: String::from("banana"),
        count: 2,
    }, LineItem {
        name: "cherry".to_owned(),
        count: 3,
    }];

    for item in receipts {
        display_name(&item.name)
    }
}
```

### Derive

- Functionality can be automatically implemented for structs and enums by `derive` macro
- All fields within the struct enums also have to derive that functionality

For example, if we want to print out the data of enums or whole struct, we can derive the debug printing functionality.

```rust
// All fields within the struct enums, which is Position here, also have to derive that functionality, which is Debug
#[derive(Debug)]
enum Position {
    Manager,
    Developer,
    Tester,
}

#[derive(Debug)]
struct Employee {
    name: String,
    position: Position,
}

fn main() {
    let me = Employee {
        name: String::from("Kevin"),
        position: Position::Developer,
    };

    // match me.position {
    //     Position::Manager => println!("manager"),
    //     Position::Developer => println!("developer"),
    //     Position::Tester => println!("tester"),
    // }

    println!("My position is {:?}", me.position);
    println!("Employee data: {:?}", me)
}
```

3 extremely common derives:

- `Debug`: print out information
- `Clone` & `Copy`:
  1. when apply `Clone` & `Copy` to a structs or enums, ownership is no longer transferred, a copy is made instead
  2. we only apply `Clone` & `Copy` to structs, which are small in size

```rust
#[derive(Debug, Clone, Copy)]
enum Position {
    Manager,
    Developer,
    Tester,
}

#[derive(Debug, Clone, Copy)]
struct Employee {
    work_hours: i32,
    position: Position,
}

// this function takes ownership and not borrowing
fn print_employee(employee: Employee) {
    println!("Employee data: {:?}", employee)
}

fn main() {
    // 'me' variable is copied and passed to the called function since Employee derives Clone and Copy
    let me = Employee {
        work_hours: 40,
        position: Position::Developer,
    };
    print_employee(me); // a new copy is made and pass to the function
    print_employee(me); // a second new copy is made and pass to the function
}
```

### Type Annotations

- Required for function signatures
- Types are usually inferred
- Can also be specified in the code
  - Explicit type annotations
- A vector is what is called a _generic_ data type
  - It can hold any type of data
  - Can specify the type of data it contains
    - `Vec<i32>`
    - `Vec<Fruit>`

```rust
// Basic: variables, functions
enum Fruit {
    Apple,
    Banana,
    Orange,
}
fn display_name(value: &str) {
    println!("Name: {:?}", value);
}
fn main() {
    let name: String = "John".to_owned();
    let age: i32 = 36;
    let letter: char = 'a';
    let apple: Fruit = Fruit::Apple;
    display_name(&name)
}

// Generic
let numbers: Vec<i32> = vec![1, 2, 3, 4, 5];
let fruits: Vec<Fruit> = vec![Fruit::Apple, Fruit::Banana, Fruit::Orange];
```

### Advanced Match

- Enum is not limited to just one plain variant.
  - Each variant can optionally contain additional data

```rust
enum PromotionDiscount {
    NewUser,
    Holiday(String),
}
enum Discount {
    Percentage(f32),
    Flat(f32),
    Promotion(PromotionDiscount),
    Custom(String),
}
```

Allow you to match on data associated with enums & structs.

```rust
enum Discount {
    Percentage(f32),
    Flat(i32),
}
enum Ticket {
    Backstage(String, i32),
    Vip(String, i32),
    Standard(i32),
}

fn main() {
    let flat = Discount::Flat(10);
    match flat {
        Discount::Flat(2) => println!("Flat 2.0"),
        Discount::Flat(value) => println!("Flat {}", value),
        _ => ()
    }

    let tickets = vec![
        Ticket::Backstage(String::from("John"), 50),
        Ticket::Vip(String::from("Amy"), 200),
        Ticket::Standard(100),
    ];
    for ticket in tickets {
        match ticket {
            Ticket::Backstage(name, price) => println!("Backstage ticket Holder: {:?}, Price: {:?}", name, price),
            Ticket::Vip(name, price) => println!("Vip ticket Holder: {:?}, Price: {:?}", name, price),
            Ticket::Standard(price) => println!("Standard ticket Price: {:?}", price),
        }
    }
}
```

### Option type

- A type that may be one of two things
  - `Some` 👉 some data of a specified type
  - `None` 👉 no data is available
- Used in scenarios where data may not be required or is unavailable
  - Unable to find something
  - Ran out of times in a list
  - Form field not filled out

Definition

```rust
enum Option<T> {
    Some(T),
    None,
}
```

Example:

```rust
struct Customer {
    age: Option<i32>, // optional field
    email: String,
}

// optional return type
fn find_customer_by_email(customers: Vec<Customer>, email: &str) -> Option<Customer> {
    for customer in customers {
        if customer.email == email {
            return Some(customer);
        }
    }
    None
}

fn main() {
    let customers = vec![
        Customer {
            age: Some(30),
            email: String::from("mark@example.com"),
        },
        Customer {
            age: None,
            email: String::from("becky@example.com"),
        },
    ];
    let found = find_customer_by_email(customers, "mark@example.com");

    match found {
        Some(customer) => match customer.age {
            Some(age) => println!("Customer age: {}", age),
            None => println!("Customer age not found"),
        },
        None => println!("Customer not found"),
    }
}
```

### Documentation

- Standard Library
  - `rustup doc` to open Rust documentation
- Generate own documentation
  - Use `///` to document code
  - generate documentation and open it by `cargo doc --open`

```rust
/// Adds two numbers
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

### Result type

- Result represents either success or failure
  - `Ok` 👉 The operation was successful
  - `Err` 👉 The operation failed
- Used in scenarios where the action has the possibility to fail,
  - Read/create a file
  - Connect to a website/database

Definition

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

Example:

```rust
struct SoundData {
    data: String,
}

impl SoundData {
    fn new(input: &str) -> Self {
        Self {
            data: input.to_owned(),
        }
    }
}

fn get_sound(input: &str) -> Result<SoundData, String> {
    if input == "alert" {
        Ok(SoundData::new("alert"))
    }
    else {
        Err("Sound not found".to_owned())
    }
}

fn main() {
    let sound = get_sound("alert");
    match sound {
        Ok(sound) => println!("Sound: {}", sound.data),
        Err(err) => println!("Error: {}", err),
    }
}
```
