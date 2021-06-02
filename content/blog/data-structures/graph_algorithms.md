# Graph Algorithms

- Each graph is made up of *nodes(or vertices, V)* and *edges(E)*.
- Graphs are a way to model how different things are connected to one another.
- Directed graph v.s undirected graph

### Queues

- Queue(FIFO) v.s Stack(LIFO)
- You cannot access random elements in the queue
- There are only two operations: enqueue, dequeue

### Breadth-first search(BFS)

- Breadth-first search helps answer two types of questions:
  1. Is there a path from node A to node B?
  2. What is the shortest path from node A to node B?
- The way BFS works, the search *radiates* out from the staring point.
- A graph consists of several nodes and each node is connected to neighboring nodes.

  ```javascript
  const graph = {
    kevin: ['alice', 'bob', 'claire'],
    bob: ['anuj', 'peggy'],
    alice: ['peggy'],
    claire: ['thom', 'jonny'],
    anuy: [],
    peggy: [],
    thom: [],
    jonny: [],
  }
  ```

- Algorithm
  1. Keep a queue containing the people to check
  2. Pop a person off the queue
  3. Check if this person is a mango seller
  4. If the queue is empty, there are no mango sellers in your networks

  ```javascript
  const isSeller = name => name[-1] === 'm'

  const BFS = name => {
    const search_queue = graph[name]
    // keep tracked of which people you've searched before
    const searched = [name];
    while (search_queue.length > 0) {
      const person = search_queue.shift()
      // only search person if haven't searched before
      if (searched.indexOf(person) === -1){
        if (isSeller(person)) return true
        search_queue.push(search_queue[person])
        searched.push(person)
      }
    }
    return false
  }

  BFS('kevin')
  ```

- Running time: O(V+E), V for number of vertices and E for number of edges

### Dijkstra's Algorithm

- Breadth-first search will find you the path with the *fewest* segments. What if we want to find the *fastest* path instead?
- cycles in graphs
- Weighted graph v.s Unweighted graph
- With an undirected graph, each edge adds another cycle. Dijkstra's algorithm only works with *directed acyclic graphs*, called **DAGs** for short.
- Negative-weight edges break Dijkstra's algorithm. But not for Bellman-Ford algorithm.

- Algorithm
  1. Find the *cheapest* node.
  2. Update the costs of the neighbors of this node if cheaper.
  3. Repeat until you've done this for every node in the graph.
  4. Calculate the final path.

  ```javascript
  const graph = {
    start: { a: 10 },
    a: { c: 20 },
    b: { a: 1 },
    c: { b: 1, finish: 30 },
    finish: {},
  }
  const costs = {
    a: 10,
    b: Infinity,
    c: Infinity,
    finish: Infinity,
  }
  const parents = {
    a: 'start',
    finish: null,
  }
  const processed = []
  
  // Dijkstra's algorithm
  const findLowestCostNode = costs => {
    let lowestCost = Infinity
    let lowestCostNode = null
    for (const [node, cost] of Object.entries(costs)) {
      if ( processed.indexOf(node) === -1 && cost < lowestCost){
        lowestCost = cost
        lowestCostNode = node
      }
    }
    return lowestCostNode
  }

  const DijkstraAlgorithm = graph => {
    let node = findLowestCostNode(costs)
    while (node) {
      for( const [neighbor, costToNeighbor] of Object.entries(graph[node])){
        if((newCost = costs[node] + costToNeighbor) < costs[neighbor]) {
          costs[neighbor] = newCost
          parents[neighbor] = node
        }
      }
      processed.push(node)
      node = findLowestCostNode(costs)
    }
    
    const returnString = () => {
      let path = ['finish']
      let node = 'finish'
      while(parents[node] !== 'start'){
        path.unshift(parents[node])
        node = parents[node]
      }
      path.unshift('start')
      return path.join(' --> ')
    }

    console.log(`
      -> The shortest path from start to finish is ${costs['finish']}
      -> The shortest path is ${returnString()}
    `)
  }
  ```

