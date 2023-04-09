---
author: Kevin
pubDatetime: 2022-09-15T02:23:00Z
title: Master TypeScript
postSlug: master-typescript
featured: true
draft: false
tags:
  - typescript
ogImage: ""
description: Udemy course by Colt Steele
---

TypeScript = JavaSCript + Static Checking

Static Checking: TypeScript detects errors in our code **without running** it. It does this error checking on the basis of the 'kinds of data', which is type, in our program pre run time.

## Table of contents

## Type Annotation Basis

### Variable Types

```ts
const name: string = "kevin";
const age: number = 35;
const isEngineer: boolean = true;
```

### Type Inference

Type inference refers to the TypeScript compiler's ability to infer types from certain values in your code.

```ts
const name = "kevin"; // ts infers that 'name' should be a string
```

### The Any Type

`any` turns off type checking for this variable. One thing noticed that the delayed initialization variable will have the implicit any type.

```ts
let anything: any = "anything";
anything = 123;
anything = true;

let dontKnowYet; // ts will infer 'dontKnowYet' to be any
dontKnowYet = "good";
dontKnowYet = 1;
dontKnowYet = true;
```

## Functions

We can specify the type of function parameters and return value in a function definition.

For the code readability, it's better to explicitly put type annotation on return value although it can be inferred by TS in most cases.

```ts
// set default params
function greet(name: string = "stranger"): string {
  return `Hi there, ${name}`;
}

// arrow function
const add = (a: number, b: number): number => a + b;

// void means don't return anything
function print(msg: string): void {
  console.log(msg);
}
```

### Never type

Don't confuse `void` with `never`,

- `void`: returns `undefined` or `null`
- `never`: a function cannot have a reachable end point

```ts
// a function that doesn't finish running
const neverStop = (): never => {
  while (true) {
    console.log("I'm still going!");
  }
};

// a function that throws an exception
const giveError = (msg: string): never => {
  throw new Error(msg);
};
```

## Object Types

Object can be typed by declaring what the object should look like in the annotation.

```ts
// object
const coordinate: { x: number; y: number } = { x: 1, y: 2 };

// function
const printName = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}): void => {
  console.log(`${firstName} ${lastName}`);
};
```

### Type Alias

Instead of writing out object types in an annotation, we can declare them separately in a type alias, which is simply the desired shape of the object.

```ts
type Person = {
  name: {
    firstName: string,
    lastName: string
  }
  age?: number // optional property
}

const sayHappyBirthday = (person: Person) => { ... }
```

### Readonly Type

```ts
type User = {
  readonly id: number;
  name: string;
};

const user: User = {
  id: 1,
  name: "kevin",
};

user.id = 2; // Cannot assign to 'id' because it is a read-only property.
```

### Intersection Types

An intersection type combines multiple types into one.

```ts
type Colorful = {
  color: string;
};
type Circle = {
  radius: number;
};

const colorfulCircle: Colorful & Circle = {
  color: "green",
  radius: 1.3,
};
```

## Array Types

Array can be typed using a type annotation followed by empty array brackets, like `number[]` for an array of numbers.

```ts
const people: Person[] = [{ name: "kevin", age: 35 }]
// is the same as
const people: Array<Person> = [{ name: "kevin", age: 35 }]

// multi-dimensional arrays
const board = string[][] = [['X', 'O', 'X'], ['X', 'X', 'O'], ['O', 'X', 'X']]
```

## Union Types

Union types allow us to give a value a few different possible types. If the eventual value's type is included, TypeScript will be happy.

```ts
const guessAge = (age: number | string) => `Your age is ${age}`

// all works
guessAge(30)
guessAge("35")

const creatures: (Animal | Plant)[] = [{ animal_1, plant_1, ... }]
```

### Type Narrowing with Union Types

Narrowing the type is simply checking before working with the value.

```ts
const isTeenager = (age: number | string) => {
  if (typeof age === "string") console.log(age.charAt(0) === "1");
  else console.log(age > 12 && age < 20);
};
```

### Literal Types

We can also set type to certain value. Combining it with `unions` can help us fine tune type options.

```ts
const zero: 0 = 0 // zero now can only be 0
type DayOfWeek = ('Monday' | 'Tuesday' | ... | 'Sunday')
const dayOfWeek: DayOfWeek = 'Monday'

const giveAnswer = (answer: "yes" | "no" | "maybe") => `The answer is ${answer}`

giveAnswer("no") // works
giveAnswer("no sure") // not working
```

## Tuples & Enums

### Tuples

Tuples are arrays of fixed lengths and ordered with specific types.

```ts
type myTupleType: [number, string]
const myTuple: myTupleType = [10, "kevin"]
```

### Enums

Enums allow us to define a set of named constants.

