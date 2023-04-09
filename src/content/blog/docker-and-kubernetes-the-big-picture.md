---
author: Kevin
pubDatetime: 2023-02-17T00:43:00Z
title: "Docker and Kubernetes"
postSlug: docker-and-kubernetes
featured: true
draft: false
tags:
  - docker-and-kubernetes
ogImage: ""
description: Pluralsight course by Nigel Poulton
---

## The history

### The Bad Old Ways

One app per server maintained by the company itself.

- More maintenance, human resources, room, power, cooling, etc.
- They buy overpowered servers running at 5-10% capacity

### VMware and Hypervisors

Virtual machines (VMs) are isolated environments that run on top of a host operating system (OS). So we don't have to buy a server for each app, we can run multiple VMs on a single server.

The problem of VMware is each one of VMs is a slice of the physical server's hardware and all the VMs has its own OS, which takes a lot of resources to run and some other extra costs.

- Hardware resources
- License costs
- Admin
  - Patching
  - Updates
  - Anti-virus

### Containers

With containers, we can run multiple apps on a single server. Each app is isolated from the others and has its own file system, but they share the same OS.

## Docker

Containers are like fast lightweight VM machines, and docker make running our apps inside containers very easily. It's the key to moving to a modern cloud-native micro-services design.

## Kubernetes
