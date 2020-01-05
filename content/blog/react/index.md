---
title: React
date: "2019-12-01T22:12:03.284Z"
description: "React notes"
---

<!-- # react -->

## super() vs super(props)

- We need to call super() inside the constructor
- We call super(props) only if we want to access `this.props` inside the constructor

```js{1, 3}
const Demo extends Component {
  constructor(props) {
    super(props)
    console.log(this.props) // { ... }
  }
}
```

## this.setState

- Do not call `this.setState()` inside the constructor and render method
- Asynchronous: if we want to `this.setState()` depends on the current state, we should pass a **function** instead of an object

  ```js
  this.setState(state => ({ score: state.score + 1 }))
  ```

- Immutable state pattern: make a copy of state, do some mutation and then call `this.setState()` with the copy

## React events

https://reactjs.org/docs/events.html

## Passing functions to child component

Child tells the parent to change state

- Parent defines a function
- Parent passes that function as a props to the child
- Child invokes the props
- The parent function is called, and usually set new state
- The parent is re-rendered along with its children

Where to bind `this`

- The higher the better - don't bind in the child
- If we need a parameter, pass the params down to the child as props

```js
// parent
class Parent extends Component {
  constructor(props) {
    super()
    this.state = { nums: [1, 2, 3] }
    this.remove = this.remove.bind(this)
  }
  remove(num) {
    this.setStet(state => ({
      nums: state.nums.filter(n => n !== num)
    }))
  }
  render() {
    const nums = this.state.nums.map(n => (
      // Don't bind here!!
      // <Child remove={() => this.remove(n)}>
      <Child value={n} remove={this.remove} />
    )
    return (
      <div>
        <ul>{nums}</ul>
      </div>
    )
  }
}

// child
const Child = ({ value, remove }) => (
  <li>
    {value}
    <button onClick={evt => remove(value))}>X</button>
  </li>
)
```

## React forms

Controlled component