```ts
// Numeric Enums
enum Responses {
  no, // 0
  yes, // 1
  maybe, // 2
}
enum Responses {
  no = 12,
  yes = 45,
  maybe = 102,
}

// String Enums
enum Response {
  no = "NO",
  yes = "YES",
  maybe = "MAYBE",
}

// Heterogenous
enum Responses {
  no = 0,
  yes = 1,
  maybe = "MAYBE",
}
```

It can be used as Type, as Literal Type.

```ts
enum OrderStatus {
  PENDING,
  SHIPPED,
  DELIVERED,
  RETURNED,
}
const isDelivered = (status: OrderStatus) = status === OrderStatus.DELIVERED
```

### Enum behind the scenes

TypeScript actually compiles `enum` into `object`.

```ts
enum OrderStatus {
  PENDING,
}
const status: OrderStatus.PENDING = OrderStatus.PENDING;

// after compile
("use strict");
var OrderStatus;
(function (OrderStatus) {
  OrderStatus[(OrderStatus["PENDING"] = 0)] = "PENDING";
})(OrderStatus || (OrderStatus = {}));
const status = OrderStatus.PENDING;
```

But we can avoid polluting namespaces by adding `const` in front of the `enum` keyword.

```ts
const enum OrderStatus {
  PENDING,
}
const status: OrderStatus = OrderStatus.PENDING;

// after compile
("use strict");
const status = 0; /* OrderStatus.PENDING */
```

## Interfaces

Interfaces serve almost the exact same purpose as type alias. But interface is only used to describe object, not other type of data.

```ts
interface Product {
  name: string
  price: number
}
const disPlayInfo = (product: Product): void => {
  console.log(`${product.name}: $${product.price} )
}
```

### Readonly, Optional Properties and Methods

```ts
interface Product {
  readonly id: number
  name: string
  size?: string
  price: number
  applyDiscount: (amount: number) => void
  // or
  applyDiscount(amount: number): void
}
const shoes: Product = {
  id: 1,
  name: 'Red wing 9411'
  price: 13000
  applyDiscount(amount) {
    this.price = this.price * (1 - amount)
  }
}
```

### Reopening Interface

```ts
// TS complains about duplicated types
type Person = {
  name: string;
};
type Person = {
  age: number;
};

// the Person interface is the combination of the two
interface Person {
  name: string;
}
interface Person {
  age: number;
}
const me: Person = {
  name: "kevin",
  age: 35,
};
```

### Extends One or More Interfaces

```ts
interface Creature {
  age: number;
}
interface Dog extends Creature {
  name: string;
}
const amy: Dog = {
  name: "Amy",
  age: 1,
};

interface Human {
  name: string;
}
interface Employee {
  readonly id: number;
  email: string;
}
interface Engineer extends Human, Employee {
  level: string;
  languages: string[];
}
const pierre: Engineer = {
  name: "Pierre",
  email: "pierre@gmail.com",
  level: "senior",
  languages: ["JS", "Python"],
};
```

### Types v.s Interfaces

- Interfaces can only describe the shape of `object`
- With `interface`, we can reopen them (add new properties on created interface)
- With `interface`, we use `extends` to extend from other interfaces. But with `type`, we use intersection types with `&`.

```ts
// inheritance
interface Engineer extends Person  {
  experience: string
  languages: string[]
}

// intersection types
type Engineer & {
  experience: string
  languages: string[]
}
```

## The TypeScript Complier

### Init and Compile

Firs, we can hit the init command to create the `tsconfig.json` file. Then we can compile the files on watch mode.

```bash
tsc --init

# compile only the selected file
tsc index.ts -w

# all the .ts files will be compiled by default
tsc -w
```

### Configurations

- files: Specifies an allowlist of files to include in the program
- include: Specifies an array of filenames or patterns to include in the program
- exclude: Specifies an array of filenames or patterns that should be skipped when resolving include.

Priority: files > exclude > include

- outDir: If specified, .js (as well as .d.ts, .js.map, etc.) files will be emitted into this directory. The directory structure of the original source files is preserved.
- target: governs the JavaScript version of output that TypeScript compiles into.
- lib: specify the libs that TS can access the types

```ts
{
  "compilerOptions": {
    "outDir": "dist",
    "target": "es5",
    "lib": [
      "DOM",
      "es2021
    ]
  },
  "files": ["mustRun.test.ts", "shouldRun.test.ts"],
  "include": ["src/**/*.?(ts|tsx)"],
  "exclude": ["src/**/*.test.ts"]
```

## Working with DOM

TypeScript knows about the `document`.

```ts
const element = document.getElementById("test");
```

### Non-null assertion operators

Put the `!` behind means it's not null.

```ts
const btn = document.getElementById("btn")!;
btn.addEventListener("click", () => {
  console.log("clicked!");
});
```

### Type assertions

We can tell TypeScript what is the type of this value.

```ts
const mystery: unknown = "my name";
const numChars = (mystery as string).length;

// HTMLElement doesn't have 'value' property
// we need to tell TypeScript it's the HTMLInputElement
const input = document.getElementById("input")! as HTMLInputElement;
console.log(input.value);

// there's another way, but be aware, this syntax doesn't work with jsx
const input = document.getElementById("input");
console.log((<HTMLInputElement>input).value);
```

### Working with Event

```ts
const form = document.querySelector("form")!;

// #1. TS doesn't know what evt is, so we have to add type annotation
const handleSubmit = (evt: SubmitEvent) => {
  evt.preventDefault();
};
form.addEventListener("click", handleSubmit);

// #2. TS knows evt is SubmitEvent
form.addEventListener("click", evt => {
  evt.preventDefault();
});
```

## Classes

### Some syntax

- private fields: can only have access inside the class
- super: during inheritance, to call the constructor function in the parent class

```js
class Player {
  #score = 0;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  getScore() {
    return this.#score;
  }
  setScore(score) {
    this.#score = score;
  }
}

