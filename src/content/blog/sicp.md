---
author: Kevin
pubDatetime: 2023-04-02T15:11:00Z
title: Structure and Interpretation of Computer Programs
postSlug: sicp
featured: true
draft: false
tags:
  - computer-science
ogImage: ""
description: Computer Science
---

## Building Abstractions with Procedures

### 1.1 The Elements of Programming

A powerful programming language is,

- instructing a computer to perform tasks
- serves as a framework within which we organize our ideas about processes

Thus, when we describe a language, we should pay particular attention to the means that the language provides for **combining simple ideas to form more complex ideas**.

- **primitive expressions**, which represent the simplest entities the language is concerned with
- **means of combination**, by which compound elements are built from simpler ones
- **means of abstraction**, by which compound elements can be named and manipulated as units

In programming, we deal with two kinds of elements: procedures and data. Thus, any powerful programming language should be able to describe primitive data and primitive procedures and should have methods for combining and abstracting procedures and data.

- data is “stuff” that we want to manipulate
- procedures are descriptions of the rules for manipulating the data

#### 1.1.1 Expressions

One easy way to get started at programming is to examine some typical interactions with an interpreter for Scheme.

The leftmost element in the list is called the _operator_, and the other elements are called _operands_.

```scheme
(+ 137 349)
```

The convention of placing the operator to the left of the operands is known as **prefix notation**. There are several advantages,

- It can accommodate procedures that may take an arbitrary number of arguments
- It extends in a straightforward way to allow combinations to be nested, that is, to have combinations whose elements are themselves combinations.

```scheme
(+ 1 2 3 4 5 6 7 8 9 10)
;; combination over combinations
(+ (* 3 5) (- 10 6))
```

It reads an expression from the terminal, evaluates the expression, and prints the result. The interpreter runs in a "read-eval-print" loop. Lisp obeys the convention that every expression has a value.

#### 1.1.2 Naming and the Environment

A critical aspect of a programming language is the means it provides for using names to refer to computational objects. We say that the name identifies a variable whose value is the object.

`define` is scheme’s simplest means of abstraction, for it allows us to use simple names to refer to the results of compound operations. Complex programs are constructed by building, step by step, computational objects of increasing complexity.

```scheme
(define size 2)
(* size 5) ;;10
```

It should be clear that the possibility of associating values with symbols and later retrieving them means that the interpreter must maintain some sort of memory that keeps track of the name-object pairs. This memory is called the _environment_ (more precisely the _global environment_, since a computation may involve a number of different environments).

#### 1.1.3 Evaluating Combinations

### 1.2 Procedures and the Processes They Generate

### 1.3 Formulating Abstractions with Higher-Order Procedures

### Building Abstractions with Data

### 2.1 Introduction to Data Abstraction

### 2.2 Hierarchical Data and the Closure Property

### 2.3 Symbolic Data

### 2.4 Multiple Representations for Abstract Data

### 2.5 Systems with Generic Operations

### Modularity, Objects, and State

### 3.1 Assignment and Local State

### 3.2 The Environment Model of Evaluation

### 3.3 Modeling with Mutable Data

### 3.4 Concurrency: Time Is of the Essence

### 3.5 Streams

### Metalinguistic Abstraction

### 4.1 The Metacircular Evaluator

### 4.2 Variations on a Scheme — Lazy Evaluation

### 4.3 Variations on a Scheme — Nondeterministic Computing

### 4.4 Logic Programming

### Computing with Register Machines

### 5.1 Designing Register Machines

### 5.2 A Register-Machine Simulator

### 5.3 Storage Allocation and Garbage Collection

### 5.4 The Explicit-Control Evaluator

### 5.5 Compilation
