---
author: Kevin
pubDatetime: 2023-02-17T00:43:00Z
title: Linux Commend Line
postSlug: linux-command-line
featured: true
draft: false
tags:
  - linux-command-line
ogImage: ""
description: Pluralsight course by David Clinton
---

## Basic Commands

```bash
# show document of command
man curl


# list all files in current directory
ls
# list all files in current directory, including hidden files
ls -a
ls --all
# list all files in current directory, including hidden files, with details
ls -l
# including file size
ls -lh
# sort in descending chronological order
ls -lht
# list all files in the target directory, with details
ls -l /etc/

# display the contents of a file
cat file.txt

# show recent commands
history

# create a new file/directory
touch test.txt
```

```bash

# download file from the internet
curl -I https://www.google.com

# unzip file
tar -xvf file.tar.gz

```