class Admin extends Player {
  constructor(firstName: string, lastName: string, powers: string[]) {
    super(firstName, lastName);
    this.powers = powers;
  }
}
```

### Annotation Classes in TypeScript

Modifiers:

- readonly: properties/methods that are not able to be changed once assigned inside the constructor
- public: properties/methods that anyone can access and it's default
- private: properties/methods that are only accessible inside the class
- protected: properties/methods that are only accessible inside the class or in child classes

```ts
class Player {
  public readonly firstName: string;
  public readonly lastName: string;
  private registered = true;
  protected score = 0;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class AdminPlayer extends Player {
  maxScore() {
    this.score = 9999; // valid since score is protected property
    this.registered = false; // invalid since registered is private
  }
}

const kevin = new Player("kevin", "hsiao");
kevin.firstName = "allen"; // not working!
```

### Parameter Properties Shorthand

below syntax means we're going to have a public/private property called 'firstName' and it's going to be passed in when player is initialized.

```ts
class Player {
  constructor(public firsName: string, public lastName: string) {}
}
// is equivalent to
class Player {
  public readonly firstName: string;
  public readonly lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
```

### Classes and Interfaces

```ts
interface Colorful {
  color: string;
}
interface Printable {
  print(): void;
}

class Bike implements Colorful, Printable {
  constructor(public color: string) {}
  print() {
    console.log("hello world");
  }
}
```

### Abstract Classes

- abstract class cannot be instantiated
- we can mark `abstract` keyword and all the extended class must implement those abstracted method
- the difference between interface and abstract class is we can provide additional properties/methods from abstract classes

```ts
abstract class Employee {
  constructor(public firstName: string, public lastName: string) {}

  abstract getPay(): number
  greet(){
    console.log('hello')
  }
}

class FulltimeEmployee extends Employee {
  constructor(firstName: string, lastName: string, private salary: number) {
    super(firstName, lastName)
  }
  getPay() { return this.salary }
}
class PartTimeEmployee extends Employee {
  constructor(firstName: string, lastName: string, private hourlyRate: number private hoursWorked: number) {
    super(firstName, lastName)
  }
  getPay() {
    return this.hourlyRate * this.hoursWorked
  }

}
```

## Generics

Generics allow us to define reusable functions and classes that work with multiple types rather than a single type.

### Some Built-in Generics

It's kind of like a type argument.

```ts
const numbers: Array<number> = [];
// is equal to
const numbers: number[] = [];

const strings: Array<string> = [];
// is equal to
const strings: string[] = [];

// TypeScript only knows it's a general element
const element = document.querySelector("#username")!;
// Now TypeScript knows it's an HTMLInputElement
const inputElement = document.querySelector<HTMLInputElement>("#username")!;
```

### When Should We Use Generics

```ts
function func<T>(element: T): T[] {
  return [element];
}
const func = <T>(element: T): T[] => {
  return [element];
};

// [1, 2, 3, 4, 5, ...]
// [true, false, false, ...]
// [{}, {}, {}, ..]
function getRandomElement<T>(list: T[]): T {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

getRandomElement<string>(["a", "b", "c", "d"]);
getRandomElement<number>([1, 23, 255, 332, 6433]);
```

### Inferred Generic Type Parameters

TypeScript can infer the type, but not always.

```ts
getRandomElement(["a", "b", "c", "d"]);
```

### Generics Arrow Functions & .tsx files

In .tsx, we have to add a trailing comma in order to make TypeScript understand the generics syntax(in order to be distinguished from html tag).

```tsx
const App = <T,>(list: T[]) => {
  return {list.map(item => (
    <div>{item.name}</div>
  ))}
}
```

### Generics with Multiple Types

We don't have to tell TypeScript what it will return because TypeScript will infer.

```ts
const merge = <T, U>(object1: T, object2: U) => ({
  ...object1,
  ...object2,
});
// no need to
const merge = <T, U>(object1: T, object2: U): T & U => {
  // ...
};

const comboObject = merge(
  { name: "kevin" },
  { languages: ["javascript", "typescript", "go", "ruby", "python"] }
);
```

### Add Type Constraints

We can add type constrains in order to make sure `merge` only have `object` arguments.

```ts
// TypeScript doesn't know what's the type of argument, so won't complain on this line
merge({ name: "kevin" }, 10);

// in order make TypeScript know, we can add constraints into generic types
const merge = <T extends object, U extends object>(object1: T, object2: U) => ({
  ...object1,
  ...object2,
});
// or just
const merge = (object1: object, object2: object) => ({
  ...object1,
  ...object2,
});

// we can also use custom interface
interface Lengthy {
  length: number;
}
const printDoubleLength = <T extends Lengthy>(thing: T): number => {
  return thing.length * 2;
};
// or just
const printDoubleLength = (thing: Lengthy): number => {
  return thing.length * 2;
};
```

### Default Type Parameters

```ts
const makeEmptyArray = <T = string>(): T[] => [];
const strings = makeEmptyArray();
const numbers = makeEmptyArray<number>();
```

### Generic Classes

```ts
interface Song {
  title: string;
  artist: string;
}
interface Video {
  title: string;
  creator: string;
  resolution: string;
}
class Playlist<T> {
  public queue: T[] = [];
  add(item: T) {
    this.queue.push(item);
  }
}

const songs = new Playlist<Song>();
```

## Type Narrowing

### Typeof Guards

`typeof` Type Guards is simply doing type checking before working with a value.

```ts
const isTeenager = (age: (string | number)) => {
    if (typeof age === 'number') {
        return age > 12 && age < 20
    }
    if (typeof age === 'string') {
        return age.charAt(0) === '1'
}
```

### Truthiness Guards

Truthiness Type Guards checks if the value is being truthy or falsy before working it.

```ts
const inputElement = document.getElementById("test");
if (inputElement) {
  // work with input element
} else {
  console.log("There's no input element found");
}
```

### Equality Guards

Equality Type Guards checks the value compared to other values before working it.

```ts
const canBuyMarijuana = location => {
  if (["US", "Canada"].includes(location)) return true;
  if (["Nepal", "India"].includes(location)) {
    if (/*some condiations*/) return true;
    return false
  }
  return false;
};
```

### `in` operator narrowing

JavaScript `in` operator helps to check if a certain property exists in an object.

```ts
type Move {
    title: string;
    duration: number;
}
type TVShow = {
    title: string;
    numberOfEpisodes: number;
    episodesDuration: number;
}
const getRunTime = (media: Move | TVShow) => {
    if ('duration' in media) return media.duration
    return media.numberOfEpisodes * media.episodesDuration;
}
```

### `instanceof` narrowing

JavaScript `instanceof` operator to check if one thing is an instance of one class.

```ts
class User {
  constructor(public firstName: string) {}
}
class Company {
  constructor(public name: string) {}
}
const printName = (entity: User | Company) => {
  if (entity instanceof User) {
    console.log(entity.firstName);
  } else {
    console.log(entity.name);
  }
};
```

### Type Predicates

TypeScript allow us to write custom functions that can narrow down the type of a value. These functions have a very special return type called type predicate.

```ts
interface Cat {
  name: string;
  numLives: number;
}
interface Dog {
  name: string;
  breed: string;
}
const isCat(pet : Cat | Dog): pet is Cat => {
  return (pet as Cat).numLives !== undefined;
}

const makeNoise = (pet: Cat | Dog): void => {
  if (isCat(pet)) console.log('Meow')
  else console.log('Woof')
}
```

### Discriminated Unions

Creating a literal property that is common across multiple types.

```ts
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch shape.kind {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square'
      return shape.sideLength ** 2;
  }
}
```

### Exhaustive Checking

```ts
function getArea(shape: Shape) {
  switch shape.kind {
    case 'a':
    case 'b'
    case 'c'
    case 'd'
    case 'f'
    // ..
    default:
      // we should never reach this if we handle all the cases correctly
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

## Type Decorations

How to work with 3rd party libraries in TypeScript ecosystem? Check `*.d.ts` file

### Installing Types Separately

For the most part, type declaration packages should always have the same name as the package name on npm, but prefixed with `@types/`.

ref. [TypeScript doc](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html)

```bash
npm install --save-dev @types/lodash
```

## Modules

`namespace`

## TypeScript & Webpack
